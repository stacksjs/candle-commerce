export default function isNumeric(str: string, options?: NumericOptions): boolean {
  assertString(str)

  if (options?.no_symbols) {
    return numericNoSymbols.test(str)
  }

  const decimalChar = options?.locale
    ? (decimal[options.locale] || '.')
    : '.'

  return (new RegExp(`^[+-]?([0-9]*[${decimalChar}])?[0-9]+$`)).test(str)
};