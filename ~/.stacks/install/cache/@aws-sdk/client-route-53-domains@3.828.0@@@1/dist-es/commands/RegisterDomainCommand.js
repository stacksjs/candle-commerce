import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { RegisterDomainRequestFilterSensitiveLog, } from "../models/models_0";
import { de_RegisterDomainCommand, se_RegisterDomainCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class RegisterDomainCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "RegisterDomain", {})
    .n("Route53DomainsClient", "RegisterDomainCommand")
    .f(RegisterDomainRequestFilterSensitiveLog, void 0)
    .ser(se_RegisterDomainCommand)
    .de(de_RegisterDomainCommand)
    .build() {
}
