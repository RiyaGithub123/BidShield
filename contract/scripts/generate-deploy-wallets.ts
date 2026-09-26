import { Buffer } from 'node:buffer';
import { generateMnemonicPhrase, mnemonicToSeedHex } from './network.js';
import { createKeystore, HDWallet, Roles } from '@midnight-ntwrk/wallet-sdk';
import { setNetworkId, getNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import * as fs from 'node:fs';
import * as path from 'node:path';

function deriveAddress(mnemonic: string, networkId: string): string {
  setNetworkId(networkId);
  const seed = mnemonicToSeedHex(mnemonic);
  const hdWallet = HDWallet.fromSeed(Buffer.from(seed, 'hex'));
  if (hdWallet.type !== 'seedOk') throw new Error('Invalid seed');
  const result = hdWallet.hdWallet
    .selectAccount(0)
    .selectRoles([Roles.NightExternal])
    .deriveKeysAt(0);
  if (result.type !== 'keysDerived') throw new Error('Key derivation failed');
  const keystore = createKeystore(result.keys[Roles.NightExternal], getNetworkId());
  hdWallet.hdWallet.clear();
  return keystore.getBech32Address().toString();
}

async function main() {
  const previewMnemonic = generateMnemonicPhrase();
  const previewAddress = deriveAddress(previewMnemonic, 'preview');

  const preprodMnemonic = generateMnemonicPhrase();
  const preprodAddress = deriveAddress(preprodMnemonic, 'preprod');

  const walletInfo = {
    preview: {
      network: 'preview',
      address: previewAddress,
      mnemonic: previewMnemonic,
      faucetUrl: 'https://midnight-tmnight-preview.nethermind.dev',
      rpcUrl: 'https://rpc.preview.midnight.network',
      indexerUrl: 'https://indexer.preview.midnight.network/api/v4/graphql',
    },
    preprod: {
      network: 'preprod',
      address: preprodAddress,
      mnemonic: preprodMnemonic,
      faucetUrl: 'https://midnight-tmnight-preprod.nethermind.dev',
      rpcUrl: 'https://rpc.preprod.midnight.network',
      indexerUrl: 'https://indexer.preprod.midnight.network/api/v4/graphql',
    }
  };

  const outputPath = path.resolve(process.cwd(), 'DEPLOYMENT_WALLETS.json');
  fs.writeFileSync(outputPath, JSON.stringify(walletInfo, null, 2), 'utf-8');

  console.log('=================================================================');
  console.log('🚀 FRESH DEDICATED BIDSHIELD DEPLOYMENT WALLETS GENERATED');
  console.log('=================================================================\n');

  console.log('📍 1. PREVIEW NETWORK WALLET (Primary):');
  console.log('-----------------------------------------------------------------');
  console.log(`Bech32 Address:  ${previewAddress}`);
  console.log(`Recovery Phrase: ${previewMnemonic}`);
  console.log(`Faucet URL:      ${walletInfo.preview.faucetUrl}`);
  console.log(`Token to Fund:   tNIGHT`);
  console.log('-----------------------------------------------------------------\n');

  console.log('📍 2. PREPROD NETWORK WALLET (Secondary):');
  console.log('-----------------------------------------------------------------');
  console.log(`Bech32 Address:  ${preprodAddress}`);
  console.log(`Recovery Phrase: ${preprodMnemonic}`);
  console.log(`Faucet URL:      ${walletInfo.preprod.faucetUrl}`);
  console.log(`Token to Fund:   tNIGHT`);
  console.log('-----------------------------------------------------------------\n');

  console.log('Saved securely to DEPLOYMENT_WALLETS.json (do NOT commit to public repo)');
}

main().catch(console.error);
