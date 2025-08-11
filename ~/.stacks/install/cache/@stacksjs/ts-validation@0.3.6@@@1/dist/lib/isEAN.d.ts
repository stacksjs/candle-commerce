declare const LENGTH_EAN_8: unknown;
declare function getPositionWeightThroughLengthAndIndex(length: number, index: number): number;
declare function calculateCheckDigit(ean: string): number;

export default function isEAN(str: string): boolean {
  assertString(str)
  const actualCheckDigit = Number(str.slice(-1))

  return validEanRegex.test(str) && actualCheckDigit === calculateCheckDigit(str)
};