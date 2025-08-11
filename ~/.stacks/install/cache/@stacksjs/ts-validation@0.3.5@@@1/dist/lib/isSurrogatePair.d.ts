export default function isSurrogatePair(str: string): boolean {
  assertString(str)
  return surrogatePair.test(str)
};