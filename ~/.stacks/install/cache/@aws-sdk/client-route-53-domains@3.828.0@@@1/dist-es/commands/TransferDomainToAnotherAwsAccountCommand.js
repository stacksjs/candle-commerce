import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { TransferDomainToAnotherAwsAccountResponseFilterSensitiveLog, } from "../models/models_0";
import { de_TransferDomainToAnotherAwsAccountCommand, se_TransferDomainToAnotherAwsAccountCommand, } from "../protocols/Aws_json1_1";
export { $Command };
export class TransferDomainToAnotherAwsAccountCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "TransferDomainToAnotherAwsAccount", {})
    .n("Route53DomainsClient", "TransferDomainToAnotherAwsAccountCommand")
    .f(void 0, TransferDomainToAnotherAwsAccountResponseFilterSensitiveLog)
    .ser(se_TransferDomainToAnotherAwsAccountCommand)
    .de(de_TransferDomainToAnotherAwsAccountCommand)
    .build() {
}
