import React, { useState } from 'react';
import { Wallet, ChevronDown, Sparkles } from 'lucide-react';
import type { WalletAccount } from '../types/index.js';
import { formatAddress } from '../utils/crypto.js';

interface NavbarProps {
  wallet: WalletAccount;
  onConnectClick: () => void;
  onDisconnectClick: () => void;
  onCreateRfpClick: () => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wallet,
  onConnectClick,
  onDisconnectClick,
  onCreateRfpClick,
  activeFilter,
  setActiveFilter,
}) => {
  const [showWalletMenu, setShowWalletMenu] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand */}
        <div className="brand">
          <img src="/bidshield_logo.jpg" alt="BidShield Emblem" className="brand-logo" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-title">
              BidShield
              <span className="brand-tag">PREPROD</span>
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              Zero-Knowledge Procurement
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-only" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            className={`btn ${activeFilter === 'ALL' ? 'btn-secondary' : 'btn-outline'}`}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              borderColor: activeFilter === 'ALL' ? 'var(--cyan-primary)' : 'transparent',
            }}
            onClick={() => setActiveFilter('ALL')}
          >
            All Tenders
          </button>
          <button
            className={`btn ${activeFilter === 'BIDDING_OPEN' ? 'btn-secondary' : 'btn-outline'}`}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              borderColor: activeFilter === 'BIDDING_OPEN' ? 'var(--gold-primary)' : 'transparent',
            }}
            onClick={() => setActiveFilter('BIDDING_OPEN')}
          >
            Active Bidding
          </button>
          <button
            className={`btn ${activeFilter === 'AWARDED' ? 'btn-secondary' : 'btn-outline'}`}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              borderColor: activeFilter === 'AWARDED' ? 'var(--emerald-success)' : 'transparent',
            }}
            onClick={() => setActiveFilter('AWARDED')}
          >
            Awarded Contracts
          </button>
        </nav>

        {/* Right Action Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            className="btn btn-primary desktop-only"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.86rem' }}
            onClick={onCreateRfpClick}
          >
            <Sparkles size={16} />
            Publish RFP
          </button>

          {/* Wallet Button */}
          {wallet.isConnected ? (
            <div style={{ position: 'relative' }}>
              <button
                className="wallet-badge-connected"
                style={{ cursor: 'pointer', border: '1px solid var(--border-active)' }}
                onClick={() => setShowWalletMenu(!showWalletMenu)}
              >
                <span className="status-dot" />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {formatAddress(wallet.address)}
                </span>
                <ChevronDown size={14} color="var(--text-muted)" />
              </button>

              {showWalletMenu && (
                <div
                  className="glass-card"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '240px',
                    padding: '1rem',
                    zIndex: 200,
                    background: '#121a2c',
                  }}
                >
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Connected Provider
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, marginBottom: '0.85rem', color: 'var(--cyan-primary)' }}>
                    {wallet.walletName || 'Midnight 1AM Wallet'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    Unshielded Balance
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold-glow)', marginBottom: '1rem' }}>
                    {wallet.balance.toLocaleString()} tNIGHT
                  </div>
                  <button
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.82rem', borderColor: 'var(--rose-danger)' }}
                    onClick={() => {
                      onDisconnectClick();
                      setShowWalletMenu(false);
                    }}
                  >
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-cyan" onClick={onConnectClick} style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}>
              <Wallet size={16} />
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
