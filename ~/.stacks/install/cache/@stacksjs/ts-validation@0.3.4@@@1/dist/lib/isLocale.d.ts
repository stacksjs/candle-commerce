declare const extlang: '([A-Za-z]{3}(-[A-Za-z]{3}){0,2})'  = 2*3ALPHA             shortest ISO 639 code ["-" extlang]        sometimes followed by extended language subtags / 4ALPHA               or reserved for future use / 5*8ALPHA             or registered language subtag */ const language = `(([a-zA-Z]{2,3}(-${extlang})?)|([a-zA-Z]{5,8}))`;
declare const script: '([A-Za-z]{4})'  = 2ALPHA               ISO 3166-1 code / 3DIGIT               UN M.49 code */ const region = '([A-Za-z]{2}|\\d{3})';
declare const extension: `(${singleton}(-[A-Za-z0-9]{2,8})+)`  = "x" 1*("-" (1*8alphanum)) */ const privateuse = '(x(-[A-Za-z0-9]{1,8})+)';
declare const irregular: '((en-GB-oed)|(i-ami)|(i-bnn)|(i-default)|(i-enochian)|' + '(i-hak)|(i-klingon)|(i-lux)|(i-mingo)|(i-navajo)|(i-pwn)|(i-tao)|' + '(i-tay)|(i-tsu)|(sgn-BE-FR)|(sgn-BE-NL)|(sgn-CH-DE))';
declare const regular: '((art-lojban)|(cel-gaulish)|(no-bok)|(no-nyn)|(zh-guoyu)|' + '(zh-hakka)|(zh-min)|(zh-min-nan)|(zh-xiang))';
declare const grandfathered: unknown;
declare const delimiter: '(-|_)'  = language ["-" script] ["-" region] *("-" variant) *("-" extension) ["-" privateuse] */ const langtag = `${language}(${delimiter}${script})?(${delimiter}${region})?(${delimiter}${variant})*(${delimiter}${extension})*(${delimiter}${privateuse})?`;
declare const languageTagRegex: unknown;

export default function isLocale(str: string): boolean {
  assertString(str)
  return languageTagRegex.test(str)
};