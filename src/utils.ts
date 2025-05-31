export function formatAmount(amount: string | number, decimals: number = 18): string {
  return typeof amount === 'string' ? amount : amount.toString();
}

export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function calculateSlippage(amount: string, slippage: number): string {
  const amountBN = BigInt(amount);
  const slippageBN = BigInt(Math.floor(slippage * 100));
  return (amountBN * (10000n - slippageBN) / 10000n).toString();
} 