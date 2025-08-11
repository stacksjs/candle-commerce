import type { DatetimeValidatorType, ValidationNames } from '../types';

export declare class DatetimeValidator extends BaseValidator<Date> implements DatetimeValidatorType {
  public name: ValidationNames = 'datetime'

  constructor() {
    super()
    this.addRule({
      name: 'datetime',
      test: (value: unknown): value is Date => {
        if (!(value instanceof Date)) {
          return false
        }

        const year = value.getFullYear()
        if (year < 1000 || year > 9999) {
          return false
        }

        return !Number.isNaN(value.getTime())
      },
      message: 'Must be a valid datetime between 1000-01-01 and 9999-12-31',
    })
  }
}
export declare function datetime(): DatetimeValidator;