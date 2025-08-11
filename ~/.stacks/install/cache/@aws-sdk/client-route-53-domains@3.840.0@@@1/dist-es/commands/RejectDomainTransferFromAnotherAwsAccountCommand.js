import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_RejectDomainTransferFromAnotherAwsAccountCommand, se_RejectDomainTransferFromAnotherAwsAccountCommand, } from "../protocols/Aws_json1_1";
export { $Command };
export class RejectDomainTransferFromAnotherAwsAccountCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "RejectDomainTransferFromAnotherAwsAccount", {})
    .n("Route53DomainsClient", "RejectDomainTransferFromAnotherAwsAccountCommand")
    .f(void 0, void 0)
    .ser(se_RejectDomainTransferFromAnotherAwsAccountCommand)
    .de(de_RejectDomainTransferFromAnotherAwsAccountCommand)
    .build() {
}
