declare const execAsync: unknown;
export declare const hostsFilePath: string;
declare function execSudo(command: string): Promise<void>;
export declare function addHosts(hosts: string[], verbose?: boolean): Promise<void>;
export declare function removeHosts(hosts: string[], verbose?: boolean): Promise<void>;
export declare function checkHosts(hosts: string[], verbose?: boolean): Promise<boolean[]>;