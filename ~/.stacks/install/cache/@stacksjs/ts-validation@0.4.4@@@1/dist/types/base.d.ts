export declare const SCHEMA_NAME: unique symbol;
export declare const OUTPUT_TYPE: unique symbol;
export declare const PARSE: unique symbol;
export declare interface ValidationError {
  message: string
}
export declare interface ValidationErrorMap {
  [field: string]: ValidationError[]
}
export declare type ValidationErrors = ValidationError[] | ValidationErrorMap

export interface ValidationResult {
  valid: boolean
  errors: ValidationErrors
}

export interface ValidationRule<T> {
  name: string
  test: (value: T) => boolean
  message: string
  params?: Record<string, any>
}

export interface Validator<T> {
  name: ValidationNames
  isRequired: boolean
  getRules: () => ValidationRule<T>[]
  test: (value: T) => boolean
  validate: (value: T) => ValidationResult
  required: () => this
  optional: () => this
}

export interface ValidatorInternal<T> extends Validator<T> {
  isPartOfShape: boolean
  rules: ValidationRule<T>[]
}

export interface ValidationConfig {
  verbose: boolean
  strictMode?: boolean
  cacheResults?: boolean
  errorMessages?: Record<string, string>
}

export interface LengthValidator<T> {
  min: (length: number) => T
  max: (length: number) => T
  length: (length: number) => T
}

export type ValidationNames = 'base' |
  'string' |
  'number' |
  'array' |
  'boolean' |
  'enum' |
  'date' |
  'datetime' |
  'object' |
  'custom' |
  'timestamp' |
  'unix' |
  'password' |
  'text' |
  'bigint' |
  'timestampTz' |
  'float' |
  'decimal' |
  'time' |
  'smallint' |
  'integer' |
  'json' |
  'blob' |
  'binary'

export type Infer<T> = T extends Validator<infer U> ? U : never