export default function isPort(str: string): boolean {
  return isInt(str, { allow_leading_zeroes: false, min: 0, max: 65535 })
};