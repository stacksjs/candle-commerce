import { ExceptionOptionType as __ExceptionOptionType } from "@smithy/smithy-client";
import { Route53DomainsServiceException as __BaseException } from "./Route53DomainsServiceException";
export interface AcceptDomainTransferFromAnotherAwsAccountRequest {
  DomainName: string | undefined;
  Password: string | undefined;
}
export interface AcceptDomainTransferFromAnotherAwsAccountResponse {
  OperationId?: string | undefined;
}
export declare class DomainLimitExceeded extends __BaseException {
  readonly name: "DomainLimitExceeded";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<DomainLimitExceeded, __BaseException>
  );
}
export declare class InvalidInput extends __BaseException {
  readonly name: "InvalidInput";
  readonly $fault: "client";
  constructor(opts: __ExceptionOptionType<InvalidInput, __BaseException>);
}
export declare class OperationLimitExceeded extends __BaseException {
  readonly name: "OperationLimitExceeded";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<OperationLimitExceeded, __BaseException>
  );
}
export declare class UnsupportedTLD extends __BaseException {
  readonly name: "UnsupportedTLD";
  readonly $fault: "client";
  constructor(opts: __ExceptionOptionType<UnsupportedTLD, __BaseException>);
}
export interface DnssecSigningAttributes {
  Algorithm?: number | undefined;
  Flags?: number | undefined;
  PublicKey?: string | undefined;
}
export interface AssociateDelegationSignerToDomainRequest {
  DomainName: string | undefined;
  SigningAttributes: DnssecSigningAttributes | undefined;
}
export interface AssociateDelegationSignerToDomainResponse {
  OperationId?: string | undefined;
}
export declare class DnssecLimitExceeded extends __BaseException {
  readonly name: "DnssecLimitExceeded";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<DnssecLimitExceeded, __BaseException>
  );
}
export declare class DuplicateRequest extends __BaseException {
  readonly name: "DuplicateRequest";
  readonly $fault: "client";
  requestId?: string | undefined;
  constructor(opts: __ExceptionOptionType<DuplicateRequest, __BaseException>);
}
export declare class TLDRulesViolation extends __BaseException {
  readonly name: "TLDRulesViolation";
  readonly $fault: "client";
  constructor(opts: __ExceptionOptionType<TLDRulesViolation, __BaseException>);
}
export declare const OperationType: {
  readonly ADD_DNSSEC: "ADD_DNSSEC";
  readonly CHANGE_DOMAIN_OWNER: "CHANGE_DOMAIN_OWNER";
  readonly CHANGE_PRIVACY_PROTECTION: "CHANGE_PRIVACY_PROTECTION";
  readonly DELETE_DOMAIN: "DELETE_DOMAIN";
  readonly DISABLE_AUTORENEW: "DISABLE_AUTORENEW";
  readonly DOMAIN_LOCK: "DOMAIN_LOCK";
  readonly ENABLE_AUTORENEW: "ENABLE_AUTORENEW";
  readonly EXPIRE_DOMAIN: "EXPIRE_DOMAIN";
  readonly INTERNAL_TRANSFER_IN_DOMAIN: "INTERNAL_TRANSFER_IN_DOMAIN";
  readonly INTERNAL_TRANSFER_OUT_DOMAIN: "INTERNAL_TRANSFER_OUT_DOMAIN";
  readonly PUSH_DOMAIN: "PUSH_DOMAIN";
  readonly REGISTER_DOMAIN: "REGISTER_DOMAIN";
  readonly RELEASE_TO_GANDI: "RELEASE_TO_GANDI";
  readonly REMOVE_DNSSEC: "REMOVE_DNSSEC";
  readonly RENEW_DOMAIN: "RENEW_DOMAIN";
  readonly RESTORE_DOMAIN: "RESTORE_DOMAIN";
  readonly TRANSFER_IN_DOMAIN: "TRANSFER_IN_DOMAIN";
  readonly TRANSFER_ON_RENEW: "TRANSFER_ON_RENEW";
  readonly TRANSFER_OUT_DOMAIN: "TRANSFER_OUT_DOMAIN";
  readonly UPDATE_DOMAIN_CONTACT: "UPDATE_DOMAIN_CONTACT";
  readonly UPDATE_NAMESERVER: "UPDATE_NAMESERVER";
};
export type OperationType = (typeof OperationType)[keyof typeof OperationType];
export interface BillingRecord {
  DomainName?: string | undefined;
  Operation?: OperationType | undefined;
  InvoiceId?: string | undefined;
  BillDate?: Date | undefined;
  Price?: number | undefined;
}
export interface CancelDomainTransferToAnotherAwsAccountRequest {
  DomainName: string | undefined;
}
export interface CancelDomainTransferToAnotherAwsAccountResponse {
  OperationId?: string | undefined;
}
export interface CheckDomainAvailabilityRequest {
  DomainName: string | undefined;
  IdnLangCode?: string | undefined;
}
export declare const DomainAvailability: {
  readonly AVAILABLE: "AVAILABLE";
  readonly AVAILABLE_PREORDER: "AVAILABLE_PREORDER";
  readonly AVAILABLE_RESERVED: "AVAILABLE_RESERVED";
  readonly DONT_KNOW: "DONT_KNOW";
  readonly INVALID_NAME_FOR_TLD: "INVALID_NAME_FOR_TLD";
  readonly PENDING: "PENDING";
  readonly RESERVED: "RESERVED";
  readonly UNAVAILABLE: "UNAVAILABLE";
  readonly UNAVAILABLE_PREMIUM: "UNAVAILABLE_PREMIUM";
  readonly UNAVAILABLE_RESTRICTED: "UNAVAILABLE_RESTRICTED";
};
export type DomainAvailability =
  (typeof DomainAvailability)[keyof typeof DomainAvailability];
export interface CheckDomainAvailabilityResponse {
  Availability?: DomainAvailability | undefined;
}
export interface CheckDomainTransferabilityRequest {
  DomainName: string | undefined;
  AuthCode?: string | undefined;
}
export declare const Transferable: {
  readonly DOMAIN_IN_ANOTHER_ACCOUNT: "DOMAIN_IN_ANOTHER_ACCOUNT";
  readonly DOMAIN_IN_OWN_ACCOUNT: "DOMAIN_IN_OWN_ACCOUNT";
  readonly DONT_KNOW: "DONT_KNOW";
  readonly PREMIUM_DOMAIN: "PREMIUM_DOMAIN";
  readonly TRANSFERABLE: "TRANSFERABLE";
  readonly UNTRANSFERABLE: "UNTRANSFERABLE";
};
export type Transferable = (typeof Transferable)[keyof typeof Transferable];
export interface DomainTransferability {
  Transferable?: Transferable | undefined;
}
export interface CheckDomainTransferabilityResponse {
  Transferability?: DomainTransferability | undefined;
  Message?: string | undefined;
}
export interface Consent {
  MaxPrice: number | undefined;
  Currency: string | undefined;
}
export declare const ContactType: {
  readonly ASSOCIATION: "ASSOCIATION";
  readonly COMPANY: "COMPANY";
  readonly PERSON: "PERSON";
  readonly PUBLIC_BODY: "PUBLIC_BODY";
  readonly RESELLER: "RESELLER";
};
export type ContactType = (typeof ContactType)[keyof typeof ContactType];
export declare const CountryCode: {
  readonly AC: "AC";
  readonly AD: "AD";
  readonly AE: "AE";
  readonly AF: "AF";
  readonly AG: "AG";
  readonly AI: "AI";
  readonly AL: "AL";
  readonly AM: "AM";
  readonly AN: "AN";
  readonly AO: "AO";
  readonly AQ: "AQ";
  readonly AR: "AR";
  readonly AS: "AS";
  readonly AT: "AT";
  readonly AU: "AU";
  readonly AW: "AW";
  readonly AX: "AX";
  readonly AZ: "AZ";
  readonly BA: "BA";
  readonly BB: "BB";
  readonly BD: "BD";
  readonly BE: "BE";
  readonly BF: "BF";
  readonly BG: "BG";
  readonly BH: "BH";
  readonly BI: "BI";
  readonly BJ: "BJ";
  readonly BL: "BL";
  readonly BM: "BM";
  readonly BN: "BN";
  readonly BO: "BO";
  readonly BQ: "BQ";
  readonly BR: "BR";
  readonly BS: "BS";
  readonly BT: "BT";
  readonly BV: "BV";
  readonly BW: "BW";
  readonly BY: "BY";
  readonly BZ: "BZ";
  readonly CA: "CA";
  readonly CC: "CC";
  readonly CD: "CD";
  readonly CF: "CF";
  readonly CG: "CG";
  readonly CH: "CH";
  readonly CI: "CI";
  readonly CK: "CK";
  readonly CL: "CL";
  readonly CM: "CM";
  readonly CN: "CN";
  readonly CO: "CO";
  readonly CR: "CR";
  readonly CU: "CU";
  readonly CV: "CV";
  readonly CW: "CW";
  readonly CX: "CX";
  readonly CY: "CY";
  readonly CZ: "CZ";
  readonly DE: "DE";
  readonly DJ: "DJ";
  readonly DK: "DK";
  readonly DM: "DM";
  readonly DO: "DO";
  readonly DZ: "DZ";
  readonly EC: "EC";
  readonly EE: "EE";
  readonly EG: "EG";
  readonly EH: "EH";
  readonly ER: "ER";
  readonly ES: "ES";
  readonly ET: "ET";
  readonly FI: "FI";
  readonly FJ: "FJ";
  readonly FK: "FK";
  readonly FM: "FM";
  readonly FO: "FO";
  readonly FR: "FR";
  readonly GA: "GA";
  readonly GB: "GB";
  readonly GD: "GD";
  readonly GE: "GE";
  readonly GF: "GF";
  readonly GG: "GG";
  readonly GH: "GH";
  readonly GI: "GI";
  readonly GL: "GL";
  readonly GM: "GM";
  readonly GN: "GN";
  readonly GP: "GP";
  readonly GQ: "GQ";
  readonly GR: "GR";
  readonly GS: "GS";
  readonly GT: "GT";
  readonly GU: "GU";
  readonly GW: "GW";
  readonly GY: "GY";
  readonly HK: "HK";
  readonly HM: "HM";
  readonly HN: "HN";
  readonly HR: "HR";
  readonly HT: "HT";
  readonly HU: "HU";
  readonly ID: "ID";
  readonly IE: "IE";
  readonly IL: "IL";
  readonly IM: "IM";
  readonly IN: "IN";
  readonly IO: "IO";
  readonly IQ: "IQ";
  readonly IR: "IR";
  readonly IS: "IS";
  readonly IT: "IT";
  readonly JE: "JE";
  readonly JM: "JM";
  readonly JO: "JO";
  readonly JP: "JP";
  readonly KE: "KE";
  readonly KG: "KG";
  readonly KH: "KH";
  readonly KI: "KI";
  readonly KM: "KM";
  readonly KN: "KN";
  readonly KP: "KP";
  readonly KR: "KR";
  readonly KW: "KW";
  readonly KY: "KY";
  readonly KZ: "KZ";
  readonly LA: "LA";
  readonly LB: "LB";
  readonly LC: "LC";
  readonly LI: "LI";
  readonly LK: "LK";
  readonly LR: "LR";
  readonly LS: "LS";
  readonly LT: "LT";
  readonly LU: "LU";
  readonly LV: "LV";
  readonly LY: "LY";
  readonly MA: "MA";
  readonly MC: "MC";
  readonly MD: "MD";
  readonly ME: "ME";
  readonly MF: "MF";
  readonly MG: "MG";
  readonly MH: "MH";
  readonly MK: "MK";
  readonly ML: "ML";
  readonly MM: "MM";
  readonly MN: "MN";
  readonly MO: "MO";
  readonly MP: "MP";
  readonly MQ: "MQ";
  readonly MR: "MR";
  readonly MS: "MS";
  readonly MT: "MT";
  readonly MU: "MU";
  readonly MV: "MV";
  readonly MW: "MW";
  readonly MX: "MX";
  readonly MY: "MY";
  readonly MZ: "MZ";
  readonly NA: "NA";
  readonly NC: "NC";
  readonly NE: "NE";
  readonly NF: "NF";
  readonly NG: "NG";
  readonly NI: "NI";
  readonly NL: "NL";
  readonly NO: "NO";
  readonly NP: "NP";
  readonly NR: "NR";
  readonly NU: "NU";
  readonly NZ: "NZ";
  readonly OM: "OM";
  readonly PA: "PA";
  readonly PE: "PE";
  readonly PF: "PF";
  readonly PG: "PG";
  readonly PH: "PH";
  readonly PK: "PK";
  readonly PL: "PL";
  readonly PM: "PM";
  readonly PN: "PN";
  readonly PR: "PR";
  readonly PS: "PS";
  readonly PT: "PT";
  readonly PW: "PW";
  readonly PY: "PY";
  readonly QA: "QA";
  readonly RE: "RE";
  readonly RO: "RO";
  readonly RS: "RS";
  readonly RU: "RU";
  readonly RW: "RW";
  readonly SA: "SA";
  readonly SB: "SB";
  readonly SC: "SC";
  readonly SD: "SD";
  readonly SE: "SE";
  readonly SG: "SG";
  readonly SH: "SH";
  readonly SI: "SI";
  readonly SJ: "SJ";
  readonly SK: "SK";
  readonly SL: "SL";
  readonly SM: "SM";
  readonly SN: "SN";
  readonly SO: "SO";
  readonly SR: "SR";
  readonly SS: "SS";
  readonly ST: "ST";
  readonly SV: "SV";
  readonly SX: "SX";
  readonly SY: "SY";
  readonly SZ: "SZ";
  readonly TC: "TC";
  readonly TD: "TD";
  readonly TF: "TF";
  readonly TG: "TG";
  readonly TH: "TH";
  readonly TJ: "TJ";
  readonly TK: "TK";
  readonly TL: "TL";
  readonly TM: "TM";
  readonly TN: "TN";
  readonly TO: "TO";
  readonly TP: "TP";
  readonly TR: "TR";
  readonly TT: "TT";
  readonly TV: "TV";
  readonly TW: "TW";
  readonly TZ: "TZ";
  readonly UA: "UA";
  readonly UG: "UG";
  readonly US: "US";
  readonly UY: "UY";
  readonly UZ: "UZ";
  readonly VA: "VA";
  readonly VC: "VC";
  readonly VE: "VE";
  readonly VG: "VG";
  readonly VI: "VI";
  readonly VN: "VN";
  readonly VU: "VU";
  readonly WF: "WF";
  readonly WS: "WS";
  readonly YE: "YE";
  readonly YT: "YT";
  readonly ZA: "ZA";
  readonly ZM: "ZM";
  readonly ZW: "ZW";
};
export type CountryCode = (typeof CountryCode)[keyof typeof CountryCode];
export declare const ExtraParamName: {
  readonly AU_ID_NUMBER: "AU_ID_NUMBER";
  readonly AU_ID_TYPE: "AU_ID_TYPE";
  readonly AU_PRIORITY_TOKEN: "AU_PRIORITY_TOKEN";
  readonly BIRTH_CITY: "BIRTH_CITY";
  readonly BIRTH_COUNTRY: "BIRTH_COUNTRY";
  readonly BIRTH_DATE_IN_YYYY_MM_DD: "BIRTH_DATE_IN_YYYY_MM_DD";
  readonly BIRTH_DEPARTMENT: "BIRTH_DEPARTMENT";
  readonly BRAND_NUMBER: "BRAND_NUMBER";
  readonly CA_BUSINESS_ENTITY_TYPE: "CA_BUSINESS_ENTITY_TYPE";
  readonly CA_LEGAL_REPRESENTATIVE: "CA_LEGAL_REPRESENTATIVE";
  readonly CA_LEGAL_REPRESENTATIVE_CAPACITY: "CA_LEGAL_REPRESENTATIVE_CAPACITY";
  readonly CA_LEGAL_TYPE: "CA_LEGAL_TYPE";
  readonly DOCUMENT_NUMBER: "DOCUMENT_NUMBER";
  readonly DUNS_NUMBER: "DUNS_NUMBER";
  readonly ES_IDENTIFICATION: "ES_IDENTIFICATION";
  readonly ES_IDENTIFICATION_TYPE: "ES_IDENTIFICATION_TYPE";
  readonly ES_LEGAL_FORM: "ES_LEGAL_FORM";
  readonly EU_COUNTRY_OF_CITIZENSHIP: "EU_COUNTRY_OF_CITIZENSHIP";
  readonly FI_BUSINESS_NUMBER: "FI_BUSINESS_NUMBER";
  readonly FI_NATIONALITY: "FI_NATIONALITY";
  readonly FI_ORGANIZATION_TYPE: "FI_ORGANIZATION_TYPE";
  readonly IT_NATIONALITY: "IT_NATIONALITY";
  readonly IT_PIN: "IT_PIN";
  readonly IT_REGISTRANT_ENTITY_TYPE: "IT_REGISTRANT_ENTITY_TYPE";
  readonly ONWER_FI_ID_NUMBER: "FI_ID_NUMBER";
  readonly RU_PASSPORT_DATA: "RU_PASSPORT_DATA";
  readonly SE_ID_NUMBER: "SE_ID_NUMBER";
  readonly SG_ID_NUMBER: "SG_ID_NUMBER";
  readonly UK_COMPANY_NUMBER: "UK_COMPANY_NUMBER";
  readonly UK_CONTACT_TYPE: "UK_CONTACT_TYPE";
  readonly VAT_NUMBER: "VAT_NUMBER";
};
export type ExtraParamName =
  (typeof ExtraParamName)[keyof typeof ExtraParamName];
export interface ExtraParam {
  Name: ExtraParamName | undefined;
  Value: string | undefined;
}
export interface ContactDetail {
  FirstName?: string | undefined;
  LastName?: string | undefined;
  ContactType?: ContactType | undefined;
  OrganizationName?: string | undefined;
  AddressLine1?: string | undefined;
  AddressLine2?: string | undefined;
  City?: string | undefined;
  State?: string | undefined;
  CountryCode?: CountryCode | undefined;
  ZipCode?: string | undefined;
  PhoneNumber?: string | undefined;
  Email?: string | undefined;
  Fax?: string | undefined;
  ExtraParams?: ExtraParam[] | undefined;
}
export interface DeleteDomainRequest {
  DomainName: string | undefined;
}
export interface DeleteDomainResponse {
  OperationId?: string | undefined;
}
export interface DeleteTagsForDomainRequest {
  DomainName: string | undefined;
  TagsToDelete: string[] | undefined;
}
export interface DeleteTagsForDomainResponse {}
export interface DisableDomainAutoRenewRequest {
  DomainName: string | undefined;
}
export interface DisableDomainAutoRenewResponse {}
export interface DisableDomainTransferLockRequest {
  DomainName: string | undefined;
}
export interface DisableDomainTransferLockResponse {
  OperationId?: string | undefined;
}
export interface DisassociateDelegationSignerFromDomainRequest {
  DomainName: string | undefined;
  Id: string | undefined;
}
export interface DisassociateDelegationSignerFromDomainResponse {
  OperationId?: string | undefined;
}
export interface DnssecKey {
  Algorithm?: number | undefined;
  Flags?: number | undefined;
  PublicKey?: string | undefined;
  DigestType?: number | undefined;
  Digest?: string | undefined;
  KeyTag?: number | undefined;
  Id?: string | undefined;
}
export interface PriceWithCurrency {
  Price: number | undefined;
  Currency: string | undefined;
}
export interface DomainPrice {
  Name?: string | undefined;
  RegistrationPrice?: PriceWithCurrency | undefined;
  TransferPrice?: PriceWithCurrency | undefined;
  RenewalPrice?: PriceWithCurrency | undefined;
  ChangeOwnershipPrice?: PriceWithCurrency | undefined;
  RestorationPrice?: PriceWithCurrency | undefined;
}
export interface DomainSuggestion {
  DomainName?: string | undefined;
  Availability?: string | undefined;
}
export interface DomainSummary {
  DomainName?: string | undefined;
  AutoRenew?: boolean | undefined;
  TransferLock?: boolean | undefined;
  Expiry?: Date | undefined;
}
export interface EnableDomainAutoRenewRequest {
  DomainName: string | undefined;
}
export interface EnableDomainAutoRenewResponse {}
export interface EnableDomainTransferLockRequest {
  DomainName: string | undefined;
}
export interface EnableDomainTransferLockResponse {
  OperationId?: string | undefined;
}
export declare const ListDomainsAttributeName: {
  readonly DomainName: "DomainName";
  readonly Expiry: "Expiry";
};
export type ListDomainsAttributeName =
  (typeof ListDomainsAttributeName)[keyof typeof ListDomainsAttributeName];
export declare const Operator: {
  readonly BEGINS_WITH: "BEGINS_WITH";
  readonly GE: "GE";
  readonly LE: "LE";
};
export type Operator = (typeof Operator)[keyof typeof Operator];
export interface FilterCondition {
  Name: ListDomainsAttributeName | undefined;
  Operator: Operator | undefined;
  Values: string[] | undefined;
}
export interface GetContactReachabilityStatusRequest {
  domainName?: string | undefined;
}
export declare const ReachabilityStatus: {
  readonly DONE: "DONE";
  readonly EXPIRED: "EXPIRED";
  readonly PENDING: "PENDING";
};
export type ReachabilityStatus =
  (typeof ReachabilityStatus)[keyof typeof ReachabilityStatus];
export interface GetContactReachabilityStatusResponse {
  domainName?: string | undefined;
  status?: ReachabilityStatus | undefined;
}
export interface GetDomainDetailRequest {
  DomainName: string | undefined;
}
export interface Nameserver {
  Name: string | undefined;
  GlueIps?: string[] | undefined;
}
export interface GetDomainDetailResponse {
  DomainName?: string | undefined;
  Nameservers?: Nameserver[] | undefined;
  AutoRenew?: boolean | undefined;
  AdminContact?: ContactDetail | undefined;
  RegistrantContact?: ContactDetail | undefined;
  TechContact?: ContactDetail | undefined;
  AdminPrivacy?: boolean | undefined;
  RegistrantPrivacy?: boolean | undefined;
  TechPrivacy?: boolean | undefined;
  RegistrarName?: string | undefined;
  WhoIsServer?: string | undefined;
  RegistrarUrl?: string | undefined;
  AbuseContactEmail?: string | undefined;
  AbuseContactPhone?: string | undefined;
  RegistryDomainId?: string | undefined;
  CreationDate?: Date | undefined;
  UpdatedDate?: Date | undefined;
  ExpirationDate?: Date | undefined;
  Reseller?: string | undefined;
  DnsSec?: string | undefined;
  StatusList?: string[] | undefined;
  DnssecKeys?: DnssecKey[] | undefined;
  BillingContact?: ContactDetail | undefined;
  BillingPrivacy?: boolean | undefined;
}
export interface GetDomainSuggestionsRequest {
  DomainName: string | undefined;
  SuggestionCount: number | undefined;
  OnlyAvailable: boolean | undefined;
}
export interface GetDomainSuggestionsResponse {
  SuggestionsList?: DomainSuggestion[] | undefined;
}
export interface GetOperationDetailRequest {
  OperationId: string | undefined;
}
export declare const OperationStatus: {
  readonly ERROR: "ERROR";
  readonly FAILED: "FAILED";
  readonly IN_PROGRESS: "IN_PROGRESS";
  readonly SUBMITTED: "SUBMITTED";
  readonly SUCCESSFUL: "SUCCESSFUL";
};
export type OperationStatus =
  (typeof OperationStatus)[keyof typeof OperationStatus];
export declare const StatusFlag: {
  readonly PENDING_ACCEPTANCE: "PENDING_ACCEPTANCE";
  readonly PENDING_AUTHORIZATION: "PENDING_AUTHORIZATION";
  readonly PENDING_CUSTOMER_ACTION: "PENDING_CUSTOMER_ACTION";
  readonly PENDING_PAYMENT_VERIFICATION: "PENDING_PAYMENT_VERIFICATION";
  readonly PENDING_SUPPORT_CASE: "PENDING_SUPPORT_CASE";
};
export type StatusFlag = (typeof StatusFlag)[keyof typeof StatusFlag];
export interface GetOperationDetailResponse {
  OperationId?: string | undefined;
  Status?: OperationStatus | undefined;
  Message?: string | undefined;
  DomainName?: string | undefined;
  Type?: OperationType | undefined;
  SubmittedDate?: Date | undefined;
  LastUpdatedDate?: Date | undefined;
  StatusFlag?: StatusFlag | undefined;
}
export declare const SortOrder: {
  readonly ASC: "ASC";
  readonly DESC: "DESC";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export interface SortCondition {
  Name: ListDomainsAttributeName | undefined;
  SortOrder: SortOrder | undefined;
}
export interface ListDomainsRequest {
  FilterConditions?: FilterCondition[] | undefined;
  SortCondition?: SortCondition | undefined;
  Marker?: string | undefined;
  MaxItems?: number | undefined;
}
export interface ListDomainsResponse {
  Domains?: DomainSummary[] | undefined;
  NextPageMarker?: string | undefined;
}
export declare const ListOperationsSortAttributeName: {
  readonly SubmittedDate: "SubmittedDate";
};
export type ListOperationsSortAttributeName =
  (typeof ListOperationsSortAttributeName)[keyof typeof ListOperationsSortAttributeName];
export interface ListOperationsRequest {
  SubmittedSince?: Date | undefined;
  Marker?: string | undefined;
  MaxItems?: number | undefined;
  Status?: OperationStatus[] | undefined;
  Type?: OperationType[] | undefined;
  SortBy?: ListOperationsSortAttributeName | undefined;
  SortOrder?: SortOrder | undefined;
}
export interface OperationSummary {
  OperationId?: string | undefined;
  Status?: OperationStatus | undefined;
  Type?: OperationType | undefined;
  SubmittedDate?: Date | undefined;
  DomainName?: string | undefined;
  Message?: string | undefined;
  StatusFlag?: StatusFlag | undefined;
  LastUpdatedDate?: Date | undefined;
}
export interface ListOperationsResponse {
  Operations?: OperationSummary[] | undefined;
  NextPageMarker?: string | undefined;
}
export interface ListPricesRequest {
  Tld?: string | undefined;
  Marker?: string | undefined;
  MaxItems?: number | undefined;
}
export interface ListPricesResponse {
  Prices?: DomainPrice[] | undefined;
  NextPageMarker?: string | undefined;
}
export interface ListTagsForDomainRequest {
  DomainName: string | undefined;
}
export interface Tag {
  Key?: string | undefined;
  Value?: string | undefined;
}
export interface ListTagsForDomainResponse {
  TagList?: Tag[] | undefined;
}
export interface PushDomainRequest {
  DomainName: string | undefined;
  Target: string | undefined;
}
export interface RegisterDomainRequest {
  DomainName: string | undefined;
  IdnLangCode?: string | undefined;
  DurationInYears: number | undefined;
  AutoRenew?: boolean | undefined;
  AdminContact: ContactDetail | undefined;
  RegistrantContact: ContactDetail | undefined;
  TechContact: ContactDetail | undefined;
  PrivacyProtectAdminContact?: boolean | undefined;
  PrivacyProtectRegistrantContact?: boolean | undefined;
  PrivacyProtectTechContact?: boolean | undefined;
  BillingContact?: ContactDetail | undefined;
  PrivacyProtectBillingContact?: boolean | undefined;
}
export interface RegisterDomainResponse {
  OperationId?: string | undefined;
}
export interface RejectDomainTransferFromAnotherAwsAccountRequest {
  DomainName: string | undefined;
}
export interface RejectDomainTransferFromAnotherAwsAccountResponse {
  OperationId?: string | undefined;
}
export interface RenewDomainRequest {
  DomainName: string | undefined;
  DurationInYears?: number | undefined;
  CurrentExpiryYear: number | undefined;
}
export interface RenewDomainResponse {
  OperationId?: string | undefined;
}
export interface ResendContactReachabilityEmailRequest {
  domainName?: string | undefined;
}
export interface ResendContactReachabilityEmailResponse {
  domainName?: string | undefined;
  emailAddress?: string | undefined;
  isAlreadyVerified?: boolean | undefined;
}
export interface ResendOperationAuthorizationRequest {
  OperationId: string | undefined;
}
export interface RetrieveDomainAuthCodeRequest {
  DomainName: string | undefined;
}
export interface RetrieveDomainAuthCodeResponse {
  AuthCode?: string | undefined;
}
export interface TransferDomainRequest {
  DomainName: string | undefined;
  IdnLangCode?: string | undefined;
  DurationInYears: number | undefined;
  Nameservers?: Nameserver[] | undefined;
  AuthCode?: string | undefined;
  AutoRenew?: boolean | undefined;
  AdminContact: ContactDetail | undefined;
  RegistrantContact: ContactDetail | undefined;
  TechContact: ContactDetail | undefined;
  PrivacyProtectAdminContact?: boolean | undefined;
  PrivacyProtectRegistrantContact?: boolean | undefined;
  PrivacyProtectTechContact?: boolean | undefined;
  BillingContact?: ContactDetail | undefined;
  PrivacyProtectBillingContact?: boolean | undefined;
}
export interface TransferDomainResponse {
  OperationId?: string | undefined;
}
export interface TransferDomainToAnotherAwsAccountRequest {
  DomainName: string | undefined;
  AccountId: string | undefined;
}
export interface TransferDomainToAnotherAwsAccountResponse {
  OperationId?: string | undefined;
  Password?: string | undefined;
}
export interface UpdateDomainContactRequest {
  DomainName: string | undefined;
  AdminContact?: ContactDetail | undefined;
  RegistrantContact?: ContactDetail | undefined;
  TechContact?: ContactDetail | undefined;
  Consent?: Consent | undefined;
  BillingContact?: ContactDetail | undefined;
}
export interface UpdateDomainContactResponse {
  OperationId?: string | undefined;
}
export interface UpdateDomainContactPrivacyRequest {
  DomainName: string | undefined;
  AdminPrivacy?: boolean | undefined;
  RegistrantPrivacy?: boolean | undefined;
  TechPrivacy?: boolean | undefined;
  BillingPrivacy?: boolean | undefined;
}
export interface UpdateDomainContactPrivacyResponse {
  OperationId?: string | undefined;
}
export interface UpdateDomainNameserversRequest {
  DomainName: string | undefined;
  FIAuthKey?: string | undefined;
  Nameservers: Nameserver[] | undefined;
}
export interface UpdateDomainNameserversResponse {
  OperationId?: string | undefined;
}
export interface UpdateTagsForDomainRequest {
  DomainName: string | undefined;
  TagsToUpdate?: Tag[] | undefined;
}
export interface UpdateTagsForDomainResponse {}
export interface ViewBillingRequest {
  Start?: Date | undefined;
  End?: Date | undefined;
  Marker?: string | undefined;
  MaxItems?: number | undefined;
}
export interface ViewBillingResponse {
  NextPageMarker?: string | undefined;
  BillingRecords?: BillingRecord[] | undefined;
}
export declare const AcceptDomainTransferFromAnotherAwsAccountRequestFilterSensitiveLog: (
  obj: AcceptDomainTransferFromAnotherAwsAccountRequest
) => any;
export declare const CheckDomainTransferabilityRequestFilterSensitiveLog: (
  obj: CheckDomainTransferabilityRequest
) => any;
export declare const ExtraParamFilterSensitiveLog: (obj: ExtraParam) => any;
export declare const ContactDetailFilterSensitiveLog: (
  obj: ContactDetail
) => any;
export declare const GetDomainDetailResponseFilterSensitiveLog: (
  obj: GetDomainDetailResponse
) => any;
export declare const RegisterDomainRequestFilterSensitiveLog: (
  obj: RegisterDomainRequest
) => any;
export declare const ResendContactReachabilityEmailResponseFilterSensitiveLog: (
  obj: ResendContactReachabilityEmailResponse
) => any;
export declare const RetrieveDomainAuthCodeResponseFilterSensitiveLog: (
  obj: RetrieveDomainAuthCodeResponse
) => any;
export declare const TransferDomainRequestFilterSensitiveLog: (
  obj: TransferDomainRequest
) => any;
export declare const TransferDomainToAnotherAwsAccountResponseFilterSensitiveLog: (
  obj: TransferDomainToAnotherAwsAccountResponse
) => any;
export declare const UpdateDomainContactRequestFilterSensitiveLog: (
  obj: UpdateDomainContactRequest
) => any;
export declare const UpdateDomainNameserversRequestFilterSensitiveLog: (
  obj: UpdateDomainNameserversRequest
) => any;
