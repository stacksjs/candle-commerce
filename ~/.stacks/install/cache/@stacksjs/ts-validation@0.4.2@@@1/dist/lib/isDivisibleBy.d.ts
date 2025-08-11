export default function isDivisibleBy(str: string, num: number): boolean {
  assertString(str)
  return toFloat(str) % num === 0
};