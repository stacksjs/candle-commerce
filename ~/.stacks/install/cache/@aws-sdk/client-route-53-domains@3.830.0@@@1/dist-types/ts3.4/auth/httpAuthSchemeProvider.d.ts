import {
  AwsSdkSigV4AuthInputConfig,
  AwsSdkSigV4AuthResolvedConfig,
  AwsSdkSigV4PreviouslyResolved,
} from "@aws-sdk/core";
import {
  HandlerExecutionContext,
  HttpAuthScheme,
  HttpAuthSchemeParameters,
  HttpAuthSchemeParametersProvider,
  HttpAuthSchemeProvider,
  Provider,
} from "@smithy/types";
import { Route53DomainsClientResolvedConfig } from "../Route53DomainsClient";
export interface Route53DomainsHttpAuthSchemeParameters
  extends HttpAuthSchemeParameters {
  region?: string;
}
export interface Route53DomainsHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<
    Route53DomainsClientResolvedConfig,
    HandlerExecutionContext,
    Route53DomainsHttpAuthSchemeParameters,
    object
  > {}
export declare const defaultRoute53DomainsHttpAuthSchemeParametersProvider: (
  config: Route53DomainsClientResolvedConfig,
  context: HandlerExecutionContext,
  input: object
) => Promise<Route53DomainsHttpAuthSchemeParameters>;
export interface Route53DomainsHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<Route53DomainsHttpAuthSchemeParameters> {}
export declare const defaultRoute53DomainsHttpAuthSchemeProvider: Route53DomainsHttpAuthSchemeProvider;
export interface HttpAuthSchemeInputConfig extends AwsSdkSigV4AuthInputConfig {
  authSchemePreference?: string[] | Provider<string[]>;
  httpAuthSchemes?: HttpAuthScheme[];
  httpAuthSchemeProvider?: Route53DomainsHttpAuthSchemeProvider;
}
export interface HttpAuthSchemeResolvedConfig
  extends AwsSdkSigV4AuthResolvedConfig {
  readonly authSchemePreference: Provider<string[]>;
  readonly httpAuthSchemes: HttpAuthScheme[];
  readonly httpAuthSchemeProvider: Route53DomainsHttpAuthSchemeProvider;
}
export declare const resolveHttpAuthSchemeConfig: <T>(
  config: T & HttpAuthSchemeInputConfig & AwsSdkSigV4PreviouslyResolved
) => T & HttpAuthSchemeResolvedConfig;
