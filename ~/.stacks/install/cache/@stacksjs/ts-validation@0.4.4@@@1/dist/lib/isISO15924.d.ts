declare const validISO15924Codes: unknown;
export declare const ScriptCodes: Set<string>;

export default function isISO15924(str: string): boolean {
  assertString(str)
  return validISO15924Codes.has(str)
};