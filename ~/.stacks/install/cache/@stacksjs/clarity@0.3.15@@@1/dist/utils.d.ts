export declare function isBrowserProcess(): boolean;
export declare function isServerProcess(): Promise<boolean>;
export declare function chunk<T>(array: T[], size: number): T[][];