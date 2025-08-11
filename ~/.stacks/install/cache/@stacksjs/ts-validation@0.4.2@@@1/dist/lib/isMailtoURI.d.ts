declare function parseMailtoQueryString(queryString: string): Record<string, string> | false;

export default function isMailtoURI(url: string, options: any): boolean {
  assertString(url)

  if (url.indexOf('mailto:') !== 0) {
    return false
  }

  const [to, queryString = ''] = url.replace('mailto:', '').split('?')

  if (!to && !queryString) {
    return true
  }

  const query = parseMailtoQueryString(queryString)

  if (!query) {
    return false
  }

  return `${to},${query.cc},${query.bcc}`
    .split(',')
    .every((email) => {
      email = trim(email, ' ')

      if (email) {
        return isEmail(email, options)
      }

      return true
    })
};