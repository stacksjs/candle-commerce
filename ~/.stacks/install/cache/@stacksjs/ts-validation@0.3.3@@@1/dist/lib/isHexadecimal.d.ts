export default function isHexadecimal(str: string): boolean {
  assertString(str)
  return hexadecimal.test(str)
};