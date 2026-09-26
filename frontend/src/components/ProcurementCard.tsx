import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, CheckCircle2, Lock, Award } from 'lucide-react';
import type { ProcurementTender } from '../types/index.js';
import { getTimeRemaining, formatCurrency } from '../utils/crypto.js';

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
  const isExpired = Date.now() > tender.submissionDeadline;
  const isAwarded = tender.status === 'AWARDED';
  const isClosed = tender.status === 'BIDDING_CLOSED' || (isExpired && !isAwarded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="neo-card"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
    >
      <div>
        {/* Top Header: Organization & Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.85rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            {tender.organization}
          </span>

          {tender.status === 'BIDDING_OPEN' && !isExpired && (
            <span className="neo-badge neo-badge-yellow">
              <span className="pulse-dot" />
              Bidding Open
            </span>
          )}

          {isClosed && !isAwarded && (
            <span className="neo-badge neo-badge-coral">
              <Clock size={12} />
              Intake Closed
            </span>
          )}

          {isAwarded && (
            <span className="neo-badge neo-badge-mint">
              <Award size={12} />
              Awarded
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{ marginBottom: '0.75rem', lineHeight: 1.25 }}>
          {tender.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
          {tender.description}
        </p>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.65rem',
          padding: '0.85rem',
          background: 'var(--bg-secondary)',
          border: '2px solid #000',
          borderRadius: '6px',
          marginBottom: '1rem',
        }}>
          <div>
            <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)' }}>
              Ceiling Budget
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--black)' }}>
              {formatCurrency(tender.ceilingBudget)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)' }}>
              Sealed Bids
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--accent-violet)' }}>
              {tender.totalBidsSubmitted} Received
            </div>
          </div>
        </div>

        {/* Accreditation Gate */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--black)',
          marginBottom: '1.25rem',
        }}>
          <ShieldCheck size={15} color="var(--black)" />
          <span>{tender.complianceStandard}</span>
        </div>

        {/* Award Outcome if Awarded */}
        {isAwarded && tender.winningAmount && (
          <div style={{
            padding: '0.75rem',
            background: 'var(--accent-mint)',
            border: '2px solid #000',
            borderRadius: '6px',
            boxShadow: '2px 2px 0px #000',
            marginBottom: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>
              <CheckCircle2 size={15} />
              Awarded Winning Contract
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.15rem', marginTop: '0.2rem' }}>
              {formatCurrency(tender.winningAmount)}
            </div>
            <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', marginTop: '0.15rem', color: '#1A1A2E' }}>
              Supplier: {tender.winningBidderId}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ borderTop: '2px solid #000', paddingTop: '1rem', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            <Clock size={13} />
            <span>{isExpired ? 'Bidding Concluded' : getTimeRemaining(tender.submissionDeadline).text}</span>
          </div>

          <button
            className="neo-btn neo-btn-sm"
            style={{ background: '#fff', fontSize: '0.72rem' }}
            onClick={() => onVerifyComplianceClick(tender)}
            title="Prove compliance credentials via ZK proof"
          >
            <ShieldCheck size={13} />
            Prove ZK
          </button>
        </div>

        {tender.status === 'BIDDING_OPEN' && !isExpired && (
          <button
            className="neo-btn neo-btn-primary"
            style={{ width: '100%' }}
            onClick={() => onSubmitBidClick(tender)}
          >
            <Lock size={15} />
            Submit Sealed Bid
          </button>
        )}

        {isClosed && !isAwarded && (
          <button
            className="neo-btn neo-btn-violet"
            style={{ width: '100%' }}
            onClick={() => onAwardClick(tender)}
          >
            <Award size={15} />
            Evaluate & Award
          </button>
        )}

        {isAwarded && (
          <div style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            padding: '0.4rem',
          }}>
            🔒 Competitor bids remain sealed forever
          </div>
        )}
      </div>
    </motion.div>
  );
};
