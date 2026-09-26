import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, RefreshCw, AlertCircle } from 'lucide-react';
import type { ProcurementTender, WalletAccount } from '../types/index.js';
import { generateRandomSalt, sha256Hex, formatCurrency } from '../utils/crypto.js';

interface SubmitBidModalProps {
  tender: ProcurementTender;
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
  // Pure empty states by default (NO dummy mock prefilled strings)
  const [bidAmount, setBidAmount] = useState<string>('');
  const [salt, setSalt] = useState<string>(generateRandomSalt().slice(0, 16));
  const [commitment, setCommitment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Recompute commitment off-chain
  useEffect(() => {
    if (!bidAmount || isNaN(Number(bidAmount))) {
      setCommitment('');
      return;
    }

    const bidderAddr = wallet.address || 'mn_addr_preview108ezrx3t5syg4g9a3y3ykavl73ftl6nnn0ntctldpegl3f5l7acssug02u';
    const payload = `${tender.id}:${bidAmount}:${salt}:${bidderAddr}`;
    sha256Hex(payload).then((hash) => {
      setCommitment(`0x${hash}`);
    });
  }, [bidAmount, salt, tender.id, wallet.address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numAmount = Number(bidAmount);
    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid, strictly positive bid amount.');
      return;
    }

    if (numAmount > tender.ceilingBudget) {
      setError(`Bid exceeds tender ceiling budget of ${formatCurrency(tender.ceilingBudget)}.`);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(tender.id, numAmount, salt);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to submit sealed bid.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="neo-modal-backdrop" onClick={onClose}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="neo-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="neo-modal-header">
            <div>
              <span className="neo-badge neo-badge-yellow" style={{ marginBottom: '0.4rem' }}>
                Circuit: submitSealedBid()
              </span>
              <h2 style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>
                Submit Confidential Sealed Bid
              </h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Tender: {tender.title}
              </div>
            </div>

            <button className="neo-modal-close" onClick={onClose}>
              <X size={18} color="#000" />
            </button>
          </div>

          {/* Privacy Guarantee Box */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '2px solid #000',
            borderRadius: '6px',
            padding: '0.85rem',
            marginBottom: '1.25rem',
            fontSize: '0.82rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              <Lock size={15} color="var(--black)" />
              Zero Information Leakage Guarantee
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Your bid price remains inside your local wallet witness. Only a 32-byte cryptographic commitment is broadcast to Midnight validator nodes.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Confidential Bid Amount Input */}
            <div className="neo-form-group">
              <label className="neo-form-label">
                Confidential Bid Price (tNIGHT) *
              </label>
              <input
                type="number"
                className="neo-input"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter confidential bid (e.g. 195000)..."
                autoFocus
                required
              />

              {/* Quick Fill Testing Chips */}
              <div className="neo-input-helpers">
                <span style={{ fontSize: '0.72rem', fontWeight: 700, alignSelf: 'center' }}>
                  Quick presets:
                </span>
                <button
                  type="button"
                  className="neo-chip"
                  onClick={() => setBidAmount(String(Math.round(tender.ceilingBudget * 0.75)))}
                >
                  75% Ceiling ({formatCurrency(Math.round(tender.ceilingBudget * 0.75))})
                </button>
                <button
                  type="button"
                  className="neo-chip"
                  onClick={() => setBidAmount(String(Math.round(tender.ceilingBudget * 0.9)))}
                >
                  90% Ceiling ({formatCurrency(Math.round(tender.ceilingBudget * 0.9))})
                </button>
                {bidAmount && (
                  <button
                    type="button"
                    className="neo-chip"
                    style={{ background: '#FF5376', color: '#fff' }}
                    onClick={() => setBidAmount('')}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Random Salt Entropy */}
            <div className="neo-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="neo-form-label">
                  Cryptographic Salt Entropy (Off-Chain)
                </label>
                <button
                  type="button"
                  className="neo-chip"
                  onClick={() => setSalt(generateRandomSalt().slice(0, 16))}
                >
                  <RefreshCw size={11} style={{ marginRight: '3px' }} />
                  New Entropy
                </button>
              </div>
              <input
                type="text"
                className="neo-input"
                value={salt}
                readOnly
                style={{ background: 'var(--bg-secondary)', cursor: 'default' }}
              />
            </div>

            {/* Live Computed Commitment Preview */}
            <div className="neo-form-group">
              <label className="neo-form-label">
                On-Chain Commitment Hash (Public)
              </label>
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
                {commitment || '0x (Waiting for bid price input...)'}
              </div>
            </div>

            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'var(--accent-coral)',
                border: '2px solid #000',
                borderRadius: '4px',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#000',
                marginBottom: '1rem',
              }}>
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Submit Action */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                className="neo-btn"
                style={{ flex: 1 }}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="neo-btn neo-btn-primary"
                style={{ flex: 2 }}
                disabled={isSubmitting || !bidAmount}
              >
                <Lock size={16} />
                {isSubmitting ? 'Proving & Broadcasting...' : 'Seal & Submit Bid'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
