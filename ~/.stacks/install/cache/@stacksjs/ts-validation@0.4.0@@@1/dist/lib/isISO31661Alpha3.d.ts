declare const validISO31661Alpha3CountriesCodes: unknown;

export default function isISO31661Alpha3(str: string): boolean {
  assertString(str)
  return validISO31661Alpha3CountriesCodes.has(str.toUpperCase())
};