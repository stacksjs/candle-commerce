// @bun
import {
  CredentialsProviderError
} from "./chunk-zzerxbrm.js";
import {
  require_client
} from "./chunk-zpek37sa.js";
import {
  __toESM
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@aws-sdk/credential-provider-env/dist-es/fromEnv.js
var import_client = __toESM(require_client(), 1);
var ENV_KEY = "AWS_ACCESS_KEY_ID";
var ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
var ENV_SESSION = "AWS_SESSION_TOKEN";
var ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
var ENV_CREDENTIAL_SCOPE = "AWS_CREDENTIAL_SCOPE";
var ENV_ACCOUNT_ID = "AWS_ACCOUNT_ID";
var fromEnv = (init) => async () => {
  init?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");
  const accessKeyId = process.env[ENV_KEY];
  const secretAccessKey = process.env[ENV_SECRET];
  const sessionToken = process.env[ENV_SESSION];
  const expiry = process.env[ENV_EXPIRATION];
  const credentialScope = process.env[ENV_CREDENTIAL_SCOPE];
  const accountId = process.env[ENV_ACCOUNT_ID];
  if (accessKeyId && secretAccessKey) {
    const credentials = {
      accessKeyId,
      secretAccessKey,
      ...sessionToken && { sessionToken },
      ...expiry && { expiration: new Date(expiry) },
      ...credentialScope && { credentialScope },
      ...accountId && { accountId }
    };
    import_client.setCredentialFeature(credentials, "CREDENTIALS_ENV_VARS", "g");
    return credentials;
  }
  throw new CredentialsProviderError("Unable to find environment variable credentials.", { logger: init?.logger });
};
export {
  fromEnv,
  ENV_SESSION,
  ENV_SECRET,
  ENV_KEY,
  ENV_EXPIRATION,
  ENV_CREDENTIAL_SCOPE,
  ENV_ACCOUNT_ID
};
export { ENV_KEY, ENV_SECRET, fromEnv };
