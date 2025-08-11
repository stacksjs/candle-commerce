import type { CustomValidatorType, ValidationNames } from '../types';

export declare class CustomValidator<T> extends BaseValidator<T> implements CustomValidatorType<T> {
  public name: ValidationNames = 'custom'

  constructor(validationFn: (value: T) => boolean, message: string) {
    super()
    this.addRule({
      name: 'custom',
      test: (value: T) => value === undefined || value === null || validationFn(value),
      message,
    })
  }
}
export declare function custom<T>(validationFn?: (value, message: string): CustomValidator<T>;