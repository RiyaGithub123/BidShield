import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

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
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [ceilingBudget, setCeilingBudget] = useState('');
  const [deadlineDays, setDeadlineDays] = useState('7');
  const [complianceStandard, setComplianceStandard] = useState('ISO-27001 / SOC2 Type II Certified');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const budget = parseFloat(ceilingBudget);

    if (!title.trim() || !organization.trim() || !description.trim()) {
      setError('Please fill in all required procurement details.');
      return;
    }

    if (isNaN(budget) || budget <= 0) {
      setError('Budget ceiling must be greater than zero.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await onCreate(
        title.trim(),
        organization.trim(),
        description.trim(),
        budget,
        parseInt(deadlineDays, 10),
        complianceStandard
      );
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to initialize procurement RFP on-chain.');
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
            <div style={{ padding: '0.4rem', background: 'var(--cyan-badge)', borderRadius: '6px' }}>
              <Sparkles size={18} color="var(--cyan-primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Create Procurement RFP</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* RFP Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="rfpTitle">Procurement Title / Tender Reference</label>
            <input
              id="rfpTitle"
              type="text"
              className="form-control"
              placeholder="e.g. NextGen Zero-Knowledge Infrastructure Audit"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Organization */}
          <div className="form-group">
            <label className="form-label" htmlFor="orgName">Issuing Enterprise / Organization</label>
            <input
              id="orgName"
              type="text"
              className="form-control"
              placeholder="e.g. Global FinTech Procurement Alliance"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="rfpDesc">Scope of Work & Requirements</label>
            <textarea
              id="rfpDesc"
              className="form-control"
              placeholder="Detail the technical specifications, delivery milestones, and evaluation criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Budget Ceiling & Deadline Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="ceilingBudget">Ceiling Budget ($ USD / tNIGHT)</label>
              <input
                id="ceilingBudget"
                type="number"
                className="form-control"
                placeholder="e.g. 500000"
                value={ceilingBudget}
                onChange={(e) => setCeilingBudget(e.target.value)}
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="deadlineDays">Submission Window</label>
              <select
                id="deadlineDays"
                className="form-control"
                value={deadlineDays}
                onChange={(e) => setDeadlineDays(e.target.value)}
              >
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days (Standard)</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days</option>
              </select>
            </div>
          </div>

          {/* Compliance Standard */}
          <div className="form-group">
            <label className="form-label" htmlFor="complianceStandard">Required Regulatory / ISO Standard</label>
            <select
              id="complianceStandard"
              className="form-control"
              value={complianceStandard}
              onChange={(e) => setComplianceStandard(e.target.value)}
            >
              <option value="ISO-27001 / SOC2 Type II Certified">ISO-27001 / SOC2 Type II Certified</option>
              <option value="PCI-DSS & SOC2 Certified">PCI-DSS & SOC2 Certified</option>
              <option value="FIPS 140-3 Level 4 Cryptographic Standard">FIPS 140-3 Level 4 Cryptographic Standard</option>
              <option value="W3C Verifiable Credentials Standard">W3C Verifiable Credentials Standard</option>
              <option value="HIPAA & Healthcare Data Security">HIPAA & Healthcare Data Security</option>
            </select>
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

          {/* Submit Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <RefreshCw size={16} className="spinning" />
                  Publishing On-Chain...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Deploy RFP Tender
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
