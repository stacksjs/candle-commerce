export default function isVariableWidth(str: string): boolean {
  assertString(str)
  return isFullWidth(str) && isHalfWidth(str)
};