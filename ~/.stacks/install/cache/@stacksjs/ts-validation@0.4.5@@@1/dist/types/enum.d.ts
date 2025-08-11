import type { Validator } from './base';

export declare interface EnumValidatorType extends Validator<string> {
  getAllowedValues: () => readonly string[]
  custom: (fn: (value: string) => boolean, message: string) => EnumValidatorType
}