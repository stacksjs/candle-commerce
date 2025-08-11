export default function multilineRegexp(parts: string[], flags?: string): RegExp {
  const regexpAsStringLiteral = parts.join('')

  return new RegExp(regexpAsStringLiteral, flags)
};