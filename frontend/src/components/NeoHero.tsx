import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Sparkles, ArrowDownRight, EyeOff, Youtube, Twitter, ExternalLink, Play } from 'lucide-react';

interface NeoHeroProps {
  onExploreClick: () => void;
  onCreateRfpClick: () => void;
  onDocsClick?: () => void;
}

export const NeoHero: React.FC<NeoHeroProps> = ({ onExploreClick, onCreateRfpClick, onDocsClick }) => {
  const [heroView, setHeroView] = useState<'chamber' | 'video'>('chamber');

  return (
    <section style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '2.5rem',
        alignItems: 'center',
      }}>
        {/* Left Column: Heading & Call to Actions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Interactive Badges */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="neo-badge neo-badge-yellow"
              style={{ cursor: 'pointer', border: '2px solid #000' }}
              onClick={onExploreClick}
              title="Click to explore sealed-bid tenders"
            >
              <Lock size={13} />
              Sealed-Bid RFP Protocol
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="neo-badge neo-badge-mint"
              style={{ cursor: 'pointer', border: '2px solid #000' }}
              onClick={() => {
                const el = document.getElementById('telemetry-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              title="Click to view Midnight Network telemetry"
            >
              <ShieldCheck size={13} />
              Midnight Network
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="neo-badge neo-badge-violet"
              style={{ cursor: 'pointer', border: '2px solid #000' }}
              onClick={onDocsClick}
              title="Click to inspect ZK Circuits"
            >
              <EyeOff size={13} />
              ZK-SNARKs Verified
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="https://x.com/BidSheild"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-badge"
              style={{
                cursor: 'pointer',
                border: '2px solid #000',
                background: '#1DA1F2',
                color: '#FFFFFF',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
              title="Official X (Twitter) Profile: @BidSheild"
            >
              <Twitter size={13} />
              @BidSheild
            </motion.a>
          </div>

          <h1 style={{ marginBottom: '1.25rem' }}>
            Sealed Procurement.<br />
            <span style={{
              background: 'var(--accent-yellow)',
              padding: '0 0.35rem',
              display: 'inline-block',
              border: '3px solid #000',
              boxShadow: '4px 4px 0px #000',
              margin: '0.2rem 0',
            }}>
              Verified
            </span>{' '}
            Outcomes.
          </h1>

          <p style={{ fontSize: '1.1rem', marginBottom: '1.75rem', maxWidth: '580px' }}>
            Buyers publish procurement requirements. Suppliers privately prove regulatory credentials and submit confidential sealed bids. Zero-knowledge circuits award the optimal contract without ever leaking competing prices.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <motion.button
              whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px #000' }}
              whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0px #000' }}
              className="neo-btn neo-btn-primary neo-btn-lg"
              onClick={onExploreClick}
            >
              Explore Tenders
              <ArrowDownRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px #000' }}
              whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0px #000' }}
              className="neo-btn neo-btn-mint neo-btn-lg"
              onClick={onCreateRfpClick}
            >
              <Sparkles size={18} />
              Publish RFP
            </motion.button>

            <motion.button
              whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px #000' }}
              whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0px #000' }}
              className="neo-btn neo-btn-lg"
              style={{ background: '#FF0000', color: '#FFFFFF', border: '3px solid #000' }}
              onClick={() => setHeroView('video')}
              title="Watch Live YouTube Demo Video (2x)"
            >
              <Youtube size={18} />
              Watch Demo (2x)
            </motion.button>
          </div>

          {/* Value Props Ribbon */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '0.75rem',
            paddingTop: '1rem',
            borderTop: '2px solid rgba(0, 0, 0, 0.15)',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.4rem' }}>0%</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
                Price Leakage
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.4rem' }}>5</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
                Groth16 Circuits
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.4rem' }}>100%</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
                Auditable Result
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Neo-Brutalist Procurement Chamber Artwork / Embedded Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ position: 'relative' }}
        >
          <div style={{
            background: 'var(--bg-card)',
            border: '4px solid #000000',
            boxShadow: '10px 10px 0px #000000',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            {/* Window Titlebar with View Switcher */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.55rem 0.85rem',
              background: heroView === 'video' ? '#FF0000' : 'var(--accent-yellow)',
              borderBottom: '3px solid #000000',
              transition: 'background 0.3s ease',
            }}>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5376', border: '1.5px solid #000' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFE600', border: '1.5px solid #000' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00E599', border: '1.5px solid #000' }} />
              </div>

              {/* View Switcher Tabs */}
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => setHeroView('chamber')}
                  style={{
                    background: heroView === 'chamber' ? '#000' : '#fff',
                    color: heroView === 'chamber' ? '#fff' : '#000',
                    border: '2px solid #000',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  ENCLAVE
                </button>
                <button
                  type="button"
                  onClick={() => setHeroView('video')}
                  style={{
                    background: heroView === 'video' ? '#000' : '#fff',
                    color: heroView === 'video' ? '#fff' : '#000',
                    border: '2px solid #000',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Youtube size={12} color={heroView === 'video' ? '#FF5376' : '#FF0000'} />
                  DEMO VIDEO
                </button>
              </div>

              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: heroView === 'video' ? '#FFFFFF' : '#000000',
              }}>
                {heroView === 'video' ? 'LIVE_WALKTHROUGH' : 'CHAMBER_v1.0'}
              </span>
            </div>
            
            {heroView === 'video' ? (
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                background: '#000',
              }}>
                <iframe
                  src="https://www.youtube.com/embed/ML8AABZC3KI?autoplay=1&rel=0"
                  title="BidShield YouTube Demo Walkthrough"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <img
                  src="/images/bidshield_hero.jpg"
                  alt="BidShield Zero-Knowledge Sealed-Bid Procurement Chamber"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setHeroView('video')}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0, 0, 0, 0.85)',
                    color: '#FFE600',
                    border: '3px solid #FFE600',
                    borderRadius: '50px',
                    padding: '0.65rem 1.25rem',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '4px 4px 0px #000',
                  }}
                  title="Click to play YouTube demo video"
                >
                  <Play size={16} fill="#FFE600" />
                  PLAY VIDEO DEMO (2x)
                </button>
              </div>
            )}

            <div style={{
              padding: '0.75rem 1.25rem',
              background: '#FFFFFF',
              borderTop: '3px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              {heroView === 'video' ? (
                <>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--black)' }}>
                    🎬 2x Speed • Preprod Testnet • 5 ZK Circuits
                  </span>
                  <a
                    href="https://youtu.be/ML8AABZC3KI?si=XFMA_hZ1dl2JVWtA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn neo-btn-sm"
                    style={{ background: '#FF0000', color: '#fff', fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
                  >
                    Open on YouTube <ExternalLink size={12} />
                  </a>
                </>
              ) : (
                <>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--black)' }}>
                    🔒 Off-Chain Witness Prover ➔ Midnight Verifier
                  </span>
                  <span className="neo-badge neo-badge-mint">
                    Zero Docker Needed
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
