export declare interface IsBase32Options {
  crockford?: boolean | string
}
export declare interface IsBase64Options {
  urlSafe?: boolean | string
  padding?: boolean | string
}
export declare interface IsByteLengthOptions {
  min?: number
  max?: number
}
export declare interface CreditCardOptions {
  provider?: string
}
export declare interface CurrencyOptions {
  symbol: string
  require_symbol: boolean
  allow_space_after_symbol: boolean
  symbol_after_digits: boolean
  allow_negatives: boolean
  parens_for_negatives: boolean
  negative_sign_before_digits: boolean
  negative_sign_after_digits: boolean
  allow_negative_sign_placeholder: boolean
  thousands_separator: string
  decimal_separator: string
  allow_decimal: boolean
  require_decimal: boolean
  digits_after_decimal: number[]
  allow_space_after_digits: boolean
}
export declare interface DecimalValidatorOptions {
  force_decimal: boolean
  decimal_digits: string
  locale: string
}
export declare interface IsIMEIOptions {
  allow_hyphens?: boolean | string
}
export declare interface IsInOptions {
  hasOwnProperty?: boolean | string
  indexOf?: boolean | string
  includes?: boolean | string
}
export declare interface IsIPOptions {
  version?: number
}
export declare interface IsISBNOptions {
  version?: string | number
}
export declare interface ISO8601Options {
  strictSeparator?: boolean
  strict?: boolean
}
export declare interface IsJSONOptions {
  allow_primitives?: boolean | string
}
export declare interface IsLatLongOptions {
  checkDMS?: boolean | string
}
export declare interface IsMACAddressOptions {
  eui?: boolean | string
  no_separators?: boolean
  no_colons?: boolean
}
export declare interface IsRgbColorOptions {
  allowSpaces?: boolean
  includePercentValues?: boolean
}
export declare interface IsTimeOptions {
  hourFormat: 'hour24' | 'hour12'
  mode: 'default' | 'withSeconds' | 'withOptionalSeconds'
}