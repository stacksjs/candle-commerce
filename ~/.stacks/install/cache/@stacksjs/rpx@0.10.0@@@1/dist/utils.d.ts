import type { ProxyConfigs, ProxyOption } from './types';

export declare function debugLog(category: string, message: string, verbose?: boolean): void;
export declare function extractHostname(options: ProxyOption | ProxyOptions): string[];
declare interface RootCA {
  certificate: string
  privateKey: string
}
export declare function isValidRootCA(value: unknown): value is RootCA;
export declare function getPrimaryDomain(options?: ProxyOption | ProxyOptions): string;
export declare function isMultiProxyConfig(options: ProxyConfigs | ProxyOptions): options is MultiProxyConfig;
export declare function isMultiProxyOptions(options: ProxyOption | ProxyOptions): options is MultiProxyConfig;
export declare function isSingleProxyOptions(options: ProxyOption | ProxyOptions): options is SingleProxyConfig;
export declare function isSingleProxyConfig(options: ProxyConfigs | ProxyOptions): options is SingleProxyConfig;
export declare function safeDeleteFile(filePath: string, verbose?: boolean): Promise<void>;