export default function isBIC(str: string): boolean {
  assertString(str)

  const countryCode = str.slice(4, 6).toUpperCase()

  if (!CountryCodes.has(countryCode) && countryCode !== 'XK') {
    return false
  }

  return isBICReg.test(str)
};