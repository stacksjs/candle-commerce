import type { LengthValidator, Validator } from './base';
import type { SmallintValidator } from '../validators/smallint';

export declare interface SmallintValidatorType extends Validator<number>, LengthValidator<SmallintValidator> {
  positive: () => SmallintValidator
  negative: () => SmallintValidator
  divisibleBy: (divisor: number) => SmallintValidator
  custom: (fn: (value: number | null | undefined) => boolean, message: string) => SmallintValidator
}