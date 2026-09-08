import React, { useState } from 'react';
import { FloatingNavbar } from './components/FloatingNavbar.js';
import { TenderHeroShowcase } from './components/TenderHeroShowcase.js';
import { InteractiveZkPlayground } from './components/InteractiveZkPlayground.js';
import { PrivacyArchitectureVisualizer } from './components/PrivacyArchitectureVisualizer.js';
import { NetworkTelemetry } from './components/NetworkTelemetry.js';
import { ProcurementCard } from './components/ProcurementCard.js';
import { SubmitBidModal } from './components/SubmitBidModal.js';
import { CreateProcurementModal } from './components/CreateProcurementModal.js';
import { ComplianceModal } from './components/ComplianceModal.js';
import { AwardModal } from './components/AwardModal.js';
import { MobileWalletModal } from './components/MobileWalletModal.js';
import { Footer } from './components/Footer.js';
import { use1AMWallet } from './hooks/use1AMWallet.js';
import { bidShieldService } from './contracts/contractService.js';
import type { ProcurementTender, TransactionNotification } from './types/index.js';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const { wallet, connect, disconnect } = use1AMWallet();
  const [tenders, setTenders] = useState<ProcurementTender[]>(bidShieldService.getTenders());
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // Modals
  const [selectedBidTender, setSelectedBidTender] = useState<ProcurementTender | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [complianceTender, setComplianceTender] = useState<ProcurementTender | null>(null);
  const [awardTender, setAwardTender] = useState<ProcurementTender | null>(null);
  const [isMobileWalletOpen, setIsMobileWalletOpen] = useState<boolean>(false);

  // Notifications
  const [notifications, setNotifications] = useState<TransactionNotification[]>([]);

  const addNotification = (type: 'info' | 'success' | 'warning' | 'error', title: string, message: string, txHash?: string) => {
    const notif: TransactionNotification = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      title,
      message,
      txHash,
      timestamp: Date.now(),
    };
    setNotifications((prev) => [notif, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
    }, 6000);
  };

  const handleConnectClick = async () => {
    const success = await connect();
    if (!success) {
      setIsMobileWalletOpen(true);
    } else {
      addNotification('success', 'Wallet Connected', `Connected to Midnight Preprod successfully.`);
    }
  };

  // Submit Sealed Bid Handler
  const handleSubmitBid = async (tenderId: string, bidAmount: number, salt: string) => {
    try {
      const bidderAddr = wallet.address || 'mn_addr_preprod1gg6wcy47l6nacuh7n9aeycwsnsqjuvkuc5vxyhyh79z04kctgt5sxd5gaw';
      const result = await bidShieldService.submitSealedBid(tenderId, bidAmount, salt, bidderAddr);

      setTenders(bidShieldService.getTenders());
      addNotification(
        'success',
        'Confidential Sealed Bid Submitted!',
        `Commitment broadcasted to Midnight ledger. Bid amount remains 100% private.`,
        result.txHash
      );
    } catch (err: any) {
      addNotification('error', 'Bid Submission Failed', err?.message || 'Error occurred.');
      throw err;
    }
  };

  // Create RFP Handler
  const handleCreateProcurement = async (
    title: string,
    organization: string,
    description: string,
    ceilingBudget: number,
    deadlineDays: number,
    complianceStandard: string
  ) => {
    try {
      const newTender = await bidShieldService.initializeProcurement(
        title,
        organization,
        description,
        ceilingBudget,
        deadlineDays,
        complianceStandard
      );

      setTenders(bidShieldService.getTenders());
      addNotification(
        'success',
        'Procurement RFP Published!',
        `Tender "${newTender.title}" is now open for sealed bids on Preprod.`
      );
    } catch (err: any) {
      addNotification('error', 'Procurement Creation Failed', err?.message || 'Error occurred.');
      throw err;
    }
  };

  // Verify Compliance Handler
  const handleVerifyCompliance = async (tenderId: string, secretKey: string) => {
    try {
      const res = await bidShieldService.verifyCompliance(tenderId, secretKey);
      if (res.verified) {
        addNotification(
          'success',
          'Accreditation Verified!',
          `Zero-knowledge proof confirmed regulatory standard without revealing trade secret key.`
        );
      } else {
        addNotification(
          'warning',
          'Accreditation Mismatch',
          `The submitted credential does not match the mandated RFP standard.`
        );
      }
      return res;
    } catch (err: any) {
      addNotification('error', 'Verification Failed', err?.message || 'Error occurred.');
      throw err;
    }
  };

  // Award Handler
  const handleAwardProcurement = async (tenderId: string, supplier: string, price: number, salt: string) => {
    try {
      const res = await bidShieldService.awardProcurement(tenderId, supplier, price, salt);
      setTenders(bidShieldService.getTenders());
      addNotification(
        'success',
        'Procurement Contract Awarded!',
        `Winning bid disclosed and settled on Midnight. Unsuccessful bids remain confidential forever.`,
        res.txHash
      );
    } catch (err: any) {
      addNotification('error', 'Award Settlement Failed', err?.message || 'Error occurred.');
      throw err;
    }
  };

  // Filtered Tenders
  const filteredTenders = tenders.filter((t) => {
    if (activeFilter === 'ALL') return true;
    return t.status === activeFilter;
  });

  const featuredTender = tenders[0];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Multi-Layer Animated Aurora & Micro-Noise Background */}
      <div className="aurora-bg">
        <div className="aurora-beam-1" />
        <div className="aurora-beam-2" />
        <div className="aurora-beam-3" />
      </div>
      <div className="grid-overlay" />
      <div className="noise-texture" />

      {/* Floating Island Navigation */}
      <FloatingNavbar
        wallet={wallet}
        onConnectClick={handleConnectClick}
        onDisconnectClick={disconnect}
        onCreateRfpClick={() => setIsCreateOpen(true)}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* Main Container */}
      <main className="container" style={{ flexGrow: 1, paddingTop: '2rem' }}>
        {/* Dynamic Bento Grid Layout */}
        <div className="bento-grid">
          {/* 1. Featured Tender Hero Showcase (Span 12) */}
          {featuredTender && activeFilter === 'ALL' && (
            <TenderHeroShowcase
              tender={featuredTender}
              onSubmitBidClick={(t) => setSelectedBidTender(t)}
              onVerifyComplianceClick={(t) => setComplianceTender(t)}
            />
          )}

          {/* 2. Interactive ZK Circuit Simulator Playground (Span 7) */}
          <InteractiveZkPlayground />

          {/* 3. Reverse Auction Privacy Architecture Visualizer (Span 5) */}
          <PrivacyArchitectureVisualizer />

          {/* 4. Live Network Telemetry Strip (Span 12) */}
          <NetworkTelemetry />
        </div>

        {/* Procurement Tenders Section */}
        <div style={{ marginTop: '4rem', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            <div>
              <div className="badge-pill badge-pill-cyan" style={{ marginBottom: '0.4rem' }}>
                Procurement Vault
              </div>
              <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>
                {activeFilter === 'ALL' && 'All Procurement RFPs'}
                {activeFilter === 'BIDDING_OPEN' && 'Active Sealed-Bid Tenders'}
                {activeFilter === 'AWARDED' && 'Awarded & Settled Contracts'}
              </h2>
            </div>

            {/* Mobile Filter Controls */}
            <div className="mobile-only" style={{ display: 'flex', gap: '0.4rem', width: '100%', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              <button
                className={`btn-modern-glass ${activeFilter === 'ALL' ? 'active' : ''}`}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                onClick={() => setActiveFilter('ALL')}
              >
                All ({tenders.length})
              </button>
              <button
                className={`btn-modern-glass ${activeFilter === 'BIDDING_OPEN' ? 'active' : ''}`}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                onClick={() => setActiveFilter('BIDDING_OPEN')}
              >
                Active ({tenders.filter((t) => t.status === 'BIDDING_OPEN').length})
              </button>
              <button
                className={`btn-modern-glass ${activeFilter === 'AWARDED' ? 'active' : ''}`}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                onClick={() => setActiveFilter('AWARDED')}
              >
                Awarded ({tenders.filter((t) => t.status === 'AWARDED').length})
              </button>
            </div>
          </div>

          {/* Tenders Grid */}
          {filteredTenders.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '1.5rem',
            }}>
              {filteredTenders.map((tender) => (
                <ProcurementCard
                  key={tender.id}
                  tender={tender}
                  onSubmitBidClick={(t) => setSelectedBidTender(t)}
                  onVerifyComplianceClick={(t) => setComplianceTender(t)}
                  onAwardClick={(t) => setAwardTender(t)}
                />
              ))}
            </div>
          ) : (
            <div className="bento-card span-12" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.25rem' }}>
                No procurement tenders match the selected filter.
              </p>
              <button className="btn-modern-primary" onClick={() => setIsCreateOpen(true)}>
                <Sparkles size={16} />
                Publish First Tender
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {selectedBidTender && (
        <SubmitBidModal
          tender={selectedBidTender}
          wallet={wallet}
          onClose={() => setSelectedBidTender(null)}
          onSubmit={handleSubmitBid}
        />
      )}

      {isCreateOpen && (
        <CreateProcurementModal
          onClose={() => setIsCreateOpen(false)}
          onCreate={handleCreateProcurement}
        />
      )}

      {complianceTender && (
        <ComplianceModal
          tender={complianceTender}
          onClose={() => setComplianceTender(null)}
          onVerify={handleVerifyCompliance}
        />
      )}

      {awardTender && (
        <AwardModal
          tender={awardTender}
          onClose={() => setAwardTender(null)}
          onAward={handleAwardProcurement}
        />
      )}

      <MobileWalletModal
        isOpen={isMobileWalletOpen}
        onClose={() => setIsMobileWalletOpen(false)}
        onConnectAttempt={connect}
      />

      {/* Toast Notifications */}
      <div className="toast-container">
        {notifications.map((n) => (
          <div key={n.id} className={`toast toast-${n.type}`}>
            {n.type === 'success' && <CheckCircle2 size={18} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />}
            {n.type === 'error' && <AlertCircle size={18} color="var(--accent-rose)" style={{ flexShrink: 0 }} />}
            {n.type === 'info' && <Info size={18} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />}
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>{n.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{n.message}</div>
              {n.txHash && (
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                  Tx: {n.txHash.slice(0, 20)}...
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
