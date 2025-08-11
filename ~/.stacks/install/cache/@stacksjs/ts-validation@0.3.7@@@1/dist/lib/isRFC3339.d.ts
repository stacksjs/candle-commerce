declare const timeNumOffset: unknown;
declare const partialTime: unknown;
declare const rfc3339: unknown;

export default function isRFC3339(str: string): boolean {
  assertString(str)
  return rfc3339.test(str)
};