import type { IsBooleanOptions } from '../types';

declare const defaultOptions: IsBooleanOptions;

export default function isBoolean(str: string, options: IsBooleanOptions = defaultOptions): boolean {
  assertString(str)

  if (options.loose) {
    return includes(looseBooleans, str.toLowerCase())
  }

  return includes(strictBooleans, str)
};