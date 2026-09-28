import React, { useState } from 'react';
import { Sparkles, Globe, LogOut, ChevronDown, Check, BookOpen } from 'lucide-react';
import type { WalletAccount, MidnightNetwork } from '../types/index.js';
import { formatAddress } from '../utils/crypto.js';

interface FloatingNavbarProps {
  wallet: WalletAccount;
  network: MidnightNetwork;
  onConnectClick: () => void;
  onDisconnectClick: () => void;
  onCreateRfpClick: () => void;
  onSwitchNetwork: (network: MidnightNetwork) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  wallet,
  network,
  onConnectClick,
  onDisconnectClick,
  onCreateRfpClick,
  onSwitchNetwork,
  activeFilter,
  setActiveFilter,
}) => {
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);

  const handleNavigate = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'DOCS') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const el = document.getElementById('tenders-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }
  };

  return (
    <header className="neo-navbar">
      <div className="container neo-navbar-inner">
        {/* Brand & Logo */}
        <div
          className="neo-brand"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setActiveFilter('ALL');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src="/images/bidshield_logo.jpg" alt="BidShield Logo" className="neo-brand-logo" />
          <div>
            <div className="neo-brand-name">BidShield</div>
            <div className="neo-brand-tagline">Midnight Zero-Knowledge</div>
          </div>
        </div>

        {/* Center Segmented Filter (Desktop) */}
        <div className="neo-segmented-group desktop-only">
          <button
            className={`neo-segmented-item ${activeFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => handleNavigate('ALL')}
          >
            All Tenders
          </button>
          <button
            className={`neo-segmented-item ${activeFilter === 'BIDDING_OPEN' ? 'active' : ''}`}
            onClick={() => handleNavigate('BIDDING_OPEN')}
          >
            Active Bidding
          </button>
          <button
            className={`neo-segmented-item ${activeFilter === 'AWARDED' ? 'active' : ''}`}
            onClick={() => handleNavigate('AWARDED')}
          >
            Awarded
          </button>
          <button
            className={`neo-segmented-item ${activeFilter === 'DOCS' ? 'active' : ''}`}
            onClick={() => handleNavigate('DOCS')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <BookOpen size={13} />
            Circuit Docs
          </button>
        </div>

        {/* Right Actions: Network Switcher + Publish RFP + Wallet Connect */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Network Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className="neo-network-switch"
              onClick={() => {
                setShowNetworkMenu(!showNetworkMenu);
                setShowWalletMenu(false);
              }}
              title="Switch Midnight Network"
            >
              <Globe size={15} color="var(--black)" />
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {network}
              </span>
              <span className="pulse-dot" style={{ backgroundColor: network === 'preview' ? 'var(--accent-mint)' : 'var(--accent-sky)' }} />
              <ChevronDown size={14} />
            </button>

            {showNetworkMenu && (
              <div
                className="neo-card"
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '210px',
                  padding: '0.5rem',
                  zIndex: 150,
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div style={{ padding: '0.4rem 0.6rem', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Select Network
                </div>
                <button
                  className="neo-btn neo-btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    marginBottom: '0.35rem',
                    background: network === 'preview' ? 'var(--accent-yellow)' : '#fff',
                  }}
                  onClick={() => {
                    onSwitchNetwork('preview');
                    setShowNetworkMenu(false);
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="pulse-dot" style={{ backgroundColor: 'var(--accent-mint)' }} />
                    Preview Testnet
                  </span>
                  {network === 'preview' && <Check size={14} />}
                </button>

                <button
                  className="neo-btn neo-btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    background: network === 'preprod' ? 'var(--accent-yellow)' : '#fff',
                  }}
                  onClick={() => {
                    onSwitchNetwork('preprod');
                    setShowNetworkMenu(false);
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="pulse-dot" style={{ backgroundColor: 'var(--accent-sky)' }} />
                    Preprod Testnet
                  </span>
                  {network === 'preprod' && <Check size={14} />}
                </button>
              </div>
            )}
          </div>

          {/* Publish RFP CTA (Desktop) */}
          <button
            className="neo-btn neo-btn-primary desktop-only"
            onClick={onCreateRfpClick}
            style={{ padding: '0.6rem 1.1rem' }}
          >
            <Sparkles size={16} />
            Publish RFP
          </button>

          {/* Wallet Connect / Disconnect */}
          {wallet.isConnected ? (
            <div style={{ position: 'relative' }}>
              <button
                className="neo-btn neo-btn-mint"
                style={{ padding: '0.6rem 1rem' }}
                onClick={() => {
                  setShowWalletMenu(!showWalletMenu);
                  setShowNetworkMenu(false);
                }}
              >
                <span className="pulse-dot" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem' }}>
                  {formatAddress(wallet.address)}
                </span>
                <ChevronDown size={14} />
              </button>

              {showWalletMenu && (
                <div
                  className="neo-card"
                  style={{
                    position: 'absolute',
                    top: '115%',
                    right: 0,
                    width: '240px',
                    padding: '1rem',
                    zIndex: 150,
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Connected Provider
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', marginTop: '0.2rem' }}>
                    {wallet.walletName || 'Midnight Wallet'}
                  </div>

                  <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'var(--bg-secondary)', border: '1.5px solid #000', borderRadius: '4px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Full Address:</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', wordBreak: 'break-all', marginTop: '0.15rem' }}>
                      {wallet.address}
                    </div>
                  </div>

                  <button
                    className="neo-btn neo-btn-coral neo-btn-sm"
                    style={{ width: '100%', marginTop: '0.85rem' }}
                    onClick={() => {
                      onDisconnectClick();
                      setShowWalletMenu(false);
                    }}
                  >
                    <LogOut size={14} />
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="neo-btn neo-btn-mint"
              style={{ padding: '0.6rem 1.2rem' }}
              onClick={onConnectClick}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
