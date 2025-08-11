declare const ibanRegexThroughCountryCode: { [key: string]: RegExp };
declare function hasOnlyValidCountryCodes(countryCodeArray: string[]): boolean;
declare function hasValidIbanFormat(str: string, options: { whitelist?: string[], blacklist?: string[] } = {}): boolean;
declare function hasValidIbanChecksum(str: string): boolean;
export declare const locales: string[];

export default function isIBAN(str: string, options: { whitelist?: string[], blacklist?: string[] } = {}): boolean {
  assertString(str)

  return hasValidIbanFormat(str, options) && hasValidIbanChecksum(str)
};