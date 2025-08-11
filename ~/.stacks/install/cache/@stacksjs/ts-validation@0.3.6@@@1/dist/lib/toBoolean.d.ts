export default function toBoolean(str: string, strict: boolean = false): boolean {
  assertString(str)

  if (strict) {
    return str === 'true'
  }

  return str !== '0' && str !== 'false' && str !== ''
};