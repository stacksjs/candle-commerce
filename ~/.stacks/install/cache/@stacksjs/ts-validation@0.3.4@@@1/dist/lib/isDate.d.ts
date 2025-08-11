declare const default_date_options: {
  format: 'YYYY/MM/DD';
  delimiters: Array<'/' | '-'>;
  strictMode: false
};
declare function isValidFormat(format: string): boolean;
declare function zip(date: string[], format: string[]): [string, string][];