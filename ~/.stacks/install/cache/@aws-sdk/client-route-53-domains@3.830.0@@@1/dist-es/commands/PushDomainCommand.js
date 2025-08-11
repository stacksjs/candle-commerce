import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_PushDomainCommand, se_PushDomainCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class PushDomainCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "PushDomain", {})
    .n("Route53DomainsClient", "PushDomainCommand")
    .f(void 0, void 0)
    .ser(se_PushDomainCommand)
    .de(de_PushDomainCommand)
    .build() {
}
