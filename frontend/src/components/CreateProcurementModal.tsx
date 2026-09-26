import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertCircle } from 'lucide-react';

interface CreateProcurementModalProps {
  onClose: () => void;
  onCreate: (
    title: string,
    organization: string,
    description: string,
    ceilingBudget: number,
    deadlineDays: number,
    complianceStandard: string
  ) => Promise<void>;
}

export const CreateProcurementModal: React.FC<CreateProcurementModalProps> = ({
  onClose,
  onCreate,
}) => {
  // Pure empty states by default (NO prefilled dummy values)
  const [title, setTitle] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ceilingBudget, setCeilingBudget] = useState<string>('');
  const [deadlineDays, setDeadlineDays] = useState<string>('5');
  const [complianceStandard, setComplianceStandard] = useState<string>('ISO-27001 / SOC2 Type II Certified');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFillSample = () => {
    setTitle('Quantum-Resistant Enclave HSM Modules 2026');
    setOrganization('Zero-Knowledge Infrastructure DAO');
    setDescription('Procurement of high-assurance hardware security enclaves with remote attestation capabilities.');
    setCeilingBudget('500000');
    setDeadlineDays('7');
    setComplianceStandard('FIPS 140-3 Level 4 Cryptographic Standard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const budgetNum = Number(ceilingBudget);
    const daysNum = Number(deadlineDays);

    if (!title.trim() || !organization.trim()) {
      setError('Title and Organization are required fields.');
      return;
    }

    if (!budgetNum || budgetNum <= 0) {
      setError('Please provide a strictly positive ceiling budget.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onCreate(title, organization, description, budgetNum, daysNum, complianceStandard);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to initialize procurement tender.');
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
                Circuit: initializeProcurement()
              </span>
              <h2 style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>
                Publish Procurement RFP
              </h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Open a new sealed-bid tender on Midnight
              </div>
            </div>

            <button className="neo-modal-close" onClick={onClose}>
              <X size={18} color="#000" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Tender Title */}
            <div className="neo-form-group">
              <label className="neo-form-label">Procurement RFP Title *</label>
              <input
                type="text"
                className="neo-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Zero-Knowledge Cryptographic Audit 2026..."
                required
                autoFocus
              />
            </div>

            {/* Issuing Organization */}
            <div className="neo-form-group">
              <label className="neo-form-label">Issuing Organization / Agency *</label>
              <input
                type="text"
                className="neo-input"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Midnight Foundation / Global FinTech DAO..."
                required
              />
            </div>

            {/* Scope of Work */}
            <div className="neo-form-group">
              <label className="neo-form-label">Scope of Work & Requirements</label>
              <textarea
                className="neo-input neo-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe procurement specifications, deliverables, and SLAs..."
              />
            </div>

            {/* Ceiling Budget & Deadline Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="neo-form-group">
                <label className="neo-form-label">Ceiling Budget (tNIGHT) *</label>
                <input
                  type="number"
                  className="neo-input"
                  value={ceilingBudget}
                  onChange={(e) => setCeilingBudget(e.target.value)}
                  placeholder="e.g. 450000"
                  required
                />
              </div>

              <div className="neo-form-group">
                <label className="neo-form-label">Intake Window (Days) *</label>
                <input
                  type="number"
                  className="neo-input"
                  value={deadlineDays}
                  onChange={(e) => setDeadlineDays(e.target.value)}
                  min="1"
                  max="60"
                  required
                />
              </div>
            </div>

            {/* Accreditation Standard */}
            <div className="neo-form-group">
              <label className="neo-form-label">Mandated ZK Compliance Gate</label>
              <select
                className="neo-input"
                value={complianceStandard}
                onChange={(e) => setComplianceStandard(e.target.value)}
                style={{ cursor: 'pointer' }}
              >
                <option value="ISO-27001 / SOC2 Type II Certified">ISO-27001 / SOC2 Type II Certified</option>
                <option value="PCI-DSS & SOC2 Certified">PCI-DSS & SOC2 Certified</option>
                <option value="FIPS 140-3 Level 4 Cryptographic Standard">FIPS 140-3 Level 4 Cryptographic Standard</option>
                <option value="W3C Verifiable Credentials Standard">W3C Verifiable Credentials Standard</option>
              </select>
            </div>

            {/* Non-intrusive Preset Button */}
            <div style={{ marginBottom: '1.25rem' }}>
              <button
                type="button"
                className="neo-chip"
                onClick={handleFillSample}
              >
                Fill RFP Template
              </button>
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
                disabled={isSubmitting || !title || !ceilingBudget}
              >
                <Sparkles size={16} />
                {isSubmitting ? 'Broadcasting Tender...' : 'Publish RFP Tender'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
