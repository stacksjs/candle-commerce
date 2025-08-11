import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DisableDomainAutoRenewRequest, DisableDomainAutoRenewResponse } from "../models/models_0";
import { Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../Route53DomainsClient";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link DisableDomainAutoRenewCommand}.
 */
export interface DisableDomainAutoRenewCommandInput extends DisableDomainAutoRenewRequest {
}
/**
 * @public
 *
 * The output of {@link DisableDomainAutoRenewCommand}.
 */
export interface DisableDomainAutoRenewCommandOutput extends DisableDomainAutoRenewResponse, __MetadataBearer {
}
declare const DisableDomainAutoRenewCommand_base: {
    new (input: DisableDomainAutoRenewCommandInput): import("@smithy/smithy-client").CommandImpl<DisableDomainAutoRenewCommandInput, DisableDomainAutoRenewCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: DisableDomainAutoRenewCommandInput): import("@smithy/smithy-client").CommandImpl<DisableDomainAutoRenewCommandInput, DisableDomainAutoRenewCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>This operation disables automatic renewal of domain registration for the specified
 * 			domain.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { Route53DomainsClient, DisableDomainAutoRenewCommand } from "@aws-sdk/client-route-53-domains"; // ES Modules import
 * // const { Route53DomainsClient, DisableDomainAutoRenewCommand } = require("@aws-sdk/client-route-53-domains"); // CommonJS import
 * const client = new Route53DomainsClient(config);
 * const input = { // DisableDomainAutoRenewRequest
 *   DomainName: "STRING_VALUE", // required
 * };
 * const command = new DisableDomainAutoRenewCommand(input);
 * const response = await client.send(command);
 * // {};
 *
 * ```
 *
 * @param DisableDomainAutoRenewCommandInput - {@link DisableDomainAutoRenewCommandInput}
 * @returns {@link DisableDomainAutoRenewCommandOutput}
 * @see {@link DisableDomainAutoRenewCommandInput} for command's `input` shape.
 * @see {@link DisableDomainAutoRenewCommandOutput} for command's `response` shape.
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
export declare class DisableDomainAutoRenewCommand extends DisableDomainAutoRenewCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: DisableDomainAutoRenewRequest;
            output: {};
        };
        sdk: {
            input: DisableDomainAutoRenewCommandInput;
            output: DisableDomainAutoRenewCommandOutput;
        };
    };
}
