declare const base64WithoutPadding: unknown;

export default function isBase64(str: string, options: IsBase64Options): boolean {
  assertString(str)
  options = merge(options, { urlSafe: false, padding: !options?.urlSafe })

  if (str === '')
    return true

  let regex
  if (options.urlSafe) {
    regex = options.padding ? base64UrlWithPadding : base64UrlWithoutPadding
  }
  else {
    regex = options.padding ? base64WithPadding : base64WithoutPadding
  }

  return (!options.padding || str.length % 4 === 0) && regex.test(str)
};