export default function isSlug(str: string): boolean {
  assertString(str)
  return charsetRegex.test(str)
};