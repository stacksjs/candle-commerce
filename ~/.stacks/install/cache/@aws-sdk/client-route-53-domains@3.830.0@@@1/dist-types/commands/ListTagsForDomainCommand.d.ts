import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { ListTagsForDomainRequest, ListTagsForDomainResponse } from "../models/models_0";
import { Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../Route53DomainsClient";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link ListTagsForDomainCommand}.
 */
export interface ListTagsForDomainCommandInput extends ListTagsForDomainRequest {
}
/**
 * @public
 *
 * The output of {@link ListTagsForDomainCommand}.
 */
export interface ListTagsForDomainCommandOutput extends ListTagsForDomainResponse, __MetadataBearer {
}
declare const ListTagsForDomainCommand_base: {
    new (input: ListTagsForDomainCommandInput): import("@smithy/smithy-client").CommandImpl<ListTagsForDomainCommandInput, ListTagsForDomainCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: ListTagsForDomainCommandInput): import("@smithy/smithy-client").CommandImpl<ListTagsForDomainCommandInput, ListTagsForDomainCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>This operation returns all of the tags that are associated with the specified
 * 			domain.</p>
 *          <p>All tag operations are eventually consistent; subsequent operations might not
 * 			immediately represent all issued operations.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { Route53DomainsClient, ListTagsForDomainCommand } from "@aws-sdk/client-route-53-domains"; // ES Modules import
 * // const { Route53DomainsClient, ListTagsForDomainCommand } = require("@aws-sdk/client-route-53-domains"); // CommonJS import
 * const client = new Route53DomainsClient(config);
 * const input = { // ListTagsForDomainRequest
 *   DomainName: "STRING_VALUE", // required
 * };
 * const command = new ListTagsForDomainCommand(input);
 * const response = await client.send(command);
 * // { // ListTagsForDomainResponse
 * //   TagList: [ // TagList
 * //     { // Tag
 * //       Key: "STRING_VALUE",
 * //       Value: "STRING_VALUE",
 * //     },
 * //   ],
 * // };
 *
 * ```
 *
 * @param ListTagsForDomainCommandInput - {@link ListTagsForDomainCommandInput}
 * @returns {@link ListTagsForDomainCommandOutput}
 * @see {@link ListTagsForDomainCommandInput} for command's `input` shape.
 * @see {@link ListTagsForDomainCommandOutput} for command's `response` shape.
 * @see {@link Route53DomainsClientResolvedConfig | config} for Route53DomainsClient's `config` shape.
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
 * @throws {@link UnsupportedTLD} (client fault)
 *  <p>Amazon Route 53 does not support this top-level domain (TLD).</p>
 *
 * @throws {@link Route53DomainsServiceException}
 * <p>Base exception class for all service exceptions from Route53Domains service.</p>
 *
 *
 * @public
 */
export declare class ListTagsForDomainCommand extends ListTagsForDomainCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: ListTagsForDomainRequest;
            output: ListTagsForDomainResponse;
        };
        sdk: {
            input: ListTagsForDomainCommandInput;
            output: ListTagsForDomainCommandOutput;
        };
    };
}
