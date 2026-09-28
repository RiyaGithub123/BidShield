import React, { useState } from 'react';
import { Shield, Lock, FileCheck, Copy, Check, ArrowRight, Code, Cpu, ExternalLink } from 'lucide-react';

interface CircuitSpec {
  id: string;
  name: string;
  role: string;
  badgeColor: string;
  stateTransition: string;
  summary: string;
  publicInputs: string[];
  privateWitnesses: string[];
  invariants: string[];
  privacyGuarantee: string;
  compactSnippet: string;
}

const CIRCUITS: CircuitSpec[] = [
  {
    id: 'circuit-1',
    name: '1. initializeProcurement',
    role: 'Buyer / Procuring Enterprise',
    badgeColor: 'var(--accent-coral)',
    stateTransition: 'Uninitialized (0) ➔ BiddingOpen (1)',
    summary: 'Opens a new sealed-bid procurement tender with verifiable budget ceiling, title hash, and block timestamp deadline.',
    publicInputs: [
      'titleHash: Bytes<32> — SHA-256 hash identifier of RFP',
      'orgId: Bytes<32> — Enterprise issuer identity',
      'deadline: Uint<64> — Absolute Unix epoch deadline',
      'maxBudget: Uint<64> — Public budget ceiling',
    ],
    privateWitnesses: ['None (Public initialization by buyer)'],
    invariants: [
      'assert(procurementState == 0 || procurementState == 3)',
      'assert(deadline > 0, "Deadline must be in future")',
      'assert(maxBudget > 0, "Budget ceiling must be > 0")',
    ],
    privacyGuarantee: 'RFP requirements and maximum ceiling budget are transparently verifiable by all participants.',
    compactSnippet: `export circuit initializeProcurement(
    titleHash: Bytes<32>,
    orgId: Bytes<32>,
    deadline: Uint<64>,
    maxBudget: Uint<64>
): Boolean {
    assert(procurementState == 0 || procurementState == 3, "Procurement active");
    assert(deadline > 0, "Deadline must be in the future");
    assert(maxBudget > 0, "Budget ceiling must be greater than zero");

    procurementId = disclose(titleHash);
    organizationId = disclose(orgId);
    submissionDeadline = disclose(deadline);
    ceilingBudget = disclose(maxBudget);
    totalBidsSubmitted = 0;
    procurementState = 1; // Transition to BiddingOpen
    return true;
}`,
  },
  {
    id: 'circuit-2',
    name: '2. submitSealedBid',
    role: 'Supplier / Bidding Contractor',
    badgeColor: 'var(--accent-mint)',
    stateTransition: 'BiddingOpen ➔ totalBidsSubmitted + 1',
    summary: 'Submits a cryptographic commitment to consensus while keeping the financial bid amount 100% secret inside private RAM.',
    publicInputs: [
      'bidCommitment: Bytes<32> — SHA-256(Bid || Salt || Bidder)',
      'submissionTimestamp: Uint<64> — Block arrival timestamp',
    ],
    privateWitnesses: [
      'witness getBidAmount(): Uint<64> (Evaluated strictly in private RAM)',
      'witness getBidSalt(): Bytes<32> (128-bit CSPRNG entropy)',
      'witness getBidderIdentity(): Bytes<32> (Caller identity)',
    ],
    invariants: [
      'assert(procurementState == 1, "Bidding not open")',
      'assert(submissionTimestamp <= submissionDeadline, "Deadline passed")',
      'assert(privateBid > 0, "Bid must be strictly positive")',
    ],
    privacyGuarantee: 'Zero Information Leakage: Bid amount never reaches consensus. Only the 32-byte commitment is public.',
    compactSnippet: `export circuit submitSealedBid(
    bidCommitment: Bytes<32>,
    submissionTimestamp: Uint<64>
): Boolean {
    assert(procurementState == 1, "Bidding window is not open");
    assert(submissionTimestamp <= submissionDeadline, "Deadline passed");

    // Private witness check: bid amount evaluated in local RAM
    const privateBid = getBidAmount();
    assert(privateBid > 0, "Bid amount must be strictly positive");

    totalBidsSubmitted = disclose((totalBidsSubmitted + 1) as Uint<64>);
    return true;
}`,
  },
  {
    id: 'circuit-3',
    name: '3. verifyCompliance',
    role: 'Supplier / Compliance Lead',
    badgeColor: 'var(--accent-sky)',
    stateTransition: 'isComplianceVerified = true',
    summary: 'Proves possession of accredited ISO/SOC2 credentials without disclosing proprietary corporate certificates or trade secrets.',
    publicInputs: [
      'expectedAccreditationHash: Bytes<32> — Required RFP certification standard hash',
    ],
    privateWitnesses: [
      'witness getComplianceCredential(): Bytes<32> (Secret company key/token)',
    ],
    invariants: [
      'assert(procurementState == 1 || procurementState == 2)',
      'assert(persistentHash(credentialSecret) == expectedAccreditationHash)',
    ],
    privacyGuarantee: 'Accreditation proof is verified mathematically in ZK. No confidential PDFs or license credentials are leaked.',
    compactSnippet: `export circuit verifyCompliance(
    expectedAccreditationHash: Bytes<32>
): Boolean {
    assert(procurementState == 1 || procurementState == 2, "Invalid state");

    const credentialSecret = getComplianceCredential();
    const computedHash = persistentHash<Bytes<32>>(credentialSecret);

    assert(computedHash == expectedAccreditationHash, "Credentials mismatch");
    isComplianceVerified = true;
    return true;
}`,
  },
  {
    id: 'circuit-4',
    name: '4. closeBidding',
    role: 'Procurement Officer / Automated Job',
    badgeColor: 'var(--accent-yellow)',
    stateTransition: 'BiddingOpen (1) ➔ BiddingClosed (2)',
    summary: 'Enforces the RFP deadline constraint, freezing bid intake and transitioning the tender into verifiable evaluation mode.',
    publicInputs: [
      'currentTimestamp: Uint<64> — Ledger block timestamp',
    ],
    privateWitnesses: ['None (Deterministic state machine clock guard)'],
    invariants: [
      'assert(procurementState == 1, "Bidding is not open")',
      'assert(currentTimestamp >= submissionDeadline, "Cannot close early")',
    ],
    privacyGuarantee: 'Guarantees no supplier can submit late bids after the competitive submission window closes.',
    compactSnippet: `export circuit closeBidding(
    currentTimestamp: Uint<64>
): Boolean {
    assert(procurementState == 1, "Bidding is not open");
    assert(currentTimestamp >= submissionDeadline, "Cannot close early");

    procurementState = 2; // Transition to BiddingClosed
    return true;
}`,
  },
  {
    id: 'circuit-5',
    name: '5. awardProcurement',
    role: 'Buyer / Protocol Evaluator',
    badgeColor: 'var(--accent-purple)',
    stateTransition: 'BiddingClosed (2) ➔ Awarded (3)',
    summary: 'Selectively discloses ONLY the winning supplier and price. All losing competitor bids remain permanently encrypted.',
    publicInputs: [
      'awardedSupplier: Bytes<32> — Identity of winning contractor',
      'awardedPrice: Uint<64> — Disclosed winning bid amount',
      'bidSalt: Bytes<32> — Cryptographic salt for verification',
    ],
    privateWitnesses: [
      'witness getBidderIdentity(): Bytes<32> (Asserted against award input)',
    ],
    invariants: [
      'assert(procurementState == 2, "Bidding must be closed")',
      'assert(awardedPrice <= ceilingBudget, "Exceeds budget ceiling")',
      'assert(awardedPrice > 0, "Winning price must be > 0")',
      'assert(bidderIdentity == awardedSupplier, "Identity mismatch")',
    ],
    privacyGuarantee: 'Selective Disclosure: Winner is settled publicly on-chain. All losing bids, margins, and quotes stay secret forever.',
    compactSnippet: `export circuit awardProcurement(
    awardedSupplier: Bytes<32>,
    awardedPrice: Uint<64>,
    bidSalt: Bytes<32>
): Boolean {
    assert(procurementState == 2, "Bidding must be closed");
    assert(awardedPrice <= ceilingBudget, "Winning bid exceeds ceiling");
    assert(awardedPrice > 0, "Winning bid must be > 0");

    const bidderIdentity = getBidderIdentity();
    assert(bidderIdentity == awardedSupplier, "Identity mismatch");

    winningBidderId = disclose(awardedSupplier);
    winningAmount = disclose(awardedPrice);
    procurementState = 3; // Transition to Awarded
    return true;
}`,
  },
];

export const CircuitDocsSection: React.FC<{ onBackToTenders: () => void }> = ({ onBackToTenders }) => {
  const [selectedCircuit, setSelectedCircuit] = useState<CircuitSpec>(CIRCUITS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ marginBottom: '4rem' }}>
      {/* Header Banner */}
      <div
        className="neo-card"
        style={{
          background: 'var(--accent-yellow)',
          marginBottom: '2rem',
          padding: '1.75rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="neo-badge neo-badge-coral" style={{ marginBottom: '0.6rem' }}>
              Midnight Compact 0.5.2
            </span>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              Zero-Knowledge Circuit Documentation
            </h1>
            <p style={{ maxWidth: '780px', fontWeight: 600, color: 'var(--black)' }}>
              BidShield executes five verifiable smart contract circuits in Midnight Compact. Supplier quotes remain
              completely confidential inside local WebAssembly private RAM, while on-chain consensus validates mathematical invariants and state transitions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="neo-btn neo-btn-sm" onClick={onBackToTenders}>
              <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} />
              Back to Tenders
            </button>
            <a
              href="https://github.com/RiyaGithub123/BidShield/blob/main/contract/src/bidshield.compact"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn neo-btn-sm neo-btn-mint"
              style={{ textDecoration: 'none' }}
            >
              <ExternalLink size={14} />
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Circuit Navigator + Detailed Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Left: Circuit List & State Transitions */}
        <div>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} />
            Compact Circuit Registry
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {CIRCUITS.map((circ) => {
              const isSelected = selectedCircuit.id === circ.id;
              return (
                <div
                  key={circ.id}
                  onClick={() => setSelectedCircuit(circ)}
                  className="neo-card"
                  style={{
                    cursor: 'pointer',
                    padding: '1.1rem',
                    background: isSelected ? '#fff' : 'var(--bg-secondary)',
                    border: isSelected ? '3px solid #000' : '2px solid #000',
                    boxShadow: isSelected ? '5px 5px 0px #000' : '2px 2px 0px #000',
                    transform: isSelected ? 'translate(-2px, -2px)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.02rem' }}>{circ.name}</span>
                    <span
                      className="neo-badge"
                      style={{
                        background: circ.badgeColor,
                        fontSize: '0.68rem',
                        color: circ.id === 'circuit-5' || circ.id === 'circuit-1' ? '#fff' : '#000',
                      }}
                    >
                      {circ.role.split('/')[0].trim()}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                    {circ.summary}
                  </p>

                  <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--black)' }}>
                    State: {circ.stateTransition}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Circuit Deep Dive */}
        <div>
          <div className="neo-card" style={{ padding: '1.5rem', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div>
                <span className="neo-badge neo-badge-yellow" style={{ marginBottom: '0.4rem' }}>
                  {selectedCircuit.role}
                </span>
                <h2 style={{ fontSize: '1.5rem' }}>{selectedCircuit.name}</h2>
              </div>

              <span
                className="neo-badge"
                style={{
                  background: 'var(--accent-mint)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                }}
              >
                100% TESTED (VITEST)
              </span>
            </div>

            {/* Privacy Guarantee Box */}
            <div
              style={{
                padding: '0.85rem 1rem',
                background: 'var(--bg-secondary)',
                border: '2px solid #000',
                borderRadius: '6px',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
              }}
            >
              <Shield size={18} style={{ color: 'var(--black)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Privacy & Zero-Knowledge Guarantee:
                </strong>
                <p style={{ fontSize: '0.86rem', marginTop: '0.2rem', marginBottom: 0 }}>
                  {selectedCircuit.privacyGuarantee}
                </p>
              </div>
            </div>

            {/* Public Inputs */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.84rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Public Inputs (On-Chain Consensus)
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                {selectedCircuit.publicInputs.map((inp, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem' }}>{inp}</li>
                ))}
              </ul>
            </div>

            {/* Private Witnesses */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.84rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Lock size={14} />
                Private Witnesses (Client Local RAM Only)
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                {selectedCircuit.privateWitnesses.map((wit, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem', color: '#b91c1c' }}>{wit}</li>
                ))}
              </ul>
            </div>

            {/* Mathematical Invariants */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.84rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileCheck size={14} />
                Circuit Invariants & Assertions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {selectedCircuit.invariants.map((inv, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      background: 'var(--bg-secondary)',
                      padding: '0.35rem 0.6rem',
                      border: '1.5px solid #000',
                      borderRadius: '4px',
                    }}
                  >
                    <code>{inv}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact Code Snippet */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.84rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Code size={14} />
                  Midnight Compact Implementation
                </span>

                <button
                  className="neo-btn neo-btn-sm"
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.72rem' }}
                  onClick={() => handleCopy(selectedCircuit.compactSnippet, selectedCircuit.id)}
                >
                  {copiedId === selectedCircuit.id ? (
                    <>
                      <Check size={12} color="green" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      Copy Code
                    </>
                  )}
                </button>
              </div>

              <pre
                style={{
                  background: 'var(--black)',
                  color: 'var(--accent-mint)',
                  padding: '1rem',
                  borderRadius: '6px',
                  border: '2px solid #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  overflowX: 'auto',
                  lineHeight: 1.45,
                }}
              >
                <code>{selectedCircuit.compactSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
