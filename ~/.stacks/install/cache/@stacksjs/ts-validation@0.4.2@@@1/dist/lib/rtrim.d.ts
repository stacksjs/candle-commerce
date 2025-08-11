export default function rtrim(str: string, chars?: string): string {
  assertString(str)
  if (chars) {
    const pattern = new RegExp(`[${chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+$`, 'g')
    return str.replace(pattern, '')
  }
  let strIndex = str.length - 1
  while (/\s/.test(str.charAt(strIndex))) {
    strIndex -= 1
  }

  return str.slice(0, strIndex + 1)
};