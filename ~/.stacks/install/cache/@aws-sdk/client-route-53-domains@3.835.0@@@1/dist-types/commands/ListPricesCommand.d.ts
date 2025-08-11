import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { ListPricesRequest, ListPricesResponse } from "../models/models_0";
import { Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../Route53DomainsClient";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link ListPricesCommand}.
 */
export interface ListPricesCommandInput extends ListPricesRequest {
}
/**
 * @public
 *
 * The output of {@link ListPricesCommand}.
 */
export interface ListPricesCommandOutput extends ListPricesResponse, __MetadataBearer {
}
declare const ListPricesCommand_base: {
    new (input: ListPricesCommandInput): import("@smithy/smithy-client").CommandImpl<ListPricesCommandInput, ListPricesCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (...[input]: [] | [ListPricesCommandInput]): import("@smithy/smithy-client").CommandImpl<ListPricesCommandInput, ListPricesCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>Lists the following prices for either all the TLDs supported by Route 53, or
 * 			the specified TLD:</p>
 *          <ul>
 *             <li>
 *                <p>Registration</p>
 *             </li>
 *             <li>
 *                <p>Transfer</p>
 *             </li>
 *             <li>
 *                <p>Owner change</p>
 *             </li>
 *             <li>
 *                <p>Domain renewal</p>
 *             </li>
 *             <li>
 *                <p>Domain restoration</p>
 *             </li>
 *          </ul>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { Route53DomainsClient, ListPricesCommand } from "@aws-sdk/client-route-53-domains"; // ES Modules import
 * // const { Route53DomainsClient, ListPricesCommand } = require("@aws-sdk/client-route-53-domains"); // CommonJS import
 * const client = new Route53DomainsClient(config);
 * const input = { // ListPricesRequest
 *   Tld: "STRING_VALUE",
 *   Marker: "STRING_VALUE",
 *   MaxItems: Number("int"),
 * };
 * const command = new ListPricesCommand(input);
 * const response = await client.send(command);
 * // { // ListPricesResponse
 * //   Prices: [ // DomainPriceList
 * //     { // DomainPrice
 * //       Name: "STRING_VALUE",
 * //       RegistrationPrice: { // PriceWithCurrency
 * //         Price: Number("double"), // required
 * //         Currency: "STRING_VALUE", // required
 * //       },
 * //       TransferPrice: {
 * //         Price: Number("double"), // required
 * //         Currency: "STRING_VALUE", // required
 * //       },
 * //       RenewalPrice: {
 * //         Price: Number("double"), // required
 * //         Currency: "STRING_VALUE", // required
 * //       },
 * //       ChangeOwnershipPrice: {
 * //         Price: Number("double"), // required
 * //         Currency: "STRING_VALUE", // required
 * //       },
 * //       RestorationPrice: {
 * //         Price: Number("double"), // required
 * //         Currency: "STRING_VALUE", // required
 * //       },
 * //     },
 * //   ],
 * //   NextPageMarker: "STRING_VALUE",
 * // };
 *
 * ```
 *
 * @param ListPricesCommandInput - {@link ListPricesCommandInput}
 * @returns {@link ListPricesCommandOutput}
 * @see {@link ListPricesCommandInput} for command's `input` shape.
 * @see {@link ListPricesCommandOutput} for command's `response` shape.
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
export declare class ListPricesCommand extends ListPricesCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: ListPricesRequest;
            output: ListPricesResponse;
        };
        sdk: {
            input: ListPricesCommandInput;
            output: ListPricesCommandOutput;
        };
    };
}
