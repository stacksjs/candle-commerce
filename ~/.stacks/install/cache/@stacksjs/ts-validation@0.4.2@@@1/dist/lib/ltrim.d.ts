export default function ltrim(str: string, chars?: string): string {
  assertString(str)
  const pattern = chars ? new RegExp(`^[${chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+`, 'g') : /^\s+/g
  return str.replace(pattern, '')
};