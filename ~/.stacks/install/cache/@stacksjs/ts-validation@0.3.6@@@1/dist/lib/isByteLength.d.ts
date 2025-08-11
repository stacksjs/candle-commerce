export default function isByteLength(str: string, options: IsByteLengthOptions): boolean {
  assertString(str)
  let min
  let max
  if (typeof (options) === 'object') {
    min = options.min || 0
    max = options.max
  }
  else { 
    min = arguments[1]
    max = arguments[2]
  }
  const len = encodeURI(str).split(/%..|./).length - 1
  return len >= min && (typeof max === 'undefined' || len <= max)
};