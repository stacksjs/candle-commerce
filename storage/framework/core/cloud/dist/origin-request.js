// src/edge/origin-request.ts
var config = {
  suffix: ".html",
  removeTrailingSlash: false
};
var regexSuffixless = /\/[^/.]+$/;
var regexTrailingSlash = /.+\/$/;
function handler(event, context, callback) {
  const { request } = event.Records[0].cf;
  const { uri } = request;
  const { suffix } = config;
  if (uri === "/") {
    request.uri = "/index.html";
    callback(null, request);
    return;
  }
  if (uri.match(regexSuffixless)) {
    request.uri = uri + suffix;
    callback(null, request);
    return;
  }
  if (uri.match(regexTrailingSlash)) {
    request.uri = `${uri.slice(0, -1)}.html`;
    callback(null, request);
    return;
  }
  callback(null, request);
}
export {
  handler
};
