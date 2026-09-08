# BidShield 🛡️
### Confidential Sealed-Bid Procurement & Reverse Auctions on Midnight Network

[![Midnight Network](https://img.shields.io/badge/Midnight-Preprod%20Testnet-06b6d4?style=for-the-badge&logo=blockchain)](https://midnight.network)
[![Compact Compiler](https://img.shields.io/badge/Compact-0.5.2-f59e0b?style=for-the-badge)](https://midnight.network)
[![License](https://img.shields.io/badge/License-Apache%202.0-10b981?style=for-the-badge)](LICENSE)
[![X Profile](https://img.shields.io/badge/X%20(Twitter)-@BidShieldApp-1da1f2?style=for-the-badge&logo=x)](https://x.com/BidShieldApp)

> **"Compare bids without exposing the bids."**  
> BidShield is an enterprise-grade privacy-preserving sealed-bid procurement and reverse auction platform engineered on **Midnight Network**. Organizations initiate public tenders with verifiable budget ceilings; suppliers submit confidential sealed bids; the Midnight zero-knowledge smart contract evaluates the optimal condition and awards the contract without ever leaking competing bids or supplier margins.

---

## 📌 Executive Overview

Traditional public and enterprise procurement suffer from a fundamental privacy dilemma:
1. **Public Bidding Collusion**: If competing bids are visible on-chain, suppliers engage in strategic price matching, margin erosion, or cartel bid-rigging.
2. **Centralized Auction Fraud**: If bids are stored in off-chain corporate databases, centralized procurement officers can secretly leak competitor prices or front-run bids.
3. **Regulatory Non-Compliance**: Enterprise suppliers cannot publicly disclose sensitive trade secrets, custom cost breakdowns, or audit keys on public ledgers.

**BidShield solves this dilemma using Midnight Zero-Knowledge Circuits:**
- **Zero Information Leakage**: Supplier bid amounts remain in their local private wallet witnesses. Only 32-byte cryptographic commitments reach the public ledger.
- **Verifiable Constraint Enforcement**: Compact circuits mathematically prove that bids are valid, positive, and within the ceiling budget before accepting them.
- **Post-Deadline Enclave Evaluation**: Only upon formal award is the winning supplier and winning price disclosed. Unsuccessful competing bids remain **permanently sealed**.
- **Accreditation Gate**: Suppliers verify ISO-27001 / SOC2 / FIPS compliance in zero-knowledge without disclosing corporate license certificates.

---

## 🏗️ System Architecture

BidShield is structured as a monorepo containing Midnight Compact smart contracts, Substrate RPC scripts, and a modern Vite + React frontend dashboard.

```
BidShield/
├── contract/                       # Compact Zero-Knowledge Smart Contract Workspace
│   ├── src/
│   │   └── bidshield.compact      # 5 Circuits & Public Ledger State Machine
│   ├── managed/                    # Generated Prover/Verifier Keys & ZKIR Bytecode
│   │   ├── compiler/              # Contract AST & metadata
│   │   ├── contract/              # Generated TypeScript runtime bindings
│   │   ├── keys/                  # Prover and verifier circuit keys
│   │   └── zkir/                  # Zero-Knowledge Intermediate Representation
│   ├── scripts/                   # Deployment, Wallet & RPC Providers
│   │   ├── deploy.ts              # Preprod contract deployment script
│   │   ├── check-balance.ts       # tNIGHT balance & DUST gas checker
│   │   ├── network.ts             # Preprod endpoints & mnemonic derivation
│   │   ├── wallet.ts              # BIP-39 wallet facade & role derivation
│   │   └── wallet-state.ts        # Shielded & unshielded state persistence
│   └── test/
│       └── bidshield.test.ts      # 12 Vitest circuit & privacy invariant unit tests
├── frontend/                       # Neo-Fintech React + TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── FloatingNavbar.tsx # Apple Spatial island navbar
│   │   │   ├── TenderHeroShowcase.tsx # Featured active tender showcase
│   │   │   ├── InteractiveZkPlayground.tsx # Real-time witness & commitment simulator
│   │   │   ├── PrivacyArchitectureVisualizer.tsx # Enclave auction visualizer
│   │   │   ├── NetworkTelemetry.tsx # Live Midnight Preprod node status
│   │   │   ├── ProcurementCard.tsx # Bento tender card
│   │   │   ├── SubmitBidModal.tsx # Sealed bidding & entropy modal
│   │   │   ├── CreateProcurementModal.tsx # RFP tender creation modal
│   │   │   ├── ComplianceModal.tsx # ZK accreditation proof modal
│   │   │   ├── AwardModal.tsx     # Contract settlement & award modal
│   │   │   └── MobileWalletModal.tsx # 1AM / Lace mobile connection modal
│   │   ├── contracts/
│   │   │   └── contractService.ts # Midnight circuit API & Preprod integration
│   │   ├── hooks/
│   │   │   └── use1AMWallet.ts    # 1AM & Lace wallet integration hook
│   │   ├── utils/
│   │   │   └── crypto.ts          # Web Crypto SHA-256 & formatting utilities
│   │   └── index.css              # Obsidian, Aurora lightbeams & Bento design system
│   ├── index.html
│   └── vite.config.ts
├── .github/workflows/
│   └── ci.yml                     # Automated CI/CD pipeline (Test & Build)
├── docker-compose.yml             # Midnight local Proof Server container
├── .env.example                   # Environment variable blueprint
└── README.md
```

---

## ⚡ Compact Smart Contract Circuits

BidShield implements 5 provable circuits on Midnight:

```compact
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

// 3. Zero-Knowledge Compliance Accreditation Gate (Supplier)
export circuit verifyCompliance(
    expectedAccreditationHash: Bytes<32>
): Boolean;

// 4. Close Bidding Phase Post-Deadline (Procurement Officer)
export circuit closeBidding(
    currentTimestamp: Uint<64>
): Boolean;

// 5. Award Contract & Disclose Winning Bid (Procurement Officer)
export circuit awardProcurement(
    awardedSupplier: Bytes<32>,
    awardedPrice: Uint<64>,
    bidSalt: Bytes<32>
): Boolean;
```

---

## 🔐 Zero-Knowledge Privacy Model

| Phase | Actor | Witness (Private) | Disclosed (On-Chain) | Observer Knowledge |
|---|---|---|---|---|
| **RFP Tender Creation** | Buyer | None | Title Hash, Org ID, Deadline, Budget Ceiling | Tender specs and maximum budget are public |
| **Bid Submission** | Supplier | Bid Amount, Salt, Identity | 32-Byte Commitment Hash, Timestamp | Knows a sealed bid arrived; price is 100% secret |
| **Compliance Gate** | Supplier | Audit Certificate Key | Accreditation Match (Boolean) | Confirms ISO certification without seeing audit doc |
| **Bidding Close** | Officer | None | Status Transition (BiddingClosed) | Intake window is closed |
| **Award & Settlement** | Officer | Winning Bidder Witness | Winner ID, Winning Price | Winning price disclosed; **competitor bids remain hidden forever** |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v22+
- **Docker**: For running local Midnight Proof Server (`midnightntwrk/proof-server:latest`)
- **WSL (Ubuntu)**: For Compact compiler compilation (if modifying `.compact` circuits)
- **1AM Wallet or Lace**: Browser extension or mobile app on Preprod

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/RiyaGithub123/BidShield.git
cd BidShield

# Install contract dependencies
npm install --prefix contract

# Install frontend dependencies
npm install --prefix frontend
```

### 2. Start Local Proof Server
```bash
docker compose up -d proof-server
```

### 3. Run Unit Tests (12/12 Tests Passing)
```bash
npm run test:contract
```

### 4. Check Wallet & Fund via Preprod Faucet
```bash
npm run check-balance
```
*Your wallet Bech32 address will be displayed. Fund it with test tokens from the [Midnight Preprod Faucet](https://midnight-tmnight-preprod.nethermind.dev).*

### 5. Deploy Contract to Midnight Preprod
```bash
npm run deploy:contract
```

### 6. Launch Frontend Dashboard
```bash
npm run dev:frontend
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚙️ Environment Variables Guide

Copy `.env.example` to `.env` before deploying:
```bash
cp .env.example .env
```

| Variable | Description | Where to Retrieve |
|---|---|---|
| `VITE_MIDNIGHT_NETWORK` | Target network (`preprod`) | Set to `preprod` for active testnet |
| `VITE_MIDNIGHT_RPC_URL` | Substrate node RPC | `https://rpc.preprod.midnight.network` |
| `VITE_INDEXER_URL` | Midnight GraphQL Indexer | `https://indexer.preprod.midnight.network/api/v4/graphql` |
| `VITE_INDEXER_WS_URL` | Indexer WebSocket subscription | `wss://indexer.preprod.midnight.network/api/v4/graphql/ws` |
| `PROOF_SERVER_URL` | Local ZK Prover endpoint | `http://127.0.0.1:6300` (from Docker) |
| `VITE_CONTRACT_ADDRESS` | Deployed contract address | Output from `npm run deploy:contract` |
| `WALLET_SEED` | BIP-39 24-word recovery phrase | Generated via `check-balance.ts` in `.midnight-state.json` |

---

## 🌐 Community & Links

- **GitHub**: [https://github.com/RiyaGithub123/BidShield](https://github.com/RiyaGithub123/BidShield)
- **Official Product X**: [@BidShieldApp](https://x.com/BidShieldApp)
- **Midnight Network**: [https://midnight.network](https://midnight.network)
- **Compact Documentation**: [https://docs.midnight.network](https://docs.midnight.network)

---

## 📄 License
This project is licensed under the **Apache 2.0 License**. See [LICENSE](LICENSE) for details.
