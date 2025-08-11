import type { CliOptions } from './cli-types';

declare const CONFIG_FILE: unknown;
export declare function handleConfig(options: CliOptions): Promise<void>;
export declare function loadConfig(): Promise<Record<string, any>>;
export declare function saveConfig(config: Record<string, any>): Promise<void>;