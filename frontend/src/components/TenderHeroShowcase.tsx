import React from 'react';
import { Lock, Clock, Building2, ShieldCheck, ArrowRight, EyeOff } from 'lucide-react';
import type { ProcurementTender } from '../types/index.js';
import { formatCurrency, getTimeRemaining } from '../utils/crypto.js';

interface TenderHeroShowcaseProps {
  tender: ProcurementTender;
  onSubmitBidClick: (tender: ProcurementTender) => void;
  onVerifyComplianceClick: (tender: ProcurementTender) => void;
}

export const TenderHeroShowcase: React.FC<TenderHeroShowcaseProps> = ({
  tender,
  onSubmitBidClick,
  onVerifyComplianceClick,
}) => {
  const { text: timeRemaining, isExpired } = getTimeRemaining(tender.submissionDeadline);

  return (
    <div className="bento-card span-12" style={{
      background: 'linear-gradient(135deg, rgba(14, 22, 42, 0.9) 0%, rgba(20, 32, 60, 0.9) 100%)',
      border: '1px solid rgba(56, 189, 248, 0.35)',
      boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.1)',
      padding: '2.5rem 2rem',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'center',
      }}>
        {/* Left Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <span className="badge-pill badge-pill-cyan">
              <span className="status-dot-pulse" style={{ width: 6, height: 6 }} />
              Featured Active Tender
            </span>
            <span className="badge-pill badge-pill-gold">
              {tender.complianceStandard}
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.25, marginBottom: '0.85rem' }}>
            {tender.title}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            <Building2 size={16} color="var(--accent-cyan)" />
            <span>Issued by <strong style={{ color: 'var(--text-primary)' }}>{tender.organization}</strong></span>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem', maxWidth: '640px' }}>
            {tender.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn-modern-primary"
              style={{ padding: '0.85rem 1.8rem', fontSize: '0.96rem' }}
              onClick={() => onSubmitBidClick(tender)}
            >
              <Lock size={18} />
              Submit Confidential Bid
              <ArrowRight size={16} />
            </button>

            <button
              className="btn-modern-glass"
              style={{ padding: '0.85rem 1.6rem', fontSize: '0.96rem' }}
              onClick={() => onVerifyComplianceClick(tender)}
            >
              <ShieldCheck size={18} color="var(--accent-cyan)" />
              Verify Compliance ZK
            </button>
          </div>
        </div>

        {/* Right Metric Board */}
        <div style={{
          background: 'rgba(7, 11, 20, 0.85)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Procurement Budget Ceiling
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
              {formatCurrency(tender.ceilingBudget)}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
          }}>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <EyeOff size={13} color="var(--accent-cyan)" />
                Sealed Bids
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginTop: '0.2rem' }}>
                {tender.totalBidsSubmitted} Received
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={13} color="var(--accent-gold)" />
                Time Remaining
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: isExpired ? 'var(--accent-rose)' : 'var(--accent-emerald)', marginTop: '0.2rem' }}>
                {timeRemaining}
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(56, 189, 248, 0.08)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.78rem',
            color: 'var(--text-highlight)',
            lineHeight: 1.4,
          }}>
            🔐 <strong>Privacy Guarantee:</strong> All competitor submissions are cryptographically sealed with zero leakage. Only the winning bid is published upon award.
          </div>
        </div>
      </div>
    </div>
  );
};
