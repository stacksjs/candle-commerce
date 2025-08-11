export default function equals(str: string, comparison: string): boolean {
  assertString(str)
  return str === comparison
};