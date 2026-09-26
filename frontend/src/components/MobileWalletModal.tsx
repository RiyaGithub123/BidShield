import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, ExternalLink, ShieldCheck, Zap, Laptop, ArrowRight } from 'lucide-react';
import type { MidnightNetwork } from '../types/index.js';
import { useDevice } from '../utils/deviceDetect.js';

interface MobileWalletModalProps {
  isOpen: boolean;
  network: MidnightNetwork;
  onClose: () => void;
  onConnectAttempt: () => Promise<boolean>;
  onConnectDemo: () => void;
}

export const MobileWalletModal: React.FC<MobileWalletModalProps> = ({
  isOpen,
  network,
  onClose,
  onConnectAttempt,
  onConnectDemo,
}) => {
  const device = useDevice();

  if (!isOpen) return null;

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
                Midnight DApp Connector
              </span>
              <h2 style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>
                Connect Midnight Wallet
              </h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Active Target: {network.toUpperCase()} Testnet
              </div>
            </div>

            <button className="neo-modal-close" onClick={onClose}>
              <X size={18} color="#000" />
            </button>
          </div>

          {/* Quick Notice */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '2px solid #000',
            borderRadius: '6px',
            padding: '0.85rem',
            marginBottom: '1.25rem',
            fontSize: '0.82rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              <ShieldCheck size={16} color="var(--black)" />
              Detected Device: {device.deviceType.toUpperCase()} ({device.os.toUpperCase()})
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {device.isMobile
                ? 'Mobile browser detected. You can launch 1AM Wallet or run the live Sandbox Demo.'
                : 'Connect via 1AM Wallet or Lace browser extension on Midnight.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Option 1: Browser Extension (if on desktop) */}
            {device.isDesktop && (
              <button
                className="neo-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  cursor: 'pointer',
                  background: '#FFFFFF',
                  textAlign: 'left',
                }}
                onClick={async () => {
                  const ok = await onConnectAttempt();
                  if (ok) onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: '4px',
                    border: '2px solid #000',
                    background: 'var(--accent-yellow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Laptop size={20} color="#000" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Browser Extension</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>1AM Wallet or Lace Midnight</div>
                  </div>
                </div>
                <ArrowRight size={18} />
              </button>
            )}

            {/* Option 2: Instant Demo Sandbox Wallet (Evaluator Convenience) */}
            <button
              className="neo-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                cursor: 'pointer',
                background: 'var(--accent-mint)',
                textAlign: 'left',
              }}
              onClick={() => {
                onConnectDemo();
                onClose();
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '4px',
                  border: '2px solid #000',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Zap size={20} color="#000" />
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '0.95rem', textTransform: 'uppercase' }}>
                    Instant Demo Sandbox
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#1A1A2E', fontWeight: 600 }}>
                    Test full ZK procurement with pre-funded {network.toUpperCase()} keys
                  </div>
                </div>
              </div>
              <ArrowRight size={18} />
            </button>

            {/* Option 3: 1AM Mobile Wallet Deep Link */}
            <a
              href={device.oneAmDeepLink}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                textDecoration: 'none',
                background: '#FFFFFF',
                color: 'var(--black)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '4px',
                  border: '2px solid #000',
                  background: 'var(--accent-sky)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Smartphone size={20} color="#000" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>1AM Wallet App</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Get 1AM on iOS / Android / Chrome</div>
                </div>
              </div>
              <ExternalLink size={18} />
            </a>
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button className="neo-btn neo-btn-sm" onClick={onClose} style={{ width: '100%' }}>
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
