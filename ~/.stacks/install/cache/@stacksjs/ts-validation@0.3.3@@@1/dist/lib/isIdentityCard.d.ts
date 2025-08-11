declare let validators: { [key: string]: (str: string);

export default function isIdentityCard(str: string, locale: string): boolean {
  assertString(str)
  if (locale in validators) {
    return validators[locale](str)
  }
  else if (locale === 'any') {
    for (const key in validators) {
      if (Object.prototype.hasOwnProperty.call(validators, key)) {
        const validator = validators[key]
        if (validator(str)) {
          return true
        }
      }
    }
    return false
  }
  throw new Error(`Invalid locale '${locale}'`)
};