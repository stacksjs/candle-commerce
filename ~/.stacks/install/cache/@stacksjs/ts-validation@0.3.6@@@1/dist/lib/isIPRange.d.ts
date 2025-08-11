declare const v4Subnet: unknown;

export default function isIPRange(str: string, version: number | string = ''): boolean {
  assertString(str)
  const parts = str.split('/')

  if (parts.length !== 2) {
    return false
  }

  if (!subnetMaybe.test(parts[1])) {
    return false
  }

  if (parts[1].length > 1 && parts[1].startsWith('0')) {
    return false
  }

  const options: IsIPOptions = typeof version === 'string' ? { version: Number.parseInt(version, 10) } : { version }
  const isValidIP = isIP(parts[0], options)
  if (!isValidIP) {
    return false
  }

  let expectedSubnet: number = 0
  const versionStr = String(version)
  if (versionStr === '4') {
    expectedSubnet = v4Subnet
  }
  else if (versionStr === '6') {
    expectedSubnet = v6Subnet
  }
  else {
    const defaultOptions: IsIPOptions = { version: 6 }
    expectedSubnet = isIP(parts[0], defaultOptions) ? v6Subnet : v4Subnet
  }

  const subnet = Number.parseInt(parts[1], 10)
  return subnet <= expectedSubnet && subnet >= 0
};