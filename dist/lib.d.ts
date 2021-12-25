import { BlockTag, TransactionReceipt, TransactionRequest } from '@ethersproject/abstract-provider';
import { Networkish } from '@ethersproject/networks';
import { BaseProvider, TransactionResponse } from '@ethersproject/providers';
import { ConnectionInfo } from '@ethersproject/web';
import { BigNumber, providers, Signer } from 'ethers';
export declare const DEFAULT_FLASHBOTS_RELAY = "https://relay.flashbots.net";
export declare enum FlashbotsBundleResolution {
    BundleIncluded = 0,
    BlockPassedWithoutInclusion = 1,
    AccountNonceTooHigh = 2
}
export interface FlashbotsBundleRawTransaction {
    signedTransaction: string;
}
export interface FlashbotsBundleTransaction {
    transaction: TransactionRequest;
    signer: Signer;
}
export interface FlashbotsOptions {
    minTimestamp?: number;
    maxTimestamp?: number;
    revertingTxHashes?: Array<string>;
}
export interface FlashbotsBundle {
    signedBundledTransactions: Array<string>;
    blockTarget: number;
    options?: FlashbotsOptions;
}
export interface TransactionAccountNonce {
    hash: string;
    signedTransaction: string;
    account: string;
    nonce: number;
}
export interface FlashbotsTransactionResponse {
    bundleTransactions: Array<TransactionAccountNonce>;
    wait: () => Promise<FlashbotsBundleResolution>;
    simulate: () => Promise<SimulationResponse>;
    receipts: () => Promise<Array<TransactionReceipt>>;
}
export interface TransactionSimulationBase {
    txHash: string;
    gasUsed: number;
}
export interface TransactionSimulationSuccess extends TransactionSimulationBase {
    value: string;
}
export interface TransactionSimulationRevert extends TransactionSimulationBase {
    error: string;
    revert: string;
}
export declare type TransactionSimulation = TransactionSimulationSuccess | TransactionSimulationRevert;
export interface RelayResponseError {
    error: {
        message: string;
        code: number;
    };
}
export interface SimulationResponseSuccess {
    bundleHash: string;
    coinbaseDiff: BigNumber;
    results: Array<TransactionSimulation>;
    totalGasUsed: number;
    firstRevert?: TransactionSimulation;
}
export declare type SimulationResponse = SimulationResponseSuccess | RelayResponseError;
export declare type FlashbotsTransaction = FlashbotsTransactionResponse | RelayResponseError;
export interface GetUserStatsResponseSuccess {
    signing_address: string;
    blocks_won_total: number;
    bundles_submitted_total: number;
    bundles_error_total: number;
    avg_gas_price_gwei: number;
    blocks_won_last_7d: number;
    bundles_submitted_last_7d: number;
    bundles_error_7d: number;
    avg_gas_price_gwei_last_7d: number;
    blocks_won_last_numberd: number;
    bundles_submitted_last_numberd: number;
    bundles_error_numberd: number;
    avg_gas_price_gwei_last_numberd: number;
    blocks_won_last_numberh: number;
    bundles_submitted_last_numberh: number;
    bundles_error_numberh: number;
    avg_gas_price_gwei_last_numberh: number;
    blocks_won_last_5m: number;
    bundles_submitted_last_5m: number;
    bundles_error_5m: number;
    avg_gas_price_gwei_last_5m: number;
}
export declare type GetUserStatsResponse = GetUserStatsResponseSuccess | RelayResponseError;
export interface GetBundleStatsResponseSuccess {
    isSimulated: boolean;
    isSentToMiners: boolean;
    isHighPriority: boolean;
    simulatedAt: string;
    submittedAt: string;
    sentToMinersAt: string;
}
export declare type GetBundleStatsResponse = GetBundleStatsResponseSuccess | RelayResponseError;
export declare class FlashbotsBundleProvider extends providers.JsonRpcProvider {
    private genericProvider;
    private authSigner;
    private connectionInfo;
    constructor(genericProvider: BaseProvider, authSigner: Signer, connectionInfoOrUrl: ConnectionInfo, network: Networkish);
    static throttleCallback(): Promise<boolean>;
    static create(genericProvider: BaseProvider, authSigner: Signer, connectionInfoOrUrl?: ConnectionInfo | string, network?: Networkish): Promise<FlashbotsBundleProvider>;
    static getMaxBaseFeeInFutureBlock(baseFee: BigNumber, blocksInFuture: number): BigNumber;
    sendRawBundle(signedBundledTransactions: Array<string>, targetBlockNumber: number, opts?: FlashbotsOptions): Promise<FlashbotsTransaction>;
    sendBundle(bundledTransactions: Array<FlashbotsBundleTransaction | FlashbotsBundleRawTransaction>, targetBlockNumber: number, opts?: FlashbotsOptions): Promise<FlashbotsTransaction>;
    signBundle(bundledTransactions: Array<FlashbotsBundleTransaction | FlashbotsBundleRawTransaction>): Promise<Array<string>>;
    private wait;
    getUserStats(): Promise<GetUserStatsResponse>;
    getBundleStats(bundleHash: string, blockNumber: number): Promise<GetBundleStatsResponse>;
    simulate(signedBundledTransactions: Array<string>, blockTag: BlockTag, stateBlockTag?: BlockTag, blockTimestamp?: number): Promise<SimulationResponse>;
    /**
     * Method to send a carrier tx into the public mempool
     *
     * @param bundle  FlashbotsBundle with AT LEAST signed bundled transactions in signedBundledTransactions field obtained
     *  from {@link signBundle} method, and blockTarget.
     * @param validatorPublicKey  The public key of the validator that will be able to decrypt the bundle and include it
     *  into the bundle pool.
     * @param signer  Signer who will sign the carrier transaction.
     * @param carrierTx TransactionRequest whose data field will carry the encrypted bundle : MAY be an incomplete
     *  object which will be populated with default values.
     *
     * @return Promise<TransactionResponse> Promise containing the response for the carrier tx
     * */
    sendCarrierTransaction(bundle: FlashbotsBundle, validatorPublicKey: string, signer: Signer, carrierTx: TransactionRequest): Promise<TransactionResponse>;
    /**
     * A private method to encode a FlashbotsBundle following the RLP serialization standard
     * @param bundle the FlashbotsBundle instance to be serialized
     * @return string the rlp encoded bundle
     * @private
     */
    private rlpSerializeBundle;
    private formatNumber;
    /**
     * A private method to populate {@param carrier}'s missing fields with default values
     * @param carrier an instance of TransactionRequest which will be the tx containing the full payload in its data field
     * @param signer the signer Object which will send the carrier tx
     * @private
     */
    private populateCarrierTransaction;
    private request;
    private fetchReceipts;
    private prepareBundleRequest;
}
