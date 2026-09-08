import React from 'react';
import { Shield, Lock, Award, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/crypto.js';

export const PrivacyArchitectureVisualizer: React.FC = () => {

  const mockBidders = [
    { name: 'Supplier Alpha (Cloud Infra)', bid: 420000, status: 'Hidden', isWinner: false },
    { name: 'Supplier Beta (Security Labs)', bid: 385000, status: 'Awarded Winner', isWinner: true },
    { name: 'Supplier Gamma (Cyber Enclave)', bid: 450000, status: 'Hidden', isWinner: false },
  ];

  return (
    <div className="bento-card span-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              background: 'rgba(56, 189, 248, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Shield size={20} color="var(--accent-cyan)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>Reverse Auction Enclave</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Comparing Bids Without Exposing Bids
              </div>
            </div>
          </div>
          <span className="badge-pill badge-pill-cyan">
            ZK Enclave
          </span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
          All supplier tenders enter the zero-knowledge circuit as encrypted witnesses. The smart contract mathematically verifies the lowest qualified bid without revealing competitors' prices.
        </p>

        {/* Visual Tender Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {mockBidders.map((b, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: b.isWinner ? 'rgba(16, 185, 129, 0.1)' : 'rgba(8, 12, 22, 0.7)',
                border: `1px solid ${b.isWinner ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)'}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {b.isWinner ? (
                  <Award size={18} color="var(--accent-emerald)" />
                ) : (
                  <Lock size={16} color="var(--accent-rose)" />
                )}
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: b.isWinner ? '#fff' : 'var(--text-secondary)' }}>
                    {b.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {b.isWinner ? 'Disclosed Winning Offer' : 'Zero Information Leakage'}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: b.isWinner ? 'var(--accent-emerald)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {b.isWinner ? formatCurrency(b.bid) : '●●●●●●●'}
                </div>
                <div style={{ fontSize: '0.68rem', color: b.isWinner ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                  {b.isWinner ? 'WINNER DISCLOSED' : 'PERMANENTLY SEALED'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proof Summary Banner */}
      <div style={{
        marginTop: '1.25rem',
        padding: '0.85rem',
        borderRadius: 'var(--radius-sm)',
        background: 'rgba(56, 189, 248, 0.08)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <Sparkles size={18} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.78rem', color: 'var(--text-highlight)', lineHeight: 1.4 }}>
          <strong>Zero Collusion Advantage:</strong> Unsuccessful bidders never learn what competitors bid, eliminating bid-rigging and cartel formation.
        </div>
      </div>
    </div>
  );
};
