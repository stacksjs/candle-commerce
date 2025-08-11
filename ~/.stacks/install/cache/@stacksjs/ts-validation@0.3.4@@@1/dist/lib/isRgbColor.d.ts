declare const startsWithRgb: unknown;

export default function isRgbColor(str: string, options: IsRgbColorOptions): boolean {
  assertString(str)
  let allowSpaces = false
  let includePercentValues = true
  if (typeof options !== 'object') {
    if (arguments.length >= 2) {
      includePercentValues = arguments[1]
    }
  }
  else {
    allowSpaces = options.allowSpaces !== undefined ? options.allowSpaces : allowSpaces
    includePercentValues = options.includePercentValues !== undefined
      ? options.includePercentValues
      : includePercentValues
  }

  if (allowSpaces) {
    if (!startsWithRgb.test(str)) {
      return false
    }
    str = str.replace(/\s/g, '')
  }

  if (!includePercentValues) {
    return rgbColor.test(str) || rgbaColor.test(str)
  }

  return rgbColor.test(str)
    || rgbaColor.test(str)
    || rgbColorPercent.test(str)
    || rgbaColorPercent.test(str)
};