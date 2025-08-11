declare const IPv4AddressFormat: unknown;
declare const IPv6AddressRegExp: unknown;
declare interface IsIPOptions {
  version?: number
}

export default function isIP(ipAddress: string, options: IsIPOptions = {}): boolean {
  assertString(ipAddress)

  const version = (typeof options === 'object' ? options.version : arguments[1]) || ''

  if (!version) {
    return isIP(ipAddress, { version: 4 }) || isIP(ipAddress, { version: 6 })
  }

  if (version.toString() === '4') {
    return IPv4AddressRegExp.test(ipAddress)
  }

  if (version.toString() === '6') {
    return IPv6AddressRegExp.test(ipAddress)
  }

  return false
};