import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_ListOperationsCommand, se_ListOperationsCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class ListOperationsCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "ListOperations", {})
    .n("Route53DomainsClient", "ListOperationsCommand")
    .f(void 0, void 0)
    .ser(se_ListOperationsCommand)
    .de(de_ListOperationsCommand)
    .build() {
}
