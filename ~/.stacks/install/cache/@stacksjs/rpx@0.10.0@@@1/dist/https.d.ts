import type { ProxyConfigs, ProxyOption, ProxyOptions, TlsConfig } from './types';

export declare function resolveSSLPaths(options: ProxyConfigs, defaultConfig: typeof config): TlsConfig;
export declare function generateWildcardPatterns(domain: string): string[];
export declare function generateSSLPaths(options?: ProxyOptions): void;
export declare function getAllDomains(options: ProxyOption | ProxyOptions): Set<string>;
export declare function loadSSLConfig(options: ProxyOption): Promise<SSLConfig | null>;
export declare function generateCertificate(options: ProxyOptions): Promise<void>;
export declare function getSSLConfig(): void;
export declare function checkExistingCertificates(options?: ProxyOptions): Promise<SSLConfig | null>;
export declare function httpsConfig(options: ProxyOption | ProxyOptions, verbose?: boolean): TlsConfig;
export declare function cleanupCertificates(domain: string, verbose?: boolean): Promise<void>;