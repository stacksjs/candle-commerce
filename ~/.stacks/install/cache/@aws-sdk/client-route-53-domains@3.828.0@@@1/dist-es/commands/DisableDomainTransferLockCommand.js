import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DisableDomainTransferLockCommand, se_DisableDomainTransferLockCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class DisableDomainTransferLockCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "DisableDomainTransferLock", {})
    .n("Route53DomainsClient", "DisableDomainTransferLockCommand")
    .f(void 0, void 0)
    .ser(se_DisableDomainTransferLockCommand)
    .de(de_DisableDomainTransferLockCommand)
    .build() {
}
