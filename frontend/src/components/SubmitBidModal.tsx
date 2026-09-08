import React, { useState, useEffect } from 'react';
import { X, Lock, EyeOff, RefreshCw, Shield, AlertCircle } from 'lucide-react';
import type { ProcurementTender, WalletAccount } from '../types/index.js';
import { generateRandomSalt, generateSealedCommitment, formatCurrency } from '../utils/crypto.js';

interface SubmitBidModalProps {
  tender: ProcurementTender | null;
  wallet: WalletAccount;
  onClose: () => void;
  onSubmit: (tenderId: string, bidAmount: number, salt: string) => Promise<void>;
}

export const SubmitBidModal: React.FC<SubmitBidModalProps> = ({
  tender,
  wallet,
  onClose,
  onSubmit,
}) => {
  if (!tender) return null;

  const [bidAmount, setBidAmount] = useState<string>('');
  const [salt, setSalt] = useState<string>(generateRandomSalt());
  const [commitmentHex, setCommitmentHex] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Compute live commitment hash as user types
  useEffect(() => {
    const num = parseFloat(bidAmount);
    if (!isNaN(num) && num > 0) {
      const bidderAddr = wallet.address || '0x0000000000000000000000000000000000000000';
      generateSealedCommitment(tender.id, num, salt, bidderAddr).then(({ commitmentHex }) => {
        setCommitmentHex(`0x${commitmentHex}`);
      });
    } else {
      setCommitmentHex('');
    }
  }, [tender.id, bidAmount, salt, wallet.address]);

  const handleRegenerateSalt = () => {
    setSalt(generateRandomSalt());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(bidAmount);

    if (isNaN(num) || num <= 0) {
      setError('Please specify a positive bid amount.');
      return;
    }

    if (num > tender.ceilingBudget) {
      setError(`Bid exceeds the RFP ceiling budget of ${formatCurrency(tender.ceilingBudget)}.`);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(tender.id, num, salt);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to submit sealed bid.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.4rem', background: 'var(--gold-badge)', borderRadius: '6px' }}>
              <Lock size={18} color="var(--gold-glow)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Submit Confidential Bid</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tender Context */}
        <div style={{
          background: 'var(--bg-input)',
          padding: '1rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.25rem',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target RFP</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
            {tender.title}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Ceiling Limit:</span>
            <span style={{ fontWeight: 700, color: 'var(--gold-glow)' }}>{formatCurrency(tender.ceilingBudget)}</span>
          </div>
        </div>

        {/* Privacy Invariant Banner */}
        <div style={{
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.85rem 1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          gap: '0.75rem',
        }}>
          <Shield size={20} color="var(--cyan-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-cyan)', lineHeight: 1.45 }}>
            <strong>Zero-Knowledge Guarantee:</strong> Your actual bid price never leaves this device. Only the cryptographic commitment hash is broadcasted to Midnight.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Bid Amount Input */}
          <div className="form-group">
            <label className="form-label" htmlFor="bidAmount">Confidential Bid Amount ($ USD / tNIGHT)</label>
            <input
              id="bidAmount"
              type="number"
              className="form-control"
              placeholder="e.g. 385000"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
              min="1"
              max={tender.ceilingBudget}
              step="any"
              autoFocus
            />
          </div>

          {/* Salt Entropy */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Commitment Salt (Random Secret Entropy)</label>
              <button
                type="button"
                onClick={handleRegenerateSalt}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--cyan-primary)',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  cursor: 'pointer',
                }}
              >
                <RefreshCw size={12} />
                Regenerate
              </button>
            </div>
            <input
              type="text"
              className="form-control"
              value={salt}
              readOnly
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}
            />
          </div>

          {/* Computed Commitment Preview */}
          {commitmentHex && (
            <div style={{
              background: 'var(--bg-base)',
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.25rem',
              border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                On-Chain Commitment Hash (Disclosed)
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--emerald-success)',
                wordBreak: 'break-all',
              }}>
                {commitmentHex}
              </div>
            </div>
          )}

          {error && (
            <div style={{
              color: 'var(--rose-danger)',
              fontSize: '0.82rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}>
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={isSubmitting || !commitmentHex}>
              {isSubmitting ? (
                <>
                  <RefreshCw size={16} className="spinning" />
                  Proving & Submitting...
                </>
              ) : (
                <>
                  <EyeOff size={16} />
                  Submit Sealed Bid
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
