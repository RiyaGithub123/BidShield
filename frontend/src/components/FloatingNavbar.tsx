import React, { useState } from 'react';
import { Wallet, ChevronDown, Sparkles, LogOut } from 'lucide-react';
import type { WalletAccount } from '../types/index.js';
import { formatAddress } from '../utils/crypto.js';

interface FloatingNavbarProps {
  wallet: WalletAccount;
  onConnectClick: () => void;
  onDisconnectClick: () => void;
  onCreateRfpClick: () => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  wallet,
  onConnectClick,
  onDisconnectClick,
  onCreateRfpClick,
  activeFilter,
  setActiveFilter,
}) => {
  const [showWalletMenu, setShowWalletMenu] = useState(false);

  return (
    <div className="floating-navbar-wrapper">
      <header className="floating-navbar">
        {/* Brand */}
        <div className="brand-badge">
          <img src="/bidshield_logo.jpg" alt="BidShield Logo" className="brand-emblem" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#fff' }}>
              BidShield
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
              Midnight Network
            </span>
          </div>
        </div>

        {/* Center Segmented Filter Control */}
        <div className="segmented-control desktop-only">
          <button
            className={`segmented-button ${activeFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ALL')}
          >
            All Tenders
          </button>
          <button
            className={`segmented-button ${activeFilter === 'BIDDING_OPEN' ? 'active' : ''}`}
            onClick={() => setActiveFilter('BIDDING_OPEN')}
          >
            Active Bidding
          </button>
          <button
            className={`segmented-button ${activeFilter === 'AWARDED' ? 'active' : ''}`}
            onClick={() => setActiveFilter('AWARDED')}
          >
            Awarded Contracts
          </button>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="btn-modern-primary desktop-only"
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.84rem' }}
            onClick={onCreateRfpClick}
          >
            <Sparkles size={15} />
            Publish RFP
          </button>

          {wallet.isConnected ? (
            <div style={{ position: 'relative' }}>
              <button
                className="btn-modern-glass"
                style={{ padding: '0.5rem 1rem', fontSize: '0.84rem', borderColor: 'var(--border-glow)' }}
                onClick={() => setShowWalletMenu(!showWalletMenu)}
              >
                <span className="status-dot-pulse" style={{ width: 6, height: 6 }} />
                <span>{formatAddress(wallet.address)}</span>
                <ChevronDown size={14} color="var(--text-muted)" />
              </button>

              {showWalletMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    width: '240px',
                    padding: '1.25rem',
                    background: '#0e1424',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                    zIndex: 1000,
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Connected Provider
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-cyan)', margin: '0.2rem 0 0.75rem 0' }}>
                    {wallet.walletName || 'Midnight 1AM Wallet'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Unshielded Balance
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                    {wallet.balance.toLocaleString()} tNIGHT
                  </div>
                  <button
                    className="btn-modern-glass"
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-rose)' }}
                    onClick={() => {
                      onDisconnectClick();
                      setShowWalletMenu(false);
                    }}
                  >
                    <LogOut size={14} />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="btn-modern-cyan"
              style={{ padding: '0.5rem 1.15rem', fontSize: '0.84rem' }}
              onClick={onConnectClick}
            >
              <Wallet size={15} />
              Connect Wallet
            </button>
          )}
        </div>
      </header>
    </div>
  );
};
