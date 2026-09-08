import React from 'react';
import { Github, Twitter, ExternalLink, FileCode } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'rgba(10, 15, 26, 0.95)',
      padding: '3rem 0 2rem 0',
      marginTop: '5rem',
      position: 'relative',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <img src="/bidshield_logo.jpg" alt="BidShield Logo" style={{ width: 32, height: 32, borderRadius: 6 }} />
              <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                BidShield
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '320px' }}>
              Privacy-preserving sealed-bid procurement & reverse auctions. Zero-knowledge verifiable commitments on Midnight Network.
            </p>
          </div>

          {/* Protocols & Network */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Midnight Network
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li>
                <a
                  href="https://midnight.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  Official Midnight Network <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://indexer.preprod.midnight.network/api/v4/graphql"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  Preprod GraphQL Indexer <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://midnight-tmnight-preprod.nethermind.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  Preprod tNIGHT Faucet <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Open Source & Community */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Project Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li>
                <a
                  href="https://github.com/RiyaGithub123/BidShield"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--cyan-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600 }}
                >
                  <Github size={15} />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/BidShieldApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
                >
                  <Twitter size={15} />
                  Product X (@BidShieldApp)
                </a>
              </li>
              <li>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <FileCode size={15} />
                  Compact Compiler v0.5.2
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
        }}>
          <div>
            © 2026 BidShield. Built for the Midnight Builder Challenge. MIT / Apache-2.0 License.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="status-dot" style={{ width: 6, height: 6 }} />
            <span>Preprod Testnet Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
