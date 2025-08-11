import type { IsTimeOptions } from '../types';

declare const default_time_options: IsTimeOptions;
declare const formats: {
  hour24: {
    default: unknown;
    withSeconds: unknown;
    withOptionalSeconds: unknown
  };
  hour12: {
    default: unknown;
    withSeconds: unknown;
    withOptionalSeconds: unknown
  }
};

export default function isTime(input: string, options: IsTimeOptions = default_time_options): boolean {
  options = merge(options, default_time_options)
  if (typeof input !== 'string')
    return false
  return formats[options.hourFormat][options.mode].test(input)
};