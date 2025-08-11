// @bun
import {
  getProfileName,
  parseKnownFiles
} from "./chunk-0be2fzx4.js";
import {
  CredentialsProviderError
} from "./chunk-zzerxbrm.js";
import"./chunk-0rra9d59.js";
import {
  require_client
} from "./chunk-zpek37sa.js";
import {
  __toESM
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@aws-sdk/credential-provider-process/dist-es/resolveProcessCredentials.js
import { exec } from "child_process";
import { promisify } from "util";

// ../../../../node_modules/@aws-sdk/credential-provider-process/dist-es/getValidatedProcessCredentials.js
var import_client = __toESM(require_client(), 1);
var getValidatedProcessCredentials = (profileName, data, profiles) => {
  if (data.Version !== 1) {
    throw Error(`Profile ${profileName} credential_process did not return Version 1.`);
  }
  if (data.AccessKeyId === undefined || data.SecretAccessKey === undefined) {
    throw Error(`Profile ${profileName} credential_process returned invalid credentials.`);
  }
  if (data.Expiration) {
    const currentTime = new Date;
    const expireTime = new Date(data.Expiration);
    if (expireTime < currentTime) {
      throw Error(`Profile ${profileName} credential_process returned expired credentials.`);
    }
  }
  let accountId = data.AccountId;
  if (!accountId && profiles?.[profileName]?.aws_account_id) {
    accountId = profiles[profileName].aws_account_id;
  }
  const credentials = {
    accessKeyId: data.AccessKeyId,
    secretAccessKey: data.SecretAccessKey,
    ...data.SessionToken && { sessionToken: data.SessionToken },
    ...data.Expiration && { expiration: new Date(data.Expiration) },
    ...data.CredentialScope && { credentialScope: data.CredentialScope },
    ...accountId && { accountId }
  };
  import_client.setCredentialFeature(credentials, "CREDENTIALS_PROCESS", "w");
  return credentials;
};

// ../../../../node_modules/@aws-sdk/credential-provider-process/dist-es/resolveProcessCredentials.js
var resolveProcessCredentials = async (profileName, profiles, logger) => {
  const profile = profiles[profileName];
  if (profiles[profileName]) {
    const credentialProcess = profile["credential_process"];
    if (credentialProcess !== undefined) {
      const execPromise = promisify(exec);
      try {
        const { stdout } = await execPromise(credentialProcess);
        let data;
        try {
          data = JSON.parse(stdout.trim());
        } catch {
          throw Error(`Profile ${profileName} credential_process returned invalid JSON.`);
        }
        return getValidatedProcessCredentials(profileName, data, profiles);
      } catch (error) {
        throw new CredentialsProviderError(error.message, { logger });
      }
    } else {
      throw new CredentialsProviderError(`Profile ${profileName} did not contain credential_process.`, { logger });
    }
  } else {
    throw new CredentialsProviderError(`Profile ${profileName} could not be found in shared credentials file.`, {
      logger
    });
  }
};

// ../../../../node_modules/@aws-sdk/credential-provider-process/dist-es/fromProcess.js
var fromProcess = (init = {}) => async ({ callerClientConfig } = {}) => {
  init.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");
  const profiles = await parseKnownFiles(init);
  return resolveProcessCredentials(getProfileName({
    profile: init.profile ?? callerClientConfig?.profile
  }), profiles, init.logger);
};
export {
  fromProcess
};
