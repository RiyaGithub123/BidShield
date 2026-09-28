import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ws from 'ws';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';

// @ts-expect-error polyfill
globalThis.WebSocket = ws;

import { resolveNetwork, getOrCreateWallet } from './network.js';
import { createWallet, unshieldedToken } from './wallet.js';
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const zkConfigPath = path.resolve(__dirname, '..', 'managed');
const contractPath = path.join(zkConfigPath, 'contract', 'index.js');
const BidShieldModule = await import(pathToFileURL(contractPath).href);

const defaultWitnesses = {
  getBidAmount: (context: any): [any, bigint] => [context.privateState, 150000n],
  getBidderIdentity: (context: any): [any, Uint8Array] => [context.privateState, new Uint8Array(32)],
  getComplianceCredential: (context: any): [any, Uint8Array] => [context.privateState, new Uint8Array(32)],
};

const compiledContract = CompiledContract.make('bidshield', BidShieldModule.Contract).pipe(
  CompiledContract.withWitnesses(defaultWitnesses),
  CompiledContract.withCompiledFileAssets(zkConfigPath),
);

async function main() {
  const target = process.argv[2] || 'preprod';
  const { network, config } = resolveNetwork(target as any);
  console.log(`Testing unshielded deployment on ${network}...`);

  const relayWsUrl = config.node.replace(/^http/, 'ws');
  const provider = new WsProvider(relayWsUrl);
  const api = await ApiPromise.create({ provider, noInitWarn: true });
  console.log('Connected to node.');

  const w = getOrCreateWallet(network);
  const ctx = await createWallet({ network, networkConfig: config, seed: w.seed, restore: true });

  const state = await new Promise<any>((resolve) => {
    let settled = false;
    const sub = ctx.wallet.state().subscribe((s) => {
      const bal = s.unshielded?.balances?.[unshieldedToken().raw] ?? 0n;
      if (!settled && (bal > 0n || s.isSynced)) {
        settled = true;
        sub.unsubscribe();
        resolve(s);
      }
    });
  });

  console.log('Unshielded balance:', state.unshielded?.balances?.[unshieldedToken().raw]?.toString());

  const accountId = ctx.unshieldedKeystore.getBech32Address().toString();
  const zkConfigProvider = new NodeZkConfigProvider(zkConfigPath);

  const walletProvider = {
    getCoinPublicKey: () => ctx.shieldedSecretKeys.coinPublicKey,
    getEncryptionPublicKey: () => ctx.shieldedSecretKeys.encryptionPublicKey,
    async balanceTx(tx: any, ttl?: Date) {
      console.log('Balancing with tokenKindsToBalance: [unshielded]...');
      const recipe = await ctx.wallet.balanceUnboundTransaction(
        tx,
        { shieldedSecretKeys: ctx.shieldedSecretKeys, dustSecretKey: ctx.dustSecretKey },
        { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1000), tokenKindsToBalance: ['unshielded'] },
      );
      console.log('Recipe:', recipe.type);
      const finalized = await ctx.wallet.finalizeRecipe(recipe);
      console.log('Finalized successfully!');
      return finalized;
    },
    submitTx: async (tx: any) => {
      const hex = u8aToHex(tx.serialize ? tx.serialize() : tx);
      console.log(`Broadcasting transaction (${hex.length} hex chars)...`);
      const subTx = api.tx.midnight.sendMnTransaction(hex);
      return new Promise<string>((resolve, reject) => {
        let unsub: any;
        subTx.send((res) => {
          console.log(`Status: ${res.status.type}`);
          if (res.status.isInBlock) {
            console.log(`InBlock: ${res.status.asInBlock.toHex()}`);
            if (unsub) unsub();
            resolve(res.status.asInBlock.toHex());
          } else if (res.isError) {
            if (unsub) unsub();
            reject(new Error(JSON.stringify(res)));
          }
        }).then((fn) => { unsub = fn; }).catch(reject);
      });
    },
  };

  const providers = {
    privateStateProvider: levelPrivateStateProvider({
      privateStateStoreName: `bidshield-${network}-${Date.now()}`,
      accountId,
      privateStoragePasswordProvider: () => 'BidShield-Key-2026',
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
    walletProvider,
    midnightProvider: walletProvider,
  };

  console.log('Calling deployContract...');
  const deployed = await deployContract(providers, {
    compiledContract: compiledContract as any,
    args: [],
    privateStateId: 'bidshield-state',
    initialPrivateState: {},
  });

  console.log('DEPLOYED ADDRESS:', deployed.deployTxData.public.contractAddress);
  await api.disconnect();
  await ctx.wallet.stop();
}

main().catch(console.error);
