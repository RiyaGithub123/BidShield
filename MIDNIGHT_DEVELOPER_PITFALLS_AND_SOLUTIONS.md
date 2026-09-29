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
10. [Pre-Flight Checklist for Level 6 Submissions](#10-pre-flight-checklist-for-level-6-submissions)

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
