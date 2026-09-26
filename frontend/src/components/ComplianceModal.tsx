import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Key } from 'lucide-react';
import type { ProcurementTender } from '../types/index.js';

interface ComplianceModalProps {
  tender: ProcurementTender;
  onClose: () => void;
  onVerify: (tenderId: string, credentialSecret: string) => Promise<{ verified: boolean; accreditationHash: string }>;
}

export const ComplianceModal: React.FC<ComplianceModalProps> = ({
  tender,
  onClose,
  onVerify,
}) => {
  const [credentialSecret, setCredentialSecret] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [result, setResult] = useState<{ verified: boolean; accreditationHash: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentialSecret.trim()) return;

    try {
      setIsVerifying(true);
      setError(null);
      const res = await onVerify(tender.id, credentialSecret.trim());
      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'Verification execution failed.');
    } finally {
      setIsVerifying(false);
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
                Circuit: verifyCompliance()
              </span>
              <h2 style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>
                Prove Accreditation in ZK
              </h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Tender: {tender.title}
              </div>
            </div>

            <button className="neo-modal-close" onClick={onClose}>
              <X size={18} color="#000" />
            </button>
          </div>

          {/* Mandated Standard Box */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '2px solid #000',
            borderRadius: '6px',
            padding: '0.85rem',
            marginBottom: '1.25rem',
            fontSize: '0.82rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              <ShieldCheck size={15} color="var(--black)" />
              Mandated RFP Standard
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9rem' }}>
              {tender.complianceStandard}
            </div>
            <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '0.25rem', wordBreak: 'break-all' }}>
              Standard Hash: {tender.complianceStandardHash}
            </div>
          </div>

          <form onSubmit={handleVerify}>
            <div className="neo-form-group">
              <label className="neo-form-label">
                Private Supplier Accreditation Key *
              </label>
              <input
                type="text"
                className="neo-input"
                value={credentialSecret}
                onChange={(e) => setCredentialSecret(e.target.value)}
                placeholder="Enter private credential token..."
                required
                autoFocus
              />

              {/* Preset helper chip */}
              <div className="neo-input-helpers">
                <span style={{ fontSize: '0.72rem', fontWeight: 700, alignSelf: 'center' }}>
                  Helper:
                </span>
                <button
                  type="button"
                  className="neo-chip"
                  onClick={() => setCredentialSecret(tender.complianceStandard)}
                >
                  Use Matching Standard Token
                </button>
              </div>
            </div>

            {result && (
              <div style={{
                padding: '0.85rem',
                border: '2.5px solid #000',
                borderRadius: '6px',
                boxShadow: '3px 3px 0px #000',
                marginBottom: '1.25rem',
                background: result.verified ? 'var(--accent-mint)' : 'var(--accent-coral)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.88rem' }}>
                  {result.verified ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {result.verified ? 'ZK Compliance Verified!' : 'Accreditation Mismatch'}
                </div>
                <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {result.verified
                    ? 'Mathematical proof valid! The smart contract confirms you satisfy requirements without viewing proprietary credentials.'
                    : 'The credential hash does not match the mandated RFP standard.'}
                </div>
              </div>
            )}

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
                Close
              </button>
              <button
                type="submit"
                className="neo-btn neo-btn-mint"
                style={{ flex: 2 }}
                disabled={isVerifying || !credentialSecret}
              >
                <Key size={16} />
                {isVerifying ? 'Generating ZK Proof...' : 'Verify in Zero-Knowledge'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
