import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Sparkles, ArrowDownRight, EyeOff } from 'lucide-react';

interface NeoHeroProps {
  onExploreClick: () => void;
  onCreateRfpClick: () => void;
}

export const NeoHero: React.FC<NeoHeroProps> = ({ onExploreClick, onCreateRfpClick }) => {
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
          {/* Badge */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <span className="neo-badge neo-badge-yellow">
              <Lock size={13} />
              Sealed-Bid RFP Protocol
            </span>
            <span className="neo-badge neo-badge-mint">
              <ShieldCheck size={13} />
              Midnight Network
            </span>
            <span className="neo-badge neo-badge-violet">
              <EyeOff size={13} />
              ZK-SNARKs Verified
            </span>
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
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
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

        {/* Right Column: 3D Neo-Brutalist Procurement Chamber Artwork */}
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 1rem',
              background: 'var(--accent-yellow)',
              borderBottom: '3px solid #000000',
            }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5376', border: '1.5px solid #000' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFE600', border: '1.5px solid #000' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00E599', border: '1.5px solid #000' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
                BIDSHIELD_ENCLAVE_v1.0
              </span>
            </div>
            
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

            <div style={{
              padding: '0.85rem 1.25rem',
              background: '#FFFFFF',
              borderTop: '3px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--black)' }}>
                🔒 Off-Chain Witness Prover ➔ Midnight Verifier
              </span>
              <span className="neo-badge neo-badge-mint">
                Zero Docker Needed
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
