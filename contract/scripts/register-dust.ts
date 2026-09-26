import ws from 'ws';
// @ts-expect-error polyfill
globalThis.WebSocket = ws;

import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import { resolveNetwork, getOrCreateWallet } from './network.js';
import { createWallet, persistWalletState, unshieldedToken } from './wallet.js';

async function broadcastTransaction(api: ApiPromise, tx: any): Promise<string> {
  const rawIds = tx.identifiers && typeof tx.identifiers === 'function' ? tx.identifiers() : [];
  const candidateId = rawIds.length > 0 ? rawIds.at(-1) : undefined;
  const serialized = tx.serialize ? tx.serialize() : tx;
  const hex = u8aToHex(serialized);
  console.log(`  Broadcasting tx (${hex.length} hex)...`);

  const subTx = api.tx.midnight.sendMnTransaction(hex);
  return await new Promise<string>((resolve, reject) => {
    let unsub: (() => void) | undefined;
    subTx.send((result) => {
      console.log(`  Tx status: ${result.status.type}`);
      if (result.status.isInBlock) {
        const blockHex = result.status.asInBlock.toHex();
        console.log(`  ✓ Included in block: ${blockHex}`);
        if (unsub) unsub();
        resolve(candidateId || blockHex);
      } else if (result.isError) {
        if (unsub) unsub();
        reject(new Error(`Tx error: ${JSON.stringify(result)}`));
      }
    }).then((fn) => { unsub = fn; }).catch(reject);
  });
}

async function main() {
  const target = process.argv[2] || 'preview';
  const { network, config } = resolveNetwork(target as any);
  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`  Registering DUST Generation for Midnight ${network.toUpperCase()}`);
  console.log(`═══════════════════════════════════════════════════════\n`);

  const relayWsUrl = config.node.replace(/^http/, 'ws');
  console.log(`Connecting to Substrate node: ${relayWsUrl}`);
  const provider = new WsProvider(relayWsUrl);
  const api = await ApiPromise.create({ provider, noInitWarn: true });
  console.log(`✓ Connected to node.`);

  const w = getOrCreateWallet(network);
  const ctx = await createWallet({ network, networkConfig: config, seed: w.seed, restore: true });
  const address = ctx.unshieldedKeystore.getBech32Address().toString();
  console.log(`Wallet address: ${address}`);

  console.log('Syncing wallet state...');
  const state = await new Promise<any>((resolve) => {
    const sub = ctx.wallet.state().subscribe((s) => {
      const bal = s.unshielded?.balances?.[unshieldedToken().raw] ?? 0n;
      if (bal > 0n || s.isSynced) {
        sub.unsubscribe();
        resolve(s);
      }
    });
  });

  const availableCoins = state.unshielded?.availableCoins ?? [];
  console.log(`Available coins found: ${availableCoins.length}`);
  const unregistered = availableCoins.filter((c: any) => !c.meta?.registeredForDustGeneration);
  console.log(`Unregistered coins: ${unregistered.length}`);

  if (unregistered.length === 0) {
    console.log('✓ All coins already registered for DUST generation.');
    await persistWalletState(network, ctx);
    await api.disconnect();
    await ctx.wallet.stop();
    return;
  }

  try {
    console.log('\nBuilding dust registration recipe...');
    const recipe = await ctx.wallet.registerNightUtxosForDustGeneration(
      unregistered,
      ctx.unshieldedKeystore.getPublicKey(),
      (payload: Uint8Array) => ctx.unshieldedKeystore.signData(payload),
    );

    console.log('Finalizing recipe...');
    const finalized = await ctx.wallet.finalizeRecipe(recipe);

    console.log('Submitting registration transaction to Midnight network...');
    const txId = await broadcastTransaction(api, finalized);
    console.log(`\n🎉 DUST Registration Successful! Tx ID: ${txId}`);

    await persistWalletState(network, ctx);
  } catch (err) {
    console.error('\n❌ Dust registration error:', err);
  } finally {
    await api.disconnect();
    await ctx.wallet.stop();
  }
}

main().catch(console.error);
