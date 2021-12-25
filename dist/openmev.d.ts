/**
Copyright 2021 CommodityStream LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { BlockTag, TransactionReceipt, TransactionRequest } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Networkish } from '@ethersproject/networks';
import { ConnectionInfo } from '@ethersproject/web';
import * as providers from '@ethersproject/providers';
import { BaseProvider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
export declare function id(text: string): string;
export declare const DEFAULT_FLASHBOTS_ENDPOINT = "https://relay.flashbots.net";
export declare const DEFAULT_ETHERMINE_ENDPOINT = "https://mev-relay.ethermine.org/";
export declare const DEFAULT_OPENMEV_ENDPOINT_PROVIDER = "https://api.openmev.net:10001/v1/public/provider";
export declare enum SystemConfigId {
    CONFIG_MINER_RELAY = 0,
    UNRECOGNIZED = -1
}
export declare function systemConfigIdFromJSON(object: any): SystemConfigId;
export declare function systemConfigIdToJSON(object: SystemConfigId): string;
export declare enum BundleSourceId {
    BATCH_BUNDLER = 0,
    KDB = 1,
    UNREC = 2
}
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
    blocks_won_last_numbered: number;
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
    sentToMinersAt: Date;
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
    private request;
    private fetchReceipts;
    private prepareBundleRequest;
}
