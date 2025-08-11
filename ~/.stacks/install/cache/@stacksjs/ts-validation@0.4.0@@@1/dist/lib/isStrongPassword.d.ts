import type { PasswordAnalysis } from '../types';

declare const upperCaseRegex: unknown;
declare const defaultOptions: {
  minLength: 8;
  minLowercase: 1;
  minUppercase: 1;
  minNumbers: 1;
  minSymbols: 1;
  returnScore: false;
  pointsPerUnique: 1;
  pointsPerRepeat: 0.5;
  pointsForContainingLower: 10;
  pointsForContainingUpper: 10;
  pointsForContainingNumber: 10;
  pointsForContainingSymbol: 10
};
declare function countChars(str: string): void;
declare function analyzePassword(password: string): void;
declare function scorePassword(analysis: PasswordAnalysis, scoringOptions: typeof defaultOptions): void;

export default function isStrongPassword(str: string, options: typeof defaultOptions = defaultOptions): boolean | number {
  assertString(str)
  const analysis = analyzePassword(str)
  options = merge(options || {}, defaultOptions)
  if (options.returnScore) {
    return scorePassword(analysis, options)
  }
  return analysis.length >= options.minLength
    && analysis.lowercaseCount >= options.minLowercase
    && analysis.uppercaseCount >= options.minUppercase
    && analysis.numberCount >= options.minNumbers
    && analysis.symbolCount >= options.minSymbols
};