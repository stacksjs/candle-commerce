import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { CheckDomainTransferabilityRequestFilterSensitiveLog, } from "../models/models_0";
import { de_CheckDomainTransferabilityCommand, se_CheckDomainTransferabilityCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class CheckDomainTransferabilityCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "CheckDomainTransferability", {})
    .n("Route53DomainsClient", "CheckDomainTransferabilityCommand")
    .f(CheckDomainTransferabilityRequestFilterSensitiveLog, void 0)
    .ser(se_CheckDomainTransferabilityCommand)
    .de(de_CheckDomainTransferabilityCommand)
    .build() {
}
