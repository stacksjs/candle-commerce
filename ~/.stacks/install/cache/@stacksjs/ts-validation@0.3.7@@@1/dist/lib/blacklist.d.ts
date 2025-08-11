export default function blacklist(str: string, chars: string): string {
  assertString(str)
  return str.replace(new RegExp(`[${chars}]+`, 'g'), '')
};