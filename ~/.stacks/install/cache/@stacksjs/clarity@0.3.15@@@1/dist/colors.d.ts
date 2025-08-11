declare type ColorCode = string
interface LogLevelColors {
  debug: ColorCode
  info: ColorCode
  success: ColorCode
  warning: ColorCode
  error: ColorCode
}

export const levels: LogLevelColors = {
  debug: gray,
  info: blue,
  success: green,
  warning: yellow,
  error: red,
}
export declare function colorize(text: string, color: string): string;
export declare function stripColors(text: string): string;