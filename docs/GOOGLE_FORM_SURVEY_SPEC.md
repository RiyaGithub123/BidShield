# 📋 BidShield Community Feedback Survey — Google Form Specification
> **Instructions for Bishal / Project Lead**: Use this exact question breakdown to create the Google Form. Once created, connect it to a Google Sheet, and paste the shared links into `README.md` and `FEEDBACK.md`.

---

## 📌 Form Header Information

- **Form Title**: `BidShield — Confidential Procurement on Midnight Network: User Feedback Survey`
- **Form Description**:
  > Thank you for testing BidShield! BidShield is an enterprise-grade sealed-bid procurement and reverse auction platform built on Midnight Network using Compact zero-knowledge circuits.
  > 
  > This survey takes ~2 minutes. Your responses help us evaluate wallet connectivity, proving performance, and zero-knowledge privacy guarantees.

---

## 📝 Section 1: Tester Identity & Wallet Profile

### Question 1: Reviewer Name / Discord Handle
- **Type**: Short answer
- **Required**: Yes
- **Placeholder**: e.g., `Alex Vance / @alex_vance`

### Question 2: Your Midnight Wallet Address
- **Type**: Short answer
- **Required**: Yes
- **Help Text**: Paste your Midnight Bech32 address (`mn_addr_preprod1...` or `mn_addr_preview1...`) used for testing.
- **Validation**: Text containing `mn_addr_`

### Question 3: What is your primary role / background?
- **Type**: Multiple choice
- **Required**: Yes
- **Options**:
  - `Enterprise Procurement Lead / Officer`
  - `DAO Treasury / Grants Manager`
  - `Supplier / Vendor / Contractor`
  - `Smart Contract / Security Auditor`
  - `Web3 Developer / Midnight Builder`
  - `Other` (Write-in)

### Question 4: Which Midnight Testnet network did you use?
- **Type**: Multiple choice
- **Required**: Yes
- **Options**:
  - `Midnight Preprod (Primary Staging)`
  - `Midnight Preview (Developer Sandbox)`
  - `Both Networks (Tested Switcher Toggle)`

### Question 5: Which Wallet did you connect with?
- **Type**: Multiple choice
- **Required**: Yes
- **Options**:
  - `1AM Wallet (Chrome Extension)`
  - `1AM Wallet (Mobile via Deep-Link)`
  - `Lace Midnight Extension`
  - `Instant Demo Sandbox Wallet (In-Browser)`

---

## 🔐 Section 2: Zero-Knowledge Privacy & Procurement Experience

### Question 6: Which BidShield circuits / workflows did you interact with?
- **Type**: Checkboxes (Select all that apply)
- **Required**: Yes
- **Options**:
  - `Published a New Procurement Tender (initializeProcurement)`
  - `Submitted a Confidential Sealed Bid (submitSealedBid)`
  - `Verified ISO/SOC2 Compliance in ZK (verifyCompliance)`
  - `Closed Bidding Window Post-Deadline (closeBidding)`
  - `Awarded Winning Supplier & Disclosed Price (awardProcurement)`
  - `Explored Interactive ZK Prover-to-Verifier Playground`
  - `Tested In-DApp Contract Deployment Modal`

### Question 7: How clear was the separation between Private Client Witnesses and Public Ledger State?
- **Type**: Linear Scale (1 to 5)
- **Required**: Yes
- **Scale**: `1 (Completely Confusing) — 5 (Crystal Clear)`

### Question 8: How was your experience with Zero Mock Defaults (empty inputs with optional quick-fill chips)?
- **Type**: Multiple choice
- **Required**: Yes
- **Options**:
  - `Much better — feels like authentic production software`
  - `Good, quick-fill chips helped speed up testing`
  - `Neutral / No strong preference`
  - `I would prefer full automated pre-population`

---

## ⚡ Section 3: Performance, Usability & Constructive Criticism

### Question 9: How would you rate the responsiveness and tactile feedback of the Neo-Brutalism UI?
- **Type**: Linear Scale (1 to 5)
- **Required**: Yes
- **Scale**: `1 (Poor / Sluggish) — 5 (Exceptional / Tactile & Crisp)`

### Question 10: Did you encounter any error, lag, or unexpected behavior during your test run?
- **Type**: Checkboxes (Select all that apply)
- **Required**: No
- **Options**:
  - `None — Everything functioned smoothly`
  - `Wallet sync lag or unshielded balance delay`
  - `DUST fee calculation or coin balancing delay`
  - `Explorer link 404 or route navigation issue`
  - `Modal sizing or table display issue on mobile/tablet`
  - `Transaction timeout or network indexer delay`
  - `Other` (Write-in)

---

## 💬 Section 4: Qualitative Feedback & Feature Requests

### Question 11: What was the STRONGEST feature of BidShield?
- **Type**: Paragraph
- **Required**: Yes
- **Placeholder**: e.g., *"The assurance that competitor suppliers cannot inspect my price during active bidding."*

### Question 12: What was the biggest PAIN POINT, bug, or area for improvement?
- **Type**: Paragraph
- **Required**: Yes (encouraging constructive criticism)
- **Placeholder**: e.g., *"Please add automated currency conversion between USD and tNIGHT."*

### Question 13: Overall Protocol Rating:
- **Type**: Linear Scale (1 to 5)
- **Required**: Yes
- **Scale**: `1 (Poor) — 5 (Outstanding)`

---

## 🔗 How to Connect Google Form to Google Sheet (2 Steps):

1. In Google Forms, click on the **Responses** tab at the top.
2. Click the green **"Link to Sheets"** icon in the top right.
3. Select **"Create a new spreadsheet"** with name `BidShield Testnet Feedback Responses`.
4. Click **Create**.
5. Click **Share** (top-right of Sheet) $\to$ Change General Access to **"Anyone with the link can view"**.
6. Copy both the **Form link** and **Sheet link**, and paste them into `README.md` and `FEEDBACK.md`.
