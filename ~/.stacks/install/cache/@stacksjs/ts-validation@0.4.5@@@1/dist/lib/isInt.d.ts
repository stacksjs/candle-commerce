export default function isInt(str: string, options: IsIntOptions): boolean {
  assertString(str)
  options = options || {}

  const regex = options.allow_leading_zeroes === false ? int : intLeadingZeroes

  const num = Number.parseInt(str, 10)
  const minCheckPassed = (!Object.prototype.hasOwnProperty.call(options, 'min') || isNullOrUndefined(options.min) || num >= (options.min ?? 0))
  const maxCheckPassed = (!Object.prototype.hasOwnProperty.call(options, 'max') || isNullOrUndefined(options.max) || num <= (options.max ?? 0))
  const ltCheckPassed = (!Object.prototype.hasOwnProperty.call(options, 'lt') || isNullOrUndefined(options.lt) || num < (options.lt ?? 0))
  const gtCheckPassed = (!Object.prototype.hasOwnProperty.call(options, 'gt') || isNullOrUndefined(options.gt) || num > (options.gt ?? 0))

  return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed
};