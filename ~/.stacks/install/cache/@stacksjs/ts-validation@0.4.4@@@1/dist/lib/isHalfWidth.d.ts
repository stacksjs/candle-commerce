export default function isHalfWidth(str: string): boolean {
  assertString(str)
  return halfWidth.test(str)
};