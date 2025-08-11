import type { DtsGenerationConfig } from './types';

export declare function writeToFile(filePath: string, content: string): Promise<void>;
export declare function getAllTypeScriptFiles(directory?: string): Promise<string[]>;
export declare function checkIsolatedDeclarations(options?: DtsGenerationConfig): Promise<boolean>;
declare function makeAbsolute(basePath: string, configPath: string): string;