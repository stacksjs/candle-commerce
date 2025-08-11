import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { EnableDomainAutoRenewRequest, EnableDomainAutoRenewResponse } from "../models/models_0";
import { Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../Route53DomainsClient";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link EnableDomainAutoRenewCommand}.
 */
export interface EnableDomainAutoRenewCommandInput extends EnableDomainAutoRenewRequest {
}
/**
 * @public
 *
 * The output of {@link EnableDomainAutoRenewCommand}.
 */
export interface EnableDomainAutoRenewCommandOutput extends EnableDomainAutoRenewResponse, __MetadataBearer {
}
declare const EnableDomainAutoRenewCommand_base: {
    new (input: EnableDomainAutoRenewCommandInput): import("@smithy/smithy-client").CommandImpl<EnableDomainAutoRenewCommandInput, EnableDomainAutoRenewCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: EnableDomainAutoRenewCommandInput): import("@smithy/smithy-client").CommandImpl<EnableDomainAutoRenewCommandInput, EnableDomainAutoRenewCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>This operation configures Amazon Route 53 to automatically renew the specified domain
 * 			before the domain registration expires. The cost of renewing your domain registration is
 * 			billed to your Amazon Web Services account.</p>
 *          <p>The period during which you can renew a domain name varies by TLD. For a list of TLDs
 * 			and their renewal policies, see <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/registrar-tld-list.html">Domains That You Can
 * 				Register with Amazon Route 53</a> in the <i>Amazon Route 53 Developer
 * 				Guide</i>. Route 53 requires that you renew before the end of the renewal
 * 			period so we can complete processing before the deadline.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { Route53DomainsClient, EnableDomainAutoRenewCommand } from "@aws-sdk/client-route-53-domains"; // ES Modules import
 * // const { Route53DomainsClient, EnableDomainAutoRenewCommand } = require("@aws-sdk/client-route-53-domains"); // CommonJS import
 * const client = new Route53DomainsClient(config);
 * const input = { // EnableDomainAutoRenewRequest
 *   DomainName: "STRING_VALUE", // required
 * };
 * const command = new EnableDomainAutoRenewCommand(input);
 * const response = await client.send(command);
 * // {};
 *
 * ```
 *
 * @param EnableDomainAutoRenewCommandInput - {@link EnableDomainAutoRenewCommandInput}
 * @returns {@link EnableDomainAutoRenewCommandOutput}
 * @see {@link EnableDomainAutoRenewCommandInput} for command's `input` shape.
 * @see {@link EnableDomainAutoRenewCommandOutput} for command's `response` shape.
 * @see {@link Route53DomainsClientResolvedConfig | config} for Route53DomainsClient's `config` shape.
 *
 * @throws {@link InvalidInput} (client fault)
 *  <p>The requested item is not acceptable. For example, for APIs that accept a domain name,
 * 			the request might specify a domain name that doesn't belong to the account that
 * 			submitted the request. For <code>AcceptDomainTransferFromAnotherAwsAccount</code>, the
 * 			password might be invalid.</p>
 *
 * @throws {@link TLDRulesViolation} (client fault)
 *  <p>The top-level domain does not support this operation.</p>
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
export declare class EnableDomainAutoRenewCommand extends EnableDomainAutoRenewCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: EnableDomainAutoRenewRequest;
            output: {};
        };
        sdk: {
            input: EnableDomainAutoRenewCommandInput;
            output: EnableDomainAutoRenewCommandOutput;
        };
    };
}
