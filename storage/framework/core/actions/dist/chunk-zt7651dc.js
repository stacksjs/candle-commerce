// @bun
import {
  getProfileName,
  parseKnownFiles
} from "./chunk-0be2fzx4.js";
import {
  CredentialsProviderError,
  chain
} from "./chunk-zzerxbrm.js";
import"./chunk-0rra9d59.js";
import {
  require_client
} from "./chunk-n2a7wn2k.js";
import {
  __require,
  __toESM
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveAssumeRoleCredentials.js
var import_client2 = __toESM(require_client(), 1);

// ../../../../node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveCredentialSource.js
var import_client = __toESM(require_client(), 1);
var resolveCredentialSource = (credentialSource, profileName, logger) => {
  const sourceProvidersMap = {
    EcsContainer: async (options) => {
      const { fromHttp } = await import("./chunk-x8nx8t5t.js");
      const { fromContainerMetadata } = await import("./chunk-m77xmx5w.js");
      logger?.debug("@aws-sdk/credential-provider-ini - credential_source is EcsContainer");
      return async () => chain(fromHttp(options ?? {}), fromContainerMetadata(options))().then(setNamedProvider);
    },
    Ec2InstanceMetadata: async (options) => {
      logger?.debug("@aws-sdk/credential-provider-ini - credential_source is Ec2InstanceMetadata");
      const { fromInstanceMetadata } = await import("./chunk-m77xmx5w.js");
      return async () => fromInstanceMetadata(options)().then(setNamedProvider);
    },
    Environment: async (options) => {
      logger?.debug("@aws-sdk/credential-provider-ini - credential_source is Environment");
      const { fromEnv } = await import("./chunk-9r6v3pex.js");
      return async () => fromEnv(options)().then(setNamedProvider);
    }
  };
  if (credentialSource in sourceProvidersMap) {
    return sourceProvidersMap[credentialSource];
  } else {
    throw new CredentialsProviderError(`Unsupported credential source in profile ${profileName}. Got ${credentialSource}, expected EcsContainer or Ec2InstanceMetadata or Environment.`, { logger });
  }
};
var setNamedProvider = (creds) => import_client.setCredentialFeature(creds, "CREDENTIALS_PROFILE_NAMED_PROVIDER", "p");

// ../../../../node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveAssumeRoleCredentials.js
var isAssumeRoleProfile = (arg, { profile = "default", logger } = {}) => {
  return Boolean(arg) && typeof arg === "object" && typeof arg.role_arn === "string" && ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1 && ["undefined", "string"].indexOf(typeof arg.external_id) > -1 && ["undefined", "string"].indexOf(typeof arg.mfa_serial) > -1 && (isAssumeRoleWithSourceProfile(arg, { profile, logger }) || isCredentialSourceProfile(arg, { profile, logger }));
};
var isAssumeRoleWithSourceProfile = (arg, { profile, logger }) => {
  const withSourceProfile = typeof arg.source_profile === "string" && typeof arg.credential_source === "undefined";
  if (withSourceProfile) {
    logger?.debug?.(`    ${profile} isAssumeRoleWithSourceProfile source_profile=${arg.source_profile}`);
  }
  return withSourceProfile;
};
var isCredentialSourceProfile = (arg, { profile, logger }) => {
  const withProviderProfile = typeof arg.credential_source === "string" && typeof arg.source_profile === "undefined";
  if (withProviderProfile) {
    logger?.debug?.(`    ${profile} isCredentialSourceProfile credential_source=${arg.credential_source}`);
  }
  return withProviderProfile;
};
var resolveAssumeRoleCredentials = async (profileName, profiles, options, visitedProfiles = {}) => {
  options.logger?.debug("@aws-sdk/credential-provider-ini - resolveAssumeRoleCredentials (STS)");
  const profileData = profiles[profileName];
  const { source_profile, region } = profileData;
  if (!options.roleAssumer) {
    const { getDefaultRoleAssumer } = await import("./chunk-nax3fcx2.js");
    options.roleAssumer = getDefaultRoleAssumer({
      ...options.clientConfig,
      credentialProviderLogger: options.logger,
      parentClientConfig: {
        ...options?.parentClientConfig,
        region: region ?? options?.parentClientConfig?.region
      }
    }, options.clientPlugins);
  }
  if (source_profile && source_profile in visitedProfiles) {
    throw new CredentialsProviderError(`Detected a cycle attempting to resolve credentials for profile ${getProfileName(options)}. Profiles visited: ` + Object.keys(visitedProfiles).join(", "), { logger: options.logger });
  }
  options.logger?.debug(`@aws-sdk/credential-provider-ini - finding credential resolver using ${source_profile ? `source_profile=[${source_profile}]` : `profile=[${profileName}]`}`);
  const sourceCredsProvider = source_profile ? resolveProfileData(source_profile, profiles, options, {
    ...visitedProfiles,
    [source_profile]: true
  }, isCredentialSourceWithoutRoleArn(profiles[source_profile] ?? {})) : (await resolveCredentialSource(profileData.credential_source, profileName, options.logger)(options))();
  if (isCredentialSourceWithoutRoleArn(profileData)) {
    return sourceCredsProvider.then((creds) => import_client2.setCredentialFeature(creds, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
  } else {
    const params = {
      RoleArn: profileData.role_arn,
      RoleSessionName: profileData.role_session_name || `aws-sdk-js-${Date.now()}`,
      ExternalId: profileData.external_id,
      DurationSeconds: parseInt(profileData.duration_seconds || "3600", 10)
    };
    const { mfa_serial } = profileData;
    if (mfa_serial) {
      if (!options.mfaCodeProvider) {
        throw new CredentialsProviderError(`Profile ${profileName} requires multi-factor authentication, but no MFA code callback was provided.`, { logger: options.logger, tryNextLink: false });
      }
      params.SerialNumber = mfa_serial;
      params.TokenCode = await options.mfaCodeProvider(mfa_serial);
    }
    const sourceCreds = await sourceCredsProvider;
    return options.roleAssumer(sourceCreds, params).then((creds) => import_client2.setCredentialFeature(creds, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
  }
};
var isCredentialSourceWithoutRoleArn = (section) => {
  return !section.role_arn && !!section.credential_source;
};

// ../../../../node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveProcessCredentials.js
var import_client3 = __toESM(require_client(), 1);
var isProcessProfile = (arg) => Boolean(arg) && typeof arg === "object" && typeof arg.credential_process === "string";
var resolveProcessCredentials = async (options, profile) => import("./chunk-7dm62vrk.js").then(({ fromProcess }) => fromProcess({
  ...options,
  profile
})().then((creds) => import_client3.setCredentialFeature(creds, "CREDENTIALS_PROFILE_PROCESS", "v")));

// ../../../../node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveSsoCredentials.js
var import_client4 = __toESM(require_client(), 1);
var resolveSsoCredentials = async (profile, profileData, options = {}) => {
  const { fromSSO } = await import("./chunk-6375g4yz.js");
  return fromSSO({
    profile,
    logger: options.logger,
    parentClientConfig: options.parentClientConfig,
    clientConfig: options.clientConfig
  })().then((creds) => {
    if (profileData.sso_session) {
      return import_client4.setCredentialFeature(creds, "CREDENTIALS_PROFILE_SSO", "r");
    } else {
      return import_client4.setCredentialFeature(creds, "CREDENTIALS_PROFILE_SSO_LEGACY", "t");
    }
  });
};
var isSsoProfile = (arg) => arg && (typeof arg.sso_start_url === "string" || typeof arg.sso_account_id === "string" || typeof arg.sso_session === "string" || typeof arg.sso_region === "string" || typeof arg.sso_role_name === "string");

// ../../../../node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveStaticCredentials.js
var import_client5 = __toESM(require_client(), 1);
var isStaticCredsProfile = (arg) => Boolean(arg) && typeof arg === "object" && typeof arg.aws_access_key_id === "string" && typeof arg.aws_secret_access_key === "string" && ["undefined", "string"].indexOf(typeof arg.aws_session_token) > -1 && ["undefined", "string"].indexOf(typeof arg.aws_account_id) > -1;
var resolveStaticCredentials = async (profile, options) => {
  options?.logger?.debug("@aws-sdk/credential-provider-ini - resolveStaticCredentials");
  const credentials = {
    accessKeyId: profile.aws_access_key_id,
    secretAccessKey: profile.aws_secret_access_key,
    sessionToken: profile.aws_session_token,
    ...profile.aws_credential_scope && { credentialScope: profile.aws_credential_scope },
    ...profile.aws_account_id && { accountId: profile.aws_account_id }
  };
  return import_client5.setCredentialFeature(credentials, "CREDENTIALS_PROFILE", "n");
};

// ../../../../node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveWebIdentityCredentials.js
var import_client6 = __toESM(require_client(), 1);
var isWebIdentityProfile = (arg) => Boolean(arg) && typeof arg === "object" && typeof arg.web_identity_token_file === "string" && typeof arg.role_arn === "string" && ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1;
var resolveWebIdentityCredentials = async (profile, options) => import("./chunk-6ycs9vyj.js").then(({ fromTokenFile }) => fromTokenFile({
  webIdentityTokenFile: profile.web_identity_token_file,
  roleArn: profile.role_arn,
  roleSessionName: profile.role_session_name,
  roleAssumerWithWebIdentity: options.roleAssumerWithWebIdentity,
  logger: options.logger,
  parentClientConfig: options.parentClientConfig
})().then((creds) => import_client6.setCredentialFeature(creds, "CREDENTIALS_PROFILE_STS_WEB_ID_TOKEN", "q")));

// ../../../../node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveProfileData.js
var resolveProfileData = async (profileName, profiles, options, visitedProfiles = {}, isAssumeRoleRecursiveCall = false) => {
  const data = profiles[profileName];
  if (Object.keys(visitedProfiles).length > 0 && isStaticCredsProfile(data)) {
    return resolveStaticCredentials(data, options);
  }
  if (isAssumeRoleRecursiveCall || isAssumeRoleProfile(data, { profile: profileName, logger: options.logger })) {
    return resolveAssumeRoleCredentials(profileName, profiles, options, visitedProfiles);
  }
  if (isStaticCredsProfile(data)) {
    return resolveStaticCredentials(data, options);
  }
  if (isWebIdentityProfile(data)) {
    return resolveWebIdentityCredentials(data, options);
  }
  if (isProcessProfile(data)) {
    return resolveProcessCredentials(options, profileName);
  }
  if (isSsoProfile(data)) {
    return await resolveSsoCredentials(profileName, data, options);
  }
  throw new CredentialsProviderError(`Could not resolve credentials using profile: [${profileName}] in configuration/credentials file(s).`, { logger: options.logger });
};

// ../../../../node_modules/@aws-sdk/credential-provider-ini/dist-es/fromIni.js
var fromIni = (_init = {}) => async ({ callerClientConfig } = {}) => {
  const init = {
    ..._init,
    parentClientConfig: {
      ...callerClientConfig,
      ..._init.parentClientConfig
    }
  };
  init.logger?.debug("@aws-sdk/credential-provider-ini - fromIni");
  const profiles = await parseKnownFiles(init);
  return resolveProfileData(getProfileName({
    profile: _init.profile ?? callerClientConfig?.profile
  }), profiles, init);
};
export {
  fromIni
};
