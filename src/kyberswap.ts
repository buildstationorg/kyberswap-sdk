import { GetSwapRouteParams } from './types';
import { API_ROUTES, KYBERSWAP_BASE_URL } from './constants';

export class KyberSwap {
  private clientId: string;

  constructor(clientId: string = 'kyberswap') {
    this.clientId = clientId;
  }

  async getSwapRoute(params: GetSwapRouteParams) {
    const response = await fetch(`${KYBERSWAP_BASE_URL}${params.chainName}${API_ROUTES.GET_SWAP_ROUTE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'X-Client-Id': this.clientId,
      },
      body: JSON.stringify(params),
    });
    return response.json();
  }
} 