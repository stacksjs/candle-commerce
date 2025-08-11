import type { ValidationNames } from '../types';

export declare class TimestampTzValidator extends BaseValidator<number | string> {
  public name: ValidationNames = 'timestampTz'

  constructor() {
    super()
    this.addRule({
      name: 'timestampTz',
      test: (value: number | string | null | undefined) => {
        if (value === null || value === undefined) {
          return false
        }

        if (typeof value === 'number') {
          const num = Number(value)
          if (Number.isNaN(num)) {
            return false
          }

          const minTimestamp = 0 
          const maxTimestamp = 2147483647 

          return num >= minTimestamp && num <= maxTimestamp
        }

        if (typeof value === 'string') {
          const str = value.trim()

          const num = Number(str)
          if (!Number.isNaN(num)) {
            const minTimestamp = 0
            const maxTimestamp = 2147483647

            if (str.length < 10 || str.length > 13) {
              return false
            }

            return num >= minTimestamp && num <= maxTimestamp
          }

          const isoWithTzRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})$/
          if (isoWithTzRegex.test(str)) {
            const date = new Date(str)
            return !Number.isNaN(date.getTime())
          }

          const rfc3339WithTzRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})$/
          if (rfc3339WithTzRegex.test(str)) {
            const date = new Date(str)
            return !Number.isNaN(date.getTime())
          }

          const otherTzFormats = [
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 
            /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC$/, 
            /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} GMT$/, 
            /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} [A-Z]{3,4}$/, 
          ]

          for (const regex of otherTzFormats) {
            if (regex.test(str)) {
              const date = new Date(str)
              return !Number.isNaN(date.getTime())
            }
          }

          return false
        }

        return false
      },
      message: 'Must be a valid timestamp with timezone information (ISO 8601, RFC 3339, or Unix timestamp)',
    })
  }
}
export declare function timestampTz(): TimestampTzValidator;