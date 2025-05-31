export enum ChainIdNumber {
  ETHEREUM = 1,
  BSC = 56,
  ARBITRUM = 42161,
  POLYGON = 137,
  OPTIMISM = 10,
  AVALANCHE = 43114,
  BASE = 8453,
  ZKSYNC = 324,
  FANTOM = 250,
  LINEA = 59144,
  SCROLL = 534352,
  MANTLE = 5000,
  BLAST = 81457,
  SONIC = 146,
  BERACHAIN = 80094,
  RONIN = 2020,
}

export enum ChainIdentifier {
  ETHEREUM = 'ethereum',
  BSC = 'bsc',
  ARBITRUM = 'arbitrum',
  POLYGON = 'polygon',
  OPTIMISM = 'optimism',
  AVALANCHE = 'avalanche',
  BASE = 'base',
  ZKSYNC = 'zksync',
  FANTOM = 'fantom',
  LINEA = 'linea',
  SCROLL = 'scroll',
  MANTLE = 'mantle',
  BLAST = 'blast',
  SONIC = 'sonic',
  BERACHAIN = 'berachain',
  RONIN = 'ronin',
} 

export enum ChargeFeeBy {
  CURRENCY_IN = 'currency_in',
  CURRENCY_OUT = 'currency_out',
}

export interface GetSwapRouteParams {
  chainName: ChainIdentifier;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  includedSources?: string[];
  excludedSources?: string[];
  onlyScalableSources?: boolean;
  onlySinglePath?: boolean;
  gasInclude?: boolean;
  gasLimit?: string;
  feeAmount?: string;
  chargeFeeBy?: ChargeFeeBy;
  isInBps?: boolean;
  feeReceiver?: string;
}

export interface GetSwapRouteResponse {
  code: number;
  message: string;
  data: {
    routeSummary: RouteSummary;
    routerAddress: string;
  };
  requestId: string;
}

export interface ExtraFee {
  feeAmount: string;
  chargeFeeBy?: ChargeFeeBy;
  isInBps?: boolean;
  feeReceiver: string;
}

export interface Route {
  pool: string;
  tokenIn: string;
  tokenOut: string;
  swapAmount: string;
  amountOut: string;
  exchange: string;
  poolType: string;
  poolExtra: string;
  extra: string;
}

export interface RouteSummary {
  tokenIn: string;
  amountIn: string;
  amountInUsd: string;
  tokenOut: string;
  amountOut: string;
  amountOutUsd: string;
  gas: string;
  gasPrice: string;
  gasUsd: string;
  extraFee: string;
  route: Route[][];
  routeId: string;
  checksum: string;
  timestamp: string;
}

export interface PostSwapRouteForEncodedDataParams {
  chainName: ChainIdentifier;
  routeSummary: RouteSummary;
  sender: string;
  recipient: string;
  permit?: string;
  deadline?: number;
  slippageTolerance?: number;
  ignoreCappedSlippage?: boolean;
  enableGasEstimation?: boolean;
  source?: string;
  referrer?: string;
}

export interface PostSwapRouteForEncodedDataResponse {
  code: number;
  message: string;
  data: SwapEncodedData;
  requestId: string;
}

export interface SwapEncodedData {
  amountIn: string;
  amountInUsd: string;
  amountOut: string;
  amountOutUsd: string;
  gas: string;
  gasUsd: string;
  additionalCostUsd?: string;
  additionalCostMessage?: string;
  data: string;
  routerAddress: string;
  transactionValue: string;
}