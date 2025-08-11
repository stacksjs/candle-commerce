export default function isUppercase(str: string): boolean {
  assertString(str)
  return str === str.toUpperCase()
};