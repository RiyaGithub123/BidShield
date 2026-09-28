# BidShield — Exact Frontend Click-by-Click Recording Guide 🎥

> **Verified Live via Chrome DevTools**: Every single button, chip, tab, and modal in this guide matches the exact labels, colors, and layout rendered in the production application.  
> **Format**: Pure arrow-by-arrow (`➔`) physical actions. No speech/narration text. Covers all 5 Midnight Compact Zero-Knowledge circuits.

---

## 🧭 Master Recording Flowchart

```text
Open http://localhost:5173/ (or https://bid-shield-frontend.vercel.app/)
       │
       ▼
[Top-Right Navbar] Click [🌐 PREVIEW ▼] ➔ Click [Preprod Testnet] (button changes to [🌐 PREPROD ▼])
       │
       ▼
[Top-Right Navbar] Click [CONNECT WALLET] (mint green) ➔ Click [INSTANT DEMO SANDBOX] (or approve in 1AM Wallet)
       │
       ▼
[Center Navbar] Click [CIRCUIT DOCS]
       │
       ├─➔ [Left List] Click [1. initializeProcurement] ➔ [Right Panel] View Public Inputs & Compact Code
       ├─➔ [Left List] Click [2. submitSealedBid] ➔ [Right Panel] Point to red witness text ➔ Click [Copy Code]
       ├─➔ [Left List] Click [3. verifyCompliance] ➔ [Right Panel] View Accreditation Hash Check
       ├─➔ [Left List] Click [4. closeBidding] ➔ [Right Panel] View Deadline Guard Assertion
       └─➔ [Left List] Click [5. awardProcurement] ➔ [Right Panel] View Selective Disclosure Invariant
       │
       ▼
[Circuit Docs Top Banner] Click [← BACK TO TENDERS]
       │
       ▼
[Top-Right Navbar] Click [✨ PUBLISH RFP] (yellow button)
       │
       ▼
[Modal] Click [Fill RFP Template] chip ➔ Click [PUBLISH RFP TENDER] (yellow submit button)
       │
       ▼
[First Tender Card] Click [SUBMIT SEALED BID] (yellow button)
       │
       ▼
[Modal] Click [75% Ceiling ($...)] chip ➔ Click [New Entropy] chip ➔ Point to [On-Chain Commitment Hash] ➔ Click [SEAL & SUBMIT BID]
       │
       ▼
[Tender Card] Click [PROVE ZK] (white button with shield icon)
       │
       ▼
[Modal] Click [Use Matching Standard Token] chip ➔ Click [VERIFY IN ZERO-KNOWLEDGE] (mint green button) ➔ Click [CLOSE]
       │
       ▼
[Center Navbar] Click [AWARDED] ➔ Point cursor to [AWARDED WINNING CONTRACT] box & "🔒 Competitor bids remain sealed forever"
       │
       ▼
Scroll to Bottom Footer ➔ Hover [GITHUB] ➔ Hover [@BIDSHIELDAPP] ➔ Hover [OPEN FEEDBACK FORM] ➔ Stop recording! 🎬
```

---

## 🎬 Exact Mouse & Keyboard Sequence (Step-by-Step)

### STEP 1: Start on Home Screen
`Open browser at http://localhost:5173/ (or https://bid-shield-frontend.vercel.app/)`  
`➔ Point cursor at center title: "SEALED PROCUREMENT. VERIFIED OUTCOMES."`  
`➔ Hover cursor over the 3 interactive hero badges: [🔒 SEALED-BID RFP PROTOCOL] ➔ [🛡️ MIDNIGHT NETWORK] ➔ [🔮 ZK-SNARKS VERIFIED]`  

---

### STEP 2: Switch Network (Top-Right Navbar)
`Move mouse to top-right navbar ➔ Click [🌐 PREVIEW ▼] network switcher button`  
`➔ Dropdown menu opens showing "Select Network"`  
`➔ Click [Preprod Testnet] button`  
`➔ Notice button now changes to [🌐 PREPROD ▼]`  
`➔ Move mouse down to live telemetry strip ➔ Point cursor at "Block Height #2,69..." and verified contract "fc67e285..."`  

---

### STEP 3: Connect Wallet (Top-Right Navbar)
`Move mouse to top-right navbar ➔ Click [CONNECT WALLET] (mint green button)`  
`➔ "Midnight DApp Connector" modal opens on screen`  
`➔ Click the mint green card: [INSTANT DEMO SANDBOX] (or click [Browser Extension] / approve in 1AM Wallet)`  
`➔ Modal closes ➔ Notice top-right button now cleanly displays connected address: [ 🟢 MN_ADDR_... ▼ ]`  

---

### STEP 4: Inspect ALL 5 Zero-Knowledge Circuits (Center Navbar)
`Move mouse to center navbar ➔ Click [CIRCUIT DOCS] button`  
`➔ Zero-Knowledge Circuit Documentation view opens`  

* **Circuit 1:**  
  `Left list: Click [1. initializeProcurement] ➔ Right panel: View Public Inputs & Compact code`  

* **Circuit 2:**  
  `Left list: Click [2. submitSealedBid] ➔ Right panel: Point cursor at red text under "PRIVATE WITNESSES (CLIENT LOCAL RAM ONLY)": "witness getBidAmount(): Uint<64>"`  
  `➔ Right panel code header: Click [Copy Code] button (turns into green "Copied!" with checkmark)`  

* **Circuit 3:**  
  `Left list: Click [3. verifyCompliance] ➔ Right panel: View persistentHash accreditation assertion`  

* **Circuit 4:**  
  `Left list: Click [4. closeBidding] ➔ Right panel: View deadline enforcement guard`  

* **Circuit 5:**  
  `Left list: Click [5. awardProcurement] ➔ Right panel: View Selective Award Disclosure Invariant`  

`➔ Top yellow banner: Click [← BACK TO TENDERS] button`  
`➔ Screen returns to the active Procurement Vault RFP grid`  

---

### STEP 5: Publish RFP (Top-Right Yellow Button)
`Move mouse to top-right navbar ➔ Click [✨ PUBLISH RFP] (yellow button)`  
`➔ "Publish Procurement RFP" modal opens on screen`  
`➔ Move mouse down to the bottom chip ➔ Click [Fill RFP Template] chip`  
`➔ (Title, Organization, Budget "500000", Window "7", and Standard auto-fill immediately)`  
`➔ Click [PUBLISH RFP TENDER] (yellow submit button)`  
`➔ Modal closes ➔ Green toast notification pops up in top-right: "Procurement RFP Published!"`  
`➔ Point cursor at newly created tender card at top of grid`  

---

### STEP 6: Submit Sealed Bid (On First Tender Card)
`Move mouse to the first tender card in grid: "Zero-Knowledge Cryptographic Circuit Audit 2026"`  
`➔ Click [SUBMIT SEALED BID] (yellow button with lock icon)`  
`➔ "Submit Confidential Sealed Bid" modal opens`  
`➔ Under "Quick presets:" ➔ Click [75% Ceiling ($337,500)] chip (or type amount in box)`  
`➔ Next to "Cryptographic Salt Entropy" ➔ Click [New Entropy] chip button (salt regenerates)`  
`➔ Point cursor down at the live computed 32-byte hash under "ON-CHAIN COMMITMENT HASH (PUBLIC)"`  
`➔ Click [SEAL & SUBMIT BID] (yellow submit button with lock icon)`  
`➔ Modal closes ➔ Green toast pops up: "Confidential Sealed Bid Submitted!"`  
`➔ Point cursor at card showing "Sealed Bids: 5 Received"`  

---

### STEP 7: Prove Compliance (On First Tender Card)
`On the same tender card ➔ Click [PROVE ZK] (white button with shield icon)`  
`➔ "Prove Accreditation in ZK" modal opens`  
`➔ Under "Helper:" ➔ Click [Use Matching Standard Token] chip`  
`➔ (Private Supplier Accreditation Key auto-fills with matching standard)`  
`➔ Click [VERIFY IN ZERO-KNOWLEDGE] (mint green button with key icon)`  
`➔ Green verification banner pops up inside modal: "ZK Compliance Verified! Mathematical proof valid!"`  
`➔ Click [CLOSE] button at bottom left of modal`  
`➔ Modal closes`  

---

### STEP 8: View Awarded Tender (Center Navbar)
`Move mouse to center navbar ➔ Click [AWARDED] filter button`  
`➔ Page scrolls down to Awarded & Settled Contracts`  
`➔ Move mouse to the mint green box: [AWARDED WINNING CONTRACT $168,000]`  
`➔ Point cursor at the winner's address: "Supplier: mn_addr_..."`  
`➔ Point cursor at bottom note: "🔒 Competitor bids remain sealed forever"`  

---

### STEP 9: Footer Links & Network Specs (Bottom of Page)
`Scroll page down to bottom footer`  
`➔ Hover mouse over [GITHUB] button`  
`➔ Hover mouse over [@BIDSHIELDAPP] button (blue Twitter button)`  
`➔ Hover mouse over [OPEN FEEDBACK FORM] (mint green button)`  
`➔ Hover mouse over [View Live Audit Sheet] (underlined link)`  
`➔ Hover mouse over "NETWORK SPECS" box showing Contract "fc67e285..." (or "0794f000...")`  
`➔ Stop recording! 🎬`  
