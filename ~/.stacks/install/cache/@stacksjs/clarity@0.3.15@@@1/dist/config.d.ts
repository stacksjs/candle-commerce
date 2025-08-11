import type { ClarityConfig } from './types';

declare function getProjectRoot(filePath?: string, options: { relative?: boolean } = {}): string;
declare const defaultLogDirectory: unknown;
export declare const defaultConfig: ClarityConfig;
declare function loadConfig(): Promise<ClarityConfig>;
export declare const config: ClarityConfig;