export default function isLength(str: string, options: IsLengthOptions): boolean {
  assertString(str)
  let min
  let max

  if (typeof (options) === 'object' && options !== null) {
    min = options.min || 0
    max = options.max
    if (Number.isNaN(min))
      min = 0
  }
  else { 
    min = arguments[1] || 0
    max = arguments[2]
  }

  const presentationSequences = str.match(/(\uFE0F|\uFE0E)/g) || []
  const surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || []
  const len = str.length - presentationSequences.length - surrogatePairs.length
  const isInsideRange = len >= min && (typeof max === 'undefined' || Number.isNaN(max) || len <= max)

  if (isInsideRange && Array.isArray(options?.discreteLengths)) {
    return options.discreteLengths.includes(len)
  }

  return isInsideRange
};