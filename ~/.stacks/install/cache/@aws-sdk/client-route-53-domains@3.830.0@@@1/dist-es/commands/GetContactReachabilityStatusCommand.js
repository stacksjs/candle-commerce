import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_GetContactReachabilityStatusCommand, se_GetContactReachabilityStatusCommand, } from "../protocols/Aws_json1_1";
export { $Command };
export class GetContactReachabilityStatusCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "GetContactReachabilityStatus", {})
    .n("Route53DomainsClient", "GetContactReachabilityStatusCommand")
    .f(void 0, void 0)
    .ser(se_GetContactReachabilityStatusCommand)
    .de(de_GetContactReachabilityStatusCommand)
    .build() {
}
