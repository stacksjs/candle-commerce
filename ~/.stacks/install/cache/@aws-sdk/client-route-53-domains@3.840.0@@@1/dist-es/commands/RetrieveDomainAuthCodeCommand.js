import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { RetrieveDomainAuthCodeResponseFilterSensitiveLog, } from "../models/models_0";
import { de_RetrieveDomainAuthCodeCommand, se_RetrieveDomainAuthCodeCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class RetrieveDomainAuthCodeCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "RetrieveDomainAuthCode", {})
    .n("Route53DomainsClient", "RetrieveDomainAuthCodeCommand")
    .f(void 0, RetrieveDomainAuthCodeResponseFilterSensitiveLog)
    .ser(se_RetrieveDomainAuthCodeCommand)
    .de(de_RetrieveDomainAuthCodeCommand)
    .build() {
}
