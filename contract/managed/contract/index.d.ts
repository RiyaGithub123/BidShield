import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  getBidAmount(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
  getBidderIdentity(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  getComplianceCredential(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  initializeProcurement(context: __compactRuntime.CircuitContext<PS>,
                        titleHash_0: Uint8Array,
                        orgId_0: Uint8Array,
                        deadline_0: bigint,
                        maxBudget_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  submitSealedBid(context: __compactRuntime.CircuitContext<PS>,
                  bidCommitment_0: Uint8Array,
                  submissionTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyCompliance(context: __compactRuntime.CircuitContext<PS>,
                   expectedAccreditationHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
  closeBidding(context: __compactRuntime.CircuitContext<PS>,
               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  awardProcurement(context: __compactRuntime.CircuitContext<PS>,
                   awardedSupplier_0: Uint8Array,
                   awardedPrice_0: bigint,
                   bidSalt_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
}

export type ProvableCircuits<PS> = {
  initializeProcurement(context: __compactRuntime.CircuitContext<PS>,
                        titleHash_0: Uint8Array,
                        orgId_0: Uint8Array,
                        deadline_0: bigint,
                        maxBudget_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  submitSealedBid(context: __compactRuntime.CircuitContext<PS>,
                  bidCommitment_0: Uint8Array,
                  submissionTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyCompliance(context: __compactRuntime.CircuitContext<PS>,
                   expectedAccreditationHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
  closeBidding(context: __compactRuntime.CircuitContext<PS>,
               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  awardProcurement(context: __compactRuntime.CircuitContext<PS>,
                   awardedSupplier_0: Uint8Array,
                   awardedPrice_0: bigint,
                   bidSalt_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  initializeProcurement(context: __compactRuntime.CircuitContext<PS>,
                        titleHash_0: Uint8Array,
                        orgId_0: Uint8Array,
                        deadline_0: bigint,
                        maxBudget_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  submitSealedBid(context: __compactRuntime.CircuitContext<PS>,
                  bidCommitment_0: Uint8Array,
                  submissionTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyCompliance(context: __compactRuntime.CircuitContext<PS>,
                   expectedAccreditationHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
  closeBidding(context: __compactRuntime.CircuitContext<PS>,
               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  awardProcurement(context: __compactRuntime.CircuitContext<PS>,
                   awardedSupplier_0: Uint8Array,
                   awardedPrice_0: bigint,
                   bidSalt_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
}

export type Ledger = {
  readonly procurementState: bigint;
  readonly procurementId: Uint8Array;
  readonly organizationId: Uint8Array;
  readonly submissionDeadline: bigint;
  readonly ceilingBudget: bigint;
  readonly totalBidsSubmitted: bigint;
  readonly winningBidderId: Uint8Array;
  readonly winningAmount: bigint;
  readonly isComplianceVerified: boolean;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
