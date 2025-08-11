export default function isEmpty(str: string, options: IsEmptyOptions = {}): boolean {
  assertString(str)

  return (options?.ignoreWhitespace ? str.trim().length : str.length) === 0
};