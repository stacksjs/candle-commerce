declare const defaultContainsOptions: {
  ignoreCase: false;
  minOccurrences: 1
};

export default function contains(str: string, elem: string, options: ContainsOptions): boolean {
  assertString(str)
  options = merge(options, defaultContainsOptions)

  if (options.ignoreCase) {
    return str.toLowerCase().split(toString(elem).toLowerCase()).length > options.minOccurrences
  }

  return str.split(toString(elem)).length > options.minOccurrences
};