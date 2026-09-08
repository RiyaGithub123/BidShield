import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import type { ProcurementTender } from '../types/index.js';

interface ComplianceModalProps {
  tender: ProcurementTender | null;
  onClose: () => void;
  onVerify: (tenderId: string, secretKey: string) => Promise<{ verified: boolean }>;
}

export const ComplianceModal: React.FC<ComplianceModalProps> = ({
  tender,
  onClose,
  onVerify,
}) => {
  if (!tender) return null;

  const [secretKey, setSecretKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<{ verified: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretKey.trim()) {
      setError('Please provide your confidential accreditation key.');
      return;
    }

    setError(null);
    setIsVerifying(true);

    try {
      const res = await onVerify(tender.id, secretKey.trim());
      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'Verification failure.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUseStandardCredential = () => {
    setSecretKey(tender.complianceStandard);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.4rem', background: 'var(--emerald-badge)', borderRadius: '6px' }}>
              <ShieldCheck size={18} color="var(--emerald-success)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Zero-Knowledge Compliance</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Required Standard */}
        <div style={{
          background: 'var(--bg-input)',
          padding: '1rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.25rem',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            RFP Required Standard
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--emerald-success)', marginTop: '0.2rem' }}>
            {tender.complianceStandard}
          </div>
          <div style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            marginTop: '0.4rem',
            wordBreak: 'break-all',
          }}>
            Hash: {tender.complianceStandardHash}
          </div>
        </div>

        {/* ZK Explanation */}
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          This circuit computes a zero-knowledge membership proof confirming your enterprise holds the mandated accreditation without exposing your private company license keys to competitors or auditors.
        </p>

        <form onSubmit={handleVerify}>
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="supplierCert">Supplier Accreditation Key / Credential</label>
              <button
                type="button"
                onClick={handleUseStandardCredential}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--cyan-primary)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                Insert Verified Key
              </button>
            </div>
            <input
              id="supplierCert"
              type="text"
              className="form-control"
              placeholder="e.g. ISO-27001-Enterprise-Verification-Secret-2026"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              required
              autoFocus
            />
          </div>

          {result && (
            <div style={{
              background: result.verified ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
              border: `1px solid ${result.verified ? 'var(--emerald-success)' : 'var(--rose-danger)'}`,
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
            }}>
              {result.verified ? (
                <>
                  <CheckCircle2 size={20} color="var(--emerald-success)" />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--emerald-success)', fontSize: '0.92rem' }}>
                      ZK Compliance Proof Verified!
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Credential satisfies all RFP security standards.
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle size={20} color="var(--rose-danger)" />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--rose-danger)', fontSize: '0.92rem' }}>
                      Accreditation Mismatch
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Credential hash does not match the mandated standard.
                    </div>
                  </div>
                </>
              )}
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

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose} disabled={isVerifying}>
              Close
            </button>
            <button type="submit" className="btn btn-cyan" style={{ flex: 2 }} disabled={isVerifying}>
              {isVerifying ? (
                <>
                  <RefreshCw size={16} className="spinning" />
                  Evaluating ZK Circuit...
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Prove Credential
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
