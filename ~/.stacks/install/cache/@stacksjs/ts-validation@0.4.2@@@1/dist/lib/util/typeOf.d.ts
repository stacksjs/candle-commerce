export default function typeOf(input: unknown): string {
  const rawObject = Object.prototype.toString.call(input).toLowerCase()
  const typeOfRegex = /\[object (.*)\]/
  const type = typeOfRegex.exec(rawObject)?.[1] ?? 'unknown'
  return type
};