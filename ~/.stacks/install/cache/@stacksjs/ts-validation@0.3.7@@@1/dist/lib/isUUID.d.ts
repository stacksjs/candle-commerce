declare const uuid: {
  '1': unknown;
  '2': unknown;
  '3': unknown;
  '4': unknown;
  '5': unknown;
  '6': unknown;
  '7': unknown;
  '8': unknown;
  nil: unknown;
  max: unknown;
  loose: unknown;
  all: unknown
};

export default function isUUID(str: string, version?: string): boolean {
  assertString(str)

  if (version === undefined || version === null) {
    version = 'all'
  }

  return version in uuid ? (uuid[version as keyof typeof uuid] as RegExp).test(str) : false
};