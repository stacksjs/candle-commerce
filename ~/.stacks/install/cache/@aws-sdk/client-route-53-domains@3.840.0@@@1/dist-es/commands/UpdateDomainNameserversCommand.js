import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { UpdateDomainNameserversRequestFilterSensitiveLog, } from "../models/models_0";
import { de_UpdateDomainNameserversCommand, se_UpdateDomainNameserversCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class UpdateDomainNameserversCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "UpdateDomainNameservers", {})
    .n("Route53DomainsClient", "UpdateDomainNameserversCommand")
    .f(UpdateDomainNameserversRequestFilterSensitiveLog, void 0)
    .ser(se_UpdateDomainNameserversCommand)
    .de(de_UpdateDomainNameserversCommand)
    .build() {
}
