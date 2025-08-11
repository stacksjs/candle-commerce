import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_EnableDomainAutoRenewCommand, se_EnableDomainAutoRenewCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class EnableDomainAutoRenewCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "EnableDomainAutoRenew", {})
    .n("Route53DomainsClient", "EnableDomainAutoRenewCommand")
    .f(void 0, void 0)
    .ser(se_EnableDomainAutoRenewCommand)
    .de(de_EnableDomainAutoRenewCommand)
    .build() {
}
