declare const phones: { [key: string]: RegExp };
export declare const locales: string[];

export default function isMobilePhone(str: string, locale: string | string[], options?: { strictMode?: boolean }): boolean {
  assertString(str)
  if (options && options.strictMode && !str.startsWith('+')) {
    return false
  }
  if (Array.isArray(locale)) {
    return locale.some((key) => {
      if (Object.prototype.hasOwnProperty.call(phones, key)) {
        const phone = phones[key]
        if (phone.test(str)) {
          return true
        }
      }
      return false
    })
  }
  else if (locale in phones) {
    return phones[locale].test(str)
  }
  else if (!locale || locale === 'any') {
    for (const key in phones) {
      if (Object.prototype.hasOwnProperty.call(phones, key)) {
        const phone = phones[key]
        if (phone.test(str)) {
          return true
        }
      }
    }
    return false
  }
  throw new Error(`Invalid locale '${locale}'`)
};