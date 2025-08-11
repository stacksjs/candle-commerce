export default function trim(str: string, chars: string): string {
  return rtrim(ltrim(str, chars), chars)
};