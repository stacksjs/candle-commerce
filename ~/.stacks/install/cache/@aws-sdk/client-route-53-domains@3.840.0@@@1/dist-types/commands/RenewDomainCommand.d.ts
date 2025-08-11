import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { RenewDomainRequest, RenewDomainResponse } from "../models/models_0";
import { Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../Route53DomainsClient";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link RenewDomainCommand}.
 */
export interface RenewDomainCommandInput extends RenewDomainRequest {
}
/**
 * @public
 *
 * The output of {@link RenewDomainCommand}.
 */
export interface RenewDomainCommandOutput extends RenewDomainResponse, __MetadataBearer {
}
declare const RenewDomainCommand_base: {
    new (input: RenewDomainCommandInput): import("@smithy/smithy-client").CommandImpl<RenewDomainCommandInput, RenewDomainCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: RenewDomainCommandInput): import("@smithy/smithy-client").CommandImpl<RenewDomainCommandInput, RenewDomainCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>This operation renews a domain for the specified number of years. The cost of renewing
 * 			your domain is billed to your Amazon Web Services account.</p>
 *          <p>We recommend that you renew your domain several weeks before the expiration date. Some
 * 			TLD registries delete domains before the expiration date if you haven't renewed far
 * 			enough in advance. For more information about renewing domain registration, see <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-renew.html">Renewing
 * 				Registration for a Domain</a> in the <i>Amazon Route 53 Developer
 * 				Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { Route53DomainsClient, RenewDomainCommand } from "@aws-sdk/client-route-53-domains"; // ES Modules import
 * // const { Route53DomainsClient, RenewDomainCommand } = require("@aws-sdk/client-route-53-domains"); // CommonJS import
 * const client = new Route53DomainsClient(config);
 * const input = { // RenewDomainRequest
 *   DomainName: "STRING_VALUE", // required
 *   DurationInYears: Number("int"),
 *   CurrentExpiryYear: Number("int"), // required
 * };
 * const command = new RenewDomainCommand(input);
 * const response = await client.send(command);
 * // { // RenewDomainResponse
 * //   OperationId: "STRING_VALUE",
 * // };
 *
 * ```
 *
 * @param RenewDomainCommandInput - {@link RenewDomainCommandInput}
 * @returns {@link RenewDomainCommandOutput}
 * @see {@link RenewDomainCommandInput} for command's `input` shape.
 * @see {@link RenewDomainCommandOutput} for command's `response` shape.
 * @see {@link Route53DomainsClientResolvedConfig | config} for Route53DomainsClient's `config` shape.
 *
 * @throws {@link DuplicateRequest} (client fault)
 *  <p>The request is already in progress for the domain.</p>
 *
 * @throws {@link InvalidInput} (client fault)
 *  <p>The requested item is not acceptable. For example, for APIs that accept a domain name,
 * 			the request might specify a domain name that doesn't belong to the account that
 * 			submitted the request. For <code>AcceptDomainTransferFromAnotherAwsAccount</code>, the
 * 			password might be invalid.</p>
 *
 * @throws {@link OperationLimitExceeded} (client fault)
 *  <p>The number of operations or jobs running exceeded the allowed threshold for the
 * 			account.</p>
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
export declare class RenewDomainCommand extends RenewDomainCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: RenewDomainRequest;
            output: RenewDomainResponse;
        };
        sdk: {
            input: RenewDomainCommandInput;
            output: RenewDomainCommandOutput;
        };
    };
}
