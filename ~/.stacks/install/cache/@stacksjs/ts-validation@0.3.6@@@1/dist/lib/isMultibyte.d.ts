export default function isMultibyte(str: string): boolean {
  assertString(str)
  return multibyte.test(str)
};