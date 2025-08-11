import type { LengthValidator, Validator } from './base';
import type { PasswordValidator } from '../validators/password';

export declare interface PasswordAnalysis {
  length: number
  uniqueChars: number
  uppercaseCount: number
  lowercaseCount: number
  numberCount: number
  symbolCount: number
}
export declare interface PasswordValidatorType extends Validator<string>, LengthValidator<PasswordValidator> {
  matches: (confirmPassword: string) => PasswordValidator
  hasUppercase: () => PasswordValidator
  hasLowercase: () => PasswordValidator
  hasNumbers: () => PasswordValidator
  hasSpecialCharacters: () => PasswordValidator
  alphanumeric: () => PasswordValidator
}