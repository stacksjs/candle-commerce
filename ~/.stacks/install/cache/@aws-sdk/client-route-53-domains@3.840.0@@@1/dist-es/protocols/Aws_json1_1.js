import { loadRestJsonErrorCode, parseJsonBody as parseBody, parseJsonErrorBody as parseErrorBody } from "@aws-sdk/core";
import { HttpRequest as __HttpRequest } from "@smithy/protocol-http";
import { _json, collectBody, decorateServiceException as __decorateServiceException, expectBoolean as __expectBoolean, expectNonNull as __expectNonNull, expectNumber as __expectNumber, expectString as __expectString, limitedParseDouble as __limitedParseDouble, parseEpochTimestamp as __parseEpochTimestamp, serializeFloat as __serializeFloat, take, withBaseException, } from "@smithy/smithy-client";
import { DnssecLimitExceeded, DomainLimitExceeded, DuplicateRequest, InvalidInput, OperationLimitExceeded, TLDRulesViolation, UnsupportedTLD, } from "../models/models_0";
import { Route53DomainsServiceException as __BaseException } from "../models/Route53DomainsServiceException";
export const se_AcceptDomainTransferFromAnotherAwsAccountCommand = async (input, context) => {
    const headers = sharedHeaders("AcceptDomainTransferFromAnotherAwsAccount");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_AssociateDelegationSignerToDomainCommand = async (input, context) => {
    const headers = sharedHeaders("AssociateDelegationSignerToDomain");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_CancelDomainTransferToAnotherAwsAccountCommand = async (input, context) => {
    const headers = sharedHeaders("CancelDomainTransferToAnotherAwsAccount");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_CheckDomainAvailabilityCommand = async (input, context) => {
    const headers = sharedHeaders("CheckDomainAvailability");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_CheckDomainTransferabilityCommand = async (input, context) => {
    const headers = sharedHeaders("CheckDomainTransferability");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_DeleteDomainCommand = async (input, context) => {
    const headers = sharedHeaders("DeleteDomain");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_DeleteTagsForDomainCommand = async (input, context) => {
    const headers = sharedHeaders("DeleteTagsForDomain");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_DisableDomainAutoRenewCommand = async (input, context) => {
    const headers = sharedHeaders("DisableDomainAutoRenew");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_DisableDomainTransferLockCommand = async (input, context) => {
    const headers = sharedHeaders("DisableDomainTransferLock");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_DisassociateDelegationSignerFromDomainCommand = async (input, context) => {
    const headers = sharedHeaders("DisassociateDelegationSignerFromDomain");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_EnableDomainAutoRenewCommand = async (input, context) => {
    const headers = sharedHeaders("EnableDomainAutoRenew");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_EnableDomainTransferLockCommand = async (input, context) => {
    const headers = sharedHeaders("EnableDomainTransferLock");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetContactReachabilityStatusCommand = async (input, context) => {
    const headers = sharedHeaders("GetContactReachabilityStatus");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetDomainDetailCommand = async (input, context) => {
    const headers = sharedHeaders("GetDomainDetail");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetDomainSuggestionsCommand = async (input, context) => {
    const headers = sharedHeaders("GetDomainSuggestions");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetOperationDetailCommand = async (input, context) => {
    const headers = sharedHeaders("GetOperationDetail");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListDomainsCommand = async (input, context) => {
    const headers = sharedHeaders("ListDomains");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListOperationsCommand = async (input, context) => {
    const headers = sharedHeaders("ListOperations");
    let body;
    body = JSON.stringify(se_ListOperationsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListPricesCommand = async (input, context) => {
    const headers = sharedHeaders("ListPrices");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListTagsForDomainCommand = async (input, context) => {
    const headers = sharedHeaders("ListTagsForDomain");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_PushDomainCommand = async (input, context) => {
    const headers = sharedHeaders("PushDomain");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_RegisterDomainCommand = async (input, context) => {
    const headers = sharedHeaders("RegisterDomain");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_RejectDomainTransferFromAnotherAwsAccountCommand = async (input, context) => {
    const headers = sharedHeaders("RejectDomainTransferFromAnotherAwsAccount");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_RenewDomainCommand = async (input, context) => {
    const headers = sharedHeaders("RenewDomain");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ResendContactReachabilityEmailCommand = async (input, context) => {
    const headers = sharedHeaders("ResendContactReachabilityEmail");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ResendOperationAuthorizationCommand = async (input, context) => {
    const headers = sharedHeaders("ResendOperationAuthorization");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_RetrieveDomainAuthCodeCommand = async (input, context) => {
    const headers = sharedHeaders("RetrieveDomainAuthCode");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_TransferDomainCommand = async (input, context) => {
    const headers = sharedHeaders("TransferDomain");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_TransferDomainToAnotherAwsAccountCommand = async (input, context) => {
    const headers = sharedHeaders("TransferDomainToAnotherAwsAccount");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_UpdateDomainContactCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateDomainContact");
    let body;
    body = JSON.stringify(se_UpdateDomainContactRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_UpdateDomainContactPrivacyCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateDomainContactPrivacy");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_UpdateDomainNameserversCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateDomainNameservers");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_UpdateTagsForDomainCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateTagsForDomain");
    let body;
    body = JSON.stringify(_json(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ViewBillingCommand = async (input, context) => {
    const headers = sharedHeaders("ViewBilling");
    let body;
    body = JSON.stringify(se_ViewBillingRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const de_AcceptDomainTransferFromAnotherAwsAccountCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_AssociateDelegationSignerToDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_CancelDomainTransferToAnotherAwsAccountCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_CheckDomainAvailabilityCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_CheckDomainTransferabilityCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_DeleteDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_DeleteTagsForDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_DisableDomainAutoRenewCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_DisableDomainTransferLockCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_DisassociateDelegationSignerFromDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_EnableDomainAutoRenewCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_EnableDomainTransferLockCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetContactReachabilityStatusCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetDomainDetailCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_GetDomainDetailResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetDomainSuggestionsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetOperationDetailCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_GetOperationDetailResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListDomainsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListDomainsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListOperationsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListOperationsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListPricesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListPricesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListTagsForDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_PushDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_RegisterDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_RejectDomainTransferFromAnotherAwsAccountCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_RenewDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ResendContactReachabilityEmailCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ResendOperationAuthorizationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_RetrieveDomainAuthCodeCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_TransferDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_TransferDomainToAnotherAwsAccountCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_UpdateDomainContactCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_UpdateDomainContactPrivacyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_UpdateDomainNameserversCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_UpdateTagsForDomainCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = _json(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ViewBillingCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ViewBillingResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_CommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "DomainLimitExceeded":
        case "com.amazonaws.route53domains#DomainLimitExceeded":
            throw await de_DomainLimitExceededRes(parsedOutput, context);
        case "InvalidInput":
        case "com.amazonaws.route53domains#InvalidInput":
            throw await de_InvalidInputRes(parsedOutput, context);
        case "OperationLimitExceeded":
        case "com.amazonaws.route53domains#OperationLimitExceeded":
            throw await de_OperationLimitExceededRes(parsedOutput, context);
        case "UnsupportedTLD":
        case "com.amazonaws.route53domains#UnsupportedTLD":
            throw await de_UnsupportedTLDRes(parsedOutput, context);
        case "DnssecLimitExceeded":
        case "com.amazonaws.route53domains#DnssecLimitExceeded":
            throw await de_DnssecLimitExceededRes(parsedOutput, context);
        case "DuplicateRequest":
        case "com.amazonaws.route53domains#DuplicateRequest":
            throw await de_DuplicateRequestRes(parsedOutput, context);
        case "TLDRulesViolation":
        case "com.amazonaws.route53domains#TLDRulesViolation":
            throw await de_TLDRulesViolationRes(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            return throwDefaultError({
                output,
                parsedBody,
                errorCode,
            });
    }
};
const de_DnssecLimitExceededRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new DnssecLimitExceeded({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_DomainLimitExceededRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new DomainLimitExceeded({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_DuplicateRequestRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new DuplicateRequest({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_InvalidInputRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new InvalidInput({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_OperationLimitExceededRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new OperationLimitExceeded({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_TLDRulesViolationRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new TLDRulesViolation({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_UnsupportedTLDRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = _json(body);
    const exception = new UnsupportedTLD({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const se_Consent = (input, context) => {
    return take(input, {
        Currency: [],
        MaxPrice: __serializeFloat,
    });
};
const se_ListOperationsRequest = (input, context) => {
    return take(input, {
        Marker: [],
        MaxItems: [],
        SortBy: [],
        SortOrder: [],
        Status: _json,
        SubmittedSince: (_) => _.getTime() / 1_000,
        Type: _json,
    });
};
const se_UpdateDomainContactRequest = (input, context) => {
    return take(input, {
        AdminContact: _json,
        BillingContact: _json,
        Consent: (_) => se_Consent(_, context),
        DomainName: [],
        RegistrantContact: _json,
        TechContact: _json,
    });
};
const se_ViewBillingRequest = (input, context) => {
    return take(input, {
        End: (_) => _.getTime() / 1_000,
        Marker: [],
        MaxItems: [],
        Start: (_) => _.getTime() / 1_000,
    });
};
const de_BillingRecord = (output, context) => {
    return take(output, {
        BillDate: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        DomainName: __expectString,
        InvoiceId: __expectString,
        Operation: __expectString,
        Price: __limitedParseDouble,
    });
};
const de_BillingRecords = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_BillingRecord(entry, context);
    });
    return retVal;
};
const de_DomainPrice = (output, context) => {
    return take(output, {
        ChangeOwnershipPrice: (_) => de_PriceWithCurrency(_, context),
        Name: __expectString,
        RegistrationPrice: (_) => de_PriceWithCurrency(_, context),
        RenewalPrice: (_) => de_PriceWithCurrency(_, context),
        RestorationPrice: (_) => de_PriceWithCurrency(_, context),
        TransferPrice: (_) => de_PriceWithCurrency(_, context),
    });
};
const de_DomainPriceList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_DomainPrice(entry, context);
    });
    return retVal;
};
const de_DomainSummary = (output, context) => {
    return take(output, {
        AutoRenew: __expectBoolean,
        DomainName: __expectString,
        Expiry: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        TransferLock: __expectBoolean,
    });
};
const de_DomainSummaryList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_DomainSummary(entry, context);
    });
    return retVal;
};
const de_GetDomainDetailResponse = (output, context) => {
    return take(output, {
        AbuseContactEmail: __expectString,
        AbuseContactPhone: __expectString,
        AdminContact: _json,
        AdminPrivacy: __expectBoolean,
        AutoRenew: __expectBoolean,
        BillingContact: _json,
        BillingPrivacy: __expectBoolean,
        CreationDate: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        DnsSec: __expectString,
        DnssecKeys: _json,
        DomainName: __expectString,
        ExpirationDate: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        Nameservers: _json,
        RegistrantContact: _json,
        RegistrantPrivacy: __expectBoolean,
        RegistrarName: __expectString,
        RegistrarUrl: __expectString,
        RegistryDomainId: __expectString,
        Reseller: __expectString,
        StatusList: _json,
        TechContact: _json,
        TechPrivacy: __expectBoolean,
        UpdatedDate: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        WhoIsServer: __expectString,
    });
};
const de_GetOperationDetailResponse = (output, context) => {
    return take(output, {
        DomainName: __expectString,
        LastUpdatedDate: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        Message: __expectString,
        OperationId: __expectString,
        Status: __expectString,
        StatusFlag: __expectString,
        SubmittedDate: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        Type: __expectString,
    });
};
const de_ListDomainsResponse = (output, context) => {
    return take(output, {
        Domains: (_) => de_DomainSummaryList(_, context),
        NextPageMarker: __expectString,
    });
};
const de_ListOperationsResponse = (output, context) => {
    return take(output, {
        NextPageMarker: __expectString,
        Operations: (_) => de_OperationSummaryList(_, context),
    });
};
const de_ListPricesResponse = (output, context) => {
    return take(output, {
        NextPageMarker: __expectString,
        Prices: (_) => de_DomainPriceList(_, context),
    });
};
const de_OperationSummary = (output, context) => {
    return take(output, {
        DomainName: __expectString,
        LastUpdatedDate: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        Message: __expectString,
        OperationId: __expectString,
        Status: __expectString,
        StatusFlag: __expectString,
        SubmittedDate: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        Type: __expectString,
    });
};
const de_OperationSummaryList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_OperationSummary(entry, context);
    });
    return retVal;
};
const de_PriceWithCurrency = (output, context) => {
    return take(output, {
        Currency: __expectString,
        Price: __limitedParseDouble,
    });
};
const de_ViewBillingResponse = (output, context) => {
    return take(output, {
        BillingRecords: (_) => de_BillingRecords(_, context),
        NextPageMarker: __expectString,
    });
};
const deserializeMetadata = (output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"],
});
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const throwDefaultError = withBaseException(__BaseException);
const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
        headers,
    };
    if (resolvedHostname !== undefined) {
        contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
        contents.body = body;
    }
    return new __HttpRequest(contents);
};
function sharedHeaders(operation) {
    return {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": `Route53Domains_v20140515.${operation}`,
    };
}
