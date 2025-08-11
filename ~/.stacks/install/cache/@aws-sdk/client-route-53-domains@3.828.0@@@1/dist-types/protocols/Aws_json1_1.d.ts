import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@smithy/protocol-http";
import { SerdeContext as __SerdeContext } from "@smithy/types";
import { AcceptDomainTransferFromAnotherAwsAccountCommandInput, AcceptDomainTransferFromAnotherAwsAccountCommandOutput } from "../commands/AcceptDomainTransferFromAnotherAwsAccountCommand";
import { AssociateDelegationSignerToDomainCommandInput, AssociateDelegationSignerToDomainCommandOutput } from "../commands/AssociateDelegationSignerToDomainCommand";
import { CancelDomainTransferToAnotherAwsAccountCommandInput, CancelDomainTransferToAnotherAwsAccountCommandOutput } from "../commands/CancelDomainTransferToAnotherAwsAccountCommand";
import { CheckDomainAvailabilityCommandInput, CheckDomainAvailabilityCommandOutput } from "../commands/CheckDomainAvailabilityCommand";
import { CheckDomainTransferabilityCommandInput, CheckDomainTransferabilityCommandOutput } from "../commands/CheckDomainTransferabilityCommand";
import { DeleteDomainCommandInput, DeleteDomainCommandOutput } from "../commands/DeleteDomainCommand";
import { DeleteTagsForDomainCommandInput, DeleteTagsForDomainCommandOutput } from "../commands/DeleteTagsForDomainCommand";
import { DisableDomainAutoRenewCommandInput, DisableDomainAutoRenewCommandOutput } from "../commands/DisableDomainAutoRenewCommand";
import { DisableDomainTransferLockCommandInput, DisableDomainTransferLockCommandOutput } from "../commands/DisableDomainTransferLockCommand";
import { DisassociateDelegationSignerFromDomainCommandInput, DisassociateDelegationSignerFromDomainCommandOutput } from "../commands/DisassociateDelegationSignerFromDomainCommand";
import { EnableDomainAutoRenewCommandInput, EnableDomainAutoRenewCommandOutput } from "../commands/EnableDomainAutoRenewCommand";
import { EnableDomainTransferLockCommandInput, EnableDomainTransferLockCommandOutput } from "../commands/EnableDomainTransferLockCommand";
import { GetContactReachabilityStatusCommandInput, GetContactReachabilityStatusCommandOutput } from "../commands/GetContactReachabilityStatusCommand";
import { GetDomainDetailCommandInput, GetDomainDetailCommandOutput } from "../commands/GetDomainDetailCommand";
import { GetDomainSuggestionsCommandInput, GetDomainSuggestionsCommandOutput } from "../commands/GetDomainSuggestionsCommand";
import { GetOperationDetailCommandInput, GetOperationDetailCommandOutput } from "../commands/GetOperationDetailCommand";
import { ListDomainsCommandInput, ListDomainsCommandOutput } from "../commands/ListDomainsCommand";
import { ListOperationsCommandInput, ListOperationsCommandOutput } from "../commands/ListOperationsCommand";
import { ListPricesCommandInput, ListPricesCommandOutput } from "../commands/ListPricesCommand";
import { ListTagsForDomainCommandInput, ListTagsForDomainCommandOutput } from "../commands/ListTagsForDomainCommand";
import { PushDomainCommandInput, PushDomainCommandOutput } from "../commands/PushDomainCommand";
import { RegisterDomainCommandInput, RegisterDomainCommandOutput } from "../commands/RegisterDomainCommand";
import { RejectDomainTransferFromAnotherAwsAccountCommandInput, RejectDomainTransferFromAnotherAwsAccountCommandOutput } from "../commands/RejectDomainTransferFromAnotherAwsAccountCommand";
import { RenewDomainCommandInput, RenewDomainCommandOutput } from "../commands/RenewDomainCommand";
import { ResendContactReachabilityEmailCommandInput, ResendContactReachabilityEmailCommandOutput } from "../commands/ResendContactReachabilityEmailCommand";
import { ResendOperationAuthorizationCommandInput, ResendOperationAuthorizationCommandOutput } from "../commands/ResendOperationAuthorizationCommand";
import { RetrieveDomainAuthCodeCommandInput, RetrieveDomainAuthCodeCommandOutput } from "../commands/RetrieveDomainAuthCodeCommand";
import { TransferDomainCommandInput, TransferDomainCommandOutput } from "../commands/TransferDomainCommand";
import { TransferDomainToAnotherAwsAccountCommandInput, TransferDomainToAnotherAwsAccountCommandOutput } from "../commands/TransferDomainToAnotherAwsAccountCommand";
import { UpdateDomainContactCommandInput, UpdateDomainContactCommandOutput } from "../commands/UpdateDomainContactCommand";
import { UpdateDomainContactPrivacyCommandInput, UpdateDomainContactPrivacyCommandOutput } from "../commands/UpdateDomainContactPrivacyCommand";
import { UpdateDomainNameserversCommandInput, UpdateDomainNameserversCommandOutput } from "../commands/UpdateDomainNameserversCommand";
import { UpdateTagsForDomainCommandInput, UpdateTagsForDomainCommandOutput } from "../commands/UpdateTagsForDomainCommand";
import { ViewBillingCommandInput, ViewBillingCommandOutput } from "../commands/ViewBillingCommand";
/**
 * serializeAws_json1_1AcceptDomainTransferFromAnotherAwsAccountCommand
 */
export declare const se_AcceptDomainTransferFromAnotherAwsAccountCommand: (input: AcceptDomainTransferFromAnotherAwsAccountCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1AssociateDelegationSignerToDomainCommand
 */
export declare const se_AssociateDelegationSignerToDomainCommand: (input: AssociateDelegationSignerToDomainCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1CancelDomainTransferToAnotherAwsAccountCommand
 */
export declare const se_CancelDomainTransferToAnotherAwsAccountCommand: (input: CancelDomainTransferToAnotherAwsAccountCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1CheckDomainAvailabilityCommand
 */
export declare const se_CheckDomainAvailabilityCommand: (input: CheckDomainAvailabilityCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1CheckDomainTransferabilityCommand
 */
export declare const se_CheckDomainTransferabilityCommand: (input: CheckDomainTransferabilityCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1DeleteDomainCommand
 */
export declare const se_DeleteDomainCommand: (input: DeleteDomainCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1DeleteTagsForDomainCommand
 */
export declare const se_DeleteTagsForDomainCommand: (input: DeleteTagsForDomainCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1DisableDomainAutoRenewCommand
 */
export declare const se_DisableDomainAutoRenewCommand: (input: DisableDomainAutoRenewCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1DisableDomainTransferLockCommand
 */
export declare const se_DisableDomainTransferLockCommand: (input: DisableDomainTransferLockCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1DisassociateDelegationSignerFromDomainCommand
 */
export declare const se_DisassociateDelegationSignerFromDomainCommand: (input: DisassociateDelegationSignerFromDomainCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1EnableDomainAutoRenewCommand
 */
export declare const se_EnableDomainAutoRenewCommand: (input: EnableDomainAutoRenewCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1EnableDomainTransferLockCommand
 */
export declare const se_EnableDomainTransferLockCommand: (input: EnableDomainTransferLockCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1GetContactReachabilityStatusCommand
 */
export declare const se_GetContactReachabilityStatusCommand: (input: GetContactReachabilityStatusCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1GetDomainDetailCommand
 */
export declare const se_GetDomainDetailCommand: (input: GetDomainDetailCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1GetDomainSuggestionsCommand
 */
export declare const se_GetDomainSuggestionsCommand: (input: GetDomainSuggestionsCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1GetOperationDetailCommand
 */
export declare const se_GetOperationDetailCommand: (input: GetOperationDetailCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1ListDomainsCommand
 */
export declare const se_ListDomainsCommand: (input: ListDomainsCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1ListOperationsCommand
 */
export declare const se_ListOperationsCommand: (input: ListOperationsCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1ListPricesCommand
 */
export declare const se_ListPricesCommand: (input: ListPricesCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1ListTagsForDomainCommand
 */
export declare const se_ListTagsForDomainCommand: (input: ListTagsForDomainCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1PushDomainCommand
 */
export declare const se_PushDomainCommand: (input: PushDomainCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1RegisterDomainCommand
 */
export declare const se_RegisterDomainCommand: (input: RegisterDomainCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1RejectDomainTransferFromAnotherAwsAccountCommand
 */
export declare const se_RejectDomainTransferFromAnotherAwsAccountCommand: (input: RejectDomainTransferFromAnotherAwsAccountCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1RenewDomainCommand
 */
export declare const se_RenewDomainCommand: (input: RenewDomainCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1ResendContactReachabilityEmailCommand
 */
export declare const se_ResendContactReachabilityEmailCommand: (input: ResendContactReachabilityEmailCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1ResendOperationAuthorizationCommand
 */
export declare const se_ResendOperationAuthorizationCommand: (input: ResendOperationAuthorizationCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1RetrieveDomainAuthCodeCommand
 */
export declare const se_RetrieveDomainAuthCodeCommand: (input: RetrieveDomainAuthCodeCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1TransferDomainCommand
 */
export declare const se_TransferDomainCommand: (input: TransferDomainCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1TransferDomainToAnotherAwsAccountCommand
 */
export declare const se_TransferDomainToAnotherAwsAccountCommand: (input: TransferDomainToAnotherAwsAccountCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1UpdateDomainContactCommand
 */
export declare const se_UpdateDomainContactCommand: (input: UpdateDomainContactCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1UpdateDomainContactPrivacyCommand
 */
export declare const se_UpdateDomainContactPrivacyCommand: (input: UpdateDomainContactPrivacyCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1UpdateDomainNameserversCommand
 */
export declare const se_UpdateDomainNameserversCommand: (input: UpdateDomainNameserversCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1UpdateTagsForDomainCommand
 */
export declare const se_UpdateTagsForDomainCommand: (input: UpdateTagsForDomainCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_1ViewBillingCommand
 */
export declare const se_ViewBillingCommand: (input: ViewBillingCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * deserializeAws_json1_1AcceptDomainTransferFromAnotherAwsAccountCommand
 */
export declare const de_AcceptDomainTransferFromAnotherAwsAccountCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<AcceptDomainTransferFromAnotherAwsAccountCommandOutput>;
/**
 * deserializeAws_json1_1AssociateDelegationSignerToDomainCommand
 */
export declare const de_AssociateDelegationSignerToDomainCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<AssociateDelegationSignerToDomainCommandOutput>;
/**
 * deserializeAws_json1_1CancelDomainTransferToAnotherAwsAccountCommand
 */
export declare const de_CancelDomainTransferToAnotherAwsAccountCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<CancelDomainTransferToAnotherAwsAccountCommandOutput>;
/**
 * deserializeAws_json1_1CheckDomainAvailabilityCommand
 */
export declare const de_CheckDomainAvailabilityCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<CheckDomainAvailabilityCommandOutput>;
/**
 * deserializeAws_json1_1CheckDomainTransferabilityCommand
 */
export declare const de_CheckDomainTransferabilityCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<CheckDomainTransferabilityCommandOutput>;
/**
 * deserializeAws_json1_1DeleteDomainCommand
 */
export declare const de_DeleteDomainCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<DeleteDomainCommandOutput>;
/**
 * deserializeAws_json1_1DeleteTagsForDomainCommand
 */
export declare const de_DeleteTagsForDomainCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<DeleteTagsForDomainCommandOutput>;
/**
 * deserializeAws_json1_1DisableDomainAutoRenewCommand
 */
export declare const de_DisableDomainAutoRenewCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<DisableDomainAutoRenewCommandOutput>;
/**
 * deserializeAws_json1_1DisableDomainTransferLockCommand
 */
export declare const de_DisableDomainTransferLockCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<DisableDomainTransferLockCommandOutput>;
/**
 * deserializeAws_json1_1DisassociateDelegationSignerFromDomainCommand
 */
export declare const de_DisassociateDelegationSignerFromDomainCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<DisassociateDelegationSignerFromDomainCommandOutput>;
/**
 * deserializeAws_json1_1EnableDomainAutoRenewCommand
 */
export declare const de_EnableDomainAutoRenewCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<EnableDomainAutoRenewCommandOutput>;
/**
 * deserializeAws_json1_1EnableDomainTransferLockCommand
 */
export declare const de_EnableDomainTransferLockCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<EnableDomainTransferLockCommandOutput>;
/**
 * deserializeAws_json1_1GetContactReachabilityStatusCommand
 */
export declare const de_GetContactReachabilityStatusCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<GetContactReachabilityStatusCommandOutput>;
/**
 * deserializeAws_json1_1GetDomainDetailCommand
 */
export declare const de_GetDomainDetailCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<GetDomainDetailCommandOutput>;
/**
 * deserializeAws_json1_1GetDomainSuggestionsCommand
 */
export declare const de_GetDomainSuggestionsCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<GetDomainSuggestionsCommandOutput>;
/**
 * deserializeAws_json1_1GetOperationDetailCommand
 */
export declare const de_GetOperationDetailCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<GetOperationDetailCommandOutput>;
/**
 * deserializeAws_json1_1ListDomainsCommand
 */
export declare const de_ListDomainsCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ListDomainsCommandOutput>;
/**
 * deserializeAws_json1_1ListOperationsCommand
 */
export declare const de_ListOperationsCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ListOperationsCommandOutput>;
/**
 * deserializeAws_json1_1ListPricesCommand
 */
export declare const de_ListPricesCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ListPricesCommandOutput>;
/**
 * deserializeAws_json1_1ListTagsForDomainCommand
 */
export declare const de_ListTagsForDomainCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ListTagsForDomainCommandOutput>;
/**
 * deserializeAws_json1_1PushDomainCommand
 */
export declare const de_PushDomainCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<PushDomainCommandOutput>;
/**
 * deserializeAws_json1_1RegisterDomainCommand
 */
export declare const de_RegisterDomainCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<RegisterDomainCommandOutput>;
/**
 * deserializeAws_json1_1RejectDomainTransferFromAnotherAwsAccountCommand
 */
export declare const de_RejectDomainTransferFromAnotherAwsAccountCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<RejectDomainTransferFromAnotherAwsAccountCommandOutput>;
/**
 * deserializeAws_json1_1RenewDomainCommand
 */
export declare const de_RenewDomainCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<RenewDomainCommandOutput>;
/**
 * deserializeAws_json1_1ResendContactReachabilityEmailCommand
 */
export declare const de_ResendContactReachabilityEmailCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ResendContactReachabilityEmailCommandOutput>;
/**
 * deserializeAws_json1_1ResendOperationAuthorizationCommand
 */
export declare const de_ResendOperationAuthorizationCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ResendOperationAuthorizationCommandOutput>;
/**
 * deserializeAws_json1_1RetrieveDomainAuthCodeCommand
 */
export declare const de_RetrieveDomainAuthCodeCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<RetrieveDomainAuthCodeCommandOutput>;
/**
 * deserializeAws_json1_1TransferDomainCommand
 */
export declare const de_TransferDomainCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<TransferDomainCommandOutput>;
/**
 * deserializeAws_json1_1TransferDomainToAnotherAwsAccountCommand
 */
export declare const de_TransferDomainToAnotherAwsAccountCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<TransferDomainToAnotherAwsAccountCommandOutput>;
/**
 * deserializeAws_json1_1UpdateDomainContactCommand
 */
export declare const de_UpdateDomainContactCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<UpdateDomainContactCommandOutput>;
/**
 * deserializeAws_json1_1UpdateDomainContactPrivacyCommand
 */
export declare const de_UpdateDomainContactPrivacyCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<UpdateDomainContactPrivacyCommandOutput>;
/**
 * deserializeAws_json1_1UpdateDomainNameserversCommand
 */
export declare const de_UpdateDomainNameserversCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<UpdateDomainNameserversCommandOutput>;
/**
 * deserializeAws_json1_1UpdateTagsForDomainCommand
 */
export declare const de_UpdateTagsForDomainCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<UpdateTagsForDomainCommandOutput>;
/**
 * deserializeAws_json1_1ViewBillingCommand
 */
export declare const de_ViewBillingCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ViewBillingCommandOutput>;
