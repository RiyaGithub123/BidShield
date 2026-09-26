export type MidnightNetwork = 'preview' | 'preprod';

export type TenderStatus = 'BIDDING_OPEN' | 'BIDDING_CLOSED' | 'AWARDED';

export interface ProcurementTender {
  id: string;                      // Hex/Hash identifier
  title: string;                   // Public RFP title
  organization: string;            // Issuing Enterprise / Agency
  description: string;             // Scope of work & procurement description
  ceilingBudget: number;           // Maximum budget limit (tNIGHT / USD)
  submissionDeadline: number;      // Unix timestamp (ms)
  totalBidsSubmitted: number;      // Public count of sealed bids
  status: TenderStatus;            // Contract state
  complianceStandard: string;      // Required ISO / SOC2 accreditation
  complianceStandardHash: string;  // 32-byte hex hash of required credential
  winningBidderId?: string;        // Disclosed upon award
  winningAmount?: number;          // Disclosed winning price upon award
  createdAt: number;               // Creation timestamp
}

export interface SealedBidSubmission {
  tenderId: string;
  bidAmount: number;               // Kept strictly private on client
  salt: string;                    // Random entropy for commitment
  bidderId: string;                // Public key or supplier identifier
  commitmentHash: string;          // SHA-256(amount || salt || bidderId)
  timestamp: number;
}

export interface ComplianceCredential {
  standard: string;                // e.g. "ISO-27001-Procurement-Standard"
  secretKey: string;               // Private accreditation token
  credentialHash: string;          // Persistent hash for ZK circuit
}

export interface WalletAccount {
  address: string;
  balance: number;
  dustBalance: number;
  network: MidnightNetwork;
  isConnected: boolean;
  walletName: string;
  isDemo?: boolean;
}

export interface TransactionNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  txHash?: string;
  timestamp: number;
}

export interface NetworkConfig {
  id: MidnightNetwork;
  name: string;
  rpcUrl: string;
  indexerUrl: string;
  indexerWsUrl: string;
  faucetUrl: string;
  explorerUrl: string;
  contractAddress: string;
}
