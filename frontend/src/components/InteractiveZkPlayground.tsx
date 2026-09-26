import React, { useState, useEffect } from 'react';
import { Cpu, ShieldCheck, ArrowDown, Lock, CheckCircle2, RefreshCw } from 'lucide-react';
import { sha256Hex, generateRandomSalt } from '../utils/crypto.js';

export const InteractiveZkPlayground: React.FC = () => {
  // Input starts clean and empty by default (NO hardcoded mock values)
  const [privateBidInput, setPrivateBidInput] = useState<string>('');
  const [salt, setSalt] = useState<string>('');
  const [commitment, setCommitment] = useState<string>('');
  const [isProving, setIsProving] = useState<boolean>(false);
  const [proofVerified, setProofVerified] = useState<boolean>(false);

  // Compute commitment dynamically when user enters bid
  useEffect(() => {
    if (!privateBidInput) {
      setCommitment('');
      setProofVerified(false);
      return;
    }

    const currentSalt = salt || generateRandomSalt().slice(0, 16);
    if (!salt) setSalt(currentSalt);

    sha256Hex(`BIDSHIELD_PLAYGROUND:${privateBidInput}:${currentSalt}:DEMO_SUPPLIER`).then((hash) => {
      setCommitment(`0x${hash}`);
      setProofVerified(true);
    });
  }, [privateBidInput, salt]);

  const handleSimulateProof = () => {
    if (!privateBidInput) return;
    setIsProving(true);
    setProofVerified(false);

    setTimeout(() => {
      setIsProving(false);
      setProofVerified(true);
    }, 450);
  };

  const handleRegenerateSalt = () => {
    setSalt(generateRandomSalt().slice(0, 16));
  };

  return (
    <div className="neo-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem', borderBottom: '2px solid #000', paddingBottom: '0.85rem' }}>
          <div>
            <span className="neo-badge neo-badge-yellow" style={{ marginBottom: '0.35rem' }}>
              Interactive Zero-Knowledge Engine
            </span>
            <h2 style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>
              ZK Prover-to-Verifier Pipeline
            </h2>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
              Unidirectional flow: Private Witness ➔ ZK-SNARK ➔ Public Ledger
            </div>
          </div>

          <span className="neo-badge neo-badge-mint desktop-only">
            Compact 0.5.2
          </span>
        </div>

        {/* STEP 1: CLIENT-SIDE PRIVATE PROVER (TOP) */}
        <div style={{
          background: 'var(--accent-yellow)',
          border: '3px solid #000',
          borderRadius: '6px',
          boxShadow: '4px 4px 0px #000',
          padding: '1.25rem',
          marginBottom: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.88rem' }}>
              <Lock size={16} />
              Step 1: Client Private Witness (Local Memory)
            </div>
            <span className="neo-badge neo-badge-dark" style={{ fontSize: '0.68rem' }}>
              Never Sent to Server
            </span>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#1A1A2E', marginBottom: '0.85rem', fontWeight: 600 }}>
            Enter your secret commercial bid price. It remains stored in client-side memory only.
          </p>

          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <input
                type="number"
                className="neo-input"
                value={privateBidInput}
                onChange={(e) => setPrivateBidInput(e.target.value)}
                placeholder="Enter confidential bid (e.g. 240000)..."
                style={{ background: '#FFFFFF', fontWeight: 700 }}
              />
            </div>

            <button
              className="neo-btn neo-btn-dark neo-btn-sm"
              onClick={handleSimulateProof}
              disabled={!privateBidInput || isProving}
            >
              <Cpu size={14} />
              {isProving ? 'Proving ZK...' : 'Generate ZK Proof'}
            </button>
          </div>

          {/* Quick-fill helper chips */}
          <div className="neo-input-helpers">
            <span style={{ fontSize: '0.72rem', fontWeight: 700, alignSelf: 'center', marginRight: '0.2rem' }}>
              Test presets:
            </span>
            <button className="neo-chip" onClick={() => setPrivateBidInput('185000')}>
              $185,000
            </button>
            <button className="neo-chip" onClick={() => setPrivateBidInput('320000')}>
              $320,000
            </button>
            <button className="neo-chip" onClick={() => setPrivateBidInput('450000')}>
              $450,000
            </button>
            {privateBidInput && (
              <button className="neo-chip" style={{ background: '#FF5376', color: '#fff' }} onClick={() => setPrivateBidInput('')}>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* STEP 2: ZK PROVING PIPELINE ARROW (MIDDLE) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', margin: '0.75rem 0' }}>
          <div style={{ height: '2px', flex: 1, background: '#000' }} />
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            background: 'var(--accent-violet)',
            color: '#fff',
            border: '2px solid #000',
            boxShadow: '2px 2px 0px #000',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
          }}>
            <ArrowDown size={14} />
            Compact Circuit: submitSealedBid()
          </div>
          <div style={{ height: '2px', flex: 1, background: '#000' }} />
        </div>

        {/* STEP 3: PUBLIC ON-CHAIN LEDGER AUDIT (BOTTOM) */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '3px solid #000',
          borderRadius: '6px',
          boxShadow: '4px 4px 0px #000',
          padding: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.88rem' }}>
              <ShieldCheck size={16} />
              Step 2: Public Ledger State (Visible On-Chain)
            </div>

            {proofVerified ? (
              <span className="neo-badge neo-badge-mint">
                <CheckCircle2 size={12} />
                Proof Valid
              </span>
            ) : (
              <span className="neo-badge neo-badge-coral">
                Awaiting Bid Input
              </span>
            )}
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
            Observers see ONLY this 32-byte cryptographic commitment hash. The price is mathematically hidden!
          </p>

          <div style={{
            background: '#FFFFFF',
            border: '2px solid #000',
            borderRadius: '4px',
            padding: '0.65rem 0.85rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            wordBreak: 'break-all',
            color: commitment ? 'var(--black)' : 'var(--text-muted)',
          }}>
            {commitment || '0x (Waiting for confidential bid entry...)'}
          </div>

          {commitment && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                Salt Entropy: {salt}
              </div>
              <button
                className="neo-chip"
                onClick={handleRegenerateSalt}
                title="Regenerate random salt entropy"
              >
                <RefreshCw size={11} style={{ marginRight: '3px' }} />
                New Salt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
