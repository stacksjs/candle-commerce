export default function isULID(str: string): boolean {
  assertString(str)
  return /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i.test(str)
};