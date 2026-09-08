import React from 'react';
import { Lock, Clock, Building2, ShieldAlert, Award, CheckCircle2, EyeOff } from 'lucide-react';
import type { ProcurementTender } from '../types/index.js';
import { formatCurrency, getTimeRemaining, formatAddress } from '../utils/crypto.js';

interface ProcurementCardProps {
  tender: ProcurementTender;
  onSubmitBidClick: (tender: ProcurementTender) => void;
  onVerifyComplianceClick: (tender: ProcurementTender) => void;
  onAwardClick: (tender: ProcurementTender) => void;
}

export const ProcurementCard: React.FC<ProcurementCardProps> = ({
  tender,
  onSubmitBidClick,
  onVerifyComplianceClick,
  onAwardClick,
}) => {
  const { text: timeText, isExpired } = getTimeRemaining(tender.submissionDeadline);

  const getStatusBadge = () => {
    switch (tender.status) {
      case 'BIDDING_OPEN':
        return (
          <span className="badge-pill badge-pill-cyan">
            <span className="status-dot-pulse" style={{ width: 6, height: 6 }} />
            Bidding Open
          </span>
        );
      case 'BIDDING_CLOSED':
        return <span className="badge-pill badge-pill-gold">Bidding Closed</span>;
      case 'AWARDED':
        return (
          <span className="badge-pill badge-pill-emerald">
            <CheckCircle2 size={12} />
            Contract Awarded
          </span>
        );
    }
  };

  return (
    <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          <Building2 size={15} color="var(--accent-cyan)" />
          <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{tender.organization}</span>
        </div>
        {getStatusBadge()}
      </div>

      {/* RFP Title */}
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: 1.35, color: '#fff' }}>
        {tender.title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flexGrow: 1, lineHeight: 1.55 }}>
        {tender.description}
      </p>

      {/* Specs Grid */}
      <div style={{
        background: 'rgba(8, 12, 22, 0.85)',
        borderRadius: 'var(--radius-sm)',
        padding: '1rem',
        marginBottom: '1.25rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
        border: '1px solid var(--border-subtle)',
      }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Budget Ceiling
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
            {formatCurrency(tender.ceilingBudget)}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Sealed Bids
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <EyeOff size={14} />
            {tender.totalBidsSubmitted} Received
          </div>
        </div>

        <div style={{ gridColumn: 'span 2', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={12} />
            Submission Window
          </div>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: isExpired ? 'var(--accent-rose)' : '#fff', marginTop: '0.15rem' }}>
            {timeText}
          </div>
        </div>
      </div>

      {/* Compliance Standard */}
      <div style={{
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
      }}>
        <ShieldAlert size={14} color="var(--accent-cyan)" />
        <span>RFP Standard: <strong style={{ color: 'var(--text-secondary)' }}>{tender.complianceStandard}</strong></span>
      </div>

      {/* Award Outcome if Awarded */}
      {tender.status === 'AWARDED' && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.85rem 1rem',
          marginBottom: '1.25rem',
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            🏆 Awarded Winning Bid
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#fff', fontFamily: 'var(--font-mono)' }}>
              {formatAddress(tender.winningBidderId)}
            </span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {tender.winningAmount ? formatCurrency(tender.winningAmount) : 'Settled'}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.65rem', marginTop: 'auto' }}>
        {tender.status === 'BIDDING_OPEN' && (
          <>
            <button
              className="btn-modern-primary"
              style={{ flex: 1, padding: '0.65rem 0.9rem', fontSize: '0.85rem' }}
              onClick={() => onSubmitBidClick(tender)}
            >
              <Lock size={15} />
              Submit Bid
            </button>
            <button
              className="btn-modern-glass"
              style={{ padding: '0.65rem 0.9rem', fontSize: '0.85rem' }}
              onClick={() => onVerifyComplianceClick(tender)}
              title="Verify Compliance Credential"
            >
              Verify ZK
            </button>
          </>
        )}

        {tender.status === 'BIDDING_CLOSED' && (
          <button
            className="btn-modern-cyan"
            style={{ width: '100%', padding: '0.7rem', fontSize: '0.88rem' }}
            onClick={() => onAwardClick(tender)}
          >
            <Award size={16} />
            Evaluate & Award Winner
          </button>
        )}

        {tender.status === 'AWARDED' && (
          <button
            className="btn-modern-glass"
            style={{ width: '100%', padding: '0.7rem', fontSize: '0.88rem', opacity: 0.9 }}
            disabled
          >
            <CheckCircle2 size={16} color="var(--accent-emerald)" />
            Procurement Settled On-Chain
          </button>
        )}
      </div>
    </div>
  );
};
