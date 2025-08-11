import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_CheckDomainAvailabilityCommand, se_CheckDomainAvailabilityCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class CheckDomainAvailabilityCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "CheckDomainAvailability", {})
    .n("Route53DomainsClient", "CheckDomainAvailabilityCommand")
    .f(void 0, void 0)
    .ser(se_CheckDomainAvailabilityCommand)
    .de(de_CheckDomainAvailabilityCommand)
    .build() {
}
