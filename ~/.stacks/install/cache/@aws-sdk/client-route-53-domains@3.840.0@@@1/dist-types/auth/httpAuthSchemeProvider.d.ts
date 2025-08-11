import { AwsSdkSigV4AuthInputConfig, AwsSdkSigV4AuthResolvedConfig, AwsSdkSigV4PreviouslyResolved } from "@aws-sdk/core";
import { HandlerExecutionContext, HttpAuthScheme, HttpAuthSchemeParameters, HttpAuthSchemeParametersProvider, HttpAuthSchemeProvider, Provider } from "@smithy/types";
import { Route53DomainsClientResolvedConfig } from "../Route53DomainsClient";
/**
 * @internal
 */
export interface Route53DomainsHttpAuthSchemeParameters extends HttpAuthSchemeParameters {
    region?: string;
}
/**
 * @internal
 */
export interface Route53DomainsHttpAuthSchemeParametersProvider extends HttpAuthSchemeParametersProvider<Route53DomainsClientResolvedConfig, HandlerExecutionContext, Route53DomainsHttpAuthSchemeParameters, object> {
}
/**
 * @internal
 */
export declare const defaultRoute53DomainsHttpAuthSchemeParametersProvider: (config: Route53DomainsClientResolvedConfig, context: HandlerExecutionContext, input: object) => Promise<Route53DomainsHttpAuthSchemeParameters>;
/**
 * @internal
 */
export interface Route53DomainsHttpAuthSchemeProvider extends HttpAuthSchemeProvider<Route53DomainsHttpAuthSchemeParameters> {
}
/**
 * @internal
 */
export declare const defaultRoute53DomainsHttpAuthSchemeProvider: Route53DomainsHttpAuthSchemeProvider;
/**
 * @internal
 */
export interface HttpAuthSchemeInputConfig extends AwsSdkSigV4AuthInputConfig {
    /**
     * A comma-separated list of case-sensitive auth scheme names.
     * An auth scheme name is a fully qualified auth scheme ID with the namespace prefix trimmed.
     * For example, the auth scheme with ID aws.auth#sigv4 is named sigv4.
     * @public
     */
    authSchemePreference?: string[] | Provider<string[]>;
    /**
     * Configuration of HttpAuthSchemes for a client which provides default identity providers and signers per auth scheme.
     * @internal
     */
    httpAuthSchemes?: HttpAuthScheme[];
    /**
     * Configuration of an HttpAuthSchemeProvider for a client which resolves which HttpAuthScheme to use.
     * @internal
     */
    httpAuthSchemeProvider?: Route53DomainsHttpAuthSchemeProvider;
}
/**
 * @internal
 */
export interface HttpAuthSchemeResolvedConfig extends AwsSdkSigV4AuthResolvedConfig {
    /**
     * A comma-separated list of case-sensitive auth scheme names.
     * An auth scheme name is a fully qualified auth scheme ID with the namespace prefix trimmed.
     * For example, the auth scheme with ID aws.auth#sigv4 is named sigv4.
     * @public
     */
    readonly authSchemePreference: Provider<string[]>;
    /**
     * Configuration of HttpAuthSchemes for a client which provides default identity providers and signers per auth scheme.
     * @internal
     */
    readonly httpAuthSchemes: HttpAuthScheme[];
    /**
     * Configuration of an HttpAuthSchemeProvider for a client which resolves which HttpAuthScheme to use.
     * @internal
     */
    readonly httpAuthSchemeProvider: Route53DomainsHttpAuthSchemeProvider;
}
/**
 * @internal
 */
export declare const resolveHttpAuthSchemeConfig: <T>(config: T & HttpAuthSchemeInputConfig & AwsSdkSigV4PreviouslyResolved) => T & HttpAuthSchemeResolvedConfig;
