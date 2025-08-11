// ../../../../node_modules/@smithy/types/dist-es/middleware.js
var SMITHY_CONTEXT_KEY = "__smithy_context";
// ../../../../node_modules/@smithy/types/dist-es/auth/auth.js
var HttpAuthLocation;
(function(HttpAuthLocation2) {
  HttpAuthLocation2["HEADER"] = "header";
  HttpAuthLocation2["QUERY"] = "query";
})(HttpAuthLocation || (HttpAuthLocation = {}));
// ../../../../node_modules/@smithy/types/dist-es/auth/HttpApiKeyAuth.js
var HttpApiKeyAuthLocation;
(function(HttpApiKeyAuthLocation2) {
  HttpApiKeyAuthLocation2["HEADER"] = "header";
  HttpApiKeyAuthLocation2["QUERY"] = "query";
})(HttpApiKeyAuthLocation || (HttpApiKeyAuthLocation = {}));
// ../../../../node_modules/@smithy/types/dist-es/endpoint.js
var EndpointURLScheme;
(function(EndpointURLScheme2) {
  EndpointURLScheme2["HTTP"] = "http";
  EndpointURLScheme2["HTTPS"] = "https";
})(EndpointURLScheme || (EndpointURLScheme = {}));
// ../../../../node_modules/@smithy/types/dist-es/extensions/checksum.js
var AlgorithmId;
(function(AlgorithmId2) {
  AlgorithmId2["MD5"] = "md5";
  AlgorithmId2["CRC32"] = "crc32";
  AlgorithmId2["CRC32C"] = "crc32c";
  AlgorithmId2["SHA1"] = "sha1";
  AlgorithmId2["SHA256"] = "sha256";
})(AlgorithmId || (AlgorithmId = {}));
// ../../../../node_modules/@smithy/types/dist-es/http.js
var FieldPosition;
(function(FieldPosition2) {
  FieldPosition2[FieldPosition2["HEADER"] = 0] = "HEADER";
  FieldPosition2[FieldPosition2["TRAILER"] = 1] = "TRAILER";
})(FieldPosition || (FieldPosition = {}));
// ../../../../node_modules/@smithy/types/dist-es/profile.js
var IniSectionType;
(function(IniSectionType2) {
  IniSectionType2["PROFILE"] = "profile";
  IniSectionType2["SSO_SESSION"] = "sso-session";
  IniSectionType2["SERVICES"] = "services";
})(IniSectionType || (IniSectionType = {}));
// ../../../../node_modules/@smithy/types/dist-es/transfer.js
var RequestHandlerProtocol;
(function(RequestHandlerProtocol2) {
  RequestHandlerProtocol2["HTTP_0_9"] = "http/0.9";
  RequestHandlerProtocol2["HTTP_1_0"] = "http/1.0";
  RequestHandlerProtocol2["TDS_8_0"] = "tds/8.0";
})(RequestHandlerProtocol || (RequestHandlerProtocol = {}));
export { EndpointURLScheme, AlgorithmId, SMITHY_CONTEXT_KEY, IniSectionType };
