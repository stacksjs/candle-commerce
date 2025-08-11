declare const defaultLatLongOptions: {
  checkDMS: false
};

export default function isLatLong(str: string, options: IsLatLongOptions): boolean {
  assertString(str)
  options = merge(options, defaultLatLongOptions)

  if (!includes(str, ','))
    return false
  const pair = str.split(',')
  if ((pair[0].startsWith('(') && !pair[1].endsWith(')'))
    || (pair[1].endsWith(')') && !pair[0].startsWith('('))) {
    return false
  }

  if (options.checkDMS) {
    return latDMS.test(pair[0]) && longDMS.test(pair[1])
  }
  return lat.test(pair[0]) && long.test(pair[1])
};