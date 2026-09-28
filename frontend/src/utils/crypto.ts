/**
 * Cryptographic & Formatting Utilities for BidShield
 * Powered by Web Crypto API (SubtleCrypto)
 */

export async function sha256Hex(data: Uint8Array | string): Promise<string> {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes as any);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function generateSealedCommitment(
  tenderId: string,
  bidAmount: number,
  salt: string,
  bidderAddress: string
): Promise<{ commitmentHex: string; commitmentBytes: Uint8Array }> {
  // Canonical payload: tenderId + amount + salt + bidderAddress
  const payload = `${tenderId}:${bidAmount}:${salt}:${bidderAddress}`;
  const hex = await sha256Hex(payload);
  const bytes = hexToBytes(hex);
  return { commitmentHex: hex, commitmentBytes: bytes };
}

export function generateRandomSalt(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  const padded = cleanHex.length % 2 === 0 ? cleanHex : '0' + cleanHex;
  const len = padded.length / 2;
  const bytes = new Uint8Array(32); // Normalized to 32 bytes for Compact circuits
  for (let i = 0; i < len && i < 32; i++) {
    bytes[i] = parseInt(padded.substr(i * 2, 2), 16);
  }
  return bytes;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function formatAddress(address?: any): string {
  if (!address || typeof address !== 'string' || address === '[object Object]' || address.includes('[object')) {
    return 'mn_addr_preprod1...';
  }
  if (address.length <= 16) return address;
  return `${address.slice(0, 8)}...${address.slice(-6)}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatTNight(amount: number): string {
  return `${amount.toLocaleString()} tNIGHT`;
}

export function getTimeRemaining(deadlineMs: number): { text: string; isExpired: boolean } {
  const now = Date.now();
  const diff = deadlineMs - now;

  if (diff <= 0) {
    return { text: 'Deadline Passed', isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return { text: `${days}d ${hours}h left`, isExpired: false };
  if (hours > 0) return { text: `${hours}h ${minutes}m left`, isExpired: false };
  return { text: `${minutes}m left`, isExpired: false };
}
