import { describe, expect, it } from 'bun:test';
import { KyberSwap } from '../src/kyberswap';
import { ChainIdentifier } from '../src/types';
import { NATIVE_TOKEN_ADDRESS } from '../src/constants';

describe('KyberSwap', () => {
  it('should fetch swap route successfully', async () => {
    const kyberSwap = new KyberSwap();
    const params = {
      chainName: ChainIdentifier.ETHEREUM,
      tokenIn: NATIVE_TOKEN_ADDRESS,
      tokenOut: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      amountIn: '1000000000000000000',
    };

    const result = await kyberSwap.getSwapRoute(params);

    // console log the full nested objects in terminal
    console.log(result, null, 2);

    // Verify the top-level response structure
    expect(result).toHaveProperty('code', 0);
    expect(result).toHaveProperty('message', 'successfully');
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('requestId');

    // Verify the routeSummary structure
    const { routeSummary } = result.data;
    expect(routeSummary).toHaveProperty('tokenIn');
    expect(routeSummary).toHaveProperty('amountIn');
    expect(routeSummary).toHaveProperty('amountInUsd');
    expect(routeSummary).toHaveProperty('tokenOut');
    expect(routeSummary).toHaveProperty('amountOut');
    expect(routeSummary).toHaveProperty('amountOutUsd');
    expect(routeSummary).toHaveProperty('gas');
    expect(routeSummary).toHaveProperty('gasPrice');
    expect(routeSummary).toHaveProperty('gasUsd');
    expect(routeSummary).toHaveProperty('extraFee');
    expect(routeSummary).toHaveProperty('route');
    expect(routeSummary).toHaveProperty('routeID');
    expect(routeSummary).toHaveProperty('checksum');
    expect(routeSummary).toHaveProperty('timestamp');

    // Verify the extraFee structure
    const { extraFee } = routeSummary;
    expect(extraFee).toHaveProperty('feeAmount');
    expect(extraFee).toHaveProperty('chargeFeeBy');
    expect(extraFee).toHaveProperty('isInBps');
    expect(extraFee).toHaveProperty('feeReceiver');

    // Verify the route structure
    expect(Array.isArray(routeSummary.route)).toBe(true);
    expect(routeSummary.route.length).toBeGreaterThan(0);
    
    // Verify the first hop in the route
    const firstHop = routeSummary.route[0][0];
    expect(firstHop).toHaveProperty('pool');
    expect(firstHop).toHaveProperty('tokenIn');
    expect(firstHop).toHaveProperty('tokenOut');
    expect(firstHop).toHaveProperty('swapAmount');
    expect(firstHop).toHaveProperty('amountOut');
    expect(firstHop).toHaveProperty('exchange');
    expect(firstHop).toHaveProperty('poolType');
    expect(firstHop).toHaveProperty('poolExtra');
    expect(firstHop).toHaveProperty('extra');

    // Verify the router address
    expect(result.data).toHaveProperty('routerAddress');
  });
}); 