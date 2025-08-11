declare const macAddress48NoSeparators: unknown;

export default function isMACAddress(str: string, options: IsMACAddressOptions): boolean {
  assertString(str)
  if (options?.eui) {
    options.eui = String(options.eui)
  }
  if (options?.no_colons || options?.no_separators) {
    if (options.eui === '48') {
      return macAddress48NoSeparators.test(str)
    }
    if (options.eui === '64') {
      return macAddress64NoSeparators.test(str)
    }
    return macAddress48NoSeparators.test(str) || macAddress64NoSeparators.test(str)
  }
  if (options?.eui === '48') {
    return macAddress48.test(str) || macAddress48WithDots.test(str)
  }
  if (options?.eui === '64') {
    return macAddress64.test(str) || macAddress64WithDots.test(str)
  }
  return isMACAddress(str, { eui: '48' }) || isMACAddress(str, { eui: '64' })
};