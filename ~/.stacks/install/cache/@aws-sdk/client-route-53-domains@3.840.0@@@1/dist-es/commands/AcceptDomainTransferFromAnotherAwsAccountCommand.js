import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { AcceptDomainTransferFromAnotherAwsAccountRequestFilterSensitiveLog, } from "../models/models_0";
import { de_AcceptDomainTransferFromAnotherAwsAccountCommand, se_AcceptDomainTransferFromAnotherAwsAccountCommand, } from "../protocols/Aws_json1_1";
export { $Command };
export class AcceptDomainTransferFromAnotherAwsAccountCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "AcceptDomainTransferFromAnotherAwsAccount", {})
    .n("Route53DomainsClient", "AcceptDomainTransferFromAnotherAwsAccountCommand")
    .f(AcceptDomainTransferFromAnotherAwsAccountRequestFilterSensitiveLog, void 0)
    .ser(se_AcceptDomainTransferFromAnotherAwsAccountCommand)
    .de(de_AcceptDomainTransferFromAnotherAwsAccountCommand)
    .build() {
}
