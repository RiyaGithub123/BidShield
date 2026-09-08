# BidShield Zero-Knowledge Privacy Model & Cryptographic Guarantees

## 1. Threat Model & Adversarial Analysis

BidShield is designed under the assumption of **untrusted network observers, curious procurement officers, and malicious competitors**:

| Adversary | Objective | BidShield Mitigation |
|---|---|---|
| **Competing Supplier** | Learn competitor pricing to undercut by $1 | Bid prices exist only in client RAM witnesses. The ledger receives only random salted hash commitments. |
| **Procurement Officer** | Collude with favored supplier or leak incoming bids | Bids cannot be decrypted by the officer before or during the bidding window because no decryption key exists. |
| **Public Blockchain Observer** | Monitor transaction patterns & balances | Midnight uses Zswap shielded keys and private state providers (`@midnight-ntwrk/midnight-js-level-private-state-provider`). |
| **Malicious Bidder** | Submit fake, zero, or negative bids to disrupt the auction | Compact circuit assertion `assert(privateBid > 0)` and `assert(awardedPrice <= ceilingBudget)` enforced by ZK SNARKs. |

---

## 2. Cryptographic Commitment Scheme

BidShield employs a **Hiding and Binding Commitment Scheme**:

$$\text{Commitment} = \mathcal{H}(\text{TenderID} \parallel \text{BidAmount} \parallel \text{Salt} \parallel \text{BidderID})$$

Where:
- $\mathcal{H}$ is SHA-256 (or Midnight's `persistentHash` / Poseidon hash in native circuits).
- $\text{Salt} \in \{0, 1\}^{128}$ is high-entropy pseudo-random noise generated via Web Crypto API.
- **Computationally Hiding**: Given the commitment hash $C$, it is computationally infeasible for any observer to determine $\text{BidAmount}$.
- **Computationally Binding**: The supplier cannot open the commitment to any different bid amount than the one originally proven.

---

## 3. Privacy Invariants Tested On-Chain

The test suite in `contract/test/bidshield.test.ts` formally tests and guarantees:
1. **Invariant 1 (Witness Seclusion)**: Private bid values never leak into the ledger object or queryable state during active bidding.
2. **Invariant 2 (Unsuccessful Bid Confidentiality)**: Unsuccessful competitor bids are never revealed, even after the contract is awarded and settled.
3. **Invariant 3 (Zero-Knowledge Accreditation)**: Supplier compliance secrets are verified via hash matching without disclosing the confidential licensing document.
