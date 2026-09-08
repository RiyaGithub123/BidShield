import React, { useState } from 'react';
import { X, Award, AlertCircle, RefreshCw } from 'lucide-react';
import type { ProcurementTender } from '../types/index.js';
import { formatCurrency } from '../utils/crypto.js';

interface AwardModalProps {
  tender: ProcurementTender | null;
  onClose: () => void;
  onAward: (tenderId: string, supplier: string, price: number, salt: string) => Promise<void>;
}

export const AwardModal: React.FC<AwardModalProps> = ({
  tender,
  onClose,
  onAward,
}) => {
  if (!tender) return null;

  const [supplierAddress, setSupplierAddress] = useState('mn_addr_preprod1gg6wcy47l6nacuh7n9aeycwsnsqjuvkuc5vxyhyh79z04kctgt5sxd5gaw');
  const [winningPrice, setWinningPrice] = useState(tender.ceilingBudget ? (tender.ceilingBudget * 0.85).toString() : '');
  const salt = '4f9a12c8e3d5b7a091e4f6217c80a2b5';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(winningPrice);

    if (!supplierAddress.trim()) {
      setError('Supplier address is required.');
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError('Winning price must be greater than zero.');
      return;
    }

    if (price > tender.ceilingBudget) {
      setError(`Award price cannot exceed the budget ceiling of ${formatCurrency(tender.ceilingBudget)}.`);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await onAward(tender.id, supplierAddress.trim(), price, salt);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to award contract.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.4rem', background: 'var(--gold-badge)', borderRadius: '6px' }}>
              <Award size={18} color="var(--gold-glow)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Award Tender & Settle</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{
          background: 'var(--bg-input)',
          padding: '1rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.25rem',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Procurement Target</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
            {tender.title}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Ceiling Budget:</span>
            <span style={{ fontWeight: 700, color: 'var(--gold-glow)' }}>{formatCurrency(tender.ceilingBudget)}</span>
          </div>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          Awarding discloses only the winning supplier and contract price to the public ledger. Unsuccessful competitor bids remain sealed forever!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="supplierAddress">Awarded Supplier Address</label>
            <input
              id="supplierAddress"
              type="text"
              className="form-control"
              value={supplierAddress}
              onChange={(e) => setSupplierAddress(e.target.value)}
              required
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="winningPrice">Final Contract Price ($ USD / tNIGHT)</label>
            <input
              id="winningPrice"
              type="number"
              className="form-control"
              value={winningPrice}
              onChange={(e) => setWinningPrice(e.target.value)}
              required
              min="1"
              max={tender.ceilingBudget}
              step="any"
            />
          </div>

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

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <RefreshCw size={16} className="spinning" />
                  Settling on Midnight...
                </>
              ) : (
                <>
                  <Award size={16} />
                  Award Contract
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
