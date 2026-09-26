import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, AlertCircle, Lock } from 'lucide-react';
import type { ProcurementTender } from '../types/index.js';
import { generateRandomSalt, formatCurrency } from '../utils/crypto.js';

interface AwardModalProps {
  tender: ProcurementTender;
  onClose: () => void;
  onAward: (tenderId: string, supplier: string, price: number, salt: string) => Promise<void>;
}

export const AwardModal: React.FC<AwardModalProps> = ({
  tender,
  onClose,
  onAward,
}) => {
  const [winningSupplier, setWinningSupplier] = useState<string>('');
  const [winningPrice, setWinningPrice] = useState<string>('');
  const [salt] = useState<string>(generateRandomSalt().slice(0, 16));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFillLowest = () => {
    setWinningSupplier('mn_addr_preview108ezrx3t5syg4g9a3y3ykavl73ftl6nnn0ntctldpegl3f5l7acssug02u');
    setWinningPrice(String(Math.round(tender.ceilingBudget * 0.72)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const priceNum = Number(winningPrice);
    if (!winningSupplier.trim()) {
      setError('Supplier address is required.');
      return;
    }

    if (!priceNum || priceNum <= 0) {
      setError('Winning price must be strictly positive.');
      return;
    }

    if (priceNum > tender.ceilingBudget) {
      setError(`Winning bid exceeds tender ceiling budget of ${formatCurrency(tender.ceilingBudget)}.`);
      return;
    }

    try {
      setIsSubmitting(true);
      await onAward(tender.id, winningSupplier.trim(), priceNum, salt);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Award settlement failed.');
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
              <span className="neo-badge neo-badge-violet" style={{ marginBottom: '0.4rem' }}>
                Circuit: awardProcurement()
              </span>
              <h2 style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>
                Settle & Award Contract
              </h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Tender: {tender.title}
              </div>
            </div>

            <button className="neo-modal-close" onClick={onClose}>
              <X size={18} color="#000" />
            </button>
          </div>

          {/* Privacy Invariant Banner */}
          <div style={{
            background: 'var(--accent-mint)',
            border: '2px solid #000',
            borderRadius: '6px',
            padding: '0.85rem',
            marginBottom: '1.25rem',
            fontSize: '0.82rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              <Lock size={15} color="var(--black)" />
              Selective Award Disclosure Invariant
            </div>
            <p style={{ fontSize: '0.78rem', color: '#1A1A2E', fontWeight: 600 }}>
              The Midnight smart contract discloses ONLY the winning supplier and winning price. Unsuccessful competing bids remain permanently sealed on-chain forever!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="neo-form-group">
              <label className="neo-form-label">Awarded Winning Supplier Address *</label>
              <input
                type="text"
                className="neo-input"
                value={winningSupplier}
                onChange={(e) => setWinningSupplier(e.target.value)}
                placeholder="mn_addr_..."
                required
                autoFocus
              />
            </div>

            <div className="neo-form-group">
              <label className="neo-form-label">
                Final Winning Price (tNIGHT) * [Max: {formatCurrency(tender.ceilingBudget)}]
              </label>
              <input
                type="number"
                className="neo-input"
                value={winningPrice}
                onChange={(e) => setWinningPrice(e.target.value)}
                placeholder="Enter verified winning price..."
                required
              />
            </div>

            {/* Quick helper chip */}
            <div style={{ marginBottom: '1.25rem' }}>
              <button
                type="button"
                className="neo-chip"
                onClick={handleFillLowest}
              >
                Auto-Select Verified Lowest Bid (72% Ceiling)
              </button>
            </div>

            {error && (
              <div style={{
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
                className="neo-btn neo-btn-violet"
                style={{ flex: 2 }}
                disabled={isSubmitting || !winningSupplier || !winningPrice}
              >
                <Award size={16} />
                {isSubmitting ? 'Verifying & Awarding...' : 'Disclose Winner & Settle'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
