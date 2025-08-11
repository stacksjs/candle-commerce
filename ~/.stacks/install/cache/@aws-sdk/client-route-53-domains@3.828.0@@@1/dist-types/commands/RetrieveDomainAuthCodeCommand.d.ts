import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { RetrieveDomainAuthCodeRequest, RetrieveDomainAuthCodeResponse } from "../models/models_0";
import { Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../Route53DomainsClient";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link RetrieveDomainAuthCodeCommand}.
 */
export interface RetrieveDomainAuthCodeCommandInput extends RetrieveDomainAuthCodeRequest {
}
/**
 * @public
 *
 * The output of {@link RetrieveDomainAuthCodeCommand}.
 */
export interface RetrieveDomainAuthCodeCommandOutput extends RetrieveDomainAuthCodeResponse, __MetadataBearer {
}
declare const RetrieveDomainAuthCodeCommand_base: {
    new (input: RetrieveDomainAuthCodeCommandInput): import("@smithy/smithy-client").CommandImpl<RetrieveDomainAuthCodeCommandInput, RetrieveDomainAuthCodeCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: RetrieveDomainAuthCodeCommandInput): import("@smithy/smithy-client").CommandImpl<RetrieveDomainAuthCodeCommandInput, RetrieveDomainAuthCodeCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>This operation returns the authorization code for the domain. To transfer a domain to
 * 			another registrar, you provide this value to the new registrar.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { Route53DomainsClient, RetrieveDomainAuthCodeCommand } from "@aws-sdk/client-route-53-domains"; // ES Modules import
 * // const { Route53DomainsClient, RetrieveDomainAuthCodeCommand } = require("@aws-sdk/client-route-53-domains"); // CommonJS import
 * const client = new Route53DomainsClient(config);
 * const input = { // RetrieveDomainAuthCodeRequest
 *   DomainName: "STRING_VALUE", // required
 * };
 * const command = new RetrieveDomainAuthCodeCommand(input);
 * const response = await client.send(command);
 * // { // RetrieveDomainAuthCodeResponse
 * //   AuthCode: "STRING_VALUE",
 * // };
 *
 * ```
 *
 * @param RetrieveDomainAuthCodeCommandInput - {@link RetrieveDomainAuthCodeCommandInput}
 * @returns {@link RetrieveDomainAuthCodeCommandOutput}
 * @see {@link RetrieveDomainAuthCodeCommandInput} for command's `input` shape.
 * @see {@link RetrieveDomainAuthCodeCommandOutput} for command's `response` shape.
 * @see {@link Route53DomainsClientResolvedConfig | config} for Route53DomainsClient's `config` shape.
 *
 * @throws {@link InvalidInput} (client fault)
 *  <p>The requested item is not acceptable. For example, for APIs that accept a domain name,
 * 			the request might specify a domain name that doesn't belong to the account that
 * 			submitted the request. For <code>AcceptDomainTransferFromAnotherAwsAccount</code>, the
 * 			password might be invalid.</p>
 *
 * @throws {@link UnsupportedTLD} (client fault)
 *  <p>Amazon Route 53 does not support this top-level domain (TLD).</p>
 *
 * @throws {@link Route53DomainsServiceException}
 * <p>Base exception class for all service exceptions from Route53Domains service.</p>
 *
 *
 * @public
 */
export declare class RetrieveDomainAuthCodeCommand extends RetrieveDomainAuthCodeCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: RetrieveDomainAuthCodeRequest;
            output: RetrieveDomainAuthCodeResponse;
        };
        sdk: {
            input: RetrieveDomainAuthCodeCommandInput;
            output: RetrieveDomainAuthCodeCommandOutput;
        };
    };
}
