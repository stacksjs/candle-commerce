import type { TextValidatorType, ValidationNames } from '../types';

export declare class TextValidator extends StringValidator implements TextValidatorType {
  public name: ValidationNames = 'text'

  constructor() {
    super()
    this.addRule({
      name: 'text',
      test: (value: string | null | undefined): value is string => typeof value === 'string',
      message: 'Must be a text',
    })
  }
}
export declare function text(): TextValidator;