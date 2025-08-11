import type { DecimalValidatorOptions } from '../types';

declare function decimalRegExp(options: DecimalValidatorOptions): RegExp;
declare const default_decimal_options: {
  force_decimal: false;
  decimal_digits: '1,';
  locale: 'en-US'
};
declare const blacklist: Array<'' | '-' | '+']

 * Check if the string is Decimal
 *
 * @param str - The string to check
 * @param options - Options object
 * @returns True if the string matches the validation, false otherwise
 *>;

export default function isDecimal(str: string, options: Partial<DecimalValidatorOptions>): boolean {
  assertString(str)
  const mergedOptions = merge(options, default_decimal_options) as DecimalValidatorOptions
  if (mergedOptions.locale in decimal) {
    return !includes(blacklist, str.replace(/ /g, '')) && decimalRegExp(mergedOptions).test(str)
  }
  throw new Error(`Invalid locale '${mergedOptions.locale}'`)
};