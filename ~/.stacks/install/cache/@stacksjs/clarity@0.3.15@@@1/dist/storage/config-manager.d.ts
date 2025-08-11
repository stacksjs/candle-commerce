declare const CONFIG_FILE: unknown;
export declare interface ConfigManager {
  initialize: () => Promise<void>
  get: (key: string) => Promise<any>
  set: (key: string, value: any) => Promise<void>
  list: () => Promise<Record<string, any>>
  save: () => Promise<void>
}
declare const content: unknown;
export declare const configManager: ConfigManager;