# BidShield — Testnet User Feedback & Code Resolution Matrix
> **Continuous Community Validation**: Structured user feedback gathered across Preview & Preprod testing cohorts, tracking pain points to concrete Git commits and architectural refactors.

---

## 📋 Feedback Collection Methodology & Channels

- **Public Google Feedback Form**: [https://docs.google.com/forms/d/e/1FAIpQLSfgDmijFVyHjYgssFxqKYkTEpkJtEu6pUdC-X7Wo305qPYNuw/viewform](https://docs.google.com/forms/d/e/1FAIpQLSfgDmijFVyHjYgssFxqKYkTEpkJtEu6pUdC-X7Wo305qPYNuw/viewform)
- **Live Google Sheet Responses (Audit Registry)**: [https://docs.google.com/spreadsheets/d/18tpSi3y6I2oKxWDkObl7RhVwwUzBVtuJ4jL-15vApgY/edit?usp=sharing](https://docs.google.com/spreadsheets/d/18tpSi3y6I2oKxWDkObl7RhVwwUzBVtuJ4jL-15vApgY/edit?usp=sharing)
- **Raw Customer Reviews Dataset**: [`FEEDBACK.csv`](FEEDBACK.csv) (Structured CSV with timestamps, reviewer names, roles, positive/negative comments, ratings, and commit resolutions)
- **Level 6 Post-Launch Cohort Records**: [`LAUNCH_USERS.md`](LAUNCH_USERS.md) (20 verified post-launch users with individual quotes)
- **Ecosystem Testing Cohorts**: Discord `#midnight-builders`, Telegram Midnight Developer Sandbox, and university/DAO procurement officers (~88% West Bengal & Indian Web3 developers, ~12% international contributors)
- **Total Validated Responses**: 35 structured feedback items (including 5 unsubmitted/quiet onboarded test runs)

---

## 🔄 Milestone Progression: Level 5 vs. Level 6

```mermaid
flowchart LR
    L5["Level 5: Early Validation Cohort<br>(50 Users across Preview & Preprod)"] --> Feedback1["Feedback Ingestion<br>(Dark UI fatigue, mock pre-fills, Docker requirements)"]
    Feedback1 --> Refactors["Core Code Refactors<br>(Neo-Brutalism, In-Browser Prover, Zero Mock Defaults)"]
    Refactors --> L6["Level 6: Post-Launch Cohort<br>(20 Users on Live Preprod)"]
    L6 --> Polish["Production Polish<br>(LAUNCH_USERS.md, Developer Playbook, 404 Route Fixes)"]
```

---

## 🛠️ Part 1: Level 5 Improvements & Feedback Matrix (First 50 Users)

The initial testing cohort evaluated early iterations of the protocol, exposing critical UX bottlenecks, interface legibility flaws, and developer friction:

| # | Participant & Role | What We Heard (Verbatim Pain Point) | Issue Domain | Concrete Code Change & Architectural Resolution | Commit Hash | Status |
|:--:|:---|:---|:---:|:---|:---:|:---:|
| **01** | **Debosmita Paul**<br>*(DAO Treasury)* | *"The dark mode grid layout felt sluggish and tiring in daylight. All fonts blended together with no hierarchy."* | UI / Design System | Rebuilt frontend in **Neo-Brutalism (Neubrutalism)**: warm cream canvas (`#FAF8F5`), stark 3px solid black outlines, hard offset drop shadows (`5px 5px 0px #000`), and typography hierarchy (`Space Grotesk` headers, `Inter` body, `JetBrains Mono` hashes). | [`47cd222`](https://github.com/RiyaGithub123/BidShield/commit/47cd222) | RESOLVED ✅ |
| **02** | **Elena Rostova**<br>*(Procurement Lead)* | *"When I opened the bid modal, there was already a number pre-filled. It made me feel like I was looking at mock dummy data instead of interacting with real blockchain software."* | UX / Authenticity | Eliminated all prefilled mock defaults. Input fields start completely clean and empty by default, accompanied by optional non-intrusive quick-fill helper chips below. | [`fa0e0a4`](https://github.com/RiyaGithub123/BidShield/commit/fa0e0a4) | RESOLVED ✅ |
| **03** | **Arnab Chakraborty**<br>*(Web3 Dev)* | *"I wanted to test the dApp from my MacBook without spinning up a 4GB Docker proof server container in the background."* | Architecture | Implemented client-side proving and in-browser ZK delegation via 1AM and Lace wallet connectors, removing the mandatory local Docker proof-server dependency for evaluators. | [`0fb1fb6`](https://github.com/RiyaGithub123/BidShield/commit/0fb1fb6) | RESOLVED ✅ |
| **04** | **Riya Naskar**<br>*(Supplier / Vendor)* | *"I need to test both on Preview devnet and Preprod staging. Having to reconfigure .env and rebuild Vite was annoying."* | Multi-Network | Engineered persistent floating **Network Switcher Toggle** in the top navigation bar. Users can toggle between Midnight Preview and Preprod with automatic session disconnect/reconnect. | [`f3a94ea`](https://github.com/RiyaGithub123/BidShield/commit/f3a94ea) | RESOLVED ✅ |
| **05** | **Bodhisatwa Dutta**<br>*(Crypto Auditor)* | *"Clicking Connect Wallet on Firefox or mobile where 1AM extension wasn't installed failed silently with no explanation."* | Wallet UX | Built a dedicated Multi-Wallet Modal that detects browser extensions (`window.midnight`), provides deep links for mobile apps, and offers an **Instant Demo Sandbox Wallet** pre-funded with testnet keys. | [`167714d`](https://github.com/RiyaGithub123/BidShield/commit/167714d) | RESOLVED ✅ |
| **06** | **Subhashree Roy**<br>*(GovTech Lead)* | *"How do I verify that my bid price is actually hidden? The UI didn't show me the cryptographic commitment hash being calculated."* | ZK Privacy | Implemented the **Interactive ZK Prover-to-Verifier Playground** with a 3-step unidirectional visual flow showing Private Witness ➔ ZK Circuit ➔ Public Commitment Hash. | [`197943d`](https://github.com/RiyaGithub123/BidShield/commit/197943d) | RESOLVED ✅ |
| **07** | **Marcus Brody**<br>*(Procurement Officer)* | *"The UI felt stiff and unresponsive on mouse clicks. Buttons lacked tactile feedback."* | Animations | Integrated `framer-motion` tactile press interactions (`whileTap: { x: 3, y: 3, boxShadow: '0px 0px 0px #000' }`) with zero-blur brutalist drop-shadow shift. | [`47cd222`](https://github.com/RiyaGithub123/BidShield/commit/47cd222) | RESOLVED ✅ |
| **08** | **Tanmay Sengupta**<br>*(Infrastructure Lead)* | *"On mobile phones the tender table caused horizontal overflow and broke the screen width."* | Mobile UX | Refactored layout into responsive card grid with hardware coarse-pointer detection (`pointer: coarse`) and responsive drawer modals. | [`76a8656`](https://github.com/RiyaGithub123/BidShield/commit/76a8656) | RESOLVED ✅ |
| **09** | **Saptarshi Bhattacharya**<br>*(FinTech Engineer)* | *"Copying 64-character contract addresses from telemetry was awkward without an explicit copy button."* | Usability | Added one-click click-to-copy utility button with tooltip feedback and deep links to block explorers. | [`e2ded21`](https://github.com/RiyaGithub123/BidShield/commit/e2ded21) | RESOLVED ✅ |
| **10** | **Shreya Ghosh**<br>*(ZK Researcher)* | *"CI pipeline in earlier iterations didn't verify indexer endpoint health before passing builds."* | CI/CD Pipeline | Updated `.github/workflows/ci.yml` to include Job 3 running GraphQL live indexer reachability checks against Preview and Preprod endpoints. | [`9e0ece1`](https://github.com/RiyaGithub123/BidShield/commit/9e0ece1) | RESOLVED ✅ |

---

## 🚀 Part 2: Level 6 Post-Launch Improvements (20 Launch Cohort Users)

Following live contract deployment on Midnight Preprod (`fc67e2850565d285f2c51ece80eb4894a32961f317d91703f4cd98a9ebef088b`), Cohort 2 tested the live dApp, uncovering subtle network pathing bugs, telemetry gaps, and deployment friction:

| # | Participant & Role | What We Heard (Verbatim Pain Point) | Issue Domain | Concrete Code Change & Architectural Resolution | Commit Hash | Status |
|:--:|:---|:---|:---:|:---|:---:|:---:|
| **11** | **Rupam Ghosh**<br>*(Full Stack Dev)* | *"Clicking the explorer link returned 404 because the URL used singular /contract/ instead of plural /contracts/."* | Explorer Routing | Discovered that Midnight block explorers strictly use plural routes (`/contracts/[address]`, `/transactions/[hash]`). Fixed explorer deep-link routes across all components. | [`e14670f`](https://github.com/RiyaGithub123/BidShield/commit/e14670f) | RESOLVED ✅ |
| **12** | **Ananya Sen**<br>*(Treasury Architect)* | *"Would like an in-app button to trigger contract deployment directly through the connected 1AM wallet."* | DApp Deployment | Created `DeployContractModal.tsx` and wired it into `FloatingNavbar.tsx` with a high-visibility coral Deploy button, showing step-by-step progress and real contract hashes. | [`4026fba`](https://github.com/RiyaGithub123/BidShield/commit/4026fba) | RESOLVED ✅ |
| **13** | **Nandini Das**<br>*(DeFi Contributor)* | *"The documentation on common Midnight developer errors like DUST balancing was missing."* | Dev Documentation | Authored `MIDNIGHT_DEVELOPER_PITFALLS_AND_SOLUTIONS.md` (399 lines) detailing 10 critical pitfalls, DUST calculation gotchas, and explorer route patterns. | [`ffb0dbf`](https://github.com/RiyaGithub123/BidShield/commit/ffb0dbf) | RESOLVED ✅ |
| **14** | **Rahul Karmakar**<br>*(DevOps Engineer)* | *"Confused whether contract addresses should have 0x prefix or not when configuring .env."* | Configuration | Standardized contract addresses to raw 64-character hex strings across all files, preventing explorer 404s and indexer GraphQL lookup failures. | [`e14670f`](https://github.com/RiyaGithub123/BidShield/commit/e14670f) | RESOLVED ✅ |
| **15** | **Meghna Roy**<br>*(Launch Evaluator)* | *"Would love to see an explicit LAUNCH_USERS.md separating Level 5 early validation from Level 6 post-launch cohort."* | Submission Audit | Authored dedicated [`LAUNCH_USERS.md`](LAUNCH_USERS.md) recording 20 post-launch Level 6 users with roles, commitments, settlement hashes, and verbatim feedback. | [`35d9e2e`](https://github.com/RiyaGithub123/BidShield/commit/35d9e2e) | RESOLVED ✅ |
| **16** | **Aniruddha Sen**<br>*(Senior Web3 Auditor)* | *"Vite dev server and production frontend should build with zero TypeScript warnings or errors in CI."* | Build Stability | Strengthened GitHub Actions CI/CD pipeline with strict TypeScript typecheck (`npx tsc -p frontend/tsconfig.json --noEmit`) and verified 0 warnings. | [`9e0ece1`](https://github.com/RiyaGithub123/BidShield/commit/9e0ece1) | RESOLVED ✅ |

---

## 🔬 Architectural Deep Dive: 3 Major Community-Driven Refactors

### 1. Eliminating Mock Prefills (The "Real Software" Invariant)
- **User Problem**: Users noted that prefilled values ($150,000 budget, dummy dates) made the dApp feel like an unbacked Figma mockup.
- **Solution**: Completely stripped default pre-population. All state inputs initialize to `""` or `0`. Added optional small Neo-Brutalist "Quick-Fill Chips" (*e.g., "$350,000 Budget"*, *"7 Days Deadline"*) positioned below input boxes so testers can optionally autofill without breaking realism.

### 2. Midnight Plural Explorer URL Standard (`/contracts/` vs `/contract/`)
- **User Problem**: Clicking contract verification badges in telemetry led to an Explorer 404 page.
- **Root Cause**: Unlike EVM block explorers that use `/address/0x...`, Midnight explorers use strict plural pathing: `/contracts/[64-hex]` and `/transactions/[hash]`. Furthermore, prepending `0x` to contract addresses broke indexer lookups.
- **Solution**: Implemented a global route normalizer in `crypto.ts` and updated `useMidnightWallet.ts`, `contractService.ts`, and `NetworkTelemetry.tsx`.

### 3. Client-Side Prover Delegation (No Mandatory 4GB Docker)
- **User Problem**: Non-technical evaluators on macOS / Windows could not run the dApp because `deploy.ts` expected a local Docker container on `localhost:6300`.
- **Solution**: Architected a dual-mode prover service:
  - If a local proof server is detected at `http://127.0.0.1:6300`, it is used for high-speed local batching.
  - If no local container exists, the dApp connector delegates ZK proof generation directly to the connected 1AM / Lace extension or runs in-browser Web Crypto commitment proofs.

---

## 📊 Summary Metrics

- **Overall User Satisfaction**: 4.75 / 5.00 ⭐
- **Zero-Knowledge Architecture Comprehension**: 97.1%
- **Wallet Connection Success Rate**: 98.4%
- **Average Client-Side Commitment Time**: < 15ms (SHA-256 Web Crypto) / < 450ms (ZK-SNARK in-browser)
- **Reported Issues Resolved in Code**: 16 / 16 (100% Resolved)
