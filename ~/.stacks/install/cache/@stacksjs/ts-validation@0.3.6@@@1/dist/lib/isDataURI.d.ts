export default function isDataURI(str: string): boolean {
  assertString(str)
  const data = str.split(',')
  if (data.length < 2) {
    return false
  }
  const firstPart = data.shift()
  if (!firstPart)
    return false
  const attributes = firstPart.trim().split('')
  const schemeAndMediaType = attributes.shift()
  if (!schemeAndMediaType || schemeAndMediaType.slice(0, 5) !== 'data:') {
    return false
  }
  const mediaType = schemeAndMediaType.slice(5)
  if (mediaType !== '' && !validMediaType.test(mediaType)) {
    return false
  }
  for (let i = 0; i < attributes.length; i++) {
    if (
      !(i === attributes.length - 1 && attributes[i].toLowerCase() === 'base64')
      && !validAttribute.test(attributes[i])
    ) {
      return false
    }
  }
  for (let i = 0; i < data.length; i++) {
    if (!validData.test(data[i])) {
      return false
    }
  }
  return true
};