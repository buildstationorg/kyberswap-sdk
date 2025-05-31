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

  it('should post swap route for encoded data successfully', async () => {
    const kyberSwap = new KyberSwap();
    
    // First, get a swap route
    const swapRouteParams = {
      chainName: ChainIdentifier.ETHEREUM,
      tokenIn: NATIVE_TOKEN_ADDRESS,
      tokenOut: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
      amountIn: '1000000000000000000', // 1 ETH
    };

    const swapRouteResult = await kyberSwap.getSwapRoute(swapRouteParams);

    // console log the full nested objects in terminal
    console.log(swapRouteResult, null, 2);

    expect(swapRouteResult).toHaveProperty('data');
    expect(swapRouteResult.data).toHaveProperty('routeSummary');

    // Then use the route data to get encoded data
    const postSwapParams = {
      chainName: ChainIdentifier.ETHEREUM,
      routeSummary: swapRouteResult.data.routeSummary,
      sender: '0xd06c478DbfE22c014EA0E76A0BB216f346e2EbDB', // Example sender address
      recipient: '0xd06c478DbfE22c014EA0E76A0BB216f346e2EbDB', // Example recipient address
    };

    const encodedDataResult = await kyberSwap.postSwapRouteForEncodedData(postSwapParams);

    // console log the full nested objects in terminal
    console.log(encodedDataResult, null, 2);

    expect(encodedDataResult).toHaveProperty('code', 0);
    expect(encodedDataResult).toHaveProperty('message', 'successfully');
    expect(encodedDataResult).toHaveProperty('data');
    expect(encodedDataResult.data).toHaveProperty('amountIn');
    expect(encodedDataResult.data).toHaveProperty('amountInUsd');
    expect(encodedDataResult.data).toHaveProperty('amountOut');
    expect(encodedDataResult.data).toHaveProperty('amountOutUsd');
    expect(encodedDataResult.data).toHaveProperty('gas');
    expect(encodedDataResult.data).toHaveProperty('gasUsd');
    expect(encodedDataResult.data).toHaveProperty('additionalCostUsd');
    expect(encodedDataResult.data).toHaveProperty('additionalCostMessage');
    expect(encodedDataResult.data).toHaveProperty('data');
    expect(encodedDataResult.data).toHaveProperty('routerAddress');
    expect(encodedDataResult.data).toHaveProperty('transactionValue');
    expect(encodedDataResult).toHaveProperty('requestId');
  });
});


