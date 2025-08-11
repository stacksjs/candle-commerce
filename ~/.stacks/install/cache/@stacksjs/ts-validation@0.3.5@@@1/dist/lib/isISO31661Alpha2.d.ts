declare const validISO31661Alpha2CountriesCodes: unknown;
export declare const CountryCodes: Set<string>;

export default function isISO31661Alpha2(str: string): boolean {
  assertString(str)
  return validISO31661Alpha2CountriesCodes.has(str.toUpperCase())
};