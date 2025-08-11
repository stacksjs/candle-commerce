export declare interface ValidatorLocaleOptions {
  locale?: string | string[]
  options?: object
}
export declare interface EmailOptions {
  allow_display_name?: boolean
  require_display_name?: boolean
  allow_utf8_local_part?: boolean
  require_tld?: boolean
  ignore_max_length?: boolean
  allow_ip_domain?: boolean
  domain_specific_validation?: boolean
  blacklisted_chars?: string
  host_blacklist?: string[]
  host_whitelist?: string[]
}
export declare interface URLOptions {
  protocols?: string[]
  require_tld?: boolean
  require_protocol?: boolean
  require_host?: boolean
  require_port?: boolean
  require_valid_protocol?: boolean
  allow_underscores?: boolean
  host_whitelist?: (string | RegExp)[]
  host_blacklist?: (string | RegExp)[]
  allow_trailing_dot?: boolean
  allow_protocol_relative_urls?: boolean
  allow_fragments?: boolean
  allow_query_components?: boolean
  validate_length?: boolean
  disallow_auth?: boolean
}
export declare interface IPOptions {
  version?: string
}
export declare interface MACAddressOptions {
  no_colons?: boolean
  case_sensitive?: boolean
}
export declare interface FQDNOptions {
  require_tld?: boolean
  allow_underscores?: boolean
  allow_trailing_dot?: boolean
  allow_numeric_tld?: boolean
  allow_wildcard?: boolean
}
export declare type AlphaOptions = {
  ignore?: string | RegExp
} & ValidatorLocaleOptions

export type AlphanumericOptions = {
  ignore?: string | RegExp
} & ValidatorLocaleOptions

export interface NumericOptions {
  no_symbols?: boolean
  locale?: string
}

export interface FloatOptions {
  min?: number
  max?: number
  gt?: number
  lt?: number
  locale?: string
}

export interface IntOptions {
  min?: number
  max?: number
  allow_leading_zeroes?: boolean
  lt?: number
  gt?: number
}

export interface RGBOptions {
  includePercentValues?: boolean
}

export interface HSLOptions {
  legacy?: boolean
  includePercentValues?: boolean
}

export interface LengthOptions {
  min?: number
  max?: number
}

export interface CreditCardOptions {
  provider?: string | string[]
}

export interface CurrencyOptions {
  symbol?: string
  require_symbol?: boolean
  allow_space_after_symbol?: boolean
  symbol_after_digits?: boolean
  allow_negatives?: boolean
  parens_for_negatives?: boolean
  negative_sign_before_digits?: boolean
  negative_sign_after_digits?: boolean
  allow_negative_sign_placeholder?: boolean
  thousands_separator?: string
  decimal_separator?: string
  allow_decimal?: boolean
  require_decimal?: boolean
  digits_after_decimal?: number[]
  allow_space_after_digits?: boolean
}

export interface Base64Options {
  urlSafe?: boolean
}

export interface ISO8601Options {
  strict?: boolean
  strictSeparator?: boolean
}

export interface PostalCodeOptions {
  locale?: string
}

export type MobilePhoneOptions = {
  strictMode?: boolean
} & ValidatorLocaleOptions

export interface StrongPasswordOptions {
  minLength?: number
  minLowercase?: number
  minUppercase?: number
  minNumbers?: number
  minSymbols?: number
  returnScore?: boolean
  pointsPerUnique?: number
  pointsPerRepeat?: number
  pointsForContainingLower?: number
  pointsForContainingUpper?: number
  pointsForContainingNumber?: number
  pointsForContainingSymbol?: number
}

export interface IsAfterOptions {
  comparisonDate?: string | number | Date
}

export interface IsAlphaOptions {
  ignore?: string | RegExp
}