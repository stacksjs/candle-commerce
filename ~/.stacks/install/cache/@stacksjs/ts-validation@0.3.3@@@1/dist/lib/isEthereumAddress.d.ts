declare const eth: unknown;

export default function isEthereumAddress(str: string): boolean {
  assertString(str)
  return eth.test(str)
};