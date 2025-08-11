import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { GetDomainDetailResponseFilterSensitiveLog, } from "../models/models_0";
import { de_GetDomainDetailCommand, se_GetDomainDetailCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class GetDomainDetailCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "GetDomainDetail", {})
    .n("Route53DomainsClient", "GetDomainDetailCommand")
    .f(void 0, GetDomainDetailResponseFilterSensitiveLog)
    .ser(se_GetDomainDetailCommand)
    .de(de_GetDomainDetailCommand)
    .build() {
}
