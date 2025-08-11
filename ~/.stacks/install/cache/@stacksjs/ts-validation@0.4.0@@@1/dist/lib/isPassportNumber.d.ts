declare const passportRegexByCountryCode: {
  AM: unknown;
  '
  AR': unknown;
  '
  AT': unknown;
  '
  AU': unknown;
  '
  AZ': unknown;
  '
  BE': unknown;
  '
  BG': unknown;
  '
  BR': unknown;
  '
  BY': unknown;
  '
  CA': unknown;
  '
  CH': unknown;
  '
  CN': unknown;
  
  '
  CZ': unknown;
  '
  DE': unknown;
  '
  DK': unknown;
  '
  DZ': unknown;
  '
  EE': unknown;
  
  '
  FI': unknown;
  '
  FR': unknown;
  '
  GB': unknown;
  '
  GR': unknown;
  '
  HR': unknown;
  '
  HU': unknown;
  '
  IE': unknown;
  '
  IN': unknown;
  '
  ID': unknown;
  '
  IR': unknown;
  '
  IS': unknown;
  '
  IT': unknown;
  '
  JM': unknown;
  '
  JP': unknown;
  '
  KR': unknown;
  '
  KZ': unknown;
  '
  LI': unknown;
  '
  LT': unknown;
  '
  LU': unknown;
  '
  LV': unknown;
  '
  LY': unknown;
  '
  MT': unknown;
  '
  MZ': unknown;
  '
  MY': unknown;
  '
  MX': unknown;
  '
  NL': unknown;
  '
  NZ': unknown;
  '
  PH': unknown;
  '
  PK': unknown;
  '
  PL': unknown;
  '
  PT': unknown;
  '
  RO': unknown;
  '
  RU': unknown;
  '
  SE': unknown;
  '
  SL': unknown;
  '
  SK': unknown;
  '
  TH': unknown;
  '
  TR': unknown;
  '
  UA': unknown;
  '
  US': unknown;
  '
  ZA': unknown
};
export declare const locales: string[];

export default function isPassportNumber(str: string, countryCode: string): boolean {
  assertString(str)
  const normalizedStr = str.replace(/\s/g, '').toUpperCase()

  return (countryCode.toUpperCase() in passportRegexByCountryCode)
    && passportRegexByCountryCode[countryCode.toUpperCase() as keyof typeof passportRegexByCountryCode].test(normalizedStr)
};