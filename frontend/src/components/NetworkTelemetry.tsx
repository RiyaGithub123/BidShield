import React from 'react';
import { Server, Database, Terminal } from 'lucide-react';

export const NetworkTelemetry: React.FC = () => {
  return (
    <div className="bento-card span-12" style={{ padding: '1.25rem 1.75rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
      }}>
        {/* Left Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span className="status-dot-pulse" />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              Midnight Preprod Testnet Active
              <span className="badge-pill badge-pill-emerald" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                Operational
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Substrate RPC • GraphQL Indexer v4 • Proof Server :6300
            </div>
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Server size={16} color="var(--accent-cyan)" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Substrate Node</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>rpc.preprod (38ms)</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={16} color="var(--accent-gold)" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>GraphQL Indexer</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Synced (v4 API)</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Terminal size={16} color="var(--accent-purple)" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Compact Runtime</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>v0.16.0 / Compiler 0.5.2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
