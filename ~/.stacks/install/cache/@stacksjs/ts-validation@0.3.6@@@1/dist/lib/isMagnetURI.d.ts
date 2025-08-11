export default function isMagnetURI(url: string): boolean {
  assertString(url)

  if (url.indexOf('magnet:?') !== 0) {
    return false
  }

  return magnetURIComponent.test(url)
};