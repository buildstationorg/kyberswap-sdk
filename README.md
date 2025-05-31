# KYBERSWAP SDK
> Typescript SDK for interacting with Kyberswap Aggregator Service

## Install

```bash
npm i kyberswap-sdk
```

```bash
bun add kyberswap-sdk
```

## Usage

```ts
import { KyberSwap } from "kyberswap-sdk";
import { ChainIdentifier, NATIVE_TOKEN_ADDRESS } from "kyberswap-sdk";

const kyberSwap = new KyberSwap();
const params = {
  chainName: ChainIdentifier.ETHEREUM,
  tokenIn: NATIVE_TOKEN_ADDRESS,
  tokenOut: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  amountIn: '1000000000000000000',
};

const swapRoute = await kyberSwap.getSwapRoute(params);

console.log(swapRoute);
```
Output

```bash
{
  code: 0,
  message: "successfully",
  data: {
    routeSummary: {
      tokenIn: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      amountIn: "1000000000000000000",
      amountInUsd: "2517.0372515207",
      tokenOut: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      amountOut: "2518136211",
      amountOutUsd: "2519.1483191436364",
      gas: "300000",
      gasPrice: "959344470",
      gasUsd: "0.7244117304091148",
      l1FeeUsd: "0",
      extraFee: {
        feeAmount: "",
        chargeFeeBy: "",
        isInBps: false,
        feeReceiver: "",
      },
      route: [
        [
          {
            pool: "kyber_pmm_0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2_0x6b175474e89094c44da98b954eedeac495271d0f_0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48_0xdac17f958d2ee523a2206206994597c13d831ec7_0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
            tokenIn: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            tokenOut: "0xdac17f958d2ee523a2206206994597c13d831ec7",
            swapAmount: "1000000000000000000",
            amountOut: "2517018552",
            exchange: "kyber-pmm",
            poolType: "kyber-pmm",
            poolExtra: {
              timestamp: 1748672078,
            },
            extra: {
              makerAsset: "0xdac17f958d2ee523a2206206994597c13d831ec7",
              makingAmount: "2517145663",
              ri: "d617b3df-5833-4506-9366-fb600d52c0ad",
              takerAsset: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
              takingAmount: "1000000000000000000",
            },
          }, {
            pool: "0x3b1bd35a555160a9b60c7524db56029c2025ab93b69d97d33ca3f1c23b6494ad",
            tokenIn: "0xdac17f958d2ee523a2206206994597c13d831ec7",
            tokenOut: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            swapAmount: "2517018552",
            amountOut: "2518136211",
            exchange: "uniswap-v4-fairflow",
            poolType: "uniswap-v4",
            poolExtra: {
              router: "0x66a9893cc07d91d95644aedd05d03f95e1dba8af",
              permit2Addr: "0x000000000022d473030f116ddee9f6b43ac78ba3",
              tokenIn: "0xdac17f958d2ee523a2206206994597c13d831ec7",
              tokenOut: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
              fee: 1,
              tickSpacing: 1,
              hookAddress: "0x4440854b2d02c57a0dc5c58b7a884562d875c0c4",
              hookData: "",
              priceLimit: "79228162514264337593543950335",
            },
            extra: {
              nSqrtRx96: "79210554470891081047533411870",
            },
          }
        ]
      ],
      routeID: "d617b3df-5833-4506-9366-fb600d52c0ad",
      checksum: "2610648935053983538",
      timestamp: 1748672080,
    },
    routerAddress: "0x6131B5fae19EA4f9D964eAc0408E4408b66337b5",
  },
  requestId: "d617b3df-5833-4506-9366-fb600d52c0ad",
}
```