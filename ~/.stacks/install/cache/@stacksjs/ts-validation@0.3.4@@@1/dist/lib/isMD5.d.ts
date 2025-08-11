declare const md5: unknown;

export default function isMD5(str: string): boolean {
  assertString(str)
  return md5.test(str)
};