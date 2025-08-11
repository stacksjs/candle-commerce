import type { Validator } from './base';

export declare interface EnumValidatorType<T extends string | number> extends Validator<T> {
  getAllowedValues: () => readonly T[]
  custom: (fn: (value: T) => boolean, message: string) => EnumValidatorType<T>
}