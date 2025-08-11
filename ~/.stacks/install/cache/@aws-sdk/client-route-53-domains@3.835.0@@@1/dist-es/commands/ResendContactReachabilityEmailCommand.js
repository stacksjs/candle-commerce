import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { ResendContactReachabilityEmailResponseFilterSensitiveLog, } from "../models/models_0";
import { de_ResendContactReachabilityEmailCommand, se_ResendContactReachabilityEmailCommand, } from "../protocols/Aws_json1_1";
export { $Command };
export class ResendContactReachabilityEmailCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "ResendContactReachabilityEmail", {})
    .n("Route53DomainsClient", "ResendContactReachabilityEmailCommand")
    .f(void 0, ResendContactReachabilityEmailResponseFilterSensitiveLog)
    .ser(se_ResendContactReachabilityEmailCommand)
    .de(de_ResendContactReachabilityEmailCommand)
    .build() {
}
