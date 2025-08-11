import type { UnixValidatorType, ValidationNames } from '../types';

export declare class UnixValidator extends BaseValidator<number | string> implements UnixValidatorType {
  public name: ValidationNames = 'unix'

  constructor() {
    super()
    this.addRule({
      name: 'unix',
      test: (value: number | string) => {
        const num = Number(value)
        if (Number.isNaN(num)) {
          return false
        }

        if (typeof value === 'string') {
          const timestampStr = value.toString()
          const length = timestampStr.length
          if (length < 10 || length > 13) {
            return false
          }
        }

        return num >= 0
      },
      message: 'Must be a valid Unix timestamp (10-13 digits)',
    })
  }
}
export declare function unix(): UnixValidator;