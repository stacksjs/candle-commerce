import type { TimestampValidatorType, ValidationNames } from '../types';

export declare class TimestampValidator extends BaseValidator<number | string> implements TimestampValidatorType {
  public name: ValidationNames = 'timestamp'

  constructor() {
    super()
    this.addRule({
      name: 'timestamp',
      test: (value: number | string) => {
        const num = Number(value)
        if (Number.isNaN(num)) {
          return false
        }

        const minTimestamp = 0 
        const maxTimestamp = 2147483647 

        if (num < minTimestamp || num > maxTimestamp) {
          return false
        }

        if (typeof value === 'string') {
          const timestampStr = value.toString()
          const length = timestampStr.length
          if (length < 10 || length > 13) {
            return false
          }
        }

        return true
      },
      message: 'Must be a valid timestamp between 1970-01-01 and 2038-01-19',
    })
  }
}
export declare function timestamp(): TimestampValidator;