import { ChainIdentifier } from './types';
import { API_ROUTES, KYBERSWAP_BASE_URL } from './constants';

export class KyberSwap {
  private clientId: string;

  constructor(clientId: string = 'kyberswap') {
    this.clientId = clientId;
  }

  async getSwapRoute(params: {
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
    chargeFeeBy?: string;
    isInBps?: boolean;
    feeReceiver?: string;
  }) {
    const response = await fetch(`${KYBERSWAP_BASE_URL}${params.chainName}${API_ROUTES.GET_SWAP_ROUTE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': this.clientId,
      },
      body: JSON.stringify(params),
    });
    return response.json();
  }
} 