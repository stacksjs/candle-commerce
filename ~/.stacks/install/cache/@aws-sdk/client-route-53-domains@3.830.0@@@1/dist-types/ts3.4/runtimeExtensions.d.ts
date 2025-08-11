import { Route53DomainsExtensionConfiguration } from "./extensionConfiguration";
export interface RuntimeExtension {
  configure(extensionConfiguration: Route53DomainsExtensionConfiguration): void;
}
export interface RuntimeExtensionsConfig {
  extensions: RuntimeExtension[];
}
export declare const resolveRuntimeExtensions: (
  runtimeConfig: any,
  extensions: RuntimeExtension[]
) => any;
