import type { LengthValidator, Validator } from './base';
import type { NumberValidator } from '../validators/numbers';

export declare interface IsIntOptions {
  allow_leading_zeroes?: boolean
  min?: number
  max?: number
  lt?: number
  gt?: number
}
export declare interface NumericOptions {
  no_symbols?: boolean
  locale?: string
}
export declare interface NumberValidatorType extends Validator<number>, LengthValidator<NumberValidator> {
  integer: (options?: IsIntOptions) => NumberValidator
  positive: () => NumberValidator
  negative: () => NumberValidator
  divisibleBy: (divisor: number) => NumberValidator
  custom: (fn: (value: number | null | undefined) => boolean, message: string) => NumberValidator
}
export declare interface BigintValidatorType extends Validator<bigint> {
  min: (min: bigint) => BigintValidatorType
  max: (max: bigint) => BigintValidatorType
  positive: () => BigintValidatorType
  negative: () => BigintValidatorType
  divisibleBy: (divisor: bigint) => BigintValidatorType
  custom: (fn: (value: bigint) => boolean, message: string) => BigintValidatorType
}