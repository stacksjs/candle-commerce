import type { CurrencyOptions } from '../types';

declare function currencyRegex(options: CurrencyOptions): RegExp;
declare const default_currency_options: CurrencyOptions;

export default function isCurrency(str: string, options?: Partial<CurrencyOptions>): boolean {
  assertString(str)
  const mergedOptions = merge(options, default_currency_options) as CurrencyOptions
  return currencyRegex(mergedOptions).test(str)
};