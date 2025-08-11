import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse,
} from "@smithy/protocol-http";
import { SerdeContext as __SerdeContext } from "@smithy/types";
import {
  AcceptDomainTransferFromAnotherAwsAccountCommandInput,
  AcceptDomainTransferFromAnotherAwsAccountCommandOutput,
} from "../commands/AcceptDomainTransferFromAnotherAwsAccountCommand";
import {
  AssociateDelegationSignerToDomainCommandInput,
  AssociateDelegationSignerToDomainCommandOutput,
} from "../commands/AssociateDelegationSignerToDomainCommand";
import {
  CancelDomainTransferToAnotherAwsAccountCommandInput,
  CancelDomainTransferToAnotherAwsAccountCommandOutput,
} from "../commands/CancelDomainTransferToAnotherAwsAccountCommand";
import {
  CheckDomainAvailabilityCommandInput,
  CheckDomainAvailabilityCommandOutput,
} from "../commands/CheckDomainAvailabilityCommand";
import {
  CheckDomainTransferabilityCommandInput,
  CheckDomainTransferabilityCommandOutput,
} from "../commands/CheckDomainTransferabilityCommand";
import {
  DeleteDomainCommandInput,
  DeleteDomainCommandOutput,
} from "../commands/DeleteDomainCommand";
import {
  DeleteTagsForDomainCommandInput,
  DeleteTagsForDomainCommandOutput,
} from "../commands/DeleteTagsForDomainCommand";
import {
  DisableDomainAutoRenewCommandInput,
  DisableDomainAutoRenewCommandOutput,
} from "../commands/DisableDomainAutoRenewCommand";
import {
  DisableDomainTransferLockCommandInput,
  DisableDomainTransferLockCommandOutput,
} from "../commands/DisableDomainTransferLockCommand";
import {
  DisassociateDelegationSignerFromDomainCommandInput,
  DisassociateDelegationSignerFromDomainCommandOutput,
} from "../commands/DisassociateDelegationSignerFromDomainCommand";
import {
  EnableDomainAutoRenewCommandInput,
  EnableDomainAutoRenewCommandOutput,
} from "../commands/EnableDomainAutoRenewCommand";
import {
  EnableDomainTransferLockCommandInput,
  EnableDomainTransferLockCommandOutput,
} from "../commands/EnableDomainTransferLockCommand";
import {
  GetContactReachabilityStatusCommandInput,
  GetContactReachabilityStatusCommandOutput,
} from "../commands/GetContactReachabilityStatusCommand";
import {
  GetDomainDetailCommandInput,
  GetDomainDetailCommandOutput,
} from "../commands/GetDomainDetailCommand";
import {
  GetDomainSuggestionsCommandInput,
  GetDomainSuggestionsCommandOutput,
} from "../commands/GetDomainSuggestionsCommand";
import {
  GetOperationDetailCommandInput,
  GetOperationDetailCommandOutput,
} from "../commands/GetOperationDetailCommand";
import {
  ListDomainsCommandInput,
  ListDomainsCommandOutput,
} from "../commands/ListDomainsCommand";
import {
  ListOperationsCommandInput,
  ListOperationsCommandOutput,
} from "../commands/ListOperationsCommand";
import {
  ListPricesCommandInput,
  ListPricesCommandOutput,
} from "../commands/ListPricesCommand";
import {
  ListTagsForDomainCommandInput,
  ListTagsForDomainCommandOutput,
} from "../commands/ListTagsForDomainCommand";
import {
  PushDomainCommandInput,
  PushDomainCommandOutput,
} from "../commands/PushDomainCommand";
import {
  RegisterDomainCommandInput,
  RegisterDomainCommandOutput,
} from "../commands/RegisterDomainCommand";
import {
  RejectDomainTransferFromAnotherAwsAccountCommandInput,
  RejectDomainTransferFromAnotherAwsAccountCommandOutput,
} from "../commands/RejectDomainTransferFromAnotherAwsAccountCommand";
import {
  RenewDomainCommandInput,
  RenewDomainCommandOutput,
} from "../commands/RenewDomainCommand";
import {
  ResendContactReachabilityEmailCommandInput,
  ResendContactReachabilityEmailCommandOutput,
} from "../commands/ResendContactReachabilityEmailCommand";
import {
  ResendOperationAuthorizationCommandInput,
  ResendOperationAuthorizationCommandOutput,
} from "../commands/ResendOperationAuthorizationCommand";
import {
  RetrieveDomainAuthCodeCommandInput,
  RetrieveDomainAuthCodeCommandOutput,
} from "../commands/RetrieveDomainAuthCodeCommand";
import {
  TransferDomainCommandInput,
  TransferDomainCommandOutput,
} from "../commands/TransferDomainCommand";
import {
  TransferDomainToAnotherAwsAccountCommandInput,
  TransferDomainToAnotherAwsAccountCommandOutput,
} from "../commands/TransferDomainToAnotherAwsAccountCommand";
import {
  UpdateDomainContactCommandInput,
  UpdateDomainContactCommandOutput,
} from "../commands/UpdateDomainContactCommand";
import {
  UpdateDomainContactPrivacyCommandInput,
  UpdateDomainContactPrivacyCommandOutput,
} from "../commands/UpdateDomainContactPrivacyCommand";
import {
  UpdateDomainNameserversCommandInput,
  UpdateDomainNameserversCommandOutput,
} from "../commands/UpdateDomainNameserversCommand";
import {
  UpdateTagsForDomainCommandInput,
  UpdateTagsForDomainCommandOutput,
} from "../commands/UpdateTagsForDomainCommand";
import {
  ViewBillingCommandInput,
  ViewBillingCommandOutput,
} from "../commands/ViewBillingCommand";
export declare const se_AcceptDomainTransferFromAnotherAwsAccountCommand: (
  input: AcceptDomainTransferFromAnotherAwsAccountCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_AssociateDelegationSignerToDomainCommand: (
  input: AssociateDelegationSignerToDomainCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CancelDomainTransferToAnotherAwsAccountCommand: (
  input: CancelDomainTransferToAnotherAwsAccountCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CheckDomainAvailabilityCommand: (
  input: CheckDomainAvailabilityCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CheckDomainTransferabilityCommand: (
  input: CheckDomainTransferabilityCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteDomainCommand: (
  input: DeleteDomainCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteTagsForDomainCommand: (
  input: DeleteTagsForDomainCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DisableDomainAutoRenewCommand: (
  input: DisableDomainAutoRenewCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DisableDomainTransferLockCommand: (
  input: DisableDomainTransferLockCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DisassociateDelegationSignerFromDomainCommand: (
  input: DisassociateDelegationSignerFromDomainCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_EnableDomainAutoRenewCommand: (
  input: EnableDomainAutoRenewCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_EnableDomainTransferLockCommand: (
  input: EnableDomainTransferLockCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetContactReachabilityStatusCommand: (
  input: GetContactReachabilityStatusCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetDomainDetailCommand: (
  input: GetDomainDetailCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetDomainSuggestionsCommand: (
  input: GetDomainSuggestionsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetOperationDetailCommand: (
  input: GetOperationDetailCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListDomainsCommand: (
  input: ListDomainsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListOperationsCommand: (
  input: ListOperationsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListPricesCommand: (
  input: ListPricesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListTagsForDomainCommand: (
  input: ListTagsForDomainCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_PushDomainCommand: (
  input: PushDomainCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_RegisterDomainCommand: (
  input: RegisterDomainCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_RejectDomainTransferFromAnotherAwsAccountCommand: (
  input: RejectDomainTransferFromAnotherAwsAccountCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_RenewDomainCommand: (
  input: RenewDomainCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ResendContactReachabilityEmailCommand: (
  input: ResendContactReachabilityEmailCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ResendOperationAuthorizationCommand: (
  input: ResendOperationAuthorizationCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_RetrieveDomainAuthCodeCommand: (
  input: RetrieveDomainAuthCodeCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_TransferDomainCommand: (
  input: TransferDomainCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_TransferDomainToAnotherAwsAccountCommand: (
  input: TransferDomainToAnotherAwsAccountCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UpdateDomainContactCommand: (
  input: UpdateDomainContactCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UpdateDomainContactPrivacyCommand: (
  input: UpdateDomainContactPrivacyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UpdateDomainNameserversCommand: (
  input: UpdateDomainNameserversCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UpdateTagsForDomainCommand: (
  input: UpdateTagsForDomainCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ViewBillingCommand: (
  input: ViewBillingCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const de_AcceptDomainTransferFromAnotherAwsAccountCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<AcceptDomainTransferFromAnotherAwsAccountCommandOutput>;
export declare const de_AssociateDelegationSignerToDomainCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<AssociateDelegationSignerToDomainCommandOutput>;
export declare const de_CancelDomainTransferToAnotherAwsAccountCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CancelDomainTransferToAnotherAwsAccountCommandOutput>;
export declare const de_CheckDomainAvailabilityCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CheckDomainAvailabilityCommandOutput>;
export declare const de_CheckDomainTransferabilityCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CheckDomainTransferabilityCommandOutput>;
export declare const de_DeleteDomainCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteDomainCommandOutput>;
export declare const de_DeleteTagsForDomainCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteTagsForDomainCommandOutput>;
export declare const de_DisableDomainAutoRenewCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DisableDomainAutoRenewCommandOutput>;
export declare const de_DisableDomainTransferLockCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DisableDomainTransferLockCommandOutput>;
export declare const de_DisassociateDelegationSignerFromDomainCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DisassociateDelegationSignerFromDomainCommandOutput>;
export declare const de_EnableDomainAutoRenewCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<EnableDomainAutoRenewCommandOutput>;
export declare const de_EnableDomainTransferLockCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<EnableDomainTransferLockCommandOutput>;
export declare const de_GetContactReachabilityStatusCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetContactReachabilityStatusCommandOutput>;
export declare const de_GetDomainDetailCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetDomainDetailCommandOutput>;
export declare const de_GetDomainSuggestionsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetDomainSuggestionsCommandOutput>;
export declare const de_GetOperationDetailCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetOperationDetailCommandOutput>;
export declare const de_ListDomainsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListDomainsCommandOutput>;
export declare const de_ListOperationsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListOperationsCommandOutput>;
export declare const de_ListPricesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListPricesCommandOutput>;
export declare const de_ListTagsForDomainCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListTagsForDomainCommandOutput>;
export declare const de_PushDomainCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<PushDomainCommandOutput>;
export declare const de_RegisterDomainCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<RegisterDomainCommandOutput>;
export declare const de_RejectDomainTransferFromAnotherAwsAccountCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<RejectDomainTransferFromAnotherAwsAccountCommandOutput>;
export declare const de_RenewDomainCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<RenewDomainCommandOutput>;
export declare const de_ResendContactReachabilityEmailCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ResendContactReachabilityEmailCommandOutput>;
export declare const de_ResendOperationAuthorizationCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ResendOperationAuthorizationCommandOutput>;
export declare const de_RetrieveDomainAuthCodeCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<RetrieveDomainAuthCodeCommandOutput>;
export declare const de_TransferDomainCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<TransferDomainCommandOutput>;
export declare const de_TransferDomainToAnotherAwsAccountCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<TransferDomainToAnotherAwsAccountCommandOutput>;
export declare const de_UpdateDomainContactCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UpdateDomainContactCommandOutput>;
export declare const de_UpdateDomainContactPrivacyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UpdateDomainContactPrivacyCommandOutput>;
export declare const de_UpdateDomainNameserversCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UpdateDomainNameserversCommandOutput>;
export declare const de_UpdateTagsForDomainCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UpdateTagsForDomainCommandOutput>;
export declare const de_ViewBillingCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ViewBillingCommandOutput>;
