export default function isJWT(str: string): boolean {
  assertString(str)

  const dotSplit = str.split('.')
  const len = dotSplit.length

  if (len !== 3) {
    return false
  }

  return dotSplit.reduce((acc, currElem) => acc && isBase64(currElem, { urlSafe: true }), true)
};