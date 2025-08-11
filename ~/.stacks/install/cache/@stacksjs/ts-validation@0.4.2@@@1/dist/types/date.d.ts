import type { Validator } from './base';

export declare interface DateOptions {
  format: string
  delimiters: string[]
  strictMode: boolean
}
export declare interface DateObj {
  y: string
  m: string
  d: string
}
export declare interface IsBeforeOptions {
  comparisonDate?: string | number | Date
}
export declare interface IsAfterOptions {
  comparisonDate?: string | number | Date
}
export declare interface DateValidatorType extends Validator<Date> {
}
export declare interface DatetimeValidatorType extends Validator<Date> {
}