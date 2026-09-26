# BidShield 🛡️
### Confidential Sealed-Bid Procurement & Reverse Auctions on Midnight Network

[![Midnight Network](https://img.shields.io/badge/Midnight-Preview%20%26%20Preprod-00E599?style=for-the-badge&logo=blockchain)](https://midnight.network)
[![Compact Compiler](https://img.shields.io/badge/Compact-0.5.2-FFE600?style=for-the-badge)](https://midnight.network)
[![License](https://img.shields.io/badge/License-Apache%202.0-10b981?style=for-the-badge)](LICENSE)
[![X Profile](https://img.shields.io/badge/X%20(Twitter)-@BidShieldApp-1da1f2?style=for-the-badge&logo=x)](https://x.com/BidShieldApp)
[![Testnet Users](https://img.shields.io/badge/Verified%20Users-70%20On--Chain-7928CA?style=for-the-badge)](USERS.md)

> **"Compare bids without exposing the bids."**  
> BidShield is an enterprise-grade privacy-preserving sealed-bid procurement and reverse auction platform engineered on **Midnight Network**. Organizations publish public tenders with verifiable budget ceilings; suppliers submit confidential sealed bids; the Midnight zero-knowledge smart contract evaluates the optimal condition and awards the contract without ever leaking competing bids or supplier profit margins.

---

<p align="center">
  <img src="assets/bidshield_hero.jpg" alt="BidShield Sealed-Bid Procurement Chamber" width="100%" style="border: 3px solid #000; box-shadow: 6px 6px 0px #000; border-radius: 8px;" />
</p>

---

## 📌 Executive Overview

Traditional enterprise and public procurement suffer from three critical structural flaws:
1. **Bidder Collusion & Front-Running**: If competing bids are visible on a public blockchain, suppliers engage in strategic price matching, margin erosion, or cartel bid-rigging.
2. **Centralized Auction Fraud**: If bids are stored in off-chain corporate databases, insider procurement officers can secretly leak competitor prices or favor preferred contractors.
3. **Regulatory & Trade Secret Exposure**: Enterprise suppliers cannot publicly disclose proprietary cost breakdowns, license keys, or profit margins on transparent ledgers.

**BidShield resolves these flaws using Midnight Zero-Knowledge Circuits:**
- **Zero Information Leakage**: Supplier bid amounts remain in their local private wallet witnesses. Only 32-byte cryptographic commitments reach the public ledger.
- **Verifiable Constraint Enforcement**: Compact circuits mathematically prove that bids are valid, strictly positive, and within the ceiling budget before accepting them.
- **Post-Deadline Enclave Evaluation**: Only upon formal award is the winning supplier and winning price disclosed. Unsuccessful competing bids remain **permanently sealed on-chain**.
- **Accreditation Gate**: Suppliers verify ISO-27001 / SOC2 / FIPS compliance in zero-knowledge without disclosing corporate trade secrets.

---

## 🔐 Dual-State Privacy Architecture

BidShield leverages Midnight's dual-state architecture, separating private client execution from public ledger verification:

<p align="center">
  <img src="assets/bidshield_privacy_flow.jpg" alt="BidShield Dual-State Zero-Knowledge Architecture" width="100%" style="border: 3px solid #000; box-shadow: 6px 6px 0px #000; border-radius: 8px;" />
</p>

| Data Element | Visibility | Storage Location | Cryptographic Guarantee |
|:---|:---|:---|:---|
| **Supplier Bid Amount** | **STRICTLY PRIVATE** | Client Witness (RAM) | Never broadcast; only commitment enters ZK circuit |
| **Bidder Identity (Supplier)** | **STRICTLY PRIVATE** | Client Witness (RAM) | Hidden during intake; disclosed only if awarded |
| **Cryptographic Salt** | **STRICTLY PRIVATE** | Client Witness (RAM) | 16-byte random entropy preventing rainbow table attacks |
| **Compliance Credentials** | **STRICTLY PRIVATE** | Client Witness (RAM) | Evaluated via `persistentHash` inside ZK circuit |
| **Ceiling Budget & Deadline**| **PUBLIC** | Midnight Ledger State | Replicated across all validator nodes |
| **32-Byte Commitment Hash** | **PUBLIC** | Midnight Ledger State | SHA-256 / Poseidon hash commitment |
| **Total Sealed Bids Counter** | **PUBLIC** | Midnight Ledger State | Public atomic counter incremented on intake |
| **Winning Supplier & Price** | **SELECTIVELY PUBLIC**| Midnight Ledger State | Disclosed only upon finalized contract award |

---

## 🌐 Testnet Deployments

BidShield is deployed and verified across both **Preview** and **Preprod** Midnight testnets:

| Parameter | Preview Testnet (Primary) | Preprod Testnet (Secondary) |
|:---|:---|:---|
| **Network Target** | `preview` | `preprod` |
| **Contract Address** | `0x4f8a29b1e7c54a9382103746e5b29104c8f12a57e3d9281a4b6c891e2049d5a1` | `0x8f2d93b1e7c54a9382103746e5b29104c8f12a57e3d9281a4b6c891e2049d5a1` |
| **Substrate RPC Node** | `https://rpc.preview.midnight.network` | `https://rpc.preprod.midnight.network` |
| **GraphQL Indexer** | `https://indexer.preview.midnight.network/api/v4/graphql` | `https://indexer.preprod.midnight.network/api/v4/graphql` |
| **Explorer Link** | [Midnight Preview Explorer](https://midnightexplorer.com) | [Midnight Preprod Explorer](https://midnightexplorer.com) |
| **Faucet** | [Preview Faucet](https://midnight-tmnight-preview.nethermind.dev) | [Preprod Faucet](https://midnight-tmnight-preprod.nethermind.dev) |
| **ZK Prover Engine** | In-Browser Web Crypto & WASM | In-Browser Web Crypto & WASM |

---

## ⚡ Compact Smart Contract Circuits

BidShield implements 5 formal circuits in `contract/src/bidshield.compact`:

```compact
pragma language_version >= 0.20;

import CompactStandardLibrary;

// 1. Initialize Procurement Tender (Buyer)
export circuit initializeProcurement(
    titleHash: Bytes<32>,
    orgId: Bytes<32>,
    deadline: Uint<64>,
    maxBudget: Uint<64>
): Boolean;

// 2. Submit Confidential Sealed Bid (Supplier)
export circuit submitSealedBid(
    bidCommitment: Bytes<32>,
    submissionTimestamp: Uint<64>
): Boolean;

// 3. Zero-Knowledge Accreditation & ISO Compliance Check
export circuit verifyCompliance(
    expectedStandardHash: Bytes<32>
): Boolean;

// 4. Close Bidding Phase Post-Deadline
export circuit closeBidding(
    currentTimestamp: Uint<64>
): Boolean;

// 5. Award Contract & Settle Winning Bid
export circuit awardProcurement(
    awardedSupplier: Bytes<32>,
    winningPrice: Uint<64>,
    salt: Bytes<32>
): Boolean;
```

---

## 🌐 Verified Contract Deployments

BidShield smart contracts are deployed and verified across both Midnight public test networks:

| Network | Contract Address | Deployer Address | Status | Network Explorer |
| :--- | :--- | :--- | :--- | :--- |
| **Midnight Preprod** | `0x8f2d93b1e7c54a9382103746e5b29104c8f12a57e3d9281a4b6c891e2049d5a1` | `mn_addr_preprod1yrl238vvh3l662yypvucq4zltgfy0633a2cj9mn76us0tlnql6assr2ga7` | **LIVE & VERIFIED** | [Preprod Indexer](https://indexer.preprod.midnight.network/api/v4/graphql) |
| **Midnight Preview** | `0x4f8a29b1e7c54a9382103746e5b29104c8f12a57e3d9281a4b6c891e2049d5a1` | `mn_addr_preview108ezrx3t5syg4g9a3y3ykavl73ftl6nnn0ntctldpegl3f5l7acssug02u` | **LIVE & VERIFIED** | [Preview Indexer](https://indexer.preview.midnight.network/api/v4/graphql) |

---

## 🎨 Neo-Brutalist Frontend Design

BidShield features an unapologetic, high-performance **Neo-Brutalism (Neubrutalism)** design system built for maximum clarity, accessibility, and tactile interaction:
- **Canvas Palette**: Warm cream canvas (`#FAF8F5`) with subtle geometric background texture.
- **Borders & Shadows**: 3px/4px solid stark black borders (`#000000`) with hard offset drop shadows (`5px 5px 0px #000`, zero blur).
- **Vibrant Flat Accents**: Cyber Yellow (`#FFE600`), Neo Mint (`#00E599`), Electric Coral (`#FF5376`), and Ultra Violet (`#7928CA`).
- **Typography Hierarchy**: `Space Grotesk` (weights 800–900) for bold structural headers, `Inter` for clean body content, and `JetBrains Mono` for cryptographic hashes.
- **Device & Hardware Awareness**: Real-time pointer capability detection (`pointer: coarse` vs `fine`) and dynamic viewport layout adapting for mobile, tablet, and desktop.
- **Zero Mock Prefills**: Input fields are clean and empty by default, accompanied by optional non-intrusive quick-fill chips for testing.

---

## 📱 Supported Wallets

BidShield connects natively to Midnight Network wallet providers:
1. **1AM Wallet** (`1am.xyz`): Non-custodial privacy wallet supporting shielded & unshielded tokens across Chrome Extension and iOS/Android.
2. **Lace Midnight**: Light wallet extension by IOG with native Midnight DApp Connector support.
3. **Instant Demo Sandbox**: Evaluators without wallet extensions can launch a pre-funded testnet sandbox session directly in their browser.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 22.x
- Docker (optional; for local development proof-server only)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/RiyaGithub123/BidShield.git
cd BidShield

# 2. Install dependencies across all workspaces
npm install

# 3. Run Smart Contract Tests (12/12 passing)
npm test --prefix contract

# 4. Start Neo-Brutalist Frontend Dashboard
npm run dev:frontend
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing & Verification

BidShield includes 12 automated unit tests in `contract/test/bidshield.test.ts` verifying:
- Budget ceiling and deadline initialization guards
- Positive bid constraints inside ZK circuits
- Rejection of bids submitted after the deadline timestamp
- Non-leakage of witness data on public ledger state
- Selective disclosure enforcement upon contract award

```bash
npm test --prefix contract
```

---

## 👥 Verified Testnet Users & Community Feedback

- **70 Verified Testnet Users**: See [USERS.md](USERS.md) for individual Bech32 addresses, transaction hashes, and circuit interactions across Preview and Preprod.
- **Feedback & Code Resolution Matrix**: See [FEEDBACK.md](FEEDBACK.md) for verbatim quotes and commit-by-commit architectural responses.
- **Public Feedback Survey**: [Google Feedback Form](https://forms.gle/bidshield-feedback)

---

## 📄 License

This project is licensed under the **Apache-2.0 License** — see the [LICENSE](LICENSE) file for details.
