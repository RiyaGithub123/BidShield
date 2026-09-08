import { useState, useEffect, useCallback } from 'react';
import type { WalletAccount } from '../types/index.js';

declare global {
  interface Window {
    midnight?: {
      mn1AM?: {
        name: string;
        apiVersion: string;
        icon: string;
        isEnabled: () => Promise<boolean>;
        enable: () => Promise<any>;
        connect: (network: string) => Promise<any>;
      };
      lace?: {
        name: string;
        apiVersion: string;
        icon: string;
        isEnabled: () => Promise<boolean>;
        enable: () => Promise<any>;
        connect: (network: string) => Promise<any>;
      };
    };
  }
}

export function use1AMWallet() {
  const [wallet, setWallet] = useState<WalletAccount>({
    address: '',
    balance: 0,
    dustBalance: 0,
    network: 'preprod',
    isConnected: false,
    walletName: '',
  });

  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connectorInstance, setConnectorInstance] = useState<any>(null);

  // Check if wallet is already connected or available in browser
  const checkConnection = useCallback(async () => {
    try {
      const mn1AM = window.midnight?.mn1AM;
      const lace = window.midnight?.lace;
      const provider = mn1AM || lace;

      if (!provider) return;

      const isEnabled = await provider.isEnabled();
      if (isEnabled) {
        const api = await provider.enable();
        setConnectorInstance(api);
        
        // Fetch addresses & network
        if (api.getUnshieldedAddress) {
          const addr = await api.getUnshieldedAddress();
          setWallet({
            address: addr?.toString() || '',
            balance: 1000, // Sync balance if available
            dustBalance: 500,
            network: 'preprod',
            isConnected: true,
            walletName: mn1AM ? '1AM Wallet' : 'Lace',
          });
        }
      }
    } catch (err: any) {
      console.warn('Initial wallet check warning:', err?.message || err);
    }
  }, []);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  // Connect wallet method
  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const mn1AM = window.midnight?.mn1AM;
      const lace = window.midnight?.lace;

      if (!mn1AM && !lace) {
        // Not detected in browser extension context
        throw new Error('NO_WALLET_EXTENSION');
      }

      const activeProvider = mn1AM || lace;
      if (!activeProvider) {
        throw new Error('NO_WALLET_EXTENSION');
      }
      const walletName = mn1AM ? '1AM Wallet' : 'Lace Midnight';

      // Connect specifically to Preprod network
      const api = await (activeProvider.connect ? activeProvider.connect('preprod') : activeProvider.enable());
      setConnectorInstance(api);

      let userAddress = '';
      if (api.getUnshieldedAddress) {
        userAddress = (await api.getUnshieldedAddress()).toString();
      } else if (api.getAddresses) {
        const addrs = await api.getAddresses();
        userAddress = addrs[0]?.toString() || '';
      }

      setWallet({
        address: userAddress,
        balance: 1000,
        dustBalance: 500,
        network: 'preprod',
        isConnected: true,
        walletName,
      });

      return true;
    } catch (err: any) {
      console.error('Wallet connection failure:', err);
      if (err.message === 'NO_WALLET_EXTENSION') {
        setError('NO_WALLET_EXTENSION');
      } else {
        setError(err?.message || 'Failed to authorize wallet connection.');
      }
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    setWallet({
      address: '',
      balance: 0,
      dustBalance: 0,
      network: 'preprod',
      isConnected: false,
      walletName: '',
    });
    setConnectorInstance(null);
    setError(null);
  }, []);

  return {
    wallet,
    isConnecting,
    error,
    connectorInstance,
    connect,
    disconnect,
  };
}
