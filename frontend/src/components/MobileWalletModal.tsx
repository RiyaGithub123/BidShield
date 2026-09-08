import React from 'react';
import { X, Smartphone, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

interface MobileWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectAttempt: () => void;
}

export const MobileWalletModal: React.FC<MobileWalletModalProps> = ({
  isOpen,
  onClose,
  onConnectAttempt,
}) => {
  if (!isOpen) return null;

  const handleOpen1AMApp = () => {
    // 1AM Wallet mobile deep link scheme and fallback web portal
    window.location.href = 'https://midnight.network/wallet';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.4rem', background: 'var(--cyan-badge)', borderRadius: '6px' }}>
              <Smartphone size={18} color="var(--cyan-primary)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Connect Midnight Wallet</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          Connect your 1AM Wallet or Lace to authorize confidential zero-knowledge transactions and submit sealed bids.
        </p>

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {/* Direct Extension Connect */}
          <button
            className="btn btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-active)',
              textAlign: 'left',
              width: '100%',
            }}
            onClick={() => {
              onConnectAttempt();
              onClose();
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'rgba(56, 189, 248, 0.15)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ShieldCheck size={20} color="var(--cyan-primary)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  1AM / Lace Extension
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Auto-detect browser extension on Preprod
                </div>
              </div>
            </div>
            <ArrowRight size={18} color="var(--cyan-primary)" />
          </button>

          {/* Mobile App Redirect */}
          <button
            className="btn btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'left',
              width: '100%',
            }}
            onClick={handleOpen1AMApp}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'rgba(12, 18, 32, 0.25)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Smartphone size={20} color="#0c1220" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0c1220' }}>
                  Open 1AM Mobile Wallet
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(12, 18, 32, 0.8)' }}>
                  Redirect to mobile app or install portal
                </div>
              </div>
            </div>
            <ExternalLink size={18} color="#0c1220" />
          </button>
        </div>

        {/* Faucet Notice */}
        <div style={{
          background: 'var(--bg-input)',
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          lineHeight: 1.45,
        }}>
          💡 Need test tokens for Preprod? Request free tNIGHT from the official{' '}
          <a
            href="https://midnight-tmnight-preprod.nethermind.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--cyan-primary)', textDecoration: 'none', fontWeight: 600 }}
          >
            Midnight Preprod Faucet
          </a>.
        </div>
      </div>
    </div>
  );
};
