declare function bgBgCheck(tin: string): boolean;
declare function isCanadianSIN(input: string): boolean;
declare function csCzCheck(tin: string): boolean;
declare function deAtCheck(tin: string): boolean;
declare function deDeCheck(tin: string): boolean;
declare function dkDkCheck(tin: string): boolean;
declare function elCyCheck(tin: string): boolean;
declare function elGrCheck(tin: string): boolean;
declare function enIeCheck(tin: string): boolean;
declare function enUsGetPrefixes(): string[];
declare function enUsCheck(tin: string): boolean;
declare function esArCheck(tin: string): boolean;
declare function esEsCheck(tin: string): boolean;
declare function etEeCheck(tin: string): boolean;
declare function fiFiCheck(tin: string): boolean;
declare function frBeCheck(tin: string): boolean;
declare function frFrCheck(tin: string): boolean;
declare function frLuCheck(tin: string): boolean;
declare function hrHrCheck(tin: string): boolean;
declare function huHuCheck(tin: string): boolean;
declare function itItNameCheck(name: string): boolean;
declare function itItCheck(tin: string): boolean;
declare function lvLvCheck(tin: string): boolean;
declare function mtMtCheck(tin: string): boolean;
declare function nlNlCheck(tin: string): boolean;
declare function plPlCheck(tin: string): boolean;
declare function ptBrCheck(tin: string): boolean;
declare function ptPtCheck(tin: string): boolean;
declare function roRoCheck(tin: string): boolean;
declare function skSkCheck(tin: string): boolean;
declare function slSiCheck(tin: string): boolean;
declare function svSeCheck(tin: string): boolean;
declare function ukUaCheck(tin: string): boolean;
declare interface SanitizeRegexes {
  [key: string]: RegExp
  'de-AT': RegExp
  'de-DE': RegExp
  'fr-BE': RegExp
}
declare const taxIdFormat: TaxIdFormat;
declare const taxIdCheck: TaxIdCheck;
declare const sanitizeRegexes: SanitizeRegexes;

export default function isTaxID(str: string, locale = 'en-US'): boolean {
  assertString(str)
  let strcopy = str.slice(0)

  if (locale in taxIdFormat) {
    if (locale in sanitizeRegexes) {
      strcopy = strcopy.replace(sanitizeRegexes[locale], '')
    }
    if (!taxIdFormat[locale].test(strcopy)) {
      return false
    }

    if (locale in taxIdCheck) {
      return taxIdCheck[locale](strcopy)
    }
    return true
  }
  throw new Error(`Invalid locale '${locale}'`)
};