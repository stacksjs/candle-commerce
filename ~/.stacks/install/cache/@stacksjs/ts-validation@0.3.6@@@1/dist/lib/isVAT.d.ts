declare function AU(str: string): boolean;
declare function CH(str: string): boolean;
declare function PT(str: string): boolean;
declare type VatMatcher = (str: string) => boolean
type VatMatchers = Record<string, VatMatcher>

export const vatMatchers: VatMatchers = {
  AT: (str: string): boolean => /^(?:AT)?U\d{8}$/.test(str),
  BE: (str: string): boolean => /^(?:BE)?\d{10}$/.test(str),
  BG: (str: string): boolean => /^(?:BG)?\d{9,10}$/.test(str),
  HR: (str: string): boolean => /^(?:HR)?\d{11}$/.test(str),
  CY: (str: string): boolean => /^(?:CY)?\w{9}$/.test(str),
  CZ: (str: string): boolean => /^(?:CZ)?\d{8,10}$/.test(str),
  DK: (str: string): boolean => /^(?:DK)?\d{8}$/.test(str),
  EE: (str: string): boolean => /^(?:EE)?\d{9}$/.test(str),
  FI: (str: string): boolean => /^(?:FI)?\d{8}$/.test(str),
  FR: (str: string): boolean => /^(?:FR)?\w{2}\d{9}$/.test(str),
  DE: (str: string): boolean => /^(?:DE)?\d{9}$/.test(str),
  EL: (str: string): boolean => /^(?:EL)?\d{9}$/.test(str),
  HU: (str: string): boolean => /^(?:HU)?\d{8}$/.test(str),
  IE: (str: string): boolean => /^(?:IE)?\d{7}\wW?$/.test(str),
  IT: (str: string): boolean => /^(?:IT)?\d{11}$/.test(str),
  LV: (str: string): boolean => /^(?:LV)?\d{11}$/.test(str),
  LT: (str: string): boolean => /^(?:LT)?\d{9,12}$/.test(str),
  LU: (str: string): boolean => /^(?:LU)?\d{8}$/.test(str),
  MT: (str: string): boolean => /^(?:MT)?\d{8}$/.test(str),
  NL: (str: string): boolean => /^(?:NL)?\d{9}B\d{2}$/.test(str),
  PL: (str: string): boolean => /^(?:PL)?(?:\d{10}|\d{3}-\d{3}-\d{2}-\d{2}|\d{3}-\d{2}-\d{2}-\d{3})$/.test(str),
  PT,
  RO: (str: string): boolean => /^(?:RO)?\d{2,10}$/.test(str),
  SK: (str: string): boolean => /^(?:SK)?\d{10}$/.test(str),
  SI: (str: string): boolean => /^(?:SI)?\d{8}$/.test(str),
  ES: (str: string): boolean => /^(?:ES)?\w\d{7}[A-Z]$/.test(str),
  SE: (str: string): boolean => /^(?:SE)?\d{12}$/.test(str),

  AL: (str: string): boolean => /^(?:AL)?\w{9}[A-Z]$/.test(str),
  MK: (str: string): boolean => /^(?:MK)?\d{13}$/.test(str),
  AU,
  BY: (str: string): boolean => /^(?:УНП )?\d{9}$/.test(str),
  CA: (str: string): boolean => /^(?:CA)?\d{9}$/.test(str),
  IS: (str: string): boolean => /^(?:IS)?\d{5,6}$/.test(str),
  IN: (str: string): boolean => /^(?:IN)?\d{15}$/.test(str),
  ID: (str: string): boolean => /^(?:ID)?(?:\d{15}|\d{2}.\d{3}.\d{3}.\d-\d{3}.\d{3})$/.test(str),
  IL: (str: string): boolean => /^(?:IL)?\d{9}$/.test(str),
  KZ: (str: string): boolean => /^(?:KZ)?\d{12}$/.test(str),
  NZ: (str: string): boolean => /^(?:NZ)?\d{9}$/.test(str),
  NG: (str: string): boolean => /^(?:NG)?(?:\d{12}|\d{8}-\d{4})$/.test(str),
  NO: (str: string): boolean => /^(?:NO)?\d{9}MVA$/.test(str),
  PH: (str: string): boolean => /^(?:PH)?(?:\d{12}|\d{3} \d{3} \d{3} \d{3})$/.test(str),
  RU: (str: string): boolean => /^(?:RU)?(?:\d{10}|\d{12})$/.test(str),
  SM: (str: string): boolean => /^(?:SM)?\d{5}$/.test(str),
  SA: (str: string): boolean => /^(?:SA)?\d{15}$/.test(str),
  RS: (str: string): boolean => /^(?:RS)?\d{9}$/.test(str),
  CH,
  TR: (str: string): boolean => /^(?:TR)?\d{10}$/.test(str),
  UA: (str: string): boolean => /^(?:UA)?\d{12}$/.test(str),
  GB: (str: string): boolean => /^GB(?:\d{3} \d{4} (?:[0-8]\d|9[0-6])|\d{9} \d{3}|(?:GD[0-4]|HA[5-9])\d{2})$/.test(str),
  UZ: (str: string): boolean => /^(?:UZ)?\d{9}$/.test(str),

  AR: (str: string): boolean => /^(?:AR)?\d{11}$/.test(str),
  BO: (str: string): boolean => /^(?:BO)?\d{7}$/.test(str),
  BR: (str: string): boolean => /^(?:BR)?(?:\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}|\d{3}.\d{3}.\d{3}-\d{2})$/.test(str),
  CL: (str: string): boolean => /^(?:CL)?\d{8}-\d$/.test(str),
  CO: (str: string): boolean => /^(?:CO)?\d{10}$/.test(str),
  CR: (str: string): boolean => /^(?:CR)?\d{9,12}$/.test(str),
  EC: (str: string): boolean => /^(?:EC)?\d{13}$/.test(str),
  SV: (str: string): boolean => /^(?:SV)?\d{4}-\d{6}-\d{3}-\d$/.test(str),
  GT: (str: string): boolean => /^(?:GT)?\d{7}-\d$/.test(str),
  HN: (str: string): boolean => /^(?:HN)?$/.test(str),
  MX: (str: string): boolean => /^(?:MX)?\w{3,4}\d{6}\w{3}$/.test(str),
  NI: (str: string): boolean => /^(?:NI)?\d{3}-\d{6}-\d{4}\w$/.test(str),
  PA: (str: string): boolean => /^(?:PA)?$/.test(str),
  PY: (str: string): boolean => /^(?:PY)?\d{6,8}-\d$/.test(str),
  PE: (str: string): boolean => /^(?:PE)?\d{11}$/.test(str),
  DO: (str: string): boolean => /^(?:DO)?(?:\d{11}|\d{3}-\d{7}-\d|[1,45]\d{8}|[1,45]-\d{2}-\d{5}-\d)$/.test(str),
  UY: (str: string): boolean => /^(?:UY)?\d{12}$/.test(str),
  VE: (str: string): boolean => /^(?:VE)?[J,GVE]-(?:\d{9}|\d{8}-\d)$/.test(str),
} as const

export default function isVAT(str: string, countryCode: string): boolean {
  assertString(str)
  assertString(countryCode)

  if (countryCode in vatMatchers) {
    return vatMatchers[countryCode as keyof typeof vatMatchers](str)
  }
  throw new Error(`Invalid country code: '${countryCode}'`)
}