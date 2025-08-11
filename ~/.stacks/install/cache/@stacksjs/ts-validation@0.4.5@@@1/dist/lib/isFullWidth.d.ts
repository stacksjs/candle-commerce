export default function isFullWidth(str: string): boolean {
  assertString(str)
  return fullWidth.test(str)
};