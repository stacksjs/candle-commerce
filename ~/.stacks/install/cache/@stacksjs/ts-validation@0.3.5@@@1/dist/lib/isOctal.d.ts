declare const octal: unknown;

export default function isOctal(str: string): boolean {
  assertString(str)
  return octal.test(str)
};