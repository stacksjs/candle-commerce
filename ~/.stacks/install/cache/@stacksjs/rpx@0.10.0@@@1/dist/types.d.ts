import type { TlsConfig, TlsOption } from '@stacksjs/tlsx';

export type { TlsConfig, TlsOption }
export declare interface StartOptions {
  command: string
  cwd?: string
  env?: Record<string, string>
}
export declare interface BaseProxyConfig {
  from: string 
  to: string 
  start?: StartOptions
}
export declare type BaseProxyOptions = Partial<BaseProxyConfig>

export interface CleanupConfig {
  domains: string[] 
  hosts: boolean 
  certs: boolean 
  verbose: boolean 
}

export type CleanupOptions = Partial<CleanupConfig>

export interface SharedProxyConfig {
  https: boolean | TlsOption
  cleanup: boolean | CleanupOptions
  vitePluginUsage: boolean
  verbose: boolean
  _cachedSSLConfig?: SSLConfig | null
  start?: StartOptions
  cleanUrls: boolean
}

export type SharedProxyOptions = Partial<SharedProxyConfig>

export interface SingleProxyConfig extends BaseProxyConfig, SharedProxyConfig {}

export interface MultiProxyConfig extends SharedProxyConfig {
  proxies: Array<BaseProxyConfig & { cleanUrls: boolean }>
}

export type ProxyConfig = SingleProxyConfig
export type ProxyConfigs = SingleProxyConfig | MultiProxyConfig

export type BaseProxyOption = Partial<BaseProxyConfig>
export type ProxyOption = Partial<SingleProxyConfig>
export type ProxyOptions = Partial<SingleProxyConfig> | Partial<MultiProxyConfig>

export interface SSLConfig {
  key: string
  cert: string
  ca?: string | string[]
}

export interface ProxySetupOptions extends Omit<ProxyOption, 'from'> {
  fromPort: number
  sourceUrl: Pick<URL, 'hostname' | 'host'>
  ssl: SSLConfig | null
  from: string
  to: string
  portManager?: PortManager
}

export interface PortManager {
  usedPorts: Set<number>
  getNextAvailablePort: (startPort: number) => Promise<number>
}