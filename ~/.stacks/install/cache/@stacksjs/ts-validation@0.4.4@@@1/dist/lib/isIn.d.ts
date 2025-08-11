export default function isIn(str: string, options: string[] | Record<string, any> | string): boolean {
  assertString(str)
  if (Array.isArray(options)) {
    return options.includes(str)
  }
  else if (typeof options === 'object') {
    return Object.prototype.hasOwnProperty.call(options, str)
  }
  else if (options && typeof options.indexOf === 'function') {
    return options.includes(str)
  }
  return false
};