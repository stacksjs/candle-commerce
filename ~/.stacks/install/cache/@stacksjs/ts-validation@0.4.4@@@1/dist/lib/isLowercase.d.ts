export default function isLowercase(str: string): boolean {
  assertString(str)
  return str === str.toLowerCase()
};