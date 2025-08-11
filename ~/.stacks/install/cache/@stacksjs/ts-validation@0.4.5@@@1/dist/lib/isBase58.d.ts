declare const base58Reg: unknown;

export default function isBase58(str: string): boolean {
  assertString(str)
  if (base58Reg.test(str)) {
    return true
  }
  return false
};