import type { CliOptions, ConfigAction, ConfigHandlers, LogOptions } from './cli-types';
import type { LogLevel } from '../types';
import type { Logger } from '../logger';

declare function validateLogLevel(level: string | undefined): LogLevel | undefined;
export declare function handleWatch(logger: Logger, options: CliOptions): Promise<void>;
export declare function handleLog(logger: Logger, message: string, options: LogOptions): Promise<void>;
export declare function handleExport(logger: Logger, options: CliOptions): Promise<void>;
export declare function handleTail(logger: Logger, options: CliOptions): Promise<void>;
export declare function handleSearch(logger: Logger, pattern: string, options: CliOptions): Promise<void>;
export declare function handleClear(logger: Logger, options: CliOptions): Promise<void>;
export declare function handleConfig(action: ConfigAction, options: CliOptions, handlers: ConfigHandlers): Promise<void>;