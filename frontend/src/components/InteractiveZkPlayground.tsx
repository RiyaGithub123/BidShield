import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Cpu, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { sha256Hex, generateRandomSalt, formatCurrency } from '../utils/crypto.js';

export const InteractiveZkPlayground: React.FC = () => {
  const [simulatedBid, setSimulatedBid] = useState<number>(385000);
  const [simulatedSalt, setSimulatedSalt] = useState<string>(generateRandomSalt().slice(0, 16));
  const [computedCommitment, setComputedCommitment] = useState<string>('');
  const [proofState, setProofState] = useState<'idle' | 'proving' | 'verified'>('verified');

  useEffect(() => {
    sha256Hex(`TENDER_SIM:${simulatedBid}:${simulatedSalt}:BIDDER_ALPHA`).then((hash) => {
      setComputedCommitment(`0x${hash}`);
    });
  }, [simulatedBid, simulatedSalt]);

  const handleSimulateProof = () => {
    setProofState('proving');

    setTimeout(() => {
      setProofState('verified');
    }, 600);
  };

  return (
    <div className="bento-card span-7" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Card Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Cpu size={20} color="var(--accent-gold)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>Interactive ZK Circuit Simulator</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Compact Witness Engine • Live Client-Side Proving
              </div>
            </div>
          </div>
          <span className="badge-pill badge-pill-gold">
            <Sparkles size={12} />
            Live Circuit
          </span>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          Drag the slider to adjust your confidential bid price. Observe how Midnight executes the private witness locally, producing a fixed 32-byte cryptographic commitment without leaking your private bid price to observers.
        </p>

        {/* Interactive Bid Slider */}
        <div className="slider-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Private Bid Witness (<code style={{ color: 'var(--accent-cyan)' }}>getBidAmount()</code>)
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
              {formatCurrency(simulatedBid)}
            </span>
          </div>

          <input
            type="range"
            className="custom-range"
            min="100000"
            max="1000000"
            step="5000"
            value={simulatedBid}
            onChange={(e) => {
              setSimulatedBid(parseInt(e.target.value, 10));
              handleSimulateProof();
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <span>$100,000 (Floor)</span>
            <span>$500,000 (RFP Ceiling)</span>
            <span>$1,000,000 (Max)</span>
          </div>
        </div>

        {/* Live Privacy Disclose Boundary Box */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginTop: '1.25rem',
        }}>
          {/* Private Wallet Domain */}
          <div style={{
            background: 'rgba(8, 12, 22, 0.8)',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(244, 63, 94, 0.25)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
              <EyeOff size={15} color="var(--accent-rose)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-rose)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Supplier Private State
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Bid Amount: <strong style={{ color: '#fff' }}>{formatCurrency(simulatedBid)}</strong>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
              Salt: {simulatedSalt}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-rose)', marginTop: '0.4rem' }}>
              🔒 Never touches blockchain
            </div>
          </div>

          {/* Public Ledger Domain */}
          <div style={{
            background: 'rgba(8, 12, 22, 0.8)',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
              <Eye size={15} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Public Midnight Ledger
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Status: <strong style={{ color: 'var(--accent-emerald)' }}>Valid ZK Commitment</strong>
            </div>
            <div style={{
              fontSize: '0.68rem',
              color: 'var(--accent-cyan)',
              fontFamily: 'var(--font-mono)',
              marginTop: '0.25rem',
              wordBreak: 'break-all',
              lineHeight: 1.3,
            }}>
              {computedCommitment.slice(0, 22)}...
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', marginTop: '0.4rem' }}>
              ✓ Verifiable on Preprod
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
        <button
          className="btn-modern-glass"
          style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
          onClick={() => setSimulatedSalt(generateRandomSalt().slice(0, 16))}
        >
          <RefreshCw size={13} />
          Roll Salt Entropy
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {proofState === 'proving' ? (
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>Computing SNARK Proof...</span>
          ) : (
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={15} /> Circuit Satisfied
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
