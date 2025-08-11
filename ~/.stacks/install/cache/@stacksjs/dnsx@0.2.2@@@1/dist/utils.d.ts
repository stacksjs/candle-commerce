import type { ProtocolTweaks } from './types';

export declare function parseProtocolTweaks(tweaks: string | string[] | undefined): ProtocolTweaks | undefined;
export declare function debugLog(category: string, message: string, verbose?: boolean): void;