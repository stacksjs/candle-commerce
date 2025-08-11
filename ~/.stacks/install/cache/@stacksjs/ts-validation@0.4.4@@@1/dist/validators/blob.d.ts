import type { BlobValidatorType, ValidationNames } from '../types';

export declare class BlobValidator extends BaseValidator<string> implements BlobValidatorType {
  public name: ValidationNames = 'blob'

  constructor() {
    super()
    this.addRule({
      name: 'blob',
      test: (value: string) => {
        if (typeof value !== 'string') {
          return false
        }
        return value.length > 0
      },
      message: 'Must be a valid blob string',
    })
  }

  min(min: number): this {
    return this.addRule({
      name: 'min',
      test: (value: string) => value.length >= min,
      message: 'Must be at least {min} characters',
      params: { min },
    })
  }

  max(max: number): this {
    return this.addRule({
      name: 'max',
      test: (value: string) => value.length <= max,
      message: 'Must be at most {max} characters',
      params: { max },
    })
  }

  length(length: number): this {
    return this.addRule({
      name: 'length',
      test: (value: string) => value.length === length,
      message: 'Must be exactly {length} characters',
      params: { length },
    })
  }

  custom(fn: (value: string) => boolean, message: string): this {
    return this.addRule({
      name: 'custom',
      test: fn,
      message,
    })
  }
}
export declare function blob(): BlobValidator;