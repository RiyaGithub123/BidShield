# 🛡️ Midnight Developer Playbook: Critical Pitfalls & Solutions
> **Universal Guide for Midnight Blockchain & Zero-Knowledge DApp Development**  
> *A comprehensive, battle-tested reference guide documenting common architectural traps, SDK gotchas, Substrate runtime errors, and frontend integration bugs on Midnight (Preview & Preprod) — with exact, production-ready solutions.*

---

## 📌 Executive Summary & Usage as a Prompt

> [!TIP]
> **How to use this document for new projects:**  
> When starting any new Midnight Compact / DApp project (e.g. DeFi, auctions, identity, supply chain, RWA), paste this entire markdown document into your AI prompt or give it to your engineering team as **Mandatory Pre-Flight Constraints**. It will prevent 95% of typical development bottlenecks.

```
You are building a decentralized application on the Midnight Network using Compact smart contracts,
Midnight JS SDK, and React/TypeScript. You MUST adhere to all guidelines, error patterns, and architectural
fixes detailed in the Midnight Developer Playbook (MIDNIGHT_DEVELOPER_PITFALLS_AND_SOLUTIONS.md).
```

---

## 📑 Table of Contents
1. [Explorer Deep-Linking & Route Plurality (`/contracts/`)](#1-explorer-deep-linking--route-plurality-contracts)
2. [Address Formatting: Raw 64-Char Hex vs Ethereum `0x` Prefix](#2-address-formatting-raw-64-char-hex-vs-ethereum-0x-prefix)
3. [Midnight DUST Gas & The 300 Trillion Speck Overhead Trap](#3-midnight-dust-gas--the-300-trillion-speck-overhead-trap)
4. [Proof Server Container Management & Pre-Flight Probes](#4-proof-server-container-management--pre-flight-probes)
5. [Dual Testnet Architecture (Preview vs Preprod Isolation)](#5-dual-testnet-architecture-preview-vs-preprod-isolation)
6. [Eliminating Fake Client Entropy & Mock Hashes](#6-eliminating-fake-client-entropy--mock-hashes)
7. [DApp Connector Dynamic Discovery (`window.midnight`)](#7-dapp-connector-dynamic-discovery-windowmidnight)
8. [Strict Monorepo CI/CD & TypeScript Pipeline Safety](#8-strict-monorepo-cicd--typescript-pipeline-safety)
9. [Compact Smart Contract Circuit Optimization](#9-compact-smart-contract-circuit-optimization)
10. [Pre-Flight Checklist for Challenge & Production Submissions](#10-pre-flight-checklist-for-challenge--production-submissions)
11. [Wallet Address Object Serialization Trap (`[object Object]`)](#11-wallet-address-object-serialization-trap-object-object)
12. [Wallet Synchronization State & Silent Proving Timeouts](#12-wallet-synchronization-state--silent-proving-timeouts)
13. [Browser Console Noise & User Rejection Interception (`4001`)](#13-browser-console-noise--user-rejection-interception-4001)
14. [The Zero-Knowledge Block Explorer Indexing Paradox](#14-the-zero-knowledge-block-explorer-indexing-paradox)
15. [Client-Side Witness Cryptography & Browser Vite/ESM Compatibility](#15-client-side-witness-cryptography--browser-viteesm-compatibility)
16. [🤖 Master System Prompt for New Midnight Projects](#16--master-system-prompt-for-new-midnight-projects)

---

## 1. Explorer Deep-Linking & Route Plurality (`/contracts/`)

### ❌ The Problem
Developers frequently construct explorer URLs like this:
```typescript
// BROKEN — Returns HTTP 404 (Cloudflare/Next.js route mismatch)
const explorerUrl = `https://preprod.midnightexplorer.com/contract/${contractAddress}`;
const txUrl = `https://preprod.midnightexplorer.com/tx/${txHash}`;
```
When users click these links, the Midnight Explorer displays a generic 404 page, leading evaluators and testers to believe the contract or transaction does not exist on-chain.

### 🔍 Root Cause
The Midnight Explorer Next.js application routes use **plural** endpoints:
* Contracts route: `/contracts/[address]`
* Transactions route: `/transactions/[hash]`
* Blocks route: `/blocks/[blockNumber]`

### ✅ The Solution
Always use the plural endpoints across all configuration files, modals, and telemetry badges:

```typescript
// CORRECT — Returns HTTP 200 OK
export const buildExplorerContractUrl = (network: 'preview' | 'preprod', contractAddress: string) => {
  const base = network === 'preview' 
    ? 'https://preview.midnightexplorer.com' 
    : 'https://preprod.midnightexplorer.com';
  // Strip 0x if present
  const cleanAddress = contractAddress.replace(/^0x/, '');
  return `${base}/contracts/${cleanAddress}`;
};

export const buildExplorerTxUrl = (network: 'preview' | 'preprod', txHash: string) => {
  const base = network === 'preview' 
    ? 'https://preview.midnightexplorer.com' 
    : 'https://preprod.midnightexplorer.com';
  return `${base}/transactions/${txHash}`;
};
```

---

## 2. Address Formatting: Raw 64-Char Hex vs Ethereum `0x` Prefix

### ❌ The Problem
Developers coming from EVM/Solidity often prefix Midnight contract addresses with `0x`:
```json
{
  "contractAddress": "0x4f8a29b1e7c54a9382103746e5b29104c8f12a57e3d9281a4b6c891e2049d5a1"
}
```
Searching this formatted address on Midnight Explorer or querying the GraphQL indexer returns **"No results found"** or GraphQL schema parse errors.

### 🔍 Root Cause
Midnight uses distinct cryptographic identity formats:
1. **Smart Contracts**: 64-character lowercase hex string **WITHOUT** `0x` prefix (e.g. `fc67e2850565d285f2c51ece80eb4894a32961f317d91703f4cd98a9ebef088b`).
2. **User Wallets (Unshielded/Bech32)**: Bech32 format with network prefix:
   * Preview: `mn_addr_preview1...`
   * Preprod: `mn_addr_preprod1...`
3. **Substrate Extrinsic Transactions**: Either 64/66-character hex strings starting with `0x` or raw Substrate transaction IDs.

### ✅ The Solution
Enforce an address normalizer at your application's input and service boundary:

```typescript
export function normalizeContractAddress(address: string): string {
  if (!address) return '';
  const trimmed = address.trim().toLowerCase();
  // Strip leading 0x if present
  return trimmed.startsWith('0x') ? trimmed.slice(2) : trimmed;
}

export function formatTruncatedHash(hash: string, leadChars = 8, trailChars = 6): string {
  if (!hash) return '';
  const clean = hash.trim();
  if (clean.length <= leadChars + trailChars) return clean;
  return `${clean.slice(0, leadChars)}...${clean.slice(-trailChars)}`;
}
```

---

## 3. Midnight DUST Gas & The 300 Trillion Speck Overhead Trap

### ❌ The Problem
During contract deployment or calling state circuits from the CLI via Node.js, the transactor throws:
```text
(FiberFailure) Wallet.InsufficientFunds: Insufficient Funds: could not balance dust
```
Or when submitting raw transactions directly to the Substrate node:
```text
Invalid Transaction: Custom error: 138   (or Custom error: 173)
```

### 🔍 Root Cause
1. **The 300 Trillion Speck Trap**: Many sample repositories or early devnet guides hardcoded:
   ```typescript
   costParameters: { additionalFeeOverhead: 300_000_000_000_000n, feeBlocksMargin: 5 }
   ```
   In Midnight, $1\text{ DUST} = 1,000,000\text{ Specks}$.  
   $300,000,000,000,000\text{ Specks} = 300,000,000\text{ DUST}$!  
   If a funded testnet account has $4,900\text{ DUST}$, its balance is $4,900,000,000\text{ Specks}$. Demanding $300\text{ Trillion}$ overhead causes the SDK balancer to immediately abort with `could not balance dust`.
2. **Epoch Accrual Delay**: NIGHT tokens (obtained from the faucet) do not directly pay transaction fees. NIGHT UTXOs must first be registered for DUST generation, and DUST accumulates linearly over elapsed epochs.
3. **Headless Keystore vs 1AM Extension**: Raw headless Node.js scripts do not automatically share the browser extension's relayer or sponsored DUST keys unless explicitly configured.

### ✅ The Solution
1. **Reduce Fee Overhead**: In `wallet.ts`, set `additionalFeeOverhead` to a realistic testnet value:
   ```typescript
   costParameters: { 
     additionalFeeOverhead: 1_000n, // NOT 300_000_000_000_000n!
     feeBlocksMargin: 5 
   }
   ```
2. **Leverage the 1AM Browser Extension**: In winning Level 6 projects (`moonlight5`, `Cyphra`), client interactions and contract deployments are triggered via the connected browser wallet (`window.midnight.oneAim` / `mnLace`). The 1AM extension natively handles DUST fee balancing and transaction sponsorship via `api.balanceUnsealedTransaction({ payFees: true })`.

---

## 4. Proof Server Container Management & Pre-Flight Probes

### ❌ The Problem
When running contract tests, CLI deployments, or client ZK witness operations, the process hangs indefinitely or crashes with:
```text
FetchError: request to http://127.0.0.1:6300 failed, reason: connect ECONNREFUSED
```

### 🔍 Root Cause
Midnight uses a dedicated Zero-Knowledge Proof Server container (`midnightntwrk/proof-server:latest`) to generate SNARK proofs off-chain before broadcasting to the Substrate ledger. If Docker Desktop is stopped, the container is halted, or port 6300 is bound by another service, all proof generation fails.

### ✅ The Solution
1. **Provide a Bulletproof `docker-compose.yml`**:
   ```yaml
   services:
     proof-server:
       image: midnightntwrk/proof-server:latest
       container_name: midnight-proof-server
       ports:
         - "6300:6300"
       environment:
         - RUST_LOG=info
       restart: unless-stopped
       healthcheck:
         test: ["CMD-SHELL", "curl -f http://localhost:6300/ || exit 1"]
         interval: 10s
         timeout: 5s
         retries: 3
   ```
2. **Implement an Asynchronous Health Probe in Node Scripts**:
   ```typescript
   export async function ensureProofServerRunning(url = 'http://127.0.0.1:6300', maxRetries = 5): Promise<boolean> {
     for (let i = 1; i <= maxRetries; i++) {
       try {
         const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
         if (res.status === 200) return true;
       } catch {
         if (i < maxRetries) {
           console.log(`Waiting for Midnight proof server on ${url}... (${i}/${maxRetries})`);
           await new Promise((r) => setTimeout(r, 1500));
         }
       }
     }
     throw new Error(`\n❌ Proof server is NOT responding on ${url}.\nPlease launch it via: docker compose up -d proof-server\n`);
   }
   ```

---

## 5. Dual Testnet Architecture (Preview vs Preprod Isolation)

### ❌ The Problem
A user funds a wallet on Preprod, switches the DApp to Preview, and transactions fail with balance errors or wrong chain genesis hash. Alternatively, the application hardcodes single-network endpoints, preventing judges or evaluators on the other network from testing.

### 🔍 Root Cause
Midnight operates two distinct public testnets:
* **Preview**: Rapid-iteration staging testnet (`networkId: 'preview'`, RPC `rpc.preview.midnight.network`).
* **Preprod**: Production-replica testnet (`networkId: 'preprod'`, RPC `rpc.preprod.midnight.network`).

Each has its own independent ledger state, contract addresses, and Bech32 address formats (`mn_addr_preview1...` vs `mn_addr_preprod1...`).

### ✅ The Solution
1. **Strict Configuration Separation**:
   ```typescript
   export type MidnightNetwork = 'preview' | 'preprod';

   export const NETWORK_REGISTRY: Record<MidnightNetwork, {
     id: MidnightNetwork;
     name: string;
     rpcUrl: string;
     indexerUrl: string;
     indexerWsUrl: string;
     explorerUrl: string;
     faucetUrl: string;
     contractAddress: string;
   }> = {
     preview: {
       id: 'preview',
       name: 'Midnight Preview Testnet',
       rpcUrl: 'https://rpc.preview.midnight.network',
       indexerUrl: 'https://indexer.preview.midnight.network/api/v4/graphql',
       indexerWsUrl: 'wss://indexer.preview.midnight.network/api/v4/graphql/ws',
       explorerUrl: 'https://preview.midnightexplorer.com',
       faucetUrl: 'https://midnight-tmnight-preview.nethermind.dev',
       contractAddress: '0794f000c1446592b46446d9ce4929f43867dd86f5dc1660e25827ebaaf56123',
     },
     preprod: {
       id: 'preprod',
       name: 'Midnight Preprod Testnet',
       rpcUrl: 'https://rpc.preprod.midnight.network',
       indexerUrl: 'https://indexer.preprod.midnight.network/api/v4/graphql',
       indexerWsUrl: 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws',
       explorerUrl: 'https://preprod.midnightexplorer.com',
       faucetUrl: 'https://midnight-tmnight-preprod.nethermind.dev',
       contractAddress: 'fc67e2850565d285f2c51ece80eb4894a32961f317d91703f4cd98a9ebef088b',
     },
   };
   ```
2. **Volatile React Disconnect on Network Switch**: When a user switches networks, automatically trigger a clean wallet disconnect to force re-derivation of the appropriate Bech32 address.

---

## 6. Eliminating Fake Client Entropy & Mock Hashes

### ❌ The Problem
When building deployment or interaction modals, developers sometimes stub broadcast calls:
```typescript
// ❌ ANTI-PATTERN — Causes "No results" on explorer
const fakeTxHash = `0x${Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16)).join('')}`;
const fakeAddress = `0x${Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16)).join('')}`;
```
When evaluators copy these hashes and search them on `midnightexplorer.com`, nothing appears. This single issue caused multiple project disqualifications in past hackathons.

### 🔍 Root Cause
Falling back to client-generated random bytes when a wallet call rejects or is mocked in development.

### ✅ The Solution
1. **Always Bind to Confirmed Network Records**: If a contract is pre-deployed on-chain, display the **actual on-chain contract address** and **actual block transaction hash**.
2. **Explicit Demo/Sandbox Badge**: If running in offline demo mode without a connected wallet, explicitly label the UI with `DEMO SANDBOX MODE (Simulation Only)` so evaluators know it is not broadcasting.

---

## 7. DApp Connector Dynamic Discovery (`window.midnight`)

### ❌ The Problem
The frontend attempts to connect via `window.midnight.mnLace` or a single hardcoded provider key. If the user has **1AM Wallet** installed (`window.midnight.oneAim`), the DApp throws:
```text
TypeError: Cannot read properties of undefined (reading 'enable')
```

### 🔍 Root Cause
Different browser extensions register under different keys in the global `window.midnight` injection object (e.g. `mnLace`, `oneAim`, `oneAimWallet`). Furthermore, extension content scripts may inject asynchronously after the initial `window.onload` event.

### ✅ The Solution
Implement dynamic enumeration with a delayed retry poll:

```typescript
export interface InstalledMidnightWallet {
  id: string;
  name: string;
  icon?: string;
  api: any;
}

export function enumerateMidnightWallets(): InstalledMidnightWallet[] {
  if (typeof window === 'undefined' || !(window as any).midnight) {
    return [];
  }

  const midnight = (window as any).midnight;
  const detected: InstalledMidnightWallet[] = [];

  for (const [key, provider] of Object.entries(midnight)) {
    if (provider && typeof provider === 'object') {
      const is1AM = key.toLowerCase().includes('1am') || key.toLowerCase().includes('oneaim');
      const name = (provider as any).name || (is1AM ? '1AM Wallet' : 'Lace Midnight');
      detected.push({
        id: key,
        name,
        icon: (provider as any).icon,
        api: provider,
      });
    }
  }

  return detected;
}
```

---

## 8. Strict Monorepo CI/CD & TypeScript Pipeline Safety

### ❌ The Problem
GitHub Actions CI/CD fails with:
```text
error TS5023: Unknown compiler option '--prefix'
```
Or fails on production build due to unused variables:
```text
src/components/MyComponent.tsx(2,10): error TS6133: 'ExternalLink' is declared but its value is never read.
npm error Lifecycle script build failed with error: code 2
```

### 🔍 Root Cause
1. `tsc` does not support the `--prefix` flag (which is an `npm` flag, not a TypeScript compiler flag).
2. Modern projects enable `noUnusedLocals: true` and `noUnusedParameters: true` in `tsconfig.json`. Any left-over destructured prop or debugging import fails the entire GitHub Actions build.

### ✅ The Solution
1. **Correct GitHub Actions CI Workflow**:
   ```yaml
   # .github/workflows/ci.yml
   - name: Strict TypeScript Compilation Check
     run: npx tsc -p frontend/tsconfig.json --noEmit

   - name: Run Contract Tests
     run: npm test --prefix contract

   - name: Build Production Distribution
     run: npm run build --prefix frontend
   ```
2. **Prefix Unused Parameters with Underscore**: In TypeScript, parameters prefixed with `_` (e.g. `_unusedProp`) are ignored by `noUnusedParameters`.

---

## 9. Compact Smart Contract Circuit Optimization

### ❌ The Problem
Compact compiler (`compact 0.5.2`) fails during circuit compilation with arithmetic or range errors:
```text
Type mismatch: expected Uint<64>, found Integer
```

### 🔍 Root Cause
Compact is a strictly typed zero-knowledge constraint language. Arithmetic operations on unsigned integers (e.g. `counter + 1`) produce unconstrained mathematical integers that must be explicitly cast back into bounded circuit types.

### ✅ The Solution
Always apply explicit range casts for counters and state updates:

```compact
// ❌ WRONG:
totalBidsSubmitted = totalBidsSubmitted + 1;

// ✅ CORRECT:
totalBidsSubmitted = (totalBidsSubmitted + 1) as Uint<64>;
```

Also verify that all private inputs needed for circuit proofs are structured as private witnesses rather than public parameters:
```compact
// Contract defines witness functions:
witness getBidAmount(): Uint<64>;
witness getBidSalt(): Bytes<32>;
```

---

## 10. Pre-Flight Checklist for Level 6 Submissions

Before submitting any Midnight Builder Challenge or hackathon repository, verify every item in this checklist:

- [ ] **Contract Verification**: Both Preview and Preprod contract links on `midnightexplorer.com/contracts/[address]` return HTTP 200 with confirmed block numbers.
- [ ] **Dual-Wallet Testing**: Connects seamlessly to both 1AM Wallet and Lace Midnight extensions.
- [ ] **Clean Explorer URLs**: All links use plural `/contracts/` and `/transactions/`.
- [ ] **No Ethereum Prefix**: Contract addresses are 64-char hex strings without `0x`.
- [ ] **Zero Mock Fallbacks**: Input fields do not contain dummy defaults; real hashes are broadcast.
- [ ] **Passing CI/CD**: GitHub Actions workflow passes all 3 jobs (`tsc -p`, `vitest`, `vite build`).
- [ ] **Privacy Preservation**: Confidential witnesses (passwords, bids, credit scores, salts) are never exposed to public ledger state variables.
- [ ] **Feedback Resolution**: User feedback survey exported to `FEEDBACK.csv` with mapped Git commits.
- [ ] **Clean Local Git History**: Atomic, descriptive commits following the Conventional Commits specification.

---

## 11. Wallet Address Object Serialization Trap (`[object Object]`)

### ❌ The Problem
When integrating Midnight DApp Connectors (1AM Wallet or Lace), frontend address display badges or buttons render as:
```text
mn_addr_preprod1[object Object]
// or
[object Object]
```
Or throwing runtime errors:
```text
TypeError: wallet.address.slice is not a function
```

### 🔍 Root Cause
Recent updates to Midnight wallet connectors (specifically 1AM Wallet and multi-asset account abstractions) return rich address structures rather than plain strings when querying connected accounts:
```typescript
// Connector returns:
{
  address: "mn_addr_preprod1yrl238...",
  bech32: "mn_addr_preprod1yrl238...",
  roles: ["Zswap", "NightExternal", "Dust"]
}
```
If your frontend code assigns this directly to a string state or uses string interpolation `${wallet.address}`, JavaScript invokes `.toString()`, producing `"[object Object]"`.

### ✅ The Solution
Implement a defensive address extractor function across your wallet hook and display components:

```typescript
/**
 * Safely extracts a clean Bech32 string from any Midnight address payload
 * handles plain strings, nested address objects, or array responses.
 */
export function extractBech32Address(addr: unknown): string {
  if (!addr) return '';
  if (typeof addr === 'string') return addr;
  if (typeof addr === 'object' && addr !== null) {
    const candidate = addr as Record<string, unknown>;
    if (typeof candidate.address === 'string') return candidate.address;
    if (typeof candidate.bech32 === 'string') return candidate.bech32;
    if (typeof candidate.unshieldedAddress === 'string') return candidate.unshieldedAddress;
    if (Array.isArray(addr) && addr.length > 0) return extractBech32Address(addr[0]);
  }
  return String(addr);
}

// In your UI component:
export const AddressChip: React.FC<{ rawAddress: unknown }> = ({ rawAddress }) => {
  const clean = extractBech32Address(rawAddress);
  if (!clean) return <span>Not Connected</span>;
  return <span>{clean.slice(0, 14)}...{clean.slice(-6)}</span>;
};
```

---

## 12. Wallet Synchronization State & Silent Proving Timeouts

### ❌ The Problem
A user connects their wallet, immediately clicks a button to execute a contract circuit transaction, and the app either hangs indefinitely with a spinner or fails with:
```text
WalletNotSynchronizedException: Cannot balance transaction while synchronizing with Midnight indexer.
```

### 🔍 Root Cause
Unlike transparent blockchains where account state is a simple nonce/balance lookup, Midnight wallets must sync **shielded UTXO note commitments and nullifiers** with the Substrate indexer upon unlock. This synchronization takes between 2 to 15 seconds depending on connection latency and block height. Attempting to build or balance a transaction during this window fails.

### ✅ The Solution
1. **Subscribe to Wallet Sync Observable**: Check synchronization status before enabling transaction buttons:
```typescript
export function useWalletSyncStatus(walletInstance: any) {
  const [isSynced, setIsSynced] = useState<boolean>(false);

  useEffect(() => {
    if (!walletInstance?.state) return;
    const sub = walletInstance.state().subscribe({
      next: (state: any) => {
        // Check if sync status is fully caught up to latest block
        setIsSynced(state.syncProgress?.isSynced ?? true);
      },
    });
    return () => sub.unsubscribe();
  }, [walletInstance]);

  return isSynced;
}
```
2. **Provide Clear Visual Sync Telemetry**:
   - If syncing, show a subtle pulse badge: `Syncing with Midnight ledger (#2.6M)...`
   - Disable submission buttons with a tooltip: `"Please wait for shielded wallet synchronization to complete"`.

---

## 13. Browser Console Noise & User Rejection Interception (`4001`)

### ❌ The Problem
When evaluators or testers click "Connect Wallet" and then click "Cancel" or close the extension popup, browser extensions throw an unhandled promise rejection:
```text
Uncaught (in promise) { code: 4001, message: "User rejected the request." }
```
Evaluators inspecting the DevTools console see bright red error logs and assume the dApp has unhandled exceptions.

### ✅ The Solution
Intercept user cancellations at the connector boundary and classify them as clean, neutral events:

```typescript
export async function connectMidnightWallet(provider: any): Promise<boolean> {
  try {
    const api = await provider.enable();
    return !!api;
  } catch (err: any) {
    const errorMsg = (err?.message || '').toLowerCase();
    const isUserCancel = 
      err?.code === 4001 || 
      err?.code === 'USER_REJECTED' ||
      errorMsg.includes('reject') || 
      errorMsg.includes('cancel') ||
      errorMsg.includes('closed');

    if (isUserCancel) {
      // Clean neutral logging — zero red console errors
      console.info('ℹ️ User cancelled wallet connection dialog.');
      return false;
    }

    console.warn('⚠️ Legitimate wallet connection error:', err?.message || err);
    return false;
  }
}
```

---

## 14. The Zero-Knowledge Block Explorer Indexing Paradox

### ❌ The Problem
Testers and evaluators submit a transaction, copy their wallet address, search it on `midnightexplorer.com` or Subscan, and complain:
> *"My address page says 0 Transactions! The dApp did not execute on-chain!"*

### 🔍 Root Cause
In Ethereum/Solidity, the `from` address is public and indexed on Etherscan.  
In Midnight's **Dual-State Zero-Knowledge Architecture**:
- Private witness data (identities, secrets, bid amounts) stays in the user's local RAM.
- Contract extrinsics interact directly with the Compact smart contract address using zero-knowledge proofs.
- Because the transaction does not publicly bind the user's unshielded address to the contract interaction, **block explorers do NOT index the contract transaction under the caller's address**.
- Contract state mutations are indexed **under the Contract Address itself**.

### ✅ The Solution
1. **Document Prominently for Evaluators**: Include an explicit Evaluator Notice in the README and UI:
   > **How to Verify Execution**: Inspect the **Contract Actions** on the Midnight Explorer contract page and verify the on-chain Substrate transaction hashes, where atomic increments and state transitions are recorded.
2. **Link Direct to Contract & Extrinsic**: Always render links directly to `midnightexplorer.com/contracts/[contractAddress]` and the extrinsic hash, rather than the user's personal address.

---

## 15. Client-Side Witness Cryptography & Browser Vite/ESM Compatibility

### ❌ The Problem
When hashing private witnesses or generating salts in frontend React/Vite applications, importing Node.js `crypto` or `Buffer` produces browser bundle errors:
```text
Uncaught ReferenceError: Buffer is not defined
// or
Uncaught ReferenceError: process is not defined
```

### ✅ The Solution
Use native Web Crypto APIs (`window.crypto.subtle`) and modern ES TypedArrays, completely avoiding legacy Node polyfills:

```typescript
// 1. Browser-Native SHA-256 Hashing
export async function sha256Hex(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 2. Cryptographic Salt Generation (32-byte hex entropy)
export function generateCryptographicSalt(): string {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// 3. Compact-Compatible Commitment Calculation
export async function computeCompactCommitment(value: number | bigint, saltHex: string): Promise<string> {
  const payload = `${value}:${saltHex}`;
  return sha256Hex(payload);
}
```

---

## 16. 🤖 Master System Prompt for New Midnight Projects

> [!TIP]
> **Copy, paste, and save this prompt for the next Midnight project!**  
> Feed this prompt directly into your AI coding assistant (Claude, ChatGPT, Gemini, Antigravity) at the very start of any new project on Midnight Network.

````markdown
You are an expert Midnight Network and Compact smart contract engineer. You are building a production-grade decentralized application on Midnight Network using Compact 0.5.2, Midnight JS SDK, Substrate, and TypeScript/React.

You MUST follow these battle-tested architectural invariants and rules without exception:

### 1. Dual-State Privacy Invariants
- Private state (witnesses, secrets, passwords, financial amounts, private keys, salts) MUST NEVER be passed into public ledger state variables or emitted in plaintext events.
- All confidential intake circuits MUST use cryptographic commitments (SHA-256 / persistentHash). The public ledger receives ONLY the 32-byte commitment hash.
- Enforce selective disclosure: Unsuccessful or confidential competing records must remain permanently sealed on-chain. Only reveal verified outcomes.

### 2. Compact Circuit Rules (Compact >= 0.20 / 0.5.2)
- Explicit arithmetic bounds: Arithmetic on counters must explicitly cast back to bounds (e.g. `(counter + 1) as Uint<64>`).
- Enforce initialization guards: Every contract must have an `isInitialized: Cell<Boolean>` checked with `assert(!isInitialized, "Already initialized")` to prevent re-initialization exploits.
- Standardize all external identifiers and hashes to fixed 32-byte arrays (`Bytes<32>`).
- Define explicit witness functions in Compact for all off-chain private inputs:
  `witness getPrivateSecret(): Uint<64>;`
  `witness getPrivateSalt(): Bytes<32>;`

### 3. Explorer & Address Formatting Invariants
- NEVER prefix contract addresses with `0x`. Smart contracts on Midnight are 64-character lowercase hex strings (e.g. `fc67e2850565...`).
- User addresses are Bech32 (`mn_addr_preprod1...` or `mn_addr_preview1...`).
- Always use PLURAL endpoints for Midnight Explorer URLs:
  - Contracts: `https://[network].midnightexplorer.com/contracts/[address]`
  - Transactions: `https://[network].midnightexplorer.com/transactions/[txHash]`
  (Singular `/contract/` or `/tx/` returns HTTP 404).

### 4. DUST Gas & Fee Balancing Rules
- In transaction configuration (`wallet.ts`), NEVER set `additionalFeeOverhead` to 300 Trillion Specks. Use realistic testnet overhead (`costParameters: { additionalFeeOverhead: 10_000_000n, feeBlocksMargin: 5 }`).
- Remember: 1 DUST = 1,000,000 Specks. Ensure operational accounts have registered for DUST generation via `dust.registerKey`.

### 5. Dual-Network Isolation (Preview & Preprod)
- Support BOTH Midnight Preview and Midnight Preprod testnets seamlessly.
- Preview RPC: `https://rpc.preview.midnight.network` | Indexer: `https://indexer.preview.midnight.network/api/v4/graphql`
- Preprod RPC: `https://rpc.preprod.midnight.network` | Indexer: `https://indexer.preprod.midnight.network/api/v4/graphql`
- Contract addresses differ between Preview and Preprod. Keep them mapped in a central `NETWORK_CONFIGS` dictionary.

### 6. Frontend & Wallet Connector UX
- Prevent `[object Object]` bugs: Always normalize wallet addresses with a defensive `extractBech32Address` helper that handles objects (`{ address: string }`) and plain strings.
- Gracefully handle wallet cancellations: Catch user rejection errors (`err.code === 4001` or "User rejected") and log neutral info rather than dumping red errors in DevTools console.
- Zero mock fallbacks: Forms must start clean with empty inputs. Provide non-intrusive "Quick Fill" chips beneath inputs for tester convenience.
- Zero Docker requirement for evaluators: Use browser-native wallet proving (1AM / Lace WASM) rather than forcing evaluators to run local 4GB Docker proof-server containers.
- Native browser cryptography: Use `window.crypto.subtle` and `window.crypto.getRandomValues()` instead of Node.js `crypto` or `Buffer` to prevent Vite/ESM build breakage.
````

