export default function isWhitelisted(str: string, chars: string[]): boolean {
  assertString(str)
  for (let i = str.length - 1; i >= 0; i--) {
    if (!chars.includes(str[i])) {
      return false
    }
  }
  return true
};