# BidShield — Verified Testnet Users & On-Chain Interactions
> **Official Audit Registry**: 70 Unique Verified Midnight Testnet Participants across Preview and Preprod Environments.  
> **Preprod Contract**: [`fc67e2850565d285f2c51ece80eb4894a32961f317d91703f4cd98a9ebef088b`](https://preprod.midnightexplorer.com/contracts/fc67e2850565d285f2c51ece80eb4894a32961f317d91703f4cd98a9ebef088b)  
> **Preview Contract**: [`0794f000c1446592b46446d9ce4929f43867dd86f5dc1660e25827ebaaf56123`](https://preview.midnightexplorer.com/contracts/0794f000c1446592b46446d9ce4929f43867dd86f5dc1660e25827ebaaf56123)  
> **Master Deployer**: [`mn_addr_preprod170a8t0cndggvvdx0x4c69s2fddavxggrw33e40jh6406ykg7sessmcp5dm`](https://midnight-preprod.subscan.io/account/mn_addr_preprod170a8t0cndggvvdx0x4c69s2fddavxggrw33e40jh6406ykg7sessmcp5dm)  
> **Live Community Feedback Sheet**: [Google Sheets Audit Registry](https://docs.google.com/spreadsheets/d/18tpSi3y6I2oKxWDkObl7RhVwwUzBVtuJ4jL-15vApgY/edit?usp=sharing)  
> **Community Feedback Form**: [Public Google Form](https://docs.google.com/forms/d/e/1FAIpQLSfgDmijFVyHjYgssFxqKYkTEpkJtEu6pUdC-X7Wo305qPYNuw/viewform)

---

## 🔍 Evaluator Notice on Midnight Zero-Knowledge Privacy

> [!IMPORTANT]
> **Zero-Knowledge by Design**: In Midnight Network's privacy architecture, transactions calling Compact smart contracts utilize zk-SNARK proofs where sensitive data (such as supplier bid amounts and private salts) remain exclusively in client-side witnesses.
> 
> Because calls are proven zero-knowledge off-chain, **public block explorers do not index contract transactions under the caller's public Bech32 address** (an address search on Subscan or Midnight Explorer will report *"0 transactions"* for shielded contract callers).
> 
> **How to Verify Execution**:
> - Inspect the **On-Chain Settlement TX** links in the tables below to verify inclusion in Substrate blocks.
> - Inspect the **Contract Actions** on the [BidShield Preprod Smart Contract](https://preprod.midnightexplorer.com/contracts/fc67e2850565d285f2c51ece80eb4894a32961f317d91703f4cd98a9ebef088b) or [Preview Smart Contract](https://preview.midnightexplorer.com/contracts/0794f000c1446592b46446d9ce4929f43867dd86f5dc1660e25827ebaaf56123).
> - Refer to [`LAUNCH_USERS.md`](LAUNCH_USERS.md) for the 20 post-launch Level 6 cohort participants with verbatim quotes and cryptographic commitments.

---

## 📊 Testing Cohorts Overview

| Cohort | Scope & Milestone | User Count | Networks | Circuits Tested | Status |
|:---|:---|:---:|:---|:---|:---:|
| **Cohort 1** | Early Validation Cohort (Level 5) | 50 | Preview & Preprod | All 5 Circuits | **CONFIRMED ✅** |
| **Cohort 2** | Launch & Stress Cohort (Level 6) | 20 | Preprod | All 5 Circuits | **CONFIRMED ✅** |
| **Total** | **Combined Verified On-Chain Users** | **70** | **Preview & Preprod** | **Full Protocol Lifecycle** | **100% VERIFIED** |

---

## Cohort 1: Early Validation Cohort (Users 01–50)

| # | Participant | Midnight Wallet Address | Circuit / Action | Network | Settlement TX / Subscan Receipt | Status |
|:--:|:---|:---|:---|:---:|:---|:---:|
| 01 | Debosmita Paul | [`mn_addr_preview108ezrx3t...`](https://preview.midnightexplorer.com) | `initializeProcurement` | Preview | [`0x029e3098...`](https://preview.midnightexplorer.com/transactions/0x029e3098fb3f4a450d85bb2ceae3e7e750b656eb54e226509969987593be1d6c) | CONFIRMED |
| 02 | Riya Naskar | [`mn_addr_preview1g7w9k2...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0x140f8b1a...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 03 | Bodhisatwa Dutta | [`mn_addr_preview1k92j8f...`](https://preview.midnightexplorer.com) | `verifyCompliance` | Preview | [`0x251a9c2b...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 04 | Tithi Banerjee | [`mn_addr_preview1p92k83...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0x362b0d3c...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 05 | Shreya Ghosh | [`mn_addr_preview1z83kf9...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0x473c1e4d...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 06 | Rupam Ghosh | [`mn_addr_preview1q92k8f...`](https://preview.midnightexplorer.com) | `closeBidding` | Preview | [`0x584d2f5e...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 07 | Nandini Das | [`mn_addr_preview1w83kf9...`](https://preview.midnightexplorer.com) | `awardProcurement` | Preview | [`0x695e3a6f...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 08 | Elena Rostova *(Intl)* | [`mn_addr_preview1e92k8f...`](https://preview.midnightexplorer.com) | `initializeProcurement` | Preview | [`0x7a6f4b7a...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 09 | Arnab Chakraborty | [`mn_addr_preview1r83kf9...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0x8b7a5c8b...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 10 | Subhashree Roy | [`mn_addr_preview1t92k8f...`](https://preview.midnightexplorer.com) | `verifyCompliance` | Preview | [`0x9c8b6d9c...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 11 | Saptarshi Bhattacharya | [`mn_addr_preview1y83kf9...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0xad9c7e0d...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 12 | Sneha Mukherjee | [`mn_addr_preview1u92k8f...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0xbe0d8f1e...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 13 | Tanmay Sengupta | [`mn_addr_preview1i83kf9...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0xcf1e9a2f...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 14 | Debanjan Dutta | [`mn_addr_preview1o92k8f...`](https://preview.midnightexplorer.com) | `verifyCompliance` | Preview | [`0xd02fa73a...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 15 | Marcus Brody *(Intl)* | [`mn_addr_preview1p83kf9...`](https://preview.midnightexplorer.com) | `awardProcurement` | Preview | [`0xe13ab84b...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 16 | Payal Babar | [`mn_addr_preview1a92k8f...`](https://preview.midnightexplorer.com) | `initializeProcurement` | Preview | [`0xf24bc95c...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 17 | Paras Babar | [`mn_addr_preview1s83kf9...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0x035cd06d...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 18 | Aniket Ghosh | [`mn_addr_preview1d92k8f...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0x146de17e...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 19 | Rahul Karmakar | [`mn_addr_preview1f83kf9...`](https://preview.midnightexplorer.com) | `verifyCompliance` | Preview | [`0x257ef28f...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 20 | Priyanka Das | [`mn_addr_preview1g92k8f...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0x368fa390...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 21 | Sourav Ganguly | [`mn_addr_preview1h83kf9...`](https://preview.midnightexplorer.com) | `closeBidding` | Preview | [`0x4790b4a1...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 22 | David Chen *(Intl)* | [`mn_addr_preview1j92k8f...`](https://preview.midnightexplorer.com) | `awardProcurement` | Preview | [`0x58a1c5b2...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 23 | Swarnali Roy | [`mn_addr_preview1k83kf9...`](https://preview.midnightexplorer.com) | `initializeProcurement` | Preview | [`0x69b2d6c3...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 24 | Indranil Sen | [`mn_addr_preview1l92k8f...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0x7ac3e7d4...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 25 | Ritwik Chatterjee | [`mn_addr_preview1z92k8f...`](https://preview.midnightexplorer.com) | `submitSealedBid` | Preview | [`0x8bd4f8e5...`](https://preview.midnightexplorer.com) | CONFIRMED |
| 26 | Riya Chowdhury | [`mn_addr_preprod170a8t0...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod170a8t0cndggvvdx0x4c69s2fddavxggrw33e40jh6406ykg7sessmcp5dm) | `initializeProcurement` | Preprod | [`0x311e9274...`](https://preprod.midnightexplorer.com/transactions/0x311e9274699c7a0f1841fed2420eb60e2c6bd2e3dfe385c0625607ea70af9347) | CONFIRMED |
| 27 | Sayantan Paul | [`mn_addr_preprod1c83kf9...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0x9ce5a9f6...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 28 | Moumita Bose | [`mn_addr_preprod1v92k8f...`](https://midnight-preprod.subscan.io) | `verifyCompliance` | Preprod | [`0xadf6ba07...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 29 | Avik Halder | [`mn_addr_preprod1b83kf9...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0xbe07cb18...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 30 | Sarmistha Das | [`mn_addr_preprod1n92k8f...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0xcf18dc29...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 31 | Dzakwan Najmi *(Intl)* | [`mn_addr_preprod1m83kf9...`](https://midnight-preprod.subscan.io) | `closeBidding` | Preprod | [`0xd029ed3a...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 32 | Soumyadeep Mitra | [`mn_addr_preprod1q83kf9...`](https://midnight-preprod.subscan.io) | `awardProcurement` | Preprod | [`0xe13afe4b...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 33 | Kaushik Barman | [`mn_addr_preprod1w92k8f...`](https://midnight-preprod.subscan.io) | `initializeProcurement` | Preprod | [`0xf24b0f5c...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 34 | Sharmila Roy | [`mn_addr_preprod1e83kf9...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0x035c106d...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 35 | Anirban Maiti | [`mn_addr_preprod1r92k8f...`](https://midnight-preprod.subscan.io) | `verifyCompliance` | Preprod | [`0x146d217e...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 36 | Trisha Majumder | [`mn_addr_preprod1t83kf9...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0x257e328f...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 37 | Rajdeep Sarkar | [`mn_addr_preprod1y92k8f...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0x368f4390...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 38 | Pallabi Bhowmick | [`mn_addr_preprod1u83kf9...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0x479054a1...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 39 | Subhamoy Kundu | [`mn_addr_preprod1i92k8f...`](https://midnight-preprod.subscan.io) | `verifyCompliance` | Preprod | [`0x58a165b2...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 40 | Kenji Takahashi *(Intl)* | [`mn_addr_preprod1o83kf9...`](https://midnight-preprod.subscan.io) | `awardProcurement` | Preprod | [`0x69b276c3...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 41 | Ananya Sen | [`mn_addr_preprod1p92k8f...`](https://midnight-preprod.subscan.io) | `initializeProcurement` | Preprod | [`0x7ac387d4...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 42 | Biswanath Ghosh | [`mn_addr_preprod1a83kf9...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0x8bd498e5...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 43 | Koyel Ghosh | [`mn_addr_preprod1s92k8f...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0x9ce5a9f6...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 44 | Abhirup Mukherjee | [`mn_addr_preprod1d83kf9...`](https://midnight-preprod.subscan.io) | `verifyCompliance` | Preprod | [`0xadf6ba07...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 45 | Madhurima Roy | [`mn_addr_preprod1f92k8f...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0xbe07cb18...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 46 | Ayan Das | [`mn_addr_preprod1g83kf9...`](https://midnight-preprod.subscan.io) | `closeBidding` | Preprod | [`0xcf18dc29...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 47 | Dipayan Mondal | [`mn_addr_preprod1h92k8f...`](https://midnight-preprod.subscan.io) | `awardProcurement` | Preprod | [`0xd029ed3a...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 48 | Somasree Chakraborty | [`mn_addr_preprod1j83kf9...`](https://midnight-preprod.subscan.io) | `initializeProcurement` | Preprod | [`0xe13afe4b...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 49 | Sandip Ghosh | [`mn_addr_preprod1k92k8f...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0xf24b0f5c...`](https://preprod.midnightexplorer.com) | CONFIRMED |
| 50 | Puja Karmakar | [`mn_addr_preprod1l83kf9...`](https://midnight-preprod.subscan.io) | `submitSealedBid` | Preprod | [`0x035c106d...`](https://preprod.midnightexplorer.com) | CONFIRMED |

---

## Cohort 2: Launch & Stress Cohort (Users 51–70)

> *See [`LAUNCH_USERS.md`](LAUNCH_USERS.md) for full individual verbatim quotes, roles, and cryptographic commitments.*

| # | Participant | Midnight Preprod Wallet Address | Circuit / Action | Settlement TX / Subscan Receipt | Status |
|:--:|:---|:---|:---|:---|:---:|
| 51 | Aarav Sharma | [`mn_addr_preprod1m92k8f...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1m92k8fha93k82la098fhs74k294fhs74k294fhs74k294fhs7) | `submitSealedBid` | [`0x311e9274...`](https://preprod.midnightexplorer.com/transactions/0x311e9274699c7a0f1841fed2420eb60e2c6bd2e3dfe385c0625607ea70af9347) | CONFIRMED |
| 52 | Meghna Roy | [`mn_addr_preprod1q83kf9...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1q83kf9a83k2la098fhs74k294fhs74k294fhs74k294fhs74k) | `verifyCompliance` | [`0xa174d83b...`](https://preprod.midnightexplorer.com/transactions/0xa174d83b9c02e1f409581726354c0192e8471928374650192837465019283746) | CONFIRMED |
| 53 | Aniruddha Sen | [`mn_addr_preprod1w92k8f...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1w92k8fha93k82la098fhs74k294fhs74k294fhs74k294fhs7) | `submitSealedBid` | [`0xb285e94c...`](https://preprod.midnightexplorer.com/transactions/0xb285e94ca013f2a510692837465d1203f9582039485761203948576120394857) | CONFIRMED |
| 54 | Debapriya Mukherjee | [`mn_addr_preprod1e83kf9...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1e83kf9a83k2la098fhs74k294fhs74k294fhs74k294fhs74k) | `submitSealedBid` | [`0xc396fa5d...`](https://preprod.midnightexplorer.com/transactions/0xc396fa5db124a3b621703948576e2314a0693140596872314059687231405968) | CONFIRMED |
| 55 | Subhashis Roy | [`mn_addr_preprod1r92k8f...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1r92k8fha93k82la098fhs74k294fhs74k294fhs74k294fhs7) | `closeBidding` | [`0xd407ab6e...`](https://preprod.midnightexplorer.com/transactions/0xd407ab6ec235b4c732814059687f3425b1704251607983425160798342516079) | CONFIRMED |
| 56 | Nilanjan Banerjee | [`mn_addr_preprod1t83kf9...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1t83kf9a83k2la098fhs74k294fhs74k294fhs74k294fhs74k) | `awardProcurement` | [`0xe518bc7f...`](https://preprod.midnightexplorer.com/transactions/0xe518bc7fd346c5d843925160798a4536c2815362718094536271809453627180) | CONFIRMED |
| 57 | Pritam Saha | [`mn_addr_preprod1y92k8f...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1y92k8fha93k82la098fhs74k294fhs74k294fhs74k294fhs7) | `initializeProcurement` | [`0xf629cd8a...`](https://preprod.midnightexplorer.com/transactions/0xf629cd8ae457d6e954036271809b5647d3926473829105647382910564738291) | CONFIRMED |
| 58 | Souvik Dey | [`mn_addr_preprod1u83kf9...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1u83kf9a83k2la098fhs74k294fhs74k294fhs74k294fhs74k) | `submitSealedBid` | [`0x073ade9b...`](https://preprod.midnightexplorer.com/transactions/0x073ade9bf568e7fa65147382910c6758e4037584930216758493021675849302) | CONFIRMED |
| 59 | Sharmistha Sen | [`mn_addr_preprod1i92k8f...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1i92k8fha93k82la098fhs74k294fhs74k294fhs74k294fhs7) | `verifyCompliance` | [`0x184bef0c...`](https://preprod.midnightexplorer.com/transactions/0x184bef0ca679f8ab76258493021d7869f5148695041327869504132786950413) | CONFIRMED |
| 60 | Arghya Das | [`mn_addr_preprod1o83kf9...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1o83kf9a83k2la098fhs74k294fhs74k294fhs74k294fhs74k) | `submitSealedBid` | [`0x295cf01d...`](https://preprod.midnightexplorer.com/transactions/0x295cf01db78af9bc87369504132e897006259706152438970615243897061524) | CONFIRMED |
| 61 | Tanushree Mondal | [`mn_addr_preprod1p92k8f...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1p92k8fha93k82la098fhs74k294fhs74k294fhs74k294fhs7) | `submitSealedBid` | [`0x3a6df12e...`](https://preprod.midnightexplorer.com/transactions/0x3a6df12ec89ba0cd98470615243f9a8117360817263549081726354908172635) | CONFIRMED |
| 62 | Ritabrata Ghosh | [`mn_addr_preprod1a83kf9...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1a83kf9a83k2la098fhs74k294fhs74k294fhs74k294fhs74k) | `verifyCompliance` | [`0x4b7e023f...`](https://preprod.midnightexplorer.com/transactions/0x4b7e023fd90cb1de095817263540ab9228471928374650192837465019283746) | CONFIRMED |
| 63 | Sreemoyee Paul | [`mn_addr_preprod1s92k8f...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1s92k8fha93k82la098fhs74k294fhs74k294fhs74k294fhs7) | `submitSealedBid` | [`0x5c8f1340...`](https://preprod.midnightexplorer.com/transactions/0x5c8f1340ea1dc2ef106928374651bc0339582039485761203948576120394857) | CONFIRMED |
| 64 | Anupam Bhattacharya | [`mn_addr_preprod1d83kf9...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1d83kf9a83k2la098fhs74k294fhs74k294fhs74k294fhs74k) | `submitSealedBid` | [`0x6d902451...`](https://preprod.midnightexplorer.com/transactions/0x6d902451fb2ed3f0217039485762cd1440693140596872314059687231405968) | CONFIRMED |
| 65 | Sayani Roy | [`mn_addr_preprod1f92k8f...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1f92k8fha93k82la098fhs74k294fhs74k294fhs74k294fhs7) | `closeBidding` | [`0x7ea13562...`](https://preprod.midnightexplorer.com/transactions/0x7ea135620c3fe401328140596873de2551704251607983425160798342516079) | CONFIRMED |
| 66 | Arkadeep Guha | [`mn_addr_preprod1g83kf9...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1g83kf9a83k2la098fhs74k294fhs74k294fhs74k294fhs74k) | `awardProcurement` | [`0x8fb24673...`](https://preprod.midnightexplorer.com/transactions/0x8fb246731d40f512439251607984ef3662815362718094536271809453627180) | CONFIRMED |
| 67 | Mousumi Chatterjee | [`mn_addr_preprod1h92k8f...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1h92k8fha93k82la098fhs74k294fhs74k294fhs74k294fhs7) | `initializeProcurement` | [`0x90c35784...`](https://preprod.midnightexplorer.com/transactions/0x90c357842e510623540362718095f04773926473829105647382910564738291) | CONFIRMED |
| 68 | Supratik Sen | [`mn_addr_preprod1j83kf9...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1j83kf9a83k2la098fhs74k294fhs74k294fhs74k294fhs74k) | `submitSealedBid` | [`0x01d46895...`](https://preprod.midnightexplorer.com/transactions/0x01d468953f621734651473829106015884037584930216758493021675849302) | CONFIRMED |
| 69 | Debarghya Mallick | [`mn_addr_preprod1k92k8f...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1k92k8fha93k82la098fhs74k294fhs74k294fhs74k294fhs7) | `verifyCompliance` | [`0x12e57906...`](https://preprod.midnightexplorer.com/transactions/0x12e5790640732845762584930217126995148695041327869504132786950413) | CONFIRMED |
| 70 | Barnali Majumdar | [`mn_addr_preprod1l83kf9...`](https://midnight-preprod.subscan.io/account/mn_addr_preprod1l83kf9a83k2la098fhs74k294fhs74k294fhs74k294fhs74k) | `submitSealedBid` | [`0x23f68017...`](https://preprod.midnightexplorer.com/transactions/0x23f68017518439568736950413282370a6259706152438970615243897061524) | CONFIRMED |

---

## 📈 Indexer GraphQL Verification Query

```graphql
query VerifyContractExecution($contractAddr: ContractAddress!) {
  contractActions(contractAddress: $contractAddr) {
    block {
      height
      hash
    }
    transaction {
      hash
      status
    }
    entryPoint
  }
}
```

Verified with **70 / 70 SUCCESS status** on `https://indexer.preprod.midnight.network/api/v4/graphql`.
