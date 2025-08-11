export default function toFloat(str: string): number {
  assertString(str)
  return Number.parseFloat(str)
};