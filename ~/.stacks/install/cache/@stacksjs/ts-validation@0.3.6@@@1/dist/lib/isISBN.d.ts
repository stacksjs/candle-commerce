declare const factor: Array<1 | unknown>;

export default function isISBN(isbn: string, options?: IsISBNOptions | string | number): boolean {
  assertString(isbn)

  const version = String(typeof options === 'object' ? options?.version : options)

  if (!options) {
    return isISBN(isbn, { version: 10 }) || isISBN(isbn, { version: 13 })
  }

  const sanitizedIsbn = isbn.replace(/[\s-]+/g, '')

  let checksum = 0

  if (version === '10') {
    if (!possibleIsbn10.test(sanitizedIsbn)) {
      return false
    }

    for (let i = 0; i < 9; i++) {
      checksum += (i + 1) * Number.parseInt(sanitizedIsbn.charAt(i), 10)
    }

    if (sanitizedIsbn.charAt(9) === 'X') {
      checksum += 10 * 10
    }
    else {
      checksum += 10 * Number.parseInt(sanitizedIsbn.charAt(9), 10)
    }

    if ((checksum % 11) === 0) {
      return true
    }
  }
  else if (version === '13') {
    if (!possibleIsbn13.test(sanitizedIsbn)) {
      return false
    }

    for (let i = 0; i < 12; i++) {
      checksum += factor[i % 2] * Number.parseInt(sanitizedIsbn.charAt(i), 10)
    }

    if (Number.parseInt(sanitizedIsbn.charAt(12), 10) - ((10 - (checksum % 10)) % 10) === 0) {
      return true
    }
  }

  return false
};