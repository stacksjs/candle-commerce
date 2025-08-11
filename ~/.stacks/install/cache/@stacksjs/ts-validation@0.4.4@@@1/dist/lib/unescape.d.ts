export default function unescape(str: string): string {
  assertString(str)
  return (str.replace(/&quot/g, '"')
    .replace(/&#x27/g, '\'')
    .replace(/&lt/g, '<')
    .replace(/&gt/g, '>')
    .replace(/&#x2F/g, '/')
    .replace(/&#x5C/g, '\\')
    .replace(/&#96/g, '`')
    .replace(/&amp/g, '&'))
};