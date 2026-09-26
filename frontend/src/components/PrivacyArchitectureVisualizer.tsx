import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const PrivacyArchitectureVisualizer: React.FC = () => {
  return (
    <div className="neo-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '2px solid #000', paddingBottom: '0.85rem' }}>
          <div>
            <span className="neo-badge neo-badge-violet" style={{ marginBottom: '0.35rem' }}>
              Mathematical Invariants
            </span>
            <h2 style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>
              Dual-State Privacy Model
            </h2>
          </div>
          <span className="neo-badge neo-badge-mint desktop-only">
            Zero Knowledge
          </span>
        </div>

        {/* Dual State Diagram Asset */}
        <div style={{
          border: '3px solid #000',
          borderRadius: '6px',
          boxShadow: '4px 4px 0px #000',
          overflow: 'hidden',
          marginBottom: '1.25rem',
          background: '#fff',
        }}>
          <img
            src="/images/bidshield_privacy_flow.jpg"
            alt="BidShield Zero-Knowledge Dual State Model"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Side-by-Side Invariant Comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {/* Private Box */}
          <div style={{
            background: 'var(--accent-yellow)',
            border: '2.5px solid #000',
            borderRadius: '6px',
            boxShadow: '3px 3px 0px #000',
            padding: '1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
              <EyeOff size={16} />
              Private (Never Disclosed)
            </div>
            <ul style={{ listStyle: 'none', fontSize: '0.78rem', color: '#1A1A2E', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontWeight: 600 }}>
              <li>🔒 Exact Supplier Bid Amount</li>
              <li>🔒 Random Cryptographic Salt</li>
              <li>🔒 Unsuccessful Competing Bids</li>
              <li>🔒 Proprietary Audit Credentials</li>
            </ul>
          </div>

          {/* Public Box */}
          <div style={{
            background: 'var(--accent-mint)',
            border: '2.5px solid #000',
            borderRadius: '6px',
            boxShadow: '3px 3px 0px #000',
            padding: '1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
              <Eye size={16} />
              Public (On-Chain Ledger)
            </div>
            <ul style={{ listStyle: 'none', fontSize: '0.78rem', color: '#1A1A2E', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontWeight: 600 }}>
              <li>✓ Tender Specs & Ceiling Budget</li>
              <li>✓ 32-Byte Commitment Hashes</li>
              <li>✓ Total Sealed Bids Counter</li>
              <li>✓ Awarded Winner (Post-Deadline)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
