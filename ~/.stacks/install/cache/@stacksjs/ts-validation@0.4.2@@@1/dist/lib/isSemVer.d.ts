declare const semanticVersioningRegex: unknown;

export default function isSemVer(str: string): boolean {
  assertString(str)

  return semanticVersioningRegex.test(str)
};