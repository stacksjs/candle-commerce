declare const base58: unknown;

export default function isBtcAddress(str: string): boolean {
  assertString(str)
  return bech32.test(str) || base58.test(str)
};