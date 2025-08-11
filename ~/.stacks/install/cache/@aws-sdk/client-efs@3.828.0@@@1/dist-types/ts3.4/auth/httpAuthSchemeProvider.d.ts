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
import { EFSClientResolvedConfig } from "../EFSClient";
export interface EFSHttpAuthSchemeParameters extends HttpAuthSchemeParameters {
  region?: string;
}
export interface EFSHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<
    EFSClientResolvedConfig,
    HandlerExecutionContext,
    EFSHttpAuthSchemeParameters,
    object
  > {}
export declare const defaultEFSHttpAuthSchemeParametersProvider: (
  config: EFSClientResolvedConfig,
  context: HandlerExecutionContext,
  input: object
) => Promise<EFSHttpAuthSchemeParameters>;
export interface EFSHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<EFSHttpAuthSchemeParameters> {}
export declare const defaultEFSHttpAuthSchemeProvider: EFSHttpAuthSchemeProvider;
export interface HttpAuthSchemeInputConfig extends AwsSdkSigV4AuthInputConfig {
  authSchemePreference?: string[] | Provider<string[]>;
  httpAuthSchemes?: HttpAuthScheme[];
  httpAuthSchemeProvider?: EFSHttpAuthSchemeProvider;
}
export interface HttpAuthSchemeResolvedConfig
  extends AwsSdkSigV4AuthResolvedConfig {
  readonly authSchemePreference: Provider<string[]>;
  readonly httpAuthSchemes: HttpAuthScheme[];
  readonly httpAuthSchemeProvider: EFSHttpAuthSchemeProvider;
}
export declare const resolveHttpAuthSchemeConfig: <T>(
  config: T & HttpAuthSchemeInputConfig & AwsSdkSigV4PreviouslyResolved
) => T & HttpAuthSchemeResolvedConfig;
