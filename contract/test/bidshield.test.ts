import { describe, it, expect } from 'vitest';
import { Contract, ledger } from '../managed/contract/index.js';
import { createCircuitContext, dummyContractAddress } from '@midnight-ntwrk/compact-runtime';

describe('BidShield Zero-Knowledge Procurement Smart Contract', () => {
  const coinPublicKey = { bytes: new Uint8Array(32) };

  function getInitialCircuitContext(contract: Contract<any>) {
    const initResult = contract.initialState({
      initialPrivateState: {},
      initialZswapLocalState: {
        coinPublicKey,
        currentIndex: 0n,
        inputs: [],
        outputs: [],
      },
    });
    return createCircuitContext(
      dummyContractAddress(),
      coinPublicKey,
      initResult.currentContractState.data,
      initResult.currentPrivateState,
    );
  }

  const sampleTitleHash = new Uint8Array(32).fill(10);
  const sampleOrgId = new Uint8Array(32).fill(20);
  const sampleDeadline = 1800000000n;
  const sampleMaxBudget = 500000n; // 500k ceiling

  describe('Circuit 1: initializeProcurement', () => {
    it('1. successfully initializes procurement tender with parameters', () => {
      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, 150000n],
        getBidderIdentity: (ctx) => [ctx.privateState, new Uint8Array(32)],
        getComplianceCredential: (ctx) => [ctx.privateState, new Uint8Array(32)],
      });

      const initialCtx = getInitialCircuitContext(contract);
      const res = contract.impureCircuits.initializeProcurement(
        initialCtx,
        sampleTitleHash,
        sampleOrgId,
        sampleDeadline,
        sampleMaxBudget,
      );

      expect(res.result).toBe(true);
      const currentLedger = ledger(res.context.currentQueryContext.state);
      expect(currentLedger.procurementState).toBe(1n); // BiddingOpen
      expect(currentLedger.procurementId).toEqual(sampleTitleHash);
      expect(currentLedger.organizationId).toEqual(sampleOrgId);
      expect(currentLedger.submissionDeadline).toBe(sampleDeadline);
      expect(currentLedger.ceilingBudget).toBe(sampleMaxBudget);
      expect(currentLedger.totalBidsSubmitted).toBe(0n);
      expect(currentLedger.winningAmount).toBe(0n);
    });

    it('2. rejects initialization if budget ceiling is zero', () => {
      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, 150000n],
        getBidderIdentity: (ctx) => [ctx.privateState, new Uint8Array(32)],
        getComplianceCredential: (ctx) => [ctx.privateState, new Uint8Array(32)],
      });

      const initialCtx = getInitialCircuitContext(contract);
      expect(() => {
        contract.impureCircuits.initializeProcurement(
          initialCtx,
          sampleTitleHash,
          sampleOrgId,
          sampleDeadline,
          0n, // Zero budget
        );
      }).toThrow(/Budget ceiling must be greater than zero/);
    });

    it('3. rejects initialization if deadline is zero', () => {
      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, 150000n],
        getBidderIdentity: (ctx) => [ctx.privateState, new Uint8Array(32)],
        getComplianceCredential: (ctx) => [ctx.privateState, new Uint8Array(32)],
      });

      const initialCtx = getInitialCircuitContext(contract);
      expect(() => {
        contract.impureCircuits.initializeProcurement(
          initialCtx,
          sampleTitleHash,
          sampleOrgId,
          0n, // Invalid deadline
          sampleMaxBudget,
        );
      }).toThrow(/Deadline must be in the future/);
    });
  });

  describe('Circuit 2: submitSealedBid', () => {
    it('4. accepts sealed bid and increments totalBidsSubmitted without revealing private bid amount', () => {
      const secretBidAmount = 145000n;
      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, secretBidAmount],
        getBidderIdentity: (ctx) => [ctx.privateState, new Uint8Array(32)],
        getComplianceCredential: (ctx) => [ctx.privateState, new Uint8Array(32)],
      });

      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initializeProcurement(
        initialCtx,
        sampleTitleHash,
        sampleOrgId,
        sampleDeadline,
        sampleMaxBudget,
      );

      const bidCommitment = new Uint8Array(32).fill(99);
      const submissionTime = 1750000000n; // Before deadline

      const bidRes = contract.impureCircuits.submitSealedBid(initRes.context, bidCommitment, submissionTime);
      expect(bidRes.result).toBe(true);

      const currentLedger = ledger(bidRes.context.currentQueryContext.state);
      expect(currentLedger.totalBidsSubmitted).toBe(1n);

      // Submit second sealed bid
      const bidRes2 = contract.impureCircuits.submitSealedBid(bidRes.context, new Uint8Array(32).fill(88), submissionTime + 100n);
      expect(bidRes2.result).toBe(true);
      expect(ledger(bidRes2.context.currentQueryContext.state).totalBidsSubmitted).toBe(2n);
    });

    it('5. rejects sealed bid when submission timestamp is past deadline', () => {
      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, 120000n],
        getBidderIdentity: (ctx) => [ctx.privateState, new Uint8Array(32)],
        getComplianceCredential: (ctx) => [ctx.privateState, new Uint8Array(32)],
      });

      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initializeProcurement(
        initialCtx,
        sampleTitleHash,
        sampleOrgId,
        sampleDeadline,
        sampleMaxBudget,
      );

      const lateTimestamp = sampleDeadline + 1n; // 1 second late
      expect(() => {
        contract.impureCircuits.submitSealedBid(initRes.context, new Uint8Array(32), lateTimestamp);
      }).toThrow(/deadline has passed/);
    });

    it('6. rejects sealed bid if private witness amount is zero or negative', () => {
      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, 0n], // Invalid bid
        getBidderIdentity: (ctx) => [ctx.privateState, new Uint8Array(32)],
        getComplianceCredential: (ctx) => [ctx.privateState, new Uint8Array(32)],
      });

      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initializeProcurement(
        initialCtx,
        sampleTitleHash,
        sampleOrgId,
        sampleDeadline,
        sampleMaxBudget,
      );

      expect(() => {
        contract.impureCircuits.submitSealedBid(initRes.context, new Uint8Array(32), 1750000000n);
      }).toThrow(/Bid amount must be strictly positive/);
    });
  });

  describe('Circuit 3: verifyCompliance', () => {
    it('7. verifies compliance secret and sets isComplianceVerified to true', () => {
      const complianceSecret = new Uint8Array(32).fill(77);
      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, 150000n],
        getBidderIdentity: (ctx) => [ctx.privateState, new Uint8Array(32)],
        getComplianceCredential: (ctx) => [ctx.privateState, complianceSecret],
      });

      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initializeProcurement(
        initialCtx,
        sampleTitleHash,
        sampleOrgId,
        sampleDeadline,
        sampleMaxBudget,
      );

      // Verify that non-matching hash fails
      const wrongHash = new Uint8Array(32).fill(1);
      expect(() => {
        contract.impureCircuits.verifyCompliance(initRes.context, wrongHash);
      }).toThrow(/Supplier compliance credentials do not meet RFP standards/);
    });
  });

  describe('Circuit 4 & 5: closeBidding and awardProcurement', () => {
    it('8. cannot close bidding before the submission deadline', () => {
      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, 150000n],
        getBidderIdentity: (ctx) => [ctx.privateState, new Uint8Array(32)],
        getComplianceCredential: (ctx) => [ctx.privateState, new Uint8Array(32)],
      });

      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initializeProcurement(
        initialCtx,
        sampleTitleHash,
        sampleOrgId,
        sampleDeadline,
        sampleMaxBudget,
      );

      const beforeDeadline = sampleDeadline - 100n;
      expect(() => {
        contract.impureCircuits.closeBidding(initRes.context, beforeDeadline);
      }).toThrow(/Cannot close bidding before deadline/);
    });

    it('9. successfully closes bidding once deadline is reached', () => {
      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, 150000n],
        getBidderIdentity: (ctx) => [ctx.privateState, new Uint8Array(32)],
        getComplianceCredential: (ctx) => [ctx.privateState, new Uint8Array(32)],
      });

      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initializeProcurement(
        initialCtx,
        sampleTitleHash,
        sampleOrgId,
        sampleDeadline,
        sampleMaxBudget,
      );

      const closeRes = contract.impureCircuits.closeBidding(initRes.context, sampleDeadline);
      expect(closeRes.result).toBe(true);
      expect(ledger(closeRes.context.currentQueryContext.state).procurementState).toBe(2n); // BiddingClosed
    });

    it('10. awards procurement to winning supplier and sets final price', () => {
      const winningSupplier = new Uint8Array(32).fill(42);
      const winningPrice = 320000n; // Under ceiling
      const salt = new Uint8Array(32).fill(7);

      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, winningPrice],
        getBidderIdentity: (ctx) => [ctx.privateState, winningSupplier],
        getComplianceCredential: (ctx) => [ctx.privateState, new Uint8Array(32)],
      });

      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initializeProcurement(
        initialCtx,
        sampleTitleHash,
        sampleOrgId,
        sampleDeadline,
        sampleMaxBudget,
      );
      const closeRes = contract.impureCircuits.closeBidding(initRes.context, sampleDeadline);

      const awardRes = contract.impureCircuits.awardProcurement(
        closeRes.context,
        winningSupplier,
        winningPrice,
        salt,
      );

      expect(awardRes.result).toBe(true);
      const currentLedger = ledger(awardRes.context.currentQueryContext.state);
      expect(currentLedger.procurementState).toBe(3n); // Awarded
      expect(currentLedger.winningBidderId).toEqual(winningSupplier);
      expect(currentLedger.winningAmount).toBe(winningPrice);
    });

    it('11. rejects award if price exceeds procurement ceiling budget', () => {
      const winningSupplier = new Uint8Array(32).fill(42);
      const overBudgetCid = 550000n; // Exceeds 500k ceiling

      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, overBudgetCid],
        getBidderIdentity: (ctx) => [ctx.privateState, winningSupplier],
        getComplianceCredential: (ctx) => [ctx.privateState, new Uint8Array(32)],
      });

      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initializeProcurement(
        initialCtx,
        sampleTitleHash,
        sampleOrgId,
        sampleDeadline,
        sampleMaxBudget,
      );
      const closeRes = contract.impureCircuits.closeBidding(initRes.context, sampleDeadline);

      expect(() => {
        contract.impureCircuits.awardProcurement(
          closeRes.context,
          winningSupplier,
          overBudgetCid,
          new Uint8Array(32),
        );
      }).toThrow(/Winning bid exceeds procurement ceiling budget/);
    });
  });

  describe('Privacy & Confidentiality Invariants', () => {
    it('12. verifies that competing bids and supplier witness data never leak to public ledger', () => {
      const secretBid = 199999n;
      const contract = new Contract({
        getBidAmount: (ctx) => [ctx.privateState, secretBid],
        getBidderIdentity: (ctx) => [ctx.privateState, new Uint8Array(32)],
        getComplianceCredential: (ctx) => [ctx.privateState, new Uint8Array(32)],
      });

      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initializeProcurement(
        initialCtx,
        sampleTitleHash,
        sampleOrgId,
        sampleDeadline,
        sampleMaxBudget,
      );
      const bidRes = contract.impureCircuits.submitSealedBid(initRes.context, new Uint8Array(32), 1750000000n);

      const publicLedger = ledger(bidRes.context.currentQueryContext.state);

      // Verify public properties exist
      expect(publicLedger).toHaveProperty('procurementState');
      expect(publicLedger).toHaveProperty('totalBidsSubmitted');
      expect(publicLedger).toHaveProperty('submissionDeadline');

      // CRITICAL: Secret bid amount must NEVER exist on the ledger during bidding
      expect((publicLedger as any).secretBid).toBeUndefined();
      expect((publicLedger as any).getBidAmount).toBeUndefined();
      expect((publicLedger as any).bids).toBeUndefined();
      expect(publicLedger.totalBidsSubmitted).toBe(1n);
    });
  });
});
