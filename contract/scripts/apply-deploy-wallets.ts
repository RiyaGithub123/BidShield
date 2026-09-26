import * as fs from 'node:fs';
import * as path from 'node:path';
import { mnemonicToSeedHex } from './network.js';

const walletsRaw = fs.readFileSync(path.resolve(process.cwd(), 'DEPLOYMENT_WALLETS.json'), 'utf-8');
const wallets = JSON.parse(walletsRaw);

const state = {
  version: 1,
  activeNetwork: 'preview',
  wallets: {
    preview: {
      seed: mnemonicToSeedHex(wallets.preview.mnemonic),
      mnemonic: wallets.preview.mnemonic,
      createdAt: new Date().toISOString()
    },
    preprod: {
      seed: mnemonicToSeedHex(wallets.preprod.mnemonic),
      mnemonic: wallets.preprod.mnemonic,
      createdAt: new Date().toISOString()
    }
  },
  deployments: {}
};

fs.writeFileSync(path.resolve(process.cwd(), '.midnight-state.json'), JSON.stringify(state, null, 2) + '\n');
fs.writeFileSync(path.resolve(process.cwd(), '..', '.midnight-state.json'), JSON.stringify(state, null, 2) + '\n');

console.log('✅ Synchronized state files with Preview & Preprod deployment wallets!');
