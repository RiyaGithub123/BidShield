import React from 'react';
import { Github, Twitter, ExternalLink, MessageSquare } from 'lucide-react';
import type { MidnightNetwork } from '../types/index.js';
import { NETWORK_CONFIGS } from '../contracts/contractService.js';

interface FooterProps {
  network: MidnightNetwork;
  onDeployCustom?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ network, onDeployCustom }) => {
  const config = NETWORK_CONFIGS[network];

  return (
    <footer style={{
      background: 'var(--bg-canvas)',
      borderTop: 'var(--border-thick)',
      padding: '3rem 0 2rem 0',
      marginTop: '5rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <img src="/images/bidshield_logo.jpg" alt="BidShield Logo" style={{ width: 34, height: 34, border: '2px solid #000', borderRadius: '4px', boxShadow: '2px 2px 0px #000' }} />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.25rem', textTransform: 'uppercase' }}>
                BidShield
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
              Confidential Sealed-Bid Procurement & Reverse Auctions built on Midnight Network with Compact Zero-Knowledge Circuits.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href="https://github.com/RiyaGithub123/BidShield"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-sm"
                title="GitHub Repository"
              >
                <Github size={14} />
                GitHub
              </a>
              <a
                href="https://x.com/BidShieldApp"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-sm"
                style={{ background: '#1DA1F2', color: '#fff' }}
                title="Official X (Twitter) Profile"
              >
                <Twitter size={14} />
                @BidShieldApp
              </a>
            </div>
          </div>

          {/* Midnight Ecosystem Links */}
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '0.85rem' }}>
              Midnight Ecosystem
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li>
                <a href="https://midnight.network" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--black)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Official Midnight Network <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://docs.midnight.network" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--black)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Compact Docs & Circuits <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href={config.faucetUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--black)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {network.toUpperCase()} Testnet Faucet <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://1am.xyz" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--black)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  1AM Non-Custodial Wallet <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* User Feedback & Community */}
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '0.85rem' }}>
              Validation & Feedback
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Help shape confidential procurement on Midnight. Share feedback on wallet connection and proving UX:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfgDmijFVyHjYgssFxqKYkTEpkJtEu6pUdC-X7Wo305qPYNuw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-mint neo-btn-sm"
                style={{ display: 'inline-flex', width: 'auto' }}
              >
                <MessageSquare size={14} />
                Open Feedback Form
              </a>
              <a
                href="https://docs.google.com/spreadsheets/d/18tpSi3y6I2oKxWDkObl7RhVwwUzBVtuJ4jL-15vApgY/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.78rem', color: 'var(--black)', textDecoration: 'underline', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                View Live Audit Sheet <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Network Specs */}
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '0.85rem' }}>
              Network Specs
            </div>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '2px solid #000',
              borderRadius: '6px',
              padding: '0.75rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
            }}>
              <div>Target: <strong>{network.toUpperCase()}</strong></div>
              <div style={{ marginTop: '0.25rem', wordBreak: 'break-all' }}>
                Contract: {config.contractAddress}
              </div>
              <div style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span className="neo-badge neo-badge-yellow" style={{ fontSize: '0.65rem' }}>
                  ZK-Proof Verified
                </span>
                {onDeployCustom && (
                  <button
                    onClick={onDeployCustom}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      textDecoration: 'underline',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-secondary)',
                    }}
                    title="Deploy a custom contract instance"
                  >
                    Deploy Instance
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div style={{
          borderTop: '2px solid #000',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
        }}>
          <div>
            © 2026 BidShield Protocol. Open-source Apache 2.0. Built on Midnight Network.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
            <span>Powered by Midnight Compact & Zero-Knowledge Circuits</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
