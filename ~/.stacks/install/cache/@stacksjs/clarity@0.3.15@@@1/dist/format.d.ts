declare const POSITIONALS_EXP: unknown;
declare function serializePositional(positional: any, flag: string): any;
export declare function format(message: string, ...positionals: any[]): string;