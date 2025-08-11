import type { Validator } from './base';

export declare interface IsBooleanOptions {
  loose?: boolean
}
export declare interface BooleanValidatorType extends Validator<boolean> {
  isTrue: () => BooleanValidatorType
  isFalse: () => BooleanValidatorType
  custom: (fn: (value: boolean) => boolean, message: string) => BooleanValidatorType
}