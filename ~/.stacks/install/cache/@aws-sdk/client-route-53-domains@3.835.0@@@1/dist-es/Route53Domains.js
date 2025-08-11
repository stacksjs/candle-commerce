import { createAggregatedClient } from "@smithy/smithy-client";
import { AcceptDomainTransferFromAnotherAwsAccountCommand, } from "./commands/AcceptDomainTransferFromAnotherAwsAccountCommand";
import { AssociateDelegationSignerToDomainCommand, } from "./commands/AssociateDelegationSignerToDomainCommand";
import { CancelDomainTransferToAnotherAwsAccountCommand, } from "./commands/CancelDomainTransferToAnotherAwsAccountCommand";
import { CheckDomainAvailabilityCommand, } from "./commands/CheckDomainAvailabilityCommand";
import { CheckDomainTransferabilityCommand, } from "./commands/CheckDomainTransferabilityCommand";
import { DeleteDomainCommand, } from "./commands/DeleteDomainCommand";
import { DeleteTagsForDomainCommand, } from "./commands/DeleteTagsForDomainCommand";
import { DisableDomainAutoRenewCommand, } from "./commands/DisableDomainAutoRenewCommand";
import { DisableDomainTransferLockCommand, } from "./commands/DisableDomainTransferLockCommand";
import { DisassociateDelegationSignerFromDomainCommand, } from "./commands/DisassociateDelegationSignerFromDomainCommand";
import { EnableDomainAutoRenewCommand, } from "./commands/EnableDomainAutoRenewCommand";
import { EnableDomainTransferLockCommand, } from "./commands/EnableDomainTransferLockCommand";
import { GetContactReachabilityStatusCommand, } from "./commands/GetContactReachabilityStatusCommand";
import { GetDomainDetailCommand, } from "./commands/GetDomainDetailCommand";
import { GetDomainSuggestionsCommand, } from "./commands/GetDomainSuggestionsCommand";
import { GetOperationDetailCommand, } from "./commands/GetOperationDetailCommand";
import { ListDomainsCommand } from "./commands/ListDomainsCommand";
import { ListOperationsCommand, } from "./commands/ListOperationsCommand";
import { ListPricesCommand } from "./commands/ListPricesCommand";
import { ListTagsForDomainCommand, } from "./commands/ListTagsForDomainCommand";
import { PushDomainCommand } from "./commands/PushDomainCommand";
import { RegisterDomainCommand, } from "./commands/RegisterDomainCommand";
import { RejectDomainTransferFromAnotherAwsAccountCommand, } from "./commands/RejectDomainTransferFromAnotherAwsAccountCommand";
import { RenewDomainCommand } from "./commands/RenewDomainCommand";
import { ResendContactReachabilityEmailCommand, } from "./commands/ResendContactReachabilityEmailCommand";
import { ResendOperationAuthorizationCommand, } from "./commands/ResendOperationAuthorizationCommand";
import { RetrieveDomainAuthCodeCommand, } from "./commands/RetrieveDomainAuthCodeCommand";
import { TransferDomainCommand, } from "./commands/TransferDomainCommand";
import { TransferDomainToAnotherAwsAccountCommand, } from "./commands/TransferDomainToAnotherAwsAccountCommand";
import { UpdateDomainContactCommand, } from "./commands/UpdateDomainContactCommand";
import { UpdateDomainContactPrivacyCommand, } from "./commands/UpdateDomainContactPrivacyCommand";
import { UpdateDomainNameserversCommand, } from "./commands/UpdateDomainNameserversCommand";
import { UpdateTagsForDomainCommand, } from "./commands/UpdateTagsForDomainCommand";
import { ViewBillingCommand } from "./commands/ViewBillingCommand";
import { Route53DomainsClient } from "./Route53DomainsClient";
const commands = {
    AcceptDomainTransferFromAnotherAwsAccountCommand,
    AssociateDelegationSignerToDomainCommand,
    CancelDomainTransferToAnotherAwsAccountCommand,
    CheckDomainAvailabilityCommand,
    CheckDomainTransferabilityCommand,
    DeleteDomainCommand,
    DeleteTagsForDomainCommand,
    DisableDomainAutoRenewCommand,
    DisableDomainTransferLockCommand,
    DisassociateDelegationSignerFromDomainCommand,
    EnableDomainAutoRenewCommand,
    EnableDomainTransferLockCommand,
    GetContactReachabilityStatusCommand,
    GetDomainDetailCommand,
    GetDomainSuggestionsCommand,
    GetOperationDetailCommand,
    ListDomainsCommand,
    ListOperationsCommand,
    ListPricesCommand,
    ListTagsForDomainCommand,
    PushDomainCommand,
    RegisterDomainCommand,
    RejectDomainTransferFromAnotherAwsAccountCommand,
    RenewDomainCommand,
    ResendContactReachabilityEmailCommand,
    ResendOperationAuthorizationCommand,
    RetrieveDomainAuthCodeCommand,
    TransferDomainCommand,
    TransferDomainToAnotherAwsAccountCommand,
    UpdateDomainContactCommand,
    UpdateDomainContactPrivacyCommand,
    UpdateDomainNameserversCommand,
    UpdateTagsForDomainCommand,
    ViewBillingCommand,
};
export class Route53Domains extends Route53DomainsClient {
}
createAggregatedClient(commands, Route53Domains);
