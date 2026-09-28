import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingNavbar } from './components/FloatingNavbar.js';
import { NeoHero } from './components/NeoHero.js';
import { InteractiveZkPlayground } from './components/InteractiveZkPlayground.js';
import { PrivacyArchitectureVisualizer } from './components/PrivacyArchitectureVisualizer.js';
import { NetworkTelemetry } from './components/NetworkTelemetry.js';
import { ProcurementCard } from './components/ProcurementCard.js';
import { SubmitBidModal } from './components/SubmitBidModal.js';
import { CreateProcurementModal } from './components/CreateProcurementModal.js';
import { ComplianceModal } from './components/ComplianceModal.js';
import { AwardModal } from './components/AwardModal.js';
import { MobileWalletModal } from './components/MobileWalletModal.js';
import { DeployContractModal } from './components/DeployContractModal.js';
import { CircuitDocsSection } from './components/CircuitDocsSection.js';
import { Footer } from './components/Footer.js';
import { useMidnightWallet } from './hooks/useMidnightWallet.js';
import { bidShieldService } from './contracts/contractService.js';
import type { ProcurementTender, TransactionNotification, MidnightNetwork } from './types/index.js';
import { CheckCircle2, AlertCircle, Info, Sparkles, BookOpen } from 'lucide-react';

export const App: React.FC = () => {
  const {
    network,
    wallet,
    connect,
    connectDemo,
    disconnect,
    switchNetwork,
    connectorInstance,
  } = useMidnightWallet();

  const [tenders, setTenders] = useState<ProcurementTender[]>(bidShieldService.getTenders());
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // Modal visibility states
  const [selectedBidTender, setSelectedBidTender] = useState<ProcurementTender | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isDeployOpen, setIsDeployOpen] = useState<boolean>(false);
  const [complianceTender, setComplianceTender] = useState<ProcurementTender | null>(null);
  const [awardTender, setAwardTender] = useState<ProcurementTender | null>(null);
  const [isMobileWalletOpen, setIsMobileWalletOpen] = useState<boolean>(false);

  // Toast notifications state
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
    setNotifications((prev) => [notif, ...prev.slice(0, 3)]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
    }, 6000);
  };

  const handleConnectClick = async () => {
    const success = await connect();
    if (!success) {
      setIsMobileWalletOpen(true);
    } else {
      addNotification('success', 'Wallet Connected', `Connected to Midnight ${network.toUpperCase()} successfully.`);
    }
  };

  const handleNetworkSwitch = (newNet: MidnightNetwork) => {
    switchNetwork(newNet);
    addNotification('info', 'Network Switched', `Switched active target to Midnight ${newNet.toUpperCase()} Testnet.`);
  };

  // Submit Sealed Bid Handler
  const handleSubmitBid = async (tenderId: string, bidAmount: number, salt: string) => {
    try {
      const bidderAddr = wallet.address || (network === 'preview'
        ? 'mn_addr_preview108ezrx3t5syg4g9a3y3ykavl73ftl6nnn0ntctldpegl3f5l7acssug02u'
        : 'mn_addr_preprod1yrl238vvh3l662yypvucq4zltgfy0633a2cj9mn76us0tlnql6assr2ga7');

      const result = await bidShieldService.submitSealedBid(tenderId, bidAmount, salt, bidderAddr);
      setTenders(bidShieldService.getTenders());

      addNotification(
        'success',
        'Confidential Sealed Bid Submitted!',
        `ZK commitment broadcasted to ${network.toUpperCase()} ledger. Bid amount is 100% secret.`,
        result.txHash
      );
    } catch (err: any) {
      addNotification('error', 'Bid Submission Failed', err?.message || 'Transaction error.');
      throw err;
    }
  };

  // Create Procurement RFP Handler
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
        `Tender "${newTender.title}" is now open for sealed bids on ${network.toUpperCase()}.`
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
          'Accreditation Verified in ZK!',
          `Zero-knowledge proof confirmed regulatory requirements without revealing private license credentials.`
        );
      } else {
        addNotification(
          'warning',
          'Accreditation Mismatch',
          `The submitted credential token does not match the mandated RFP standard.`
        );
      }
      return res;
    } catch (err: any) {
      addNotification('error', 'Verification Failed', err?.message || 'Error occurred.');
      throw err;
    }
  };

  // Award Procurement Handler
  const handleAwardProcurement = async (tenderId: string, supplier: string, price: number, salt: string) => {
    try {
      const res = await bidShieldService.awardProcurement(tenderId, supplier, price, salt);
      setTenders(bidShieldService.getTenders());
      addNotification(
        'success',
        'Procurement Contract Awarded!',
        `Winning bid disclosed and settled on Midnight. Unsuccessful bids remain sealed forever!`,
        res.txHash
      );
    } catch (err: any) {
      addNotification('error', 'Award Settlement Failed', err?.message || 'Error occurred.');
      throw err;
    }
  };

  // Filter tenders list
  const filteredTenders = tenders.filter((t) => {
    if (activeFilter === 'ALL') return true;
    return t.status === activeFilter;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Neo-Brutalist Sticky Navbar */}
      <FloatingNavbar
        wallet={wallet}
        network={network}
        onConnectClick={handleConnectClick}
        onDisconnectClick={disconnect}
        onCreateRfpClick={() => setIsCreateOpen(true)}
        onSwitchNetwork={handleNetworkSwitch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* Main Content Area */}
      <main className="container" style={{ flexGrow: 1 }}>
        {activeFilter === 'DOCS' ? (
          <div style={{ paddingTop: '2.5rem' }}>
            <CircuitDocsSection
              onBackToTenders={() => {
                setActiveFilter('ALL');
                setTimeout(() => {
                  const el = document.getElementById('tenders-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 60);
              }}
            />
          </div>
        ) : (
          <>
            {/* 1. Hero Section */}
            <NeoHero
              onExploreClick={() => {
                const el = document.getElementById('tenders-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              onCreateRfpClick={() => setIsCreateOpen(true)}
              onDocsClick={() => {
                setActiveFilter('DOCS');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 2. Live Telemetry Strip */}
            <div id="telemetry-section" style={{ marginBottom: '2.5rem', scrollMarginTop: '100px' }}>
              <NetworkTelemetry network={network} />
            </div>

            {/* 3. Interactive Architecture & Zero-Knowledge Simulator Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem',
            }}>
              {/* Prover-to-Verifier Interactive Circuit Playground */}
              <InteractiveZkPlayground />

              {/* Dual-State Privacy Architecture Visualizer */}
              <PrivacyArchitectureVisualizer />
            </div>

            {/* 4. Active Procurement Tenders Section */}
            <section id="tenders-section" style={{ marginBottom: '4rem', scrollMarginTop: '100px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.75rem',
                borderBottom: '3px solid #000',
                paddingBottom: '1rem',
              }}>
                <div>
                  <span className="neo-badge neo-badge-yellow" style={{ marginBottom: '0.4rem' }}>
                    Procurement Vault
                  </span>
                  <h2>
                    {activeFilter === 'ALL' && 'All Procurement RFPs'}
                    {activeFilter === 'BIDDING_OPEN' && 'Active Sealed-Bid Tenders'}
                    {activeFilter === 'AWARDED' && 'Awarded & Settled Contracts'}
                  </h2>
                </div>

                {/* Mobile / Secondary Filter Controls */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    className={`neo-btn neo-btn-sm ${activeFilter === 'ALL' ? 'neo-btn-primary' : ''}`}
                    onClick={() => setActiveFilter('ALL')}
                  >
                    All ({tenders.length})
                  </button>
                  <button
                    className={`neo-btn neo-btn-sm ${activeFilter === 'BIDDING_OPEN' ? 'neo-btn-primary' : ''}`}
                    onClick={() => setActiveFilter('BIDDING_OPEN')}
                  >
                    Open ({tenders.filter((t) => t.status === 'BIDDING_OPEN').length})
                  </button>
                  <button
                    className={`neo-btn neo-btn-sm ${activeFilter === 'AWARDED' ? 'neo-btn-primary' : ''}`}
                    onClick={() => setActiveFilter('AWARDED')}
                  >
                    Awarded ({tenders.filter((t) => t.status === 'AWARDED').length})
                  </button>
                  <button
                    className="neo-btn neo-btn-sm"
                    onClick={() => {
                      setActiveFilter('DOCS');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <BookOpen size={13} />
                    Circuit Docs
                  </button>
                  <button
                    className="neo-btn neo-btn-sm neo-btn-mint"
                    onClick={() => setIsCreateOpen(true)}
                  >
                    <Sparkles size={13} />
                    New RFP
                  </button>
                </div>
              </div>

              {/* Tenders Responsive Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
              {filteredTenders.length > 0 ? (
                <motion.div
                  layout
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '1.75rem',
                  }}
                >
                  {filteredTenders.map((tender) => (
                    <ProcurementCard
                      key={tender.id}
                      tender={tender}
                      onSubmitBidClick={(t) => setSelectedBidTender(t)}
                      onVerifyComplianceClick={(t) => setComplianceTender(t)}
                      onAwardClick={(t) => setAwardTender(t)}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="neo-card" style={{ textAlign: 'center', padding: '4rem 1.5rem', background: '#FFFFFF' }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    No procurement tenders found for the active filter.
                  </p>
                  <button className="neo-btn neo-btn-primary" onClick={() => setIsCreateOpen(true)}>
                    <Sparkles size={16} />
                    Publish First Procurement Tender
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Neo-Brutalist Footer */}
      <Footer network={network} onDeployCustom={() => setIsDeployOpen(true)} />

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
        network={network}
        onClose={() => setIsMobileWalletOpen(false)}
        onConnectAttempt={connect}
        onConnectDemo={connectDemo}
      />

      <DeployContractModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
        network={network}
        wallet={wallet}
        connectorInstance={connectorInstance}
        onDeploymentSuccess={(net, contractAddr, txId) => {
          addNotification(
            'success',
            'Contract Deployed On-Chain!',
            `BidShield contract deployed to Midnight ${net.toUpperCase()}: ${contractAddr.slice(0, 16)}...`,
            txId
          );
        }}
      />

      {/* Neo-Brutalist Toast Notifications */}
      <div className="neo-toast-container">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              className={`neo-toast neo-toast-${n.type}`}
            >
              {n.type === 'success' && <CheckCircle2 size={20} color="var(--accent-mint)" style={{ flexShrink: 0 }} />}
              {n.type === 'error' && <AlertCircle size={20} color="var(--accent-coral)" style={{ flexShrink: 0 }} />}
              {n.type === 'info' && <Info size={20} color="var(--accent-sky)" style={{ flexShrink: 0 }} />}
              {n.type === 'warning' && <AlertCircle size={20} color="var(--accent-yellow)" style={{ flexShrink: 0 }} />}
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.92rem' }}>
                  {n.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  {n.message}
                </div>
                {n.txHash && (
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-violet)', marginTop: '0.25rem', wordBreak: 'break-all' }}>
                    Tx: {n.txHash.slice(0, 24)}...
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
