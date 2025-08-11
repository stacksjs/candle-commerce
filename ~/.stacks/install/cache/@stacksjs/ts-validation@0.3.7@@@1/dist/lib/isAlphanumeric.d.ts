export declare const alphanumeric: Record<string, RegExp>;
export declare const locales: unknown;

export default function isAlphanumeric(str: string, options: AlphanumericOptions = {}): boolean {
  assertString(str)
  const { locale = 'en-US', ignore } = options

  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, '')
    }
    else {
      str = str.replace(new RegExp(`[${ignore.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`, 'g'), '')
    }
  }

  if (locale in alphanumeric) {
    return alphanumeric[locale].test(str)
  }
  throw new Error(`Invalid locale '${locale}'`)
};