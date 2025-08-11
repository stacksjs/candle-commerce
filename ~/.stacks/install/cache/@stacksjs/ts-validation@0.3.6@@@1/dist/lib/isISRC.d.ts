export default function isISRC(str: string): boolean {
  assertString(str)
  return isrc.test(str)
};