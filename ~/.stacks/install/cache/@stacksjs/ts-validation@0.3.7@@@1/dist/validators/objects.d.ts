import type { ObjectValidatorType, ValidationErrorMap, ValidationNames, ValidationResult, Validator } from '../types';

export declare class ObjectValidator<T extends Record<string, any>> extends BaseValidator<T> implements ObjectValidatorType<T> {
  public name: ValidationNames = 'object'

  private schema: Record<string, Validator<any>> = {}
  private strictMode = false

  constructor() {
    super()
    this.addRule({
      name: 'object',
      test: (value: unknown): value is T =>
        typeof value === 'object' && value !== null && !Array.isArray(value),
      message: 'Must be an object',
    })
  }

  shape(schema: Record<string, Validator<any>>): this {
    this.schema = Object.entries(schema).reduce((acc, [key, validator]) => {
      if (validator instanceof BaseValidator) {
        acc[key] = validator.setIsPartOfShape(true)
      }
      else {
        acc[key] = validator
      }
      return acc
    }, {} as Record<string, Validator<any>>)

    return this.addRule({
      name: 'shape',
      test: (value: T) => {
        if (value === null || value === undefined)
          return true

        if (this.strictMode) {
          const schemaKeys = new Set(Object.keys(schema))
          const valueKeys = Object.keys(value)
          return valueKeys.every(key => schemaKeys.has(key))
        }

        return true
      },
      message: 'Invalid object shape',
    })
  }

  strict(strict = true): this {
    this.strictMode = strict
    return this
  }

  validate(value: T): ValidationResult {
    const result = super.validate(value)
    if (!result.valid)
      return result

    if (Object.keys(this.schema).length > 0 && value !== null && value !== undefined) {
      const errors: ValidationErrorMap = {}
      let hasErrors = false

      for (const [key, validator] of Object.entries(this.schema)) {
        const fieldValue = value[key]
        const fieldResult = validator.validate(fieldValue)

        if (!fieldResult.valid) {
          hasErrors = true
          if (validator instanceof ObjectValidator) {
            Object.entries(fieldResult.errors).forEach(([errorKey, errorValue]) => {
              errors[`${key}.${errorKey}`] = errorValue
            })
          }
          else {
            const fieldErrors = Object.values(fieldResult.errors)[0]
            if (fieldErrors) {
              errors[key] = fieldErrors
            }
          }
        }
      }

      if (hasErrors) {
        return {
          valid: false,
          errors,
        }
      }
    }

    return result
  }
}
export declare function object<T extends Record<string, any>>(): ObjectValidator<T>;