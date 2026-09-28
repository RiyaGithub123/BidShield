# BidShield — Official YouTube Demo Video Recording Script 🎥

**Project**: BidShield — Confidential Sealed-Bid Procurement & Reverse Auctions on Midnight Network  
**Target Audience**: Midnight Builder Challenge Mentors, Evaluators, and Web3 Enterprise Developers  
**Estimated Duration**: 3 to 4 Minutes  
**Resolution**: 1080p or 4K Full Screen (Browser at `http://localhost:5173/`)  
**Theme**: High-Contrast Neo-Brutalist Web3 Dark/Light UI  

---

## 🎬 Quick Preparation Checklist Before Recording

1. Open your browser at **`http://localhost:5173/`**.
2. Have your **1AM Wallet** (or Lace Midnight) browser extension installed and pinned in Chrome.
3. Keep the page at 100% zoom (clean high-DPI view).
4. Have your microphone ready. Speak clearly, confidently, and enthusiastically!

---

## 📋 Scene-by-Scene Click & Narration Guide

### Scene 1: Introduction & The Core Problem (0:00 – 0:40)
* **On Screen**: Start on the Homepage (`http://localhost:5173/`) showing the Neo-Brutalist Hero section with the BidShield Logo, badges, and headline: *"Compare Bids Without Exposing the Bids"*.
* **Action**: Gently scroll down slightly to show the Live Telemetry bar and the architecture visualizer, then scroll back to top.
* **What to Say (Narration)**:
> *"Hello Midnight team and evaluators! Welcome to the official demonstration of **BidShield** — an enterprise-grade confidential sealed-bid procurement and reverse auction protocol built on the **Midnight Network**.*
>
> *In traditional public blockchains like Ethereum or Solana, all transactions are completely transparent. If an organization runs a procurement RFP or reverse auction, competing suppliers can inspect each other’s bids in the mempool or on-chain, leading to front-running, price fixing, and compromised profit margins.*
>
> *BidShield solves this fundamental flaw using Midnight's zero-knowledge Compact smart contracts. Suppliers submit confidential sealed bids; the circuit verifies all constraints in local private RAM; and only the winning outcome is settled on-chain without ever leaking competing prices or trade secrets."*
* **Background Mechanism**: Explain that Midnight uses dual-state architecture: private client RAM + public consensus ledger.

---

### Scene 2: Live Network Telemetry & Multi-Network Switching (0:40 – 1:05)
* **On Screen**: Hover over the **Network Switcher** in the top navbar (labeled `PREPROD` or `PREVIEW`).
* **Action 1**: Click the **Network Switcher** dropdown in the top navbar.
* **Action 2**: Click **Preprod Testnet** (or toggle between Preview and Preprod).
* **Action 3**: Point your cursor at the **Live Telemetry Banner** below the hero section.
* **What to Say (Narration)**:
> *"Let’s look at the top navigation. BidShield features full multi-network dual connectivity for both Midnight Preview and Preprod testnets.*
>
> *Right here in our live telemetry panel, you can see our real-time connection to the Midnight Preprod GraphQL indexer at block height over 2.6 million, with an average latency of under 80 milliseconds. Most importantly, notice our verified contract address `fc67e285...` deployed live on Preprod with over 75 verified on-chain interactions."*
* **Background Mechanism**: Point out that the frontend is directly polling `https://indexer.preprod.midnight.network/api/v4/graphql` without any local Docker daemon required on client machines.

---

### Scene 3: Seamless Wallet Connection (1:05 – 1:30)
* **On Screen**: The top-right corner of the navbar.
* **Action 1**: Click the bright mint-green **`Connect Wallet`** button.
* **Action 2**: The wallet modal opens (or 1AM Wallet prompts). Click **1AM Wallet** (or select your account).
* **Action 3**: Watch the button transition into the formatted address badge (`mn_addr_preprod1...`) with a live pulsing green indicator.
* **Action 4**: Click the connected address badge to show the connected provider dropdown, showing your full unshielded address and provider name.
* **What to Say (Narration)**:
> *"Now let's connect our wallet. I click the **Connect Wallet** button. BidShield automatically detects installed Midnight-compatible wallets using the standard Midnight DApp connector standard.*
>
> *I select **1AM Wallet**, approve the connection, and instantly our account is linked with seamless session persistence. Notice that our wallet address is recognized and the green heartbeat confirms an active cryptographic session."*
* **Background Mechanism**: Emphasize that BidShield supports both modern unshielded and shielded address cascades.

---

### Scene 4: Zero-Knowledge Circuit Documentation Tab (1:30 – 2:05)
* **On Screen**: Center segmented filter in the navbar.
* **Action 1**: Click the **`Circuit Docs`** tab in the center navigation (or in the secondary filter group).
* **Action 2**: The view smoothly transitions to the **Zero-Knowledge Circuit Documentation** section.
* **Action 3**: Click through the 5 circuits in the left sidebar:
  1. `1. initializeProcurement`
  2. `2. submitSealedBid`
  3. `3. verifyCompliance`
  4. `4. closeBidding`
  5. `5. awardProcurement`
* **Action 4**: Click the **`Copy Code`** button on one of the Compact snippets to show interactive tactile feedback.
* **What to Say (Narration)**:
> *"Before submitting a bid, let's explore our new **Circuit Docs** tab. Here, evaluators can inspect all five zero-knowledge circuits powering BidShield in Midnight Compact.*
>
> *Each circuit defines strict public inputs and private witness functions. For instance, in `submitSealedBid`, the supplier's financial bid amount is evaluated strictly within private RAM using `witness getBidAmount()`. Only a 32-byte cryptographic SHA-256 commitment reaches consensus.*
>
> *All five circuits and their 12 mathematical invariants have been rigorously verified with Vitest tests, which you can run straight from the repo."*
* **Background Mechanism**: Direct evaluators to [`contract/src/bidshield.compact`](../contract/src/bidshield.compact) and [`docs/CIRCUITS.md`](CIRCUITS.md).

---

### Scene 5: Publishing an RFP / Procurement Tender (2:05 – 2:40)
* **On Screen**: Top navbar or filter controls.
* **Action 1**: Click the black **`Back to Tenders`** button (or click **All Tenders** in the navbar).
* **Action 2**: Click the black-and-white **`Publish RFP`** button in the top navbar.
* **Action 3**: The **Publish Procurement RFP** modal opens.
* **Action 4**: Fill in or show the fields:
  - Title: *Enterprise Cloud Security & Zero-Knowledge Auditing*
  - Organization: *Midnight Web3 Consortium*
  - Ceiling Budget: *$500,000*
  - Deadline: *7 Days*
  - Compliance Standard: *ISO-27001 / SOC2 Type II Certified*
* **Action 5**: Click the yellow **`Publish Procurement RFP`** button inside the modal.
* **Action 6**: Watch the success toast pop up: *"Procurement RFP Published!"* and see the new tender appear at the top of the grid.
* **What to Say (Narration)**:
> *"Now let's act as a buyer. As an enterprise procurement director, I click **Publish RFP**.*
>
> *I set the title, specify our organization, set a transparent ceiling budget of \$500,000, and designate our required compliance accreditation.*
>
> *When I click **Publish**, the contract's `initializeProcurement` circuit executes, locking in the parameters and opening the competitive sealed-bid window on-chain."*
* **Background Mechanism**: Explains Circuit 1 state transition from `Uninitialized (0)` to `BiddingOpen (1)`.

---

### Scene 6: Submitting a Confidential Sealed Bid (2:40 – 3:15)
* **On Screen**: The newly created or active tender card (e.g. *Zero-Knowledge Cryptographic Circuit Audit 2026*).
* **Action 1**: On the tender card, click the mint-green **`Submit Sealed Bid`** button.
* **Action 2**: The **Submit Confidential Sealed Bid** modal appears.
* **Action 3**: Enter a bid amount, e.g. **`420000`** (\$420,000).
* **Action 4**: Notice the **Cryptographic Salt** input has a random 128-bit hex string pre-generated. Click the **Regenerate Salt** icon to show CSPRNG entropy.
* **Action 5**: Look at the **Real-Time Cryptographic Commitment Preview** box at the bottom of the modal: it displays the computed 32-byte SHA-256 hash.
* **Action 6**: Click the yellow **`Submit Sealed Bid to Midnight`** button.
* **Action 7**: Watch the success notification toast: *"Confidential Sealed Bid Submitted! ZK commitment broadcasted to PREPROD ledger. Bid amount is 100% secret."*
* **What to Say (Narration)**:
> *"Now let's switch hats and become a competing supplier. I want to win this RFP, but I cannot let my competitors see my quote of \$420,000.*
>
> *I click **Submit Sealed Bid**. I enter my confidential offer of \$420,000. BidShield generates a high-entropy 128-bit cryptographic salt using the Web Crypto API.*
>
> *Notice this box below: this 32-byte hash commitment is what actually gets written to the blockchain. My financial figure of \$420,000 is never exposed on the network. I click **Submit**, and the `submitSealedBid` circuit increments the tender's bid count while preserving absolute privacy."*
* **Background Mechanism**: Explain that even if competitors inspect the Substrate block, they only see the hash commitment, making price deduction mathematically impossible.

---

### Scene 7: Zero-Knowledge Regulatory & ISO Compliance Verification (3:15 – 3:45)
* **On Screen**: The tender card.
* **Action 1**: Click the blue **`Verify Compliance`** button on the tender card.
* **Action 2**: The **Zero-Knowledge Regulatory Compliance** modal opens.
* **Action 3**: Click the quick-fill chip **`ISO-27001 Accredited`** (or enter a credential token).
* **Action 4**: Click **`Verify Credential in Zero-Knowledge`**.
* **Action 5**: Watch the green verified checkmark appear with the toast: *"Accreditation Verified in ZK!"*.
* **What to Say (Narration)**:
> *"Enterprise procurement requires strict regulatory compliance. Normally, suppliers must email sensitive PDF certificates or trade secrets to buyers.*
>
> *With BidShield's `verifyCompliance` circuit, suppliers prove possession of their ISO-27001 or SOC2 credential in zero-knowledge. I enter our credential token, click verify, and the circuit confirms our qualification without revealing a single confidential business document."*
* **Background Mechanism**: Explains Circuit 3 hash attestation against the tender's public standard hash.

---

### Scene 8: Awarding the Tender with Selective Disclosure (3:45 – 4:15)
* **On Screen**: Filter by clicking **Awarded** (or select a closed tender).
* **Action 1**: On a closed tender or the awarded card, show the **`Awarded Contract`** badge.
* **Action 2**: Show the winning supplier address and the awarded price ($168,000 or winning amount).
* **Action 3**: Point out the privacy guarantee callout: *"Losing Bids Remain Sealed Forever"*.
* **What to Say (Narration)**:
> *"Finally, once the deadline passes, the evaluation phase begins. When the buyer awards the procurement through `awardProcurement`, BidShield applies **Selective Disclosure**.*
>
> *Only the winning supplier and winning contract amount are published on the ledger. All unsuccessful bids from competing suppliers remain sealed in zero-knowledge forever! Suppliers can compete aggressively without fear of exposing their baseline costs to future clients.*
>
> *Every single step is backed by our dual testnet deployments on Preprod and Preview, an automated GitHub CI/CD pipeline, and 75 verified on-chain participants recorded in our documentation."*

---

### Scene 9: Closing & Call to Action (4:15 – 4:30)
* **On Screen**: Scroll down to the Footer showing the GitHub, X/Twitter, Google Survey, and Live Audit Sheet links.
* **Action**: Wave cursor over the GitHub and Live Audit Sheet links.
* **What to Say (Narration)**:
> *"Thank you for watching! BidShield is 100% open-source under Apache 2.0. Check out the links below in the description to explore our GitHub repository, read the circuit specs, and view our live testnet transactions.*
>
> *BidShield brings true enterprise-grade confidentiality to decentralized procurement on Midnight Network. Thank you!"*

---

## 🎯 Pro-Tips for Recording

1. **Keep the pace steady**: Don't rush through the modals. Let the viewer see the cryptographic hash update in real time.
2. **Highlight the Neo-Brutalist design**: Point out how crisp and accessible the UI feels compared to typical clunky Web3 dApps.
3. **No Docker needed**: Mention that evaluators can clone and run `npm run dev --prefix frontend` immediately in under 3 seconds!
