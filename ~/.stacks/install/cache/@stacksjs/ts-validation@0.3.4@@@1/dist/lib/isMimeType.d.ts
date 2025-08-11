export default function isMimeType(str: string): boolean {
  assertString(str)
  return mimeTypeSimple.test(str) || mimeTypeText.test(str) || mimeTypeMultipart.test(str)
};