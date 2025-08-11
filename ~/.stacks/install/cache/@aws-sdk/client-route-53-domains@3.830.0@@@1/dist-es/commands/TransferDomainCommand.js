import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { TransferDomainRequestFilterSensitiveLog, } from "../models/models_0";
import { de_TransferDomainCommand, se_TransferDomainCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class TransferDomainCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "TransferDomain", {})
    .n("Route53DomainsClient", "TransferDomainCommand")
    .f(TransferDomainRequestFilterSensitiveLog, void 0)
    .ser(se_TransferDomainCommand)
    .de(de_TransferDomainCommand)
    .build() {
}
