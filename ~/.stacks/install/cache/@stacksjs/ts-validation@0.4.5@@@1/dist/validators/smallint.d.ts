import type { SmallintValidatorType, ValidationNames } from '../types';

export declare class SmallintValidator extends NumberValidator implements SmallintValidatorType {
  public name: ValidationNames = 'smallint'

  constructor() {
    super()
    this.rules = this.rules.filter(rule => rule.name !== 'number')
    this.addRule({
      name: 'number',
      test: (value: unknown): value is number => {
        if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
          return false
        }
        if (!Number.isInteger(value)) {
          return false
        }
        return value >= -32768 && value <= 32767
      },
      message: 'Must be a valid smallint (-32,768 to 32,767)',
    })
  }

  min(min: number): this {
    return this.addRule({
      name: 'min',
      test: (value: number | null | undefined) => {
        if (typeof value !== 'number')
          return false
        return value >= min
      },
      message: 'Must be at least {min}',
      params: { min },
    })
  }

  max(max: number): this {
    return this.addRule({
      name: 'max',
      test: (value: number | null | undefined) => {
        if (typeof value !== 'number')
          return false
        return value <= max
      },
      message: 'Must be at most {max}',
      params: { max },
    })
  }

  length(length: number): this {
    return this.addRule({
      name: 'length',
      test: (value: number | null | undefined) => {
        if (typeof value !== 'number')
          return false
        return value.toString().length === length
      },
      message: 'Must be exactly {length} digits',
      params: { length },
    })
  }

  positive(): this {
    return this.addRule({
      name: 'positive',
      test: (value: number | null | undefined) => {
        if (typeof value !== 'number')
          return false
        return value > 0
      },
      message: 'Must be a positive number',
    })
  }

  negative(): this {
    return this.addRule({
      name: 'negative',
      test: (value: number | null | undefined) => {
        if (typeof value !== 'number')
          return false
        return value < 0
      },
      message: 'Must be a negative number',
    })
  }

  divisibleBy(divisor: number): this {
    return this.addRule({
      name: 'divisibleBy',
      test: (value: number | null | undefined) => {
        if (typeof value !== 'number')
          return false
        return isDivisibleBy(String(value), divisor)
      },
      message: 'Must be divisible by {divisor}',
      params: { divisor },
    })
  }

  custom(fn: (value: number | null | undefined) => boolean, message: string): this {
    return this.addRule({
      name: 'custom',
      test: fn,
      message,
    })
  }
}
export declare function smallint(): SmallintValidator;