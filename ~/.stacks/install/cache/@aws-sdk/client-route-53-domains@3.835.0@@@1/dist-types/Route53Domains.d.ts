import { HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import { AcceptDomainTransferFromAnotherAwsAccountCommandInput, AcceptDomainTransferFromAnotherAwsAccountCommandOutput } from "./commands/AcceptDomainTransferFromAnotherAwsAccountCommand";
import { AssociateDelegationSignerToDomainCommandInput, AssociateDelegationSignerToDomainCommandOutput } from "./commands/AssociateDelegationSignerToDomainCommand";
import { CancelDomainTransferToAnotherAwsAccountCommandInput, CancelDomainTransferToAnotherAwsAccountCommandOutput } from "./commands/CancelDomainTransferToAnotherAwsAccountCommand";
import { CheckDomainAvailabilityCommandInput, CheckDomainAvailabilityCommandOutput } from "./commands/CheckDomainAvailabilityCommand";
import { CheckDomainTransferabilityCommandInput, CheckDomainTransferabilityCommandOutput } from "./commands/CheckDomainTransferabilityCommand";
import { DeleteDomainCommandInput, DeleteDomainCommandOutput } from "./commands/DeleteDomainCommand";
import { DeleteTagsForDomainCommandInput, DeleteTagsForDomainCommandOutput } from "./commands/DeleteTagsForDomainCommand";
import { DisableDomainAutoRenewCommandInput, DisableDomainAutoRenewCommandOutput } from "./commands/DisableDomainAutoRenewCommand";
import { DisableDomainTransferLockCommandInput, DisableDomainTransferLockCommandOutput } from "./commands/DisableDomainTransferLockCommand";
import { DisassociateDelegationSignerFromDomainCommandInput, DisassociateDelegationSignerFromDomainCommandOutput } from "./commands/DisassociateDelegationSignerFromDomainCommand";
import { EnableDomainAutoRenewCommandInput, EnableDomainAutoRenewCommandOutput } from "./commands/EnableDomainAutoRenewCommand";
import { EnableDomainTransferLockCommandInput, EnableDomainTransferLockCommandOutput } from "./commands/EnableDomainTransferLockCommand";
import { GetContactReachabilityStatusCommandInput, GetContactReachabilityStatusCommandOutput } from "./commands/GetContactReachabilityStatusCommand";
import { GetDomainDetailCommandInput, GetDomainDetailCommandOutput } from "./commands/GetDomainDetailCommand";
import { GetDomainSuggestionsCommandInput, GetDomainSuggestionsCommandOutput } from "./commands/GetDomainSuggestionsCommand";
import { GetOperationDetailCommandInput, GetOperationDetailCommandOutput } from "./commands/GetOperationDetailCommand";
import { ListDomainsCommandInput, ListDomainsCommandOutput } from "./commands/ListDomainsCommand";
import { ListOperationsCommandInput, ListOperationsCommandOutput } from "./commands/ListOperationsCommand";
import { ListPricesCommandInput, ListPricesCommandOutput } from "./commands/ListPricesCommand";
import { ListTagsForDomainCommandInput, ListTagsForDomainCommandOutput } from "./commands/ListTagsForDomainCommand";
import { PushDomainCommandInput, PushDomainCommandOutput } from "./commands/PushDomainCommand";
import { RegisterDomainCommandInput, RegisterDomainCommandOutput } from "./commands/RegisterDomainCommand";
import { RejectDomainTransferFromAnotherAwsAccountCommandInput, RejectDomainTransferFromAnotherAwsAccountCommandOutput } from "./commands/RejectDomainTransferFromAnotherAwsAccountCommand";
import { RenewDomainCommandInput, RenewDomainCommandOutput } from "./commands/RenewDomainCommand";
import { ResendContactReachabilityEmailCommandInput, ResendContactReachabilityEmailCommandOutput } from "./commands/ResendContactReachabilityEmailCommand";
import { ResendOperationAuthorizationCommandInput, ResendOperationAuthorizationCommandOutput } from "./commands/ResendOperationAuthorizationCommand";
import { RetrieveDomainAuthCodeCommandInput, RetrieveDomainAuthCodeCommandOutput } from "./commands/RetrieveDomainAuthCodeCommand";
import { TransferDomainCommandInput, TransferDomainCommandOutput } from "./commands/TransferDomainCommand";
import { TransferDomainToAnotherAwsAccountCommandInput, TransferDomainToAnotherAwsAccountCommandOutput } from "./commands/TransferDomainToAnotherAwsAccountCommand";
import { UpdateDomainContactCommandInput, UpdateDomainContactCommandOutput } from "./commands/UpdateDomainContactCommand";
import { UpdateDomainContactPrivacyCommandInput, UpdateDomainContactPrivacyCommandOutput } from "./commands/UpdateDomainContactPrivacyCommand";
import { UpdateDomainNameserversCommandInput, UpdateDomainNameserversCommandOutput } from "./commands/UpdateDomainNameserversCommand";
import { UpdateTagsForDomainCommandInput, UpdateTagsForDomainCommandOutput } from "./commands/UpdateTagsForDomainCommand";
import { ViewBillingCommandInput, ViewBillingCommandOutput } from "./commands/ViewBillingCommand";
import { Route53DomainsClient } from "./Route53DomainsClient";
export interface Route53Domains {
    /**
     * @see {@link AcceptDomainTransferFromAnotherAwsAccountCommand}
     */
    acceptDomainTransferFromAnotherAwsAccount(args: AcceptDomainTransferFromAnotherAwsAccountCommandInput, options?: __HttpHandlerOptions): Promise<AcceptDomainTransferFromAnotherAwsAccountCommandOutput>;
    acceptDomainTransferFromAnotherAwsAccount(args: AcceptDomainTransferFromAnotherAwsAccountCommandInput, cb: (err: any, data?: AcceptDomainTransferFromAnotherAwsAccountCommandOutput) => void): void;
    acceptDomainTransferFromAnotherAwsAccount(args: AcceptDomainTransferFromAnotherAwsAccountCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: AcceptDomainTransferFromAnotherAwsAccountCommandOutput) => void): void;
    /**
     * @see {@link AssociateDelegationSignerToDomainCommand}
     */
    associateDelegationSignerToDomain(args: AssociateDelegationSignerToDomainCommandInput, options?: __HttpHandlerOptions): Promise<AssociateDelegationSignerToDomainCommandOutput>;
    associateDelegationSignerToDomain(args: AssociateDelegationSignerToDomainCommandInput, cb: (err: any, data?: AssociateDelegationSignerToDomainCommandOutput) => void): void;
    associateDelegationSignerToDomain(args: AssociateDelegationSignerToDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: AssociateDelegationSignerToDomainCommandOutput) => void): void;
    /**
     * @see {@link CancelDomainTransferToAnotherAwsAccountCommand}
     */
    cancelDomainTransferToAnotherAwsAccount(args: CancelDomainTransferToAnotherAwsAccountCommandInput, options?: __HttpHandlerOptions): Promise<CancelDomainTransferToAnotherAwsAccountCommandOutput>;
    cancelDomainTransferToAnotherAwsAccount(args: CancelDomainTransferToAnotherAwsAccountCommandInput, cb: (err: any, data?: CancelDomainTransferToAnotherAwsAccountCommandOutput) => void): void;
    cancelDomainTransferToAnotherAwsAccount(args: CancelDomainTransferToAnotherAwsAccountCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CancelDomainTransferToAnotherAwsAccountCommandOutput) => void): void;
    /**
     * @see {@link CheckDomainAvailabilityCommand}
     */
    checkDomainAvailability(args: CheckDomainAvailabilityCommandInput, options?: __HttpHandlerOptions): Promise<CheckDomainAvailabilityCommandOutput>;
    checkDomainAvailability(args: CheckDomainAvailabilityCommandInput, cb: (err: any, data?: CheckDomainAvailabilityCommandOutput) => void): void;
    checkDomainAvailability(args: CheckDomainAvailabilityCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CheckDomainAvailabilityCommandOutput) => void): void;
    /**
     * @see {@link CheckDomainTransferabilityCommand}
     */
    checkDomainTransferability(args: CheckDomainTransferabilityCommandInput, options?: __HttpHandlerOptions): Promise<CheckDomainTransferabilityCommandOutput>;
    checkDomainTransferability(args: CheckDomainTransferabilityCommandInput, cb: (err: any, data?: CheckDomainTransferabilityCommandOutput) => void): void;
    checkDomainTransferability(args: CheckDomainTransferabilityCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CheckDomainTransferabilityCommandOutput) => void): void;
    /**
     * @see {@link DeleteDomainCommand}
     */
    deleteDomain(args: DeleteDomainCommandInput, options?: __HttpHandlerOptions): Promise<DeleteDomainCommandOutput>;
    deleteDomain(args: DeleteDomainCommandInput, cb: (err: any, data?: DeleteDomainCommandOutput) => void): void;
    deleteDomain(args: DeleteDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteDomainCommandOutput) => void): void;
    /**
     * @see {@link DeleteTagsForDomainCommand}
     */
    deleteTagsForDomain(args: DeleteTagsForDomainCommandInput, options?: __HttpHandlerOptions): Promise<DeleteTagsForDomainCommandOutput>;
    deleteTagsForDomain(args: DeleteTagsForDomainCommandInput, cb: (err: any, data?: DeleteTagsForDomainCommandOutput) => void): void;
    deleteTagsForDomain(args: DeleteTagsForDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteTagsForDomainCommandOutput) => void): void;
    /**
     * @see {@link DisableDomainAutoRenewCommand}
     */
    disableDomainAutoRenew(args: DisableDomainAutoRenewCommandInput, options?: __HttpHandlerOptions): Promise<DisableDomainAutoRenewCommandOutput>;
    disableDomainAutoRenew(args: DisableDomainAutoRenewCommandInput, cb: (err: any, data?: DisableDomainAutoRenewCommandOutput) => void): void;
    disableDomainAutoRenew(args: DisableDomainAutoRenewCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DisableDomainAutoRenewCommandOutput) => void): void;
    /**
     * @see {@link DisableDomainTransferLockCommand}
     */
    disableDomainTransferLock(args: DisableDomainTransferLockCommandInput, options?: __HttpHandlerOptions): Promise<DisableDomainTransferLockCommandOutput>;
    disableDomainTransferLock(args: DisableDomainTransferLockCommandInput, cb: (err: any, data?: DisableDomainTransferLockCommandOutput) => void): void;
    disableDomainTransferLock(args: DisableDomainTransferLockCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DisableDomainTransferLockCommandOutput) => void): void;
    /**
     * @see {@link DisassociateDelegationSignerFromDomainCommand}
     */
    disassociateDelegationSignerFromDomain(args: DisassociateDelegationSignerFromDomainCommandInput, options?: __HttpHandlerOptions): Promise<DisassociateDelegationSignerFromDomainCommandOutput>;
    disassociateDelegationSignerFromDomain(args: DisassociateDelegationSignerFromDomainCommandInput, cb: (err: any, data?: DisassociateDelegationSignerFromDomainCommandOutput) => void): void;
    disassociateDelegationSignerFromDomain(args: DisassociateDelegationSignerFromDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DisassociateDelegationSignerFromDomainCommandOutput) => void): void;
    /**
     * @see {@link EnableDomainAutoRenewCommand}
     */
    enableDomainAutoRenew(args: EnableDomainAutoRenewCommandInput, options?: __HttpHandlerOptions): Promise<EnableDomainAutoRenewCommandOutput>;
    enableDomainAutoRenew(args: EnableDomainAutoRenewCommandInput, cb: (err: any, data?: EnableDomainAutoRenewCommandOutput) => void): void;
    enableDomainAutoRenew(args: EnableDomainAutoRenewCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: EnableDomainAutoRenewCommandOutput) => void): void;
    /**
     * @see {@link EnableDomainTransferLockCommand}
     */
    enableDomainTransferLock(args: EnableDomainTransferLockCommandInput, options?: __HttpHandlerOptions): Promise<EnableDomainTransferLockCommandOutput>;
    enableDomainTransferLock(args: EnableDomainTransferLockCommandInput, cb: (err: any, data?: EnableDomainTransferLockCommandOutput) => void): void;
    enableDomainTransferLock(args: EnableDomainTransferLockCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: EnableDomainTransferLockCommandOutput) => void): void;
    /**
     * @see {@link GetContactReachabilityStatusCommand}
     */
    getContactReachabilityStatus(): Promise<GetContactReachabilityStatusCommandOutput>;
    getContactReachabilityStatus(args: GetContactReachabilityStatusCommandInput, options?: __HttpHandlerOptions): Promise<GetContactReachabilityStatusCommandOutput>;
    getContactReachabilityStatus(args: GetContactReachabilityStatusCommandInput, cb: (err: any, data?: GetContactReachabilityStatusCommandOutput) => void): void;
    getContactReachabilityStatus(args: GetContactReachabilityStatusCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetContactReachabilityStatusCommandOutput) => void): void;
    /**
     * @see {@link GetDomainDetailCommand}
     */
    getDomainDetail(args: GetDomainDetailCommandInput, options?: __HttpHandlerOptions): Promise<GetDomainDetailCommandOutput>;
    getDomainDetail(args: GetDomainDetailCommandInput, cb: (err: any, data?: GetDomainDetailCommandOutput) => void): void;
    getDomainDetail(args: GetDomainDetailCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetDomainDetailCommandOutput) => void): void;
    /**
     * @see {@link GetDomainSuggestionsCommand}
     */
    getDomainSuggestions(args: GetDomainSuggestionsCommandInput, options?: __HttpHandlerOptions): Promise<GetDomainSuggestionsCommandOutput>;
    getDomainSuggestions(args: GetDomainSuggestionsCommandInput, cb: (err: any, data?: GetDomainSuggestionsCommandOutput) => void): void;
    getDomainSuggestions(args: GetDomainSuggestionsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetDomainSuggestionsCommandOutput) => void): void;
    /**
     * @see {@link GetOperationDetailCommand}
     */
    getOperationDetail(args: GetOperationDetailCommandInput, options?: __HttpHandlerOptions): Promise<GetOperationDetailCommandOutput>;
    getOperationDetail(args: GetOperationDetailCommandInput, cb: (err: any, data?: GetOperationDetailCommandOutput) => void): void;
    getOperationDetail(args: GetOperationDetailCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetOperationDetailCommandOutput) => void): void;
    /**
     * @see {@link ListDomainsCommand}
     */
    listDomains(): Promise<ListDomainsCommandOutput>;
    listDomains(args: ListDomainsCommandInput, options?: __HttpHandlerOptions): Promise<ListDomainsCommandOutput>;
    listDomains(args: ListDomainsCommandInput, cb: (err: any, data?: ListDomainsCommandOutput) => void): void;
    listDomains(args: ListDomainsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListDomainsCommandOutput) => void): void;
    /**
     * @see {@link ListOperationsCommand}
     */
    listOperations(): Promise<ListOperationsCommandOutput>;
    listOperations(args: ListOperationsCommandInput, options?: __HttpHandlerOptions): Promise<ListOperationsCommandOutput>;
    listOperations(args: ListOperationsCommandInput, cb: (err: any, data?: ListOperationsCommandOutput) => void): void;
    listOperations(args: ListOperationsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListOperationsCommandOutput) => void): void;
    /**
     * @see {@link ListPricesCommand}
     */
    listPrices(): Promise<ListPricesCommandOutput>;
    listPrices(args: ListPricesCommandInput, options?: __HttpHandlerOptions): Promise<ListPricesCommandOutput>;
    listPrices(args: ListPricesCommandInput, cb: (err: any, data?: ListPricesCommandOutput) => void): void;
    listPrices(args: ListPricesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListPricesCommandOutput) => void): void;
    /**
     * @see {@link ListTagsForDomainCommand}
     */
    listTagsForDomain(args: ListTagsForDomainCommandInput, options?: __HttpHandlerOptions): Promise<ListTagsForDomainCommandOutput>;
    listTagsForDomain(args: ListTagsForDomainCommandInput, cb: (err: any, data?: ListTagsForDomainCommandOutput) => void): void;
    listTagsForDomain(args: ListTagsForDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListTagsForDomainCommandOutput) => void): void;
    /**
     * @see {@link PushDomainCommand}
     */
    pushDomain(args: PushDomainCommandInput, options?: __HttpHandlerOptions): Promise<PushDomainCommandOutput>;
    pushDomain(args: PushDomainCommandInput, cb: (err: any, data?: PushDomainCommandOutput) => void): void;
    pushDomain(args: PushDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PushDomainCommandOutput) => void): void;
    /**
     * @see {@link RegisterDomainCommand}
     */
    registerDomain(args: RegisterDomainCommandInput, options?: __HttpHandlerOptions): Promise<RegisterDomainCommandOutput>;
    registerDomain(args: RegisterDomainCommandInput, cb: (err: any, data?: RegisterDomainCommandOutput) => void): void;
    registerDomain(args: RegisterDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: RegisterDomainCommandOutput) => void): void;
    /**
     * @see {@link RejectDomainTransferFromAnotherAwsAccountCommand}
     */
    rejectDomainTransferFromAnotherAwsAccount(args: RejectDomainTransferFromAnotherAwsAccountCommandInput, options?: __HttpHandlerOptions): Promise<RejectDomainTransferFromAnotherAwsAccountCommandOutput>;
    rejectDomainTransferFromAnotherAwsAccount(args: RejectDomainTransferFromAnotherAwsAccountCommandInput, cb: (err: any, data?: RejectDomainTransferFromAnotherAwsAccountCommandOutput) => void): void;
    rejectDomainTransferFromAnotherAwsAccount(args: RejectDomainTransferFromAnotherAwsAccountCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: RejectDomainTransferFromAnotherAwsAccountCommandOutput) => void): void;
    /**
     * @see {@link RenewDomainCommand}
     */
    renewDomain(args: RenewDomainCommandInput, options?: __HttpHandlerOptions): Promise<RenewDomainCommandOutput>;
    renewDomain(args: RenewDomainCommandInput, cb: (err: any, data?: RenewDomainCommandOutput) => void): void;
    renewDomain(args: RenewDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: RenewDomainCommandOutput) => void): void;
    /**
     * @see {@link ResendContactReachabilityEmailCommand}
     */
    resendContactReachabilityEmail(): Promise<ResendContactReachabilityEmailCommandOutput>;
    resendContactReachabilityEmail(args: ResendContactReachabilityEmailCommandInput, options?: __HttpHandlerOptions): Promise<ResendContactReachabilityEmailCommandOutput>;
    resendContactReachabilityEmail(args: ResendContactReachabilityEmailCommandInput, cb: (err: any, data?: ResendContactReachabilityEmailCommandOutput) => void): void;
    resendContactReachabilityEmail(args: ResendContactReachabilityEmailCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ResendContactReachabilityEmailCommandOutput) => void): void;
    /**
     * @see {@link ResendOperationAuthorizationCommand}
     */
    resendOperationAuthorization(args: ResendOperationAuthorizationCommandInput, options?: __HttpHandlerOptions): Promise<ResendOperationAuthorizationCommandOutput>;
    resendOperationAuthorization(args: ResendOperationAuthorizationCommandInput, cb: (err: any, data?: ResendOperationAuthorizationCommandOutput) => void): void;
    resendOperationAuthorization(args: ResendOperationAuthorizationCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ResendOperationAuthorizationCommandOutput) => void): void;
    /**
     * @see {@link RetrieveDomainAuthCodeCommand}
     */
    retrieveDomainAuthCode(args: RetrieveDomainAuthCodeCommandInput, options?: __HttpHandlerOptions): Promise<RetrieveDomainAuthCodeCommandOutput>;
    retrieveDomainAuthCode(args: RetrieveDomainAuthCodeCommandInput, cb: (err: any, data?: RetrieveDomainAuthCodeCommandOutput) => void): void;
    retrieveDomainAuthCode(args: RetrieveDomainAuthCodeCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: RetrieveDomainAuthCodeCommandOutput) => void): void;
    /**
     * @see {@link TransferDomainCommand}
     */
    transferDomain(args: TransferDomainCommandInput, options?: __HttpHandlerOptions): Promise<TransferDomainCommandOutput>;
    transferDomain(args: TransferDomainCommandInput, cb: (err: any, data?: TransferDomainCommandOutput) => void): void;
    transferDomain(args: TransferDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: TransferDomainCommandOutput) => void): void;
    /**
     * @see {@link TransferDomainToAnotherAwsAccountCommand}
     */
    transferDomainToAnotherAwsAccount(args: TransferDomainToAnotherAwsAccountCommandInput, options?: __HttpHandlerOptions): Promise<TransferDomainToAnotherAwsAccountCommandOutput>;
    transferDomainToAnotherAwsAccount(args: TransferDomainToAnotherAwsAccountCommandInput, cb: (err: any, data?: TransferDomainToAnotherAwsAccountCommandOutput) => void): void;
    transferDomainToAnotherAwsAccount(args: TransferDomainToAnotherAwsAccountCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: TransferDomainToAnotherAwsAccountCommandOutput) => void): void;
    /**
     * @see {@link UpdateDomainContactCommand}
     */
    updateDomainContact(args: UpdateDomainContactCommandInput, options?: __HttpHandlerOptions): Promise<UpdateDomainContactCommandOutput>;
    updateDomainContact(args: UpdateDomainContactCommandInput, cb: (err: any, data?: UpdateDomainContactCommandOutput) => void): void;
    updateDomainContact(args: UpdateDomainContactCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateDomainContactCommandOutput) => void): void;
    /**
     * @see {@link UpdateDomainContactPrivacyCommand}
     */
    updateDomainContactPrivacy(args: UpdateDomainContactPrivacyCommandInput, options?: __HttpHandlerOptions): Promise<UpdateDomainContactPrivacyCommandOutput>;
    updateDomainContactPrivacy(args: UpdateDomainContactPrivacyCommandInput, cb: (err: any, data?: UpdateDomainContactPrivacyCommandOutput) => void): void;
    updateDomainContactPrivacy(args: UpdateDomainContactPrivacyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateDomainContactPrivacyCommandOutput) => void): void;
    /**
     * @see {@link UpdateDomainNameserversCommand}
     */
    updateDomainNameservers(args: UpdateDomainNameserversCommandInput, options?: __HttpHandlerOptions): Promise<UpdateDomainNameserversCommandOutput>;
    updateDomainNameservers(args: UpdateDomainNameserversCommandInput, cb: (err: any, data?: UpdateDomainNameserversCommandOutput) => void): void;
    updateDomainNameservers(args: UpdateDomainNameserversCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateDomainNameserversCommandOutput) => void): void;
    /**
     * @see {@link UpdateTagsForDomainCommand}
     */
    updateTagsForDomain(args: UpdateTagsForDomainCommandInput, options?: __HttpHandlerOptions): Promise<UpdateTagsForDomainCommandOutput>;
    updateTagsForDomain(args: UpdateTagsForDomainCommandInput, cb: (err: any, data?: UpdateTagsForDomainCommandOutput) => void): void;
    updateTagsForDomain(args: UpdateTagsForDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateTagsForDomainCommandOutput) => void): void;
    /**
     * @see {@link ViewBillingCommand}
     */
    viewBilling(): Promise<ViewBillingCommandOutput>;
    viewBilling(args: ViewBillingCommandInput, options?: __HttpHandlerOptions): Promise<ViewBillingCommandOutput>;
    viewBilling(args: ViewBillingCommandInput, cb: (err: any, data?: ViewBillingCommandOutput) => void): void;
    viewBilling(args: ViewBillingCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ViewBillingCommandOutput) => void): void;
}
/**
 * <p>Amazon Route 53 API actions let you register domain names and perform related
 * 			operations.</p>
 * @public
 */
export declare class Route53Domains extends Route53DomainsClient implements Route53Domains {
}
