export declare const locales: string[];

export default function isAlpha(_str: string, locale = 'en-US', options: IsAlphaOptions = {}): boolean {
  assertString(_str)

  let str = _str
  const { ignore } = options

  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, '')
    }
    else if (typeof ignore === 'string') {
      str = str.replace(new RegExp(`[${ignore.replace(/[-[\]{}()*+?.,\\^$|#s]/g, '\\$&')}]`, 'g'), '') 
    }
    else {
      throw new TypeError('ignore should be instance of a String or RegExp')
    }
  }

  if (locale in alpha) {
    return alpha[locale].test(str)
  }
  throw new Error(`Invalid locale '${locale}'`)
};