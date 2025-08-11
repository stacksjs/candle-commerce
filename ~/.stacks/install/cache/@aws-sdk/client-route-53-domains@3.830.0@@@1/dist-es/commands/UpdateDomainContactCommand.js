import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { UpdateDomainContactRequestFilterSensitiveLog, } from "../models/models_0";
import { de_UpdateDomainContactCommand, se_UpdateDomainContactCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class UpdateDomainContactCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "UpdateDomainContact", {})
    .n("Route53DomainsClient", "UpdateDomainContactCommand")
    .f(UpdateDomainContactRequestFilterSensitiveLog, void 0)
    .ser(se_UpdateDomainContactCommand)
    .de(de_UpdateDomainContactCommand)
    .build() {
}
