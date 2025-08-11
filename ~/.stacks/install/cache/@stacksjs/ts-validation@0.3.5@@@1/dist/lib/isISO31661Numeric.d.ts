declare const validISO31661NumericCountriesCodes: unknown;

export default function isISO31661Numeric(str: string): boolean {
  assertString(str)
  return validISO31661NumericCountriesCodes.has(str)
};