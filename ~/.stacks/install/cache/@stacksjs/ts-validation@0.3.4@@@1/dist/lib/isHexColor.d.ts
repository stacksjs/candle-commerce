export default function isHexColor(str: string): boolean {
  assertString(str)
  return hexcolor.test(str)
};