// @bun
import {
  getProfileName,
  getSSOTokenFilepath,
  getSSOTokenFromFile,
  loadSsoSessionData,
  parseKnownFiles
} from "./chunk-0be2fzx4.js";
import {
  CredentialsProviderError,
  TokenProviderError
} from "./chunk-zzerxbrm.js";
import"./chunk-0rra9d59.js";
import {
  require_client
} from "./chunk-n2a7wn2k.js";
import {
  __require,
  __toESM
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@aws-sdk/credential-provider-sso/dist-es/isSsoProfile.js
var isSsoProfile = (arg) => arg && (typeof arg.sso_start_url === "string" || typeof arg.sso_account_id === "string" || typeof arg.sso_session === "string" || typeof arg.sso_region === "string" || typeof arg.sso_role_name === "string");

// ../../../../node_modules/@aws-sdk/credential-provider-sso/dist-es/resolveSSOCredentials.js
var import_client = __toESM(require_client(), 1);

// ../../../../node_modules/@aws-sdk/token-providers/dist-es/constants.js
var EXPIRE_WINDOW_MS = 5 * 60 * 1000;
var REFRESH_MESSAGE = `To refresh this SSO session run 'aws sso login' with the corresponding profile.`;

// ../../../../node_modules/@aws-sdk/token-providers/dist-es/getSsoOidcClient.js
var getSsoOidcClient = async (ssoRegion, init = {}) => {
  const { SSOOIDCClient } = await import("./chunk-rwwg678h.js");
  const ssoOidcClient = new SSOOIDCClient(Object.assign({}, init.clientConfig ?? {}, {
    region: ssoRegion ?? init.clientConfig?.region,
    logger: init.clientConfig?.logger ?? init.parentClientConfig?.logger
  }));
  return ssoOidcClient;
};

// ../../../../node_modules/@aws-sdk/token-providers/dist-es/getNewSsoOidcToken.js
var getNewSsoOidcToken = async (ssoToken, ssoRegion, init = {}) => {
  const { CreateTokenCommand } = await import("./chunk-rwwg678h.js");
  const ssoOidcClient = await getSsoOidcClient(ssoRegion, init);
  return ssoOidcClient.send(new CreateTokenCommand({
    clientId: ssoToken.clientId,
    clientSecret: ssoToken.clientSecret,
    refreshToken: ssoToken.refreshToken,
    grantType: "refresh_token"
  }));
};

// ../../../../node_modules/@aws-sdk/token-providers/dist-es/validateTokenExpiry.js
var validateTokenExpiry = (token) => {
  if (token.expiration && token.expiration.getTime() < Date.now()) {
    throw new TokenProviderError(`Token is expired. ${REFRESH_MESSAGE}`, false);
  }
};

// ../../../../node_modules/@aws-sdk/token-providers/dist-es/validateTokenKey.js
var validateTokenKey = (key, value, forRefresh = false) => {
  if (typeof value === "undefined") {
    throw new TokenProviderError(`Value not present for '${key}' in SSO Token${forRefresh ? ". Cannot refresh" : ""}. ${REFRESH_MESSAGE}`, false);
  }
};

// ../../../../node_modules/@aws-sdk/token-providers/dist-es/writeSSOTokenToFile.js
import { promises as fsPromises } from "fs";
var { writeFile } = fsPromises;
var writeSSOTokenToFile = (id, ssoToken) => {
  const tokenFilepath = getSSOTokenFilepath(id);
  const tokenString = JSON.stringify(ssoToken, null, 2);
  return writeFile(tokenFilepath, tokenString);
};

// ../../../../node_modules/@aws-sdk/token-providers/dist-es/fromSso.js
var lastRefreshAttemptTime = new Date(0);
var fromSso = (_init = {}) => async ({ callerClientConfig } = {}) => {
  const init = {
    ..._init,
    parentClientConfig: {
      ...callerClientConfig,
      ..._init.parentClientConfig
    }
  };
  init.logger?.debug("@aws-sdk/token-providers - fromSso");
  const profiles = await parseKnownFiles(init);
  const profileName = getProfileName({
    profile: init.profile ?? callerClientConfig?.profile
  });
  const profile = profiles[profileName];
  if (!profile) {
    throw new TokenProviderError(`Profile '${profileName}' could not be found in shared credentials file.`, false);
  } else if (!profile["sso_session"]) {
    throw new TokenProviderError(`Profile '${profileName}' is missing required property 'sso_session'.`);
  }
  const ssoSessionName = profile["sso_session"];
  const ssoSessions = await loadSsoSessionData(init);
  const ssoSession = ssoSessions[ssoSessionName];
  if (!ssoSession) {
    throw new TokenProviderError(`Sso session '${ssoSessionName}' could not be found in shared credentials file.`, false);
  }
  for (const ssoSessionRequiredKey of ["sso_start_url", "sso_region"]) {
    if (!ssoSession[ssoSessionRequiredKey]) {
      throw new TokenProviderError(`Sso session '${ssoSessionName}' is missing required property '${ssoSessionRequiredKey}'.`, false);
    }
  }
  const ssoStartUrl = ssoSession["sso_start_url"];
  const ssoRegion = ssoSession["sso_region"];
  let ssoToken;
  try {
    ssoToken = await getSSOTokenFromFile(ssoSessionName);
  } catch (e) {
    throw new TokenProviderError(`The SSO session token associated with profile=${profileName} was not found or is invalid. ${REFRESH_MESSAGE}`, false);
  }
  validateTokenKey("accessToken", ssoToken.accessToken);
  validateTokenKey("expiresAt", ssoToken.expiresAt);
  const { accessToken, expiresAt } = ssoToken;
  const existingToken = { token: accessToken, expiration: new Date(expiresAt) };
  if (existingToken.expiration.getTime() - Date.now() > EXPIRE_WINDOW_MS) {
    return existingToken;
  }
  if (Date.now() - lastRefreshAttemptTime.getTime() < 30 * 1000) {
    validateTokenExpiry(existingToken);
    return existingToken;
  }
  validateTokenKey("clientId", ssoToken.clientId, true);
  validateTokenKey("clientSecret", ssoToken.clientSecret, true);
  validateTokenKey("refreshToken", ssoToken.refreshToken, true);
  try {
    lastRefreshAttemptTime.setTime(Date.now());
    const newSsoOidcToken = await getNewSsoOidcToken(ssoToken, ssoRegion, init);
    validateTokenKey("accessToken", newSsoOidcToken.accessToken);
    validateTokenKey("expiresIn", newSsoOidcToken.expiresIn);
    const newTokenExpiration = new Date(Date.now() + newSsoOidcToken.expiresIn * 1000);
    try {
      await writeSSOTokenToFile(ssoSessionName, {
        ...ssoToken,
        accessToken: newSsoOidcToken.accessToken,
        expiresAt: newTokenExpiration.toISOString(),
        refreshToken: newSsoOidcToken.refreshToken
      });
    } catch (error) {}
    return {
      token: newSsoOidcToken.accessToken,
      expiration: newTokenExpiration
    };
  } catch (error) {
    validateTokenExpiry(existingToken);
    return existingToken;
  }
};

// ../../../../node_modules/@aws-sdk/credential-provider-sso/dist-es/resolveSSOCredentials.js
var SHOULD_FAIL_CREDENTIAL_CHAIN = false;
var resolveSSOCredentials = async ({ ssoStartUrl, ssoSession, ssoAccountId, ssoRegion, ssoRoleName, ssoClient, clientConfig, parentClientConfig, profile, logger }) => {
  let token;
  const refreshMessage = `To refresh this SSO session run aws sso login with the corresponding profile.`;
  if (ssoSession) {
    try {
      const _token = await fromSso({ profile })();
      token = {
        accessToken: _token.token,
        expiresAt: new Date(_token.expiration).toISOString()
      };
    } catch (e) {
      throw new CredentialsProviderError(e.message, {
        tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
        logger
      });
    }
  } else {
    try {
      token = await getSSOTokenFromFile(ssoStartUrl);
    } catch (e) {
      throw new CredentialsProviderError(`The SSO session associated with this profile is invalid. ${refreshMessage}`, {
        tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
        logger
      });
    }
  }
  if (new Date(token.expiresAt).getTime() - Date.now() <= 0) {
    throw new CredentialsProviderError(`The SSO session associated with this profile has expired. ${refreshMessage}`, {
      tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
      logger
    });
  }
  const { accessToken } = token;
  const { SSOClient, GetRoleCredentialsCommand } = await import("./chunk-evshcn86.js");
  const sso = ssoClient || new SSOClient(Object.assign({}, clientConfig ?? {}, {
    logger: clientConfig?.logger ?? parentClientConfig?.logger,
    region: clientConfig?.region ?? ssoRegion
  }));
  let ssoResp;
  try {
    ssoResp = await sso.send(new GetRoleCredentialsCommand({
      accountId: ssoAccountId,
      roleName: ssoRoleName,
      accessToken
    }));
  } catch (e) {
    throw new CredentialsProviderError(e, {
      tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
      logger
    });
  }
  const { roleCredentials: { accessKeyId, secretAccessKey, sessionToken, expiration, credentialScope, accountId } = {} } = ssoResp;
  if (!accessKeyId || !secretAccessKey || !sessionToken || !expiration) {
    throw new CredentialsProviderError("SSO returns an invalid temporary credential.", {
      tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
      logger
    });
  }
  const credentials = {
    accessKeyId,
    secretAccessKey,
    sessionToken,
    expiration: new Date(expiration),
    ...credentialScope && { credentialScope },
    ...accountId && { accountId }
  };
  if (ssoSession) {
    import_client.setCredentialFeature(credentials, "CREDENTIALS_SSO", "s");
  } else {
    import_client.setCredentialFeature(credentials, "CREDENTIALS_SSO_LEGACY", "u");
  }
  return credentials;
};

// ../../../../node_modules/@aws-sdk/credential-provider-sso/dist-es/validateSsoProfile.js
var validateSsoProfile = (profile, logger) => {
  const { sso_start_url, sso_account_id, sso_region, sso_role_name } = profile;
  if (!sso_start_url || !sso_account_id || !sso_region || !sso_role_name) {
    throw new CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", ` + `"sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(profile).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`, { tryNextLink: false, logger });
  }
  return profile;
};

// ../../../../node_modules/@aws-sdk/credential-provider-sso/dist-es/fromSSO.js
var fromSSO = (init = {}) => async ({ callerClientConfig } = {}) => {
  init.logger?.debug("@aws-sdk/credential-provider-sso - fromSSO");
  const { ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoSession } = init;
  const { ssoClient } = init;
  const profileName = getProfileName({
    profile: init.profile ?? callerClientConfig?.profile
  });
  if (!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName && !ssoSession) {
    const profiles = await parseKnownFiles(init);
    const profile = profiles[profileName];
    if (!profile) {
      throw new CredentialsProviderError(`Profile ${profileName} was not found.`, { logger: init.logger });
    }
    if (!isSsoProfile(profile)) {
      throw new CredentialsProviderError(`Profile ${profileName} is not configured with SSO credentials.`, {
        logger: init.logger
      });
    }
    if (profile?.sso_session) {
      const ssoSessions = await loadSsoSessionData(init);
      const session = ssoSessions[profile.sso_session];
      const conflictMsg = ` configurations in profile ${profileName} and sso-session ${profile.sso_session}`;
      if (ssoRegion && ssoRegion !== session.sso_region) {
        throw new CredentialsProviderError(`Conflicting SSO region` + conflictMsg, {
          tryNextLink: false,
          logger: init.logger
        });
      }
      if (ssoStartUrl && ssoStartUrl !== session.sso_start_url) {
        throw new CredentialsProviderError(`Conflicting SSO start_url` + conflictMsg, {
          tryNextLink: false,
          logger: init.logger
        });
      }
      profile.sso_region = session.sso_region;
      profile.sso_start_url = session.sso_start_url;
    }
    const { sso_start_url, sso_account_id, sso_region, sso_role_name, sso_session } = validateSsoProfile(profile, init.logger);
    return resolveSSOCredentials({
      ssoStartUrl: sso_start_url,
      ssoSession: sso_session,
      ssoAccountId: sso_account_id,
      ssoRegion: sso_region,
      ssoRoleName: sso_role_name,
      ssoClient,
      clientConfig: init.clientConfig,
      parentClientConfig: init.parentClientConfig,
      profile: profileName
    });
  } else if (!ssoStartUrl || !ssoAccountId || !ssoRegion || !ssoRoleName) {
    throw new CredentialsProviderError("Incomplete configuration. The fromSSO() argument hash must include " + '"ssoStartUrl", "ssoAccountId", "ssoRegion", "ssoRoleName"', { tryNextLink: false, logger: init.logger });
  } else {
    return resolveSSOCredentials({
      ssoStartUrl,
      ssoSession,
      ssoAccountId,
      ssoRegion,
      ssoRoleName,
      ssoClient,
      clientConfig: init.clientConfig,
      parentClientConfig: init.parentClientConfig,
      profile: profileName
    });
  }
};
export {
  validateSsoProfile,
  isSsoProfile,
  fromSSO
};
