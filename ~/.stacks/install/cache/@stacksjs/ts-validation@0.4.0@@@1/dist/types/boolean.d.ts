import type { BooleanValidator } from '../validators/booleans';
import type { Validator } from './base';

export declare interface IsBooleanOptions {
  loose?: boolean
}
export declare interface BooleanValidatorType extends Validator<boolean> {
  isTrue: () => BooleanValidator
  isFalse: () => BooleanValidator
  custom: (fn: (value: boolean) => boolean, message: string) => BooleanValidator
}