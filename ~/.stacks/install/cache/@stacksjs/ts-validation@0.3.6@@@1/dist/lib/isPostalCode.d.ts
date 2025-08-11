declare const patterns: { [key: string]: RegExp };
export declare const locales: string[];

export default function isPostalCode(str: string, locale: string): boolean {
  assertString(str)
  if (locale in patterns) {
    return patterns[locale].test(str)
  }
  else if (locale === 'any') {
    for (const key in patterns) {
      if (Object.prototype.hasOwnProperty.call(patterns, key)) {
        const pattern = patterns[key]
        if (pattern.test(str)) {
          return true
        }
      }
    }
    return false
  }
  throw new Error(`Invalid locale '${locale}'`)
};