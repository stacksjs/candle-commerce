declare const base32: unknown;
declare const defaultBase32Options: {
  crockford: false
};

export default function isBase32(str: string, options: IsBase32Options): boolean {
  assertString(str)
  options = merge(options, defaultBase32Options)

  if (options.crockford) {
    return crockfordBase32.test(str)
  }

  const len = str.length
  if (len % 8 === 0 && base32.test(str)) {
    return true
  }
  return false
};