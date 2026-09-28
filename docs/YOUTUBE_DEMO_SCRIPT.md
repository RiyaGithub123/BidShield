# BidShield — Exact Frontend Click-by-Click Recording Guide 🎥

> **Verified Against Frontend Codebase**: Every single button, chip, tab, and input in this guide matches the exact labels and layout rendered in the application.  
> **Format**: Pure arrow-by-arrow (`➔`) physical actions. No narration / speech text. Covers all 5 Midnight Compact Zero-Knowledge circuits.

---

## 🧭 Master Action Flowchart

```
Open http://localhost:5173/ (or https://bid-shield-frontend.vercel.app/)
       │
       ▼
[Top-Right Navbar] Click [🌐 PREVIEW ▼] or [🌐 PREPROD ▼] ➔ Click [Preprod Testnet]
       │
       ▼
[Top-Right Navbar] Click [Connect Wallet] (mint green) ➔ Click [Instant Demo Sandbox] (or 1AM Approve)
       │
       ▼
[Center Navbar] Click [Circuit Docs]
       │
       ├─➔ [Left List] Click [1. initializeProcurement] ➔ [Right Panel] View Public Inputs & Compact Code
       ├─➔ [Left List] Click [2. submitSealedBid] ➔ [Right Panel] View Private Witnesses ➔ Click [Copy Code]
       ├─➔ [Left List] Click [3. verifyCompliance] ➔ [Right Panel] View Accreditation Hash Check
       ├─➔ [Left List] Click [4. closeBidding] ➔ [Right Panel] View Deadline Guard Assertion
       └─➔ [Left List] Click [5. awardProcurement] ➔ [Right Panel] View Selective Disclosure Invariant
       │
       ▼
[Circuit Docs Header] Click [← Back to Tenders]
       │
       ▼
[Top-Right Navbar] Click [✨ Publish RFP] (black/primary button)
       │
       ▼
[Modal] Click [Fill RFP Template] chip ➔ Click [Publish RFP Tender] (yellow button)
       │
       ▼
[First Tender Card] Click [Submit Sealed Bid] (yellow button)
       │
       ▼
[Modal] Click [75% Ceiling] chip (or type amount) ➔ Click [New Entropy] chip ➔ Point to [On-Chain Commitment Hash] ➔ Click [Seal & Submit Bid]
       │
       ▼
[Tender Card] Click [Prove ZK] (white button with shield icon)
       │
       ▼
[Modal] Click [Use Matching Standard Token] chip ➔ Click [Verify in Zero-Knowledge] (mint button) ➔ Click [Close]
       │
       ▼
[Center Navbar] Click [Awarded] ➔ Point cursor to [Awarded Winning Contract] box & "🔒 Competitor bids remain sealed forever"
       │
       ▼
Scroll to Bottom Footer ➔ Hover [GitHub] ➔ Hover [@BidShieldApp] ➔ Hover [View Live Audit Sheet] ➔ Finish! 🏁
```

---

## 🎬 Exact Mouse & Click Sequence (Step-by-Step)

### STEP 1: Homepage & Top Hero
`Open browser at http://localhost:5173/ (or https://bid-shield-frontend.vercel.app/)`  
`➔ Move mouse to center of page over Hero Section`  
`➔ Hover cursor over BidShield logo and title "Compare Bids Without Exposing the Bids"`  

---

### STEP 2: Switch Network to Preprod
`Move mouse to top-right corner of the navbar`  
`➔ Click [🌐 PREVIEW ▼] (or [🌐 PREPROD ▼]) network switcher button`  
`➔ Dropdown menu opens showing "Select Network"`  
`➔ Click [Preprod Testnet] button`  
`➔ Move mouse down to the live telemetry strip below the hero`  
`➔ Point cursor at "Block Height #2,69..." and Contract "fc67e285..."`  

---

### STEP 3: Connect Midnight Wallet
`Move mouse to top-right corner of the navbar`  
`➔ Click [Connect Wallet] (mint green button)`  
`➔ If 1AM Wallet popup appears ➔ Click [Approve]`  
`➔ (If "Midnight DApp Connector" modal appears on screen instead ➔ Click [Instant Demo Sandbox] mint green card)`  
`➔ Move mouse to top-right navbar ➔ Notice button now shows connected address badge: [mn_addr_preprod1... 🟢]`  

---

### STEP 4: Inspect ALL 5 Zero-Knowledge Circuits
`Move mouse to center navbar`  
`➔ Click [Circuit Docs] button (has book icon)`  
`➔ View opens the "Zero-Knowledge Circuit Documentation" section`  

* **Circuit 1:**  
  `Move mouse to left sidebar ➔ Click [1. initializeProcurement]`  
  `➔ Move mouse to right panel ➔ Hover over "Public Inputs (On-Chain Consensus)" and Compact code`  

* **Circuit 2:**  
  `Move mouse to left sidebar ➔ Click [2. submitSealedBid]`  
  `➔ Move mouse to right panel ➔ Point cursor at red text under "Private Witnesses (Client Local RAM Only)": "witness getBidAmount(): Uint<64>"`  
  `➔ Move mouse to code header ➔ Click [Copy Code] button (turns into green "Copied!" with checkmark)`  

* **Circuit 3:**  
  `Move mouse to left sidebar ➔ Click [3. verifyCompliance]`  
  `➔ Move mouse to right panel ➔ Point cursor at "expectedAccreditationHash" and "persistentHash(credentialSecret)"`  

* **Circuit 4:**  
  `Move mouse to left sidebar ➔ Click [4. closeBidding]`  
  `➔ Move mouse to right panel ➔ Point cursor at "assert(currentTimestamp >= submissionDeadline)"`  

* **Circuit 5:**  
  `Move mouse to left sidebar ➔ Click [5. awardProcurement]`  
  `➔ Move mouse to right panel ➔ Point cursor at "Privacy & Zero-Knowledge Guarantee: Selectively discloses ONLY the winning supplier and price"`  

`➔ Move mouse up to top banner ➔ Click [← Back to Tenders] button`  
`➔ Screen returns to the active Procurement Vault RFP grid`  

---

### STEP 5: Publish Procurement RFP (Buyer Flow)
`Move mouse to top-right navbar`  
`➔ Click [✨ Publish RFP] button`  
`➔ "Publish Procurement RFP" modal opens on screen`  
`➔ Move mouse down to the chip button ➔ Click [Fill RFP Template] chip`  
`➔ (Notice Title, Organization, Budget "500000", Window "7", and Standard auto-fill immediately!)`  
`➔ Move mouse to bottom-right of modal ➔ Click [Publish RFP Tender] (yellow button)`  
`➔ Modal closes ➔ Green toast pops up in top-right: "Procurement RFP Published!"`  
`➔ Point cursor at the newly added tender card at top of grid`  

---

### STEP 6: Submit Confidential Sealed Bid (Supplier Flow)
`Move mouse to the first open tender card in the grid`  
`➔ Click [Submit Sealed Bid] (yellow button with lock icon)`  
`➔ "Submit Confidential Sealed Bid" modal opens`  
`➔ Move mouse to "Quick presets:" ➔ Click [75% Ceiling ($...)] chip (or click input and type: "420000")`  
`➔ Move mouse to the right of "Cryptographic Salt Entropy" ➔ Click [New Entropy] chip button (salt refreshes)`  
`➔ Move mouse down to "On-Chain Commitment Hash (Public)" ➔ Point cursor at the real-time generated 32-byte hash (0x...)`  
`➔ Move mouse to bottom-right of modal ➔ Click [Seal & Submit Bid] (yellow button with lock icon)`  
`➔ Modal closes ➔ Green toast appears: "Confidential Sealed Bid Submitted!"`  
`➔ Point cursor at the tender card showing "Sealed Bids: ... Received"`  

---

### STEP 7: Prove Compliance in Zero-Knowledge
`Move mouse to the same tender card`  
`➔ Click [Prove ZK] (white button with shield icon at top-right of card actions)`  
`➔ "Prove Accreditation in ZK" modal opens`  
`➔ Move mouse to "Helper:" ➔ Click [Use Matching Standard Token] chip`  
`➔ (Notice "Private Supplier Accreditation Key *" auto-fills with matching standard)`  
`➔ Move mouse to bottom-right of modal ➔ Click [Verify in Zero-Knowledge] (mint green button with key icon)`  
`➔ Green verification banner appears inside modal: "ZK Compliance Verified! Mathematical proof valid!"`  
`➔ Move mouse to bottom-left of modal ➔ Click [Close] button`  
`➔ Modal closes`  

---

### STEP 8: View Awarded Tender & Selective Disclosure
`Move mouse to center navbar`  
`➔ Click [Awarded] filter button`  
`➔ Page scrolls down to the Awarded tender cards`  
`➔ Move mouse to the mint-green box: "Awarded Winning Contract"`  
`➔ Point cursor at the winning settled price (e.g. "$168,000")`  
`➔ Point cursor at the winning supplier address ("Supplier: mn_addr_...")`  
`➔ Point cursor at the bottom label: "🔒 Competitor bids remain sealed forever"`  

---

### STEP 9: Footer Links & Project Verification
`Scroll page down to the bottom footer`  
`➔ Move mouse to [GitHub] button ➔ Hover cursor`  
`➔ Move mouse to [@BidShieldApp] button (blue Twitter button) ➔ Hover cursor`  
`➔ Move mouse to [Open Feedback Form] (mint button) ➔ Hover cursor`  
`➔ Move mouse to [View Live Audit Sheet] (underlined link) ➔ Hover cursor`  
`➔ Move mouse to "Network Specs" box showing Contract "fc67e285..." ➔ Hover cursor`  
`➔ Stop recording! 🎬`  
