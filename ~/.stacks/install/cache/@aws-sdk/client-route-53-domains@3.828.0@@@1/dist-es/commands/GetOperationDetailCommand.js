import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_GetOperationDetailCommand, se_GetOperationDetailCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class GetOperationDetailCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "GetOperationDetail", {})
    .n("Route53DomainsClient", "GetOperationDetailCommand")
    .f(void 0, void 0)
    .ser(se_GetOperationDetailCommand)
    .de(de_GetOperationDetailCommand)
    .build() {
}
