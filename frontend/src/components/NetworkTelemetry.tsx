import React, { useState, useEffect } from 'react';
import { Activity, Database, ExternalLink, ShieldCheck } from 'lucide-react';
import { bidShieldService, NETWORK_CONFIGS } from '../contracts/contractService.js';
import type { MidnightNetwork } from '../types/index.js';
import { formatAddress } from '../utils/crypto.js';

interface NetworkTelemetryProps {
  network: MidnightNetwork;
}

export const NetworkTelemetry: React.FC<NetworkTelemetryProps> = ({ network }) => {
  const [telemetry, setTelemetry] = useState<{
    isOnline: boolean;
    blockHeight: number;
    latencyMs: number;
  }>({
    isOnline: true,
    blockHeight: network === 'preview' ? 1845210 : 2548940,
    latencyMs: 78,
  });

  const config = NETWORK_CONFIGS[network];

  useEffect(() => {
    let mounted = true;

    const fetchTelemetry = async () => {
      const data = await bidShieldService.fetchLiveChainTelemetry(network);
      if (mounted) setTelemetry(data);
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 12000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [network]);

  return (
    <div className="neo-card" style={{ padding: '1.25rem 1.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
      }}>
        {/* Left: Live Status & Network */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: 42,
            height: 42,
            background: 'var(--accent-mint)',
            border: '2.5px solid #000',
            borderRadius: '6px',
            boxShadow: '2px 2px 0px #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Activity size={22} color="#000" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="pulse-dot" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.92rem' }}>
                Midnight {network.toUpperCase()} Live Node
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Block #{telemetry.blockHeight.toLocaleString()} • {telemetry.latencyMs}ms Latency
            </div>
          </div>
        </div>

        {/* Center: Deployed Contract Address with Explorer Deep Link */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          background: 'var(--bg-secondary)',
          border: '2px solid #000',
          borderRadius: '6px',
          padding: '0.45rem 0.85rem',
        }}>
          <Database size={15} color="var(--black)" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Verified Contract
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700 }}>
              {formatAddress(config.contractAddress)}
            </span>
          </div>

          <a
            href={`${config.explorerUrl}/contract/${config.contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn neo-btn-sm"
            style={{ padding: '0.25rem 0.5rem', background: '#fff' }}
            title="Inspect deployed contract on Midnight Explorer"
          >
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Right: Zero Docker for Clients Guarantee Callout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="neo-badge neo-badge-yellow" style={{ fontSize: '0.74rem' }}>
            <ShieldCheck size={13} />
            Zero Docker Required for Clients (WASM ZK Prover)
          </span>
        </div>
      </div>
    </div>
  );
};
