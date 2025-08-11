declare const validISO4217CurrencyCodes: unknown;
export declare const CurrencyCodes: Set<string>;

export default function isISO4217(str: string): boolean {
  assertString(str)
  return validISO4217CurrencyCodes.has(str.toUpperCase())
};