declare const isISO6391Set: unknown;

export default function isISO6391(str: string): boolean {
  assertString(str)
  return isISO6391Set.has(str)
};