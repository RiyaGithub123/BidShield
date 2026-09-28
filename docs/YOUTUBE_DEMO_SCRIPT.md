# BidShield — Simple Arrow-by-Arrow Video Recording Cheat Sheet 🎥

A dead-simple, step-by-step physical mouse action and narration guide for your YouTube demo recording.

---

## 🧭 Complete Click-by-Click Arrow Cheat Sheet

```
Start on Homepage (http://localhost:5173)
       │
       ▼
Move mouse to top right corner ➔ Click [🌐 Network ▼] ➔ Click [Preprod Testnet]
       │
       ▼
Move mouse to top right corner ➔ Click [Connect Wallet] (mint green) ➔ Click [Approve]
       │
       ▼
Move mouse to top navbar ➔ Click [Circuit Docs] ➔ Click [2. submitSealedBid] ➔ Click [Copy Code]
       │
       ▼
Move mouse to top navbar ➔ Click [Tenders] (returns to tender list)
       │
       ▼
Move mouse to top right navbar ➔ Click [✨ Publish RFP] ➔ Type Title ➔ Type Budget "500000" ➔ Click [Publish Procurement RFP ➔]
       │
       ▼
Move mouse to first tender card ➔ Click [🔒 Submit Sealed Bid] ➔ Type Amount "420000" ➔ Click [↻] (Salt) ➔ Click [Submit Sealed Bid to Midnight ➔]
       │
       ▼
Move mouse to tender card ➔ Click [✓ Verify Compliance] ➔ Click [ISO-27001] chip ➔ Click [Verify Credential in Zero-Knowledge ➔]
       │
       ▼
Move mouse to top navbar ➔ Click [Awarded] ➔ Point to winning price & "Losing Bids Remain Sealed Forever"
       │
       ▼
Scroll down to Footer ➔ Hover over GitHub & Explorer links ➔ Finish!
```

---

## 🎬 Step-by-Step Recording Actions & Exact Words to Say

### STEP 1: Homepage & Intro (0:00 - 0:25)
- **Mouse Action:**
  `Open browser at http://localhost:5173 ➔ Move mouse to center of screen over the BidShield Hero banner ➔ Hover over "Compare Bids Without Exposing the Bids"`
- **🗣️ What to Say:**
  > "Welcome to BidShield, a confidential sealed-bid procurement platform built on Midnight Network. On traditional blockchains, competing bids are public, leading to price-fixing and front-running. BidShield uses Midnight ZK circuits to keep all supplier bids 100% private in local RAM until award."

---

### STEP 2: Switch to Preprod Network (0:25 - 0:50)
- **Mouse Action:**
  `Move mouse to top right navbar ➔ Click [🌐 Network ▼] dropdown ➔ Click [Preprod Testnet] ➔ Hover over live telemetry strip showing block height #2.6M+`
- **🗣️ What to Say:**
  > "BidShield supports multi-network connectivity. In the top navbar, I click the network dropdown and select Preprod Testnet. The live telemetry strip updates in real time with our deployed contract fc67e285 at block height over 2.6 million."

---

### STEP 3: Connect 1AM Wallet (0:50 - 1:15)
- **Mouse Action:**
  `Move mouse to top right corner ➔ Click [Connect Wallet] (mint green button) ➔ Click [1AM Wallet / Approve] in extension popup ➔ See button turn into green address badge [mn_addr_preprod1... 🟢]`
- **🗣️ What to Say:**
  > "Next, I click Connect Wallet in the top right corner. BidShield connects directly to our 1AM Wallet via the Midnight DApp connector. The wallet connects instantly with active session persistence."

---

### STEP 4: Inspect Zero-Knowledge Circuit Docs (1:15 - 1:45)
- **Mouse Action:**
  `Move mouse to top navbar ➔ Click [Circuit Docs] tab ➔ Move mouse to left sidebar ➔ Click [2. submitSealedBid] ➔ Click [Copy Code] button (turns green) ➔ Move mouse back to top navbar ➔ Click [Tenders] tab`
- **🗣️ What to Say:**
  > "Now I click Circuit Docs in the top navbar. Here evaluators can inspect our 5 Midnight Compact circuits. In submitSealedBid, bid amounts are evaluated strictly inside local private witness RAM—only a 32-byte cryptographic hash commitment reaches the chain. Now I click Tenders to go back."

---

### STEP 5: Publish a Procurement RFP (Buyer Flow) (1:45 - 2:20)
- **Mouse Action:**
  `Move mouse to top right navbar ➔ Click [✨ Publish RFP] button ➔ Modal opens ➔ Click Title box ➔ Type: "Enterprise Cloud Security" ➔ Click Ceiling Budget box ➔ Type: "500000" ➔ Move mouse to bottom of modal ➔ Click [Publish Procurement RFP ➔] button ➔ See success notification popup`
- **🗣️ What to Say:**
  > "As an enterprise buyer, I click Publish RFP. I enter our tender title and set a ceiling budget of $500,000. When I click Publish, the initializeProcurement circuit locks the tender parameters into Midnight ledger state."

---

### STEP 6: Submit Confidential Sealed Bid (Supplier Flow) (2:20 - 3:00)
- **Mouse Action:**
  `Move mouse to the first tender card ➔ Click [🔒 Submit Sealed Bid] button ➔ Modal opens ➔ Click Bid Amount box ➔ Type: "420000" ➔ Click [↻] (Regenerate Salt icon) ➔ Point mouse to the 32-byte commitment hash preview at bottom ➔ Click [Submit Sealed Bid to Midnight ➔] (yellow button) ➔ Modal closes and tender shows bid count incremented`
- **🗣️ What to Say:**
  > "Now as a supplier, I click Submit Sealed Bid. I enter $420,000. Notice this 128-bit salt and the 32-byte commitment hash below. That cryptographic hash is the only data sent to the blockchain. My actual bid amount never leaves my computer. I click Submit, and the sealed bid is recorded in zero-knowledge."

---

### STEP 7: Zero-Knowledge Compliance Verification (3:00 - 3:30)
- **Mouse Action:**
  `Move mouse to tender card ➔ Click [✓ Verify Compliance] button ➔ Modal opens ➔ Click [ISO-27001 Accredited] quick chip ➔ Click [Verify Credential in Zero-Knowledge ➔] button ➔ See green verified badge`
- **🗣️ What to Say:**
  > "Suppliers can also prove compliance without leaking trade secrets. I click Verify Compliance, choose ISO-27001, and click Verify. The ZK circuit verifies our credentials mathematically on-chain without exposing private documents."

---

### STEP 8: Awarded Tender & Selective Disclosure (3:30 - 4:00)
- **Mouse Action:**
  `Move mouse to top navbar ➔ Click [Awarded] tab ➔ Page scrolls to awarded tender ➔ Point mouse to winning supplier address and winning price ($168,000) ➔ Point mouse to notice: "Losing Bids Remain Sealed Forever"`
- **🗣️ What to Say:**
  > "Finally, I click Awarded in the top nav. Here BidShield enforces Selective Disclosure: only the winning contractor and winning price are revealed. All losing bids remain sealed in zero-knowledge forever."

---

### STEP 9: Footer Links & Wrap Up (4:00 - 4:15)
- **Mouse Action:**
  `Scroll down to bottom footer ➔ Hover mouse over GitHub link ➔ Hover mouse over Preprod Explorer link ➔ Conclude video`
- **🗣️ What to Say:**
  > "BidShield is open-source under Apache 2.0 with 75 verified on-chain users. Check the GitHub and contract links in the description. Thank you for watching!"
