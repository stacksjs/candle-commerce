import type { LengthValidator, Validator } from './base';

export declare interface ArrayValidatorType<T> extends Validator<T[]>, LengthValidator<ArrayValidatorType<T>> {
  each: (validator: Validator<T>) => ArrayValidatorType<T>
  unique: () => ArrayValidatorType<T>
}