export default function isAscii(str: string): boolean {
  assertString(str)
  return ascii.test(str)
};