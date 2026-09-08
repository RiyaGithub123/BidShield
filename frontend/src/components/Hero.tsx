import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileCheck2, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onCreateClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCreateClick, onExploreClick }) => {
  return (
    <section style={{ padding: '3.5rem 0 2rem 0', position: 'relative' }}>
      <div className="container">
        {/* Top Feature Pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem' }}>
            <Sparkles size={14} color="var(--gold-glow)" />
            <span>Midnight Builder Challenge • Preprod Deployed</span>
          </div>
        </div>

        {/* Main Headline */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Compare Bids{' '}
            <span style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 60%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Without Exposing
            </span>{' '}
            The Bids.
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2rem' }}>
            BidShield delivers enterprise-grade sealed-bid procurement powered by Midnight Network zero-knowledge circuits.
            Suppliers submit cryptographically private commitments — smart contracts verify eligibility and budget compliance
            without leaking supplier margins or trade secrets to competitors.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <button className="btn btn-primary" onClick={onCreateClick} style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
              <Lock size={18} />
              Create Procurement RFP
            </button>
            <button className="btn btn-secondary" onClick={onExploreClick} style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
              Explore Active Tenders
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="glass-card" style={{ padding: '1.4rem', borderTop: '2px solid var(--cyan-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', background: 'var(--cyan-badge)', borderRadius: '8px' }}>
                <EyeOff size={20} color="var(--cyan-primary)" />
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Zero Leakage</span>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>100% ZK</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Competitor bids never touch public ledger state
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.4rem', borderTop: '2px solid var(--gold-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', background: 'var(--gold-badge)', borderRadius: '8px' }}>
                <ShieldCheck size={20} color="var(--gold-glow)" />
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Value Shielded</span>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-glow)' }}>$1,540,000</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Cumulative tender budget protected across contracts
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.4rem', borderTop: '2px solid var(--emerald-success)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', background: 'var(--emerald-badge)', borderRadius: '8px' }}>
                <FileCheck2 size={20} color="var(--emerald-success)" />
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Compliance Gate</span>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--emerald-success)' }}>ISO 27001</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Accreditation verified in zero-knowledge
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.4rem', borderTop: '2px solid #a855f7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(168, 85, 247, 0.14)', borderRadius: '8px' }}>
                <Lock size={20} color="#c084fc" />
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Compact Protocol</span>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc' }}>5 Circuits</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Provable state machine deployed on Preprod
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
