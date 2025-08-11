export default function isHSL(str: string): boolean {
  assertString(str)

  const strippedStr = str.replace(/\s+/g, ' ').replace(/\s?(hsla?\(|\)|,)\s?/gi, '$1')

  if (strippedStr.includes(',')) {
    return hslComma.test(strippedStr)
  }

  return hslSpace.test(strippedStr)
};