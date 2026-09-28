# BidShield — Simple Arrow-by-Arrow Video Recording Guide 🎥

> **Format**: Pure physical mouse actions, button clicks, and arrow sequences (`➔`). No narration text. Includes demonstration of all 5 Zero-Knowledge circuits.

---

## 🧭 Master Recording Flowchart

```
Start at http://localhost:5173/ (or Vercel deployment)
       │
       ▼
Move to top right ➔ Click [🌐 Network ▼] ➔ Click [Preprod Testnet] ➔ Hover Telemetry Strip
       │
       ▼
Move to top right ➔ Click [Connect Wallet] (mint green) ➔ Click [Approve] in 1AM Wallet
       │
       ▼
Move to top navbar ➔ Click [Circuit Docs]
       │
       ├─➔ Click [1. initializeProcurement] ➔ View inputs & Compact code
       ├─➔ Click [2. submitSealedBid] ➔ View private witnesses ➔ Click [Copy Code]
       ├─➔ Click [3. verifyCompliance] ➔ View persistent hash accreditation
       ├─➔ Click [4. closeBidding] ➔ View deadline enforcement
       └─➔ Click [5. awardProcurement] ➔ View selective disclosure
       │
       ▼
Move to top navbar ➔ Click [Tenders] (returns to tender grid)
       │
       ▼
Move to top right ➔ Click [✨ Publish RFP] ➔ Type Title ➔ Type Budget "500000" ➔ Click [Publish Procurement RFP ➔]
       │
       ▼
Move to first tender card ➔ Click [🔒 Submit Sealed Bid] ➔ Type "420000" ➔ Click [↻] Salt ➔ Point to 32-Byte Hash ➔ Click [Submit Sealed Bid ➔]
       │
       ▼
Move to tender card ➔ Click [✓ Verify Compliance] ➔ Click [ISO-27001 Accredited] chip ➔ Click [Verify Credential in Zero-Knowledge ➔]
       │
       ▼
Move to top navbar ➔ Click [Awarded] ➔ Point to winning price ($168,000) ➔ Point to "Losing Bids Remain Sealed Forever"
       │
       ▼
Scroll to Footer ➔ Hover GitHub link ➔ Hover Preprod Explorer link ➔ Stop recording! 🏁
```

---

## 🎬 Step-by-Step Mouse Action Guide

### STEP 1: Homepage & Hero Banner
`Open browser at http://localhost:5173/ (or https://bid-shield-frontend.vercel.app/) ➔ Move mouse to center over BidShield Hero banner ➔ Hover cursor over BidShield logo and "Compare Bids Without Exposing the Bids"`

---

### STEP 2: Switch Network to Preprod
`Move mouse to top right corner of navbar ➔ Click [🌐 Network ▼] dropdown ➔ Click [Preprod Testnet] ➔ Move mouse down to telemetry strip ➔ Point cursor at block height (#2,690,000+) and contract address [fc67e285...]`

---

### STEP 3: Connect 1AM Wallet
`Move mouse to top right corner ➔ Click [Connect Wallet] (mint green button) ➔ 1AM Wallet popup appears ➔ Click [Approve / 1AM Wallet] ➔ Move mouse back to top right ➔ Point cursor at connected green badge [mn_addr_preprod1... 🟢]`

---

### STEP 4: Inspect ALL 5 Zero-Knowledge Circuits
`Move mouse to top navbar ➔ Click [Circuit Docs] tab`
`➔ Page switches to Circuit Documentation Section`
`➔ Move mouse to left sidebar ➔ Click [1. initializeProcurement] ➔ Move mouse right to show Compact code & public inputs`
`➔ Move mouse to left sidebar ➔ Click [2. submitSealedBid] ➔ Move mouse right ➔ Point cursor at private witnesses: "bidAmount, salt" ➔ Click [Copy Code] button (turns green with checkmark)`
`➔ Move mouse to left sidebar ➔ Click [3. verifyCompliance] ➔ Move mouse right ➔ Point cursor at "Persistent hash accreditation proof"`
`➔ Move mouse to left sidebar ➔ Click [4. closeBidding] ➔ Move mouse right ➔ Point cursor at "Deadline enforcement invariant"`
`➔ Move mouse to left sidebar ➔ Click [5. awardProcurement] ➔ Move mouse right ➔ Point cursor at "Selective disclosure & winning supplier reveal"`
`➔ Move mouse back to top navbar ➔ Click [Tenders] tab to return to active tenders`

---

### STEP 5: Publish a Procurement RFP (Buyer Flow)
`Move mouse to top right navbar ➔ Click [✨ Publish RFP] button`
`➔ Publish modal opens on screen`
`➔ Move mouse to [Tender Title] box ➔ Click ➔ Type: "Enterprise Cloud Security & ZK Auditing"`
`➔ Move mouse to [Issuing Organization] box ➔ Click ➔ Type: "Midnight Web3 Consortium"`
`➔ Move mouse to [Ceiling Budget ($)] box ➔ Click ➔ Type: "500000"`
`➔ Move mouse to [Submission Window (Days)] box ➔ Click ➔ Type: "7"`
`➔ Move mouse to bottom of modal ➔ Click [Publish Procurement RFP ➔] (yellow button)`
`➔ Modal closes ➔ Green toast appears: "Procurement RFP Published!" ➔ Point cursor at newly created tender card at top of grid`

---

### STEP 6: Submit Confidential Sealed Bid (Supplier Flow)
`Move mouse to the first tender card in grid ➔ Click [🔒 Submit Sealed Bid] button`
`➔ Submit Bid modal opens`
`➔ Move mouse to [Bid Amount ($)] box ➔ Click ➔ Type: "420000"`
`➔ Move mouse to salt field ➔ Click [↻] (Regenerate Salt icon) twice`
`➔ Move mouse down to [Real-Time Cryptographic Commitment Preview] ➔ Point cursor at 32-byte SHA-256 hash commitment`
`➔ Move mouse to bottom of modal ➔ Click [Submit Sealed Bid to Midnight ➔] (yellow button)`
`➔ Modal closes ➔ Green toast appears: "Confidential Sealed Bid Submitted!" ➔ Point cursor at tender card showing bid count incremented`

---

### STEP 7: Prove Compliance in Zero-Knowledge
`Move mouse to tender card ➔ Click [✓ Verify Compliance] button`
`➔ Compliance modal opens`
`➔ Move mouse to quick chips ➔ Click [ISO-27001 Accredited] chip`
`➔ Move mouse to bottom of modal ➔ Click [Verify Credential in Zero-Knowledge ➔] (yellow button)`
`➔ Modal closes ➔ Green toast appears: "Accreditation Verified in ZK!" ➔ Point cursor at green verified badge on card`

---

### STEP 8: View Awarded Tender & Selective Disclosure
`Move mouse to top navbar ➔ Click [Awarded] tab`
`➔ Page scrolls down to Awarded Tender Section`
`➔ Point cursor at winning supplier address badge`
`➔ Point cursor at winning settled price ($168,000)`
`➔ Point cursor at red badge: "Losing Bids Remain Sealed Forever"`

---

### STEP 9: Footer Links & Verification
`Scroll page down to bottom footer`
`➔ Move mouse to [GitHub Repository] link ➔ Hover`
`➔ Move mouse to [Preprod Contract Explorer] link ➔ Hover`
`➔ Move mouse to [Live Community Feedback Sheet] link ➔ Hover`
`➔ Stop recording! 🎬`
