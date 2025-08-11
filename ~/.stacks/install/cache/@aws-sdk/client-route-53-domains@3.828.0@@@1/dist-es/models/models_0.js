import { SENSITIVE_STRING } from "@smithy/smithy-client";
import { Route53DomainsServiceException as __BaseException } from "./Route53DomainsServiceException";
export class DomainLimitExceeded extends __BaseException {
    name = "DomainLimitExceeded";
    $fault = "client";
    constructor(opts) {
        super({
            name: "DomainLimitExceeded",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, DomainLimitExceeded.prototype);
    }
}
export class InvalidInput extends __BaseException {
    name = "InvalidInput";
    $fault = "client";
    constructor(opts) {
        super({
            name: "InvalidInput",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidInput.prototype);
    }
}
export class OperationLimitExceeded extends __BaseException {
    name = "OperationLimitExceeded";
    $fault = "client";
    constructor(opts) {
        super({
            name: "OperationLimitExceeded",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, OperationLimitExceeded.prototype);
    }
}
export class UnsupportedTLD extends __BaseException {
    name = "UnsupportedTLD";
    $fault = "client";
    constructor(opts) {
        super({
            name: "UnsupportedTLD",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, UnsupportedTLD.prototype);
    }
}
export class DnssecLimitExceeded extends __BaseException {
    name = "DnssecLimitExceeded";
    $fault = "client";
    constructor(opts) {
        super({
            name: "DnssecLimitExceeded",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, DnssecLimitExceeded.prototype);
    }
}
export class DuplicateRequest extends __BaseException {
    name = "DuplicateRequest";
    $fault = "client";
    requestId;
    constructor(opts) {
        super({
            name: "DuplicateRequest",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, DuplicateRequest.prototype);
        this.requestId = opts.requestId;
    }
}
export class TLDRulesViolation extends __BaseException {
    name = "TLDRulesViolation";
    $fault = "client";
    constructor(opts) {
        super({
            name: "TLDRulesViolation",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, TLDRulesViolation.prototype);
    }
}
export const OperationType = {
    ADD_DNSSEC: "ADD_DNSSEC",
    CHANGE_DOMAIN_OWNER: "CHANGE_DOMAIN_OWNER",
    CHANGE_PRIVACY_PROTECTION: "CHANGE_PRIVACY_PROTECTION",
    DELETE_DOMAIN: "DELETE_DOMAIN",
    DISABLE_AUTORENEW: "DISABLE_AUTORENEW",
    DOMAIN_LOCK: "DOMAIN_LOCK",
    ENABLE_AUTORENEW: "ENABLE_AUTORENEW",
    EXPIRE_DOMAIN: "EXPIRE_DOMAIN",
    INTERNAL_TRANSFER_IN_DOMAIN: "INTERNAL_TRANSFER_IN_DOMAIN",
    INTERNAL_TRANSFER_OUT_DOMAIN: "INTERNAL_TRANSFER_OUT_DOMAIN",
    PUSH_DOMAIN: "PUSH_DOMAIN",
    REGISTER_DOMAIN: "REGISTER_DOMAIN",
    RELEASE_TO_GANDI: "RELEASE_TO_GANDI",
    REMOVE_DNSSEC: "REMOVE_DNSSEC",
    RENEW_DOMAIN: "RENEW_DOMAIN",
    RESTORE_DOMAIN: "RESTORE_DOMAIN",
    TRANSFER_IN_DOMAIN: "TRANSFER_IN_DOMAIN",
    TRANSFER_ON_RENEW: "TRANSFER_ON_RENEW",
    TRANSFER_OUT_DOMAIN: "TRANSFER_OUT_DOMAIN",
    UPDATE_DOMAIN_CONTACT: "UPDATE_DOMAIN_CONTACT",
    UPDATE_NAMESERVER: "UPDATE_NAMESERVER",
};
export const DomainAvailability = {
    AVAILABLE: "AVAILABLE",
    AVAILABLE_PREORDER: "AVAILABLE_PREORDER",
    AVAILABLE_RESERVED: "AVAILABLE_RESERVED",
    DONT_KNOW: "DONT_KNOW",
    INVALID_NAME_FOR_TLD: "INVALID_NAME_FOR_TLD",
    PENDING: "PENDING",
    RESERVED: "RESERVED",
    UNAVAILABLE: "UNAVAILABLE",
    UNAVAILABLE_PREMIUM: "UNAVAILABLE_PREMIUM",
    UNAVAILABLE_RESTRICTED: "UNAVAILABLE_RESTRICTED",
};
export const Transferable = {
    DOMAIN_IN_ANOTHER_ACCOUNT: "DOMAIN_IN_ANOTHER_ACCOUNT",
    DOMAIN_IN_OWN_ACCOUNT: "DOMAIN_IN_OWN_ACCOUNT",
    DONT_KNOW: "DONT_KNOW",
    PREMIUM_DOMAIN: "PREMIUM_DOMAIN",
    TRANSFERABLE: "TRANSFERABLE",
    UNTRANSFERABLE: "UNTRANSFERABLE",
};
export const ContactType = {
    ASSOCIATION: "ASSOCIATION",
    COMPANY: "COMPANY",
    PERSON: "PERSON",
    PUBLIC_BODY: "PUBLIC_BODY",
    RESELLER: "RESELLER",
};
export const CountryCode = {
    AC: "AC",
    AD: "AD",
    AE: "AE",
    AF: "AF",
    AG: "AG",
    AI: "AI",
    AL: "AL",
    AM: "AM",
    AN: "AN",
    AO: "AO",
    AQ: "AQ",
    AR: "AR",
    AS: "AS",
    AT: "AT",
    AU: "AU",
    AW: "AW",
    AX: "AX",
    AZ: "AZ",
    BA: "BA",
    BB: "BB",
    BD: "BD",
    BE: "BE",
    BF: "BF",
    BG: "BG",
    BH: "BH",
    BI: "BI",
    BJ: "BJ",
    BL: "BL",
    BM: "BM",
    BN: "BN",
    BO: "BO",
    BQ: "BQ",
    BR: "BR",
    BS: "BS",
    BT: "BT",
    BV: "BV",
    BW: "BW",
    BY: "BY",
    BZ: "BZ",
    CA: "CA",
    CC: "CC",
    CD: "CD",
    CF: "CF",
    CG: "CG",
    CH: "CH",
    CI: "CI",
    CK: "CK",
    CL: "CL",
    CM: "CM",
    CN: "CN",
    CO: "CO",
    CR: "CR",
    CU: "CU",
    CV: "CV",
    CW: "CW",
    CX: "CX",
    CY: "CY",
    CZ: "CZ",
    DE: "DE",
    DJ: "DJ",
    DK: "DK",
    DM: "DM",
    DO: "DO",
    DZ: "DZ",
    EC: "EC",
    EE: "EE",
    EG: "EG",
    EH: "EH",
    ER: "ER",
    ES: "ES",
    ET: "ET",
    FI: "FI",
    FJ: "FJ",
    FK: "FK",
    FM: "FM",
    FO: "FO",
    FR: "FR",
    GA: "GA",
    GB: "GB",
    GD: "GD",
    GE: "GE",
    GF: "GF",
    GG: "GG",
    GH: "GH",
    GI: "GI",
    GL: "GL",
    GM: "GM",
    GN: "GN",
    GP: "GP",
    GQ: "GQ",
    GR: "GR",
    GS: "GS",
    GT: "GT",
    GU: "GU",
    GW: "GW",
    GY: "GY",
    HK: "HK",
    HM: "HM",
    HN: "HN",
    HR: "HR",
    HT: "HT",
    HU: "HU",
    ID: "ID",
    IE: "IE",
    IL: "IL",
    IM: "IM",
    IN: "IN",
    IO: "IO",
    IQ: "IQ",
    IR: "IR",
    IS: "IS",
    IT: "IT",
    JE: "JE",
    JM: "JM",
    JO: "JO",
    JP: "JP",
    KE: "KE",
    KG: "KG",
    KH: "KH",
    KI: "KI",
    KM: "KM",
    KN: "KN",
    KP: "KP",
    KR: "KR",
    KW: "KW",
    KY: "KY",
    KZ: "KZ",
    LA: "LA",
    LB: "LB",
    LC: "LC",
    LI: "LI",
    LK: "LK",
    LR: "LR",
    LS: "LS",
    LT: "LT",
    LU: "LU",
    LV: "LV",
    LY: "LY",
    MA: "MA",
    MC: "MC",
    MD: "MD",
    ME: "ME",
    MF: "MF",
    MG: "MG",
    MH: "MH",
    MK: "MK",
    ML: "ML",
    MM: "MM",
    MN: "MN",
    MO: "MO",
    MP: "MP",
    MQ: "MQ",
    MR: "MR",
    MS: "MS",
    MT: "MT",
    MU: "MU",
    MV: "MV",
    MW: "MW",
    MX: "MX",
    MY: "MY",
    MZ: "MZ",
    NA: "NA",
    NC: "NC",
    NE: "NE",
    NF: "NF",
    NG: "NG",
    NI: "NI",
    NL: "NL",
    NO: "NO",
    NP: "NP",
    NR: "NR",
    NU: "NU",
    NZ: "NZ",
    OM: "OM",
    PA: "PA",
    PE: "PE",
    PF: "PF",
    PG: "PG",
    PH: "PH",
    PK: "PK",
    PL: "PL",
    PM: "PM",
    PN: "PN",
    PR: "PR",
    PS: "PS",
    PT: "PT",
    PW: "PW",
    PY: "PY",
    QA: "QA",
    RE: "RE",
    RO: "RO",
    RS: "RS",
    RU: "RU",
    RW: "RW",
    SA: "SA",
    SB: "SB",
    SC: "SC",
    SD: "SD",
    SE: "SE",
    SG: "SG",
    SH: "SH",
    SI: "SI",
    SJ: "SJ",
    SK: "SK",
    SL: "SL",
    SM: "SM",
    SN: "SN",
    SO: "SO",
    SR: "SR",
    SS: "SS",
    ST: "ST",
    SV: "SV",
    SX: "SX",
    SY: "SY",
    SZ: "SZ",
    TC: "TC",
    TD: "TD",
    TF: "TF",
    TG: "TG",
    TH: "TH",
    TJ: "TJ",
    TK: "TK",
    TL: "TL",
    TM: "TM",
    TN: "TN",
    TO: "TO",
    TP: "TP",
    TR: "TR",
    TT: "TT",
    TV: "TV",
    TW: "TW",
    TZ: "TZ",
    UA: "UA",
    UG: "UG",
    US: "US",
    UY: "UY",
    UZ: "UZ",
    VA: "VA",
    VC: "VC",
    VE: "VE",
    VG: "VG",
    VI: "VI",
    VN: "VN",
    VU: "VU",
    WF: "WF",
    WS: "WS",
    YE: "YE",
    YT: "YT",
    ZA: "ZA",
    ZM: "ZM",
    ZW: "ZW",
};
export const ExtraParamName = {
    AU_ID_NUMBER: "AU_ID_NUMBER",
    AU_ID_TYPE: "AU_ID_TYPE",
    AU_PRIORITY_TOKEN: "AU_PRIORITY_TOKEN",
    BIRTH_CITY: "BIRTH_CITY",
    BIRTH_COUNTRY: "BIRTH_COUNTRY",
    BIRTH_DATE_IN_YYYY_MM_DD: "BIRTH_DATE_IN_YYYY_MM_DD",
    BIRTH_DEPARTMENT: "BIRTH_DEPARTMENT",
    BRAND_NUMBER: "BRAND_NUMBER",
    CA_BUSINESS_ENTITY_TYPE: "CA_BUSINESS_ENTITY_TYPE",
    CA_LEGAL_REPRESENTATIVE: "CA_LEGAL_REPRESENTATIVE",
    CA_LEGAL_REPRESENTATIVE_CAPACITY: "CA_LEGAL_REPRESENTATIVE_CAPACITY",
    CA_LEGAL_TYPE: "CA_LEGAL_TYPE",
    DOCUMENT_NUMBER: "DOCUMENT_NUMBER",
    DUNS_NUMBER: "DUNS_NUMBER",
    ES_IDENTIFICATION: "ES_IDENTIFICATION",
    ES_IDENTIFICATION_TYPE: "ES_IDENTIFICATION_TYPE",
    ES_LEGAL_FORM: "ES_LEGAL_FORM",
    EU_COUNTRY_OF_CITIZENSHIP: "EU_COUNTRY_OF_CITIZENSHIP",
    FI_BUSINESS_NUMBER: "FI_BUSINESS_NUMBER",
    FI_NATIONALITY: "FI_NATIONALITY",
    FI_ORGANIZATION_TYPE: "FI_ORGANIZATION_TYPE",
    IT_NATIONALITY: "IT_NATIONALITY",
    IT_PIN: "IT_PIN",
    IT_REGISTRANT_ENTITY_TYPE: "IT_REGISTRANT_ENTITY_TYPE",
    ONWER_FI_ID_NUMBER: "FI_ID_NUMBER",
    RU_PASSPORT_DATA: "RU_PASSPORT_DATA",
    SE_ID_NUMBER: "SE_ID_NUMBER",
    SG_ID_NUMBER: "SG_ID_NUMBER",
    UK_COMPANY_NUMBER: "UK_COMPANY_NUMBER",
    UK_CONTACT_TYPE: "UK_CONTACT_TYPE",
    VAT_NUMBER: "VAT_NUMBER",
};
export const ListDomainsAttributeName = {
    DomainName: "DomainName",
    Expiry: "Expiry",
};
export const Operator = {
    BEGINS_WITH: "BEGINS_WITH",
    GE: "GE",
    LE: "LE",
};
export const ReachabilityStatus = {
    DONE: "DONE",
    EXPIRED: "EXPIRED",
    PENDING: "PENDING",
};
export const OperationStatus = {
    ERROR: "ERROR",
    FAILED: "FAILED",
    IN_PROGRESS: "IN_PROGRESS",
    SUBMITTED: "SUBMITTED",
    SUCCESSFUL: "SUCCESSFUL",
};
export const StatusFlag = {
    PENDING_ACCEPTANCE: "PENDING_ACCEPTANCE",
    PENDING_AUTHORIZATION: "PENDING_AUTHORIZATION",
    PENDING_CUSTOMER_ACTION: "PENDING_CUSTOMER_ACTION",
    PENDING_PAYMENT_VERIFICATION: "PENDING_PAYMENT_VERIFICATION",
    PENDING_SUPPORT_CASE: "PENDING_SUPPORT_CASE",
};
export const SortOrder = {
    ASC: "ASC",
    DESC: "DESC",
};
export const ListOperationsSortAttributeName = {
    SubmittedDate: "SubmittedDate",
};
export const AcceptDomainTransferFromAnotherAwsAccountRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Password && { Password: SENSITIVE_STRING }),
});
export const CheckDomainTransferabilityRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.AuthCode && { AuthCode: SENSITIVE_STRING }),
});
export const ExtraParamFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Value && { Value: SENSITIVE_STRING }),
});
export const ContactDetailFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.FirstName && { FirstName: SENSITIVE_STRING }),
    ...(obj.LastName && { LastName: SENSITIVE_STRING }),
    ...(obj.OrganizationName && { OrganizationName: SENSITIVE_STRING }),
    ...(obj.AddressLine1 && { AddressLine1: SENSITIVE_STRING }),
    ...(obj.AddressLine2 && { AddressLine2: SENSITIVE_STRING }),
    ...(obj.City && { City: SENSITIVE_STRING }),
    ...(obj.State && { State: SENSITIVE_STRING }),
    ...(obj.CountryCode && { CountryCode: SENSITIVE_STRING }),
    ...(obj.ZipCode && { ZipCode: SENSITIVE_STRING }),
    ...(obj.PhoneNumber && { PhoneNumber: SENSITIVE_STRING }),
    ...(obj.Email && { Email: SENSITIVE_STRING }),
    ...(obj.Fax && { Fax: SENSITIVE_STRING }),
    ...(obj.ExtraParams && { ExtraParams: obj.ExtraParams.map((item) => ExtraParamFilterSensitiveLog(item)) }),
});
export const GetDomainDetailResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.AdminContact && { AdminContact: SENSITIVE_STRING }),
    ...(obj.RegistrantContact && { RegistrantContact: SENSITIVE_STRING }),
    ...(obj.TechContact && { TechContact: SENSITIVE_STRING }),
    ...(obj.AbuseContactEmail && { AbuseContactEmail: SENSITIVE_STRING }),
    ...(obj.AbuseContactPhone && { AbuseContactPhone: SENSITIVE_STRING }),
    ...(obj.BillingContact && { BillingContact: SENSITIVE_STRING }),
});
export const RegisterDomainRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.AdminContact && { AdminContact: SENSITIVE_STRING }),
    ...(obj.RegistrantContact && { RegistrantContact: SENSITIVE_STRING }),
    ...(obj.TechContact && { TechContact: SENSITIVE_STRING }),
    ...(obj.BillingContact && { BillingContact: SENSITIVE_STRING }),
});
export const ResendContactReachabilityEmailResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.emailAddress && { emailAddress: SENSITIVE_STRING }),
});
export const RetrieveDomainAuthCodeResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.AuthCode && { AuthCode: SENSITIVE_STRING }),
});
export const TransferDomainRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.AuthCode && { AuthCode: SENSITIVE_STRING }),
    ...(obj.AdminContact && { AdminContact: SENSITIVE_STRING }),
    ...(obj.RegistrantContact && { RegistrantContact: SENSITIVE_STRING }),
    ...(obj.TechContact && { TechContact: SENSITIVE_STRING }),
    ...(obj.BillingContact && { BillingContact: SENSITIVE_STRING }),
});
export const TransferDomainToAnotherAwsAccountResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Password && { Password: SENSITIVE_STRING }),
});
export const UpdateDomainContactRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.AdminContact && { AdminContact: SENSITIVE_STRING }),
    ...(obj.RegistrantContact && { RegistrantContact: SENSITIVE_STRING }),
    ...(obj.TechContact && { TechContact: SENSITIVE_STRING }),
    ...(obj.BillingContact && { BillingContact: SENSITIVE_STRING }),
});
export const UpdateDomainNameserversRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.FIAuthKey && { FIAuthKey: SENSITIVE_STRING }),
});
