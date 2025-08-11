import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_ListTagsForDomainCommand, se_ListTagsForDomainCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class ListTagsForDomainCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "ListTagsForDomain", {})
    .n("Route53DomainsClient", "ListTagsForDomainCommand")
    .f(void 0, void 0)
    .ser(se_ListTagsForDomainCommand)
    .de(de_ListTagsForDomainCommand)
    .build() {
}
