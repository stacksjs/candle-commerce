export default function escape(str: string): string {
  assertString(str)
  return (str.replace(/&/g, '&amp')
    .replace(/"/g, '&quot')
    .replace(/'/g, '&#x27')
    .replace(/</g, '&lt')
    .replace(/>/g, '&gt')
    .replace(/\
    .replace(/\\/g, '&#x5C')
    .replace(/`/g, '&#96'))
};