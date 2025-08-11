export default function toInt(str: string, radix: number = 10): number {
  assertString(str)
  return Number.parseInt(str, radix)
};