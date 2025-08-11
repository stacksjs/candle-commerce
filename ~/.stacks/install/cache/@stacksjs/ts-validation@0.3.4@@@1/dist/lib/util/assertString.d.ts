export default function assertString(input: any): asserts input is string {
  const isString = typeof input === 'string'

  if (!isString) {
    let invalidType: string = typeof input
    if (input === null) {
      invalidType = 'null' as string
    }
    else if (invalidType === 'object') {
      invalidType = input.constructor.name
    }

    throw new TypeError(`Expected a string but received a ${invalidType}`)
  }
};