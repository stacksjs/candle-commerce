import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_GetDomainSuggestionsCommand, se_GetDomainSuggestionsCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class GetDomainSuggestionsCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "GetDomainSuggestions", {})
    .n("Route53DomainsClient", "GetDomainSuggestionsCommand")
    .f(void 0, void 0)
    .ser(se_GetDomainSuggestionsCommand)
    .de(de_GetDomainSuggestionsCommand)
    .build() {
}
