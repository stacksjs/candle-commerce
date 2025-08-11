declare function isRegExp(obj: any): boolean;

export default function checkHost(host: string, matches: (string | RegExp)[]): boolean {
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    if (host === match || (isRegExp(match) && (match as RegExp).test(host))) {
      return true
    }
  }
  return false
};