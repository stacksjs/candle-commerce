import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_EnableDomainTransferLockCommand, se_EnableDomainTransferLockCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class EnableDomainTransferLockCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "EnableDomainTransferLock", {})
    .n("Route53DomainsClient", "EnableDomainTransferLockCommand")
    .f(void 0, void 0)
    .ser(se_EnableDomainTransferLockCommand)
    .de(de_EnableDomainTransferLockCommand)
    .build() {
}
