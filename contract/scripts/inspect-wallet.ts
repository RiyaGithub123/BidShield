import ws from 'ws';
// @ts-expect-error polyfill
globalThis.WebSocket = ws;

import { resolveNetwork, getOrCreateWallet } from './network.js';
import { createWallet, unshieldedToken } from './wallet.js';

async function main() {
  const target = process.argv[2] || 'preview';
  const { network, config } = resolveNetwork(target as any);
  console.log(`Inspecting ${network}...`);
  const w = getOrCreateWallet(network);
  console.log(`Address seed: ${w.seed.slice(0, 8)}...`);

  const ctx = await createWallet({ network, networkConfig: config, seed: w.seed, restore: true });
  console.log(`Unshielded Address: ${ctx.unshieldedKeystore.getBech32Address().toString()}`);

  const state = await new Promise<any>((resolve) => {
    const sub = ctx.wallet.state().subscribe((s) => {
      const bal = s.unshielded?.balances?.[unshieldedToken().raw] ?? 0n;
      if (bal > 0n || s.isSynced) {
        sub.unsubscribe();
        resolve(s);
      }
    });
  });

  console.log('Unshielded balance:', state.unshielded?.balances?.[unshieldedToken().raw]?.toString());
  console.log('Available coins:', JSON.stringify(state.unshielded?.availableCoins, (k, v) => typeof v === 'bigint' ? v.toString() : v, 2));
  console.log('Dust balance now:', state.dust?.balance(new Date())?.toString());
  console.log('Dust balance +1h:', state.dust?.balance(new Date(Date.now() + 3600000))?.toString());
  console.log('Shielded coins count:', state.shielded?.coins ? Object.keys(state.shielded.coins).length : 0);
  console.log('Is synced:', state.isSynced);

  await ctx.wallet.stop();
  process.exit(0);
}

main().catch(console.error);
