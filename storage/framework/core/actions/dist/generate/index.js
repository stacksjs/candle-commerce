// @bun
import"../chunk-0gc6v0f2.js";
import {
  route
} from "../chunk-n15ser40.js";
import"../chunk-3c1jpby0.js";
import"../chunk-w88kkvg9.js";
import"../chunk-b9x6g0z3.js";
import"../chunk-wnsa83r3.js";
import"../chunk-9xtmc45q.js";
import"../chunk-acrzjgsw.js";
import"../chunk-zzerxbrm.js";
import"../chunk-a6zghhmf.js";
import"../chunk-nxefcthm.js";
import"../chunk-yy4683da.js";
import"../chunk-1mr9ryxr.js";
import {
  generateVsCodeCustomData
} from "../helpers/vscode-custom-data.js";
import"../chunk-r0f7edw2.js";
import"../chunk-494jp8d5.js";
import {
  generateModelFiles
} from "../chunk-kmvsfpmq.js";
import"../chunk-31w5ygdv.js";
import"../chunk-xjn4vpw3.js";
import"../chunk-3vsmxw3t.js";
import"../chunk-6dza9hpj.js";
import"../chunk-mffax2kj.js";
import"../chunk-5y2n067z.js";
import"../chunk-ze46550n.js";
import {
  runAction
} from "../helpers/utils.js";
import"../chunk-tsfemdz5.js";

// src/generate/index.ts
import process from "process";

// ../api/src/fetcher.ts
class FetcherResponseImpl {
  data;
  status;
  headers;
  isOk;
  constructor(data, status, headers, isOk) {
    this.data = data;
    this.status = status;
    this.headers = headers;
    this.isOk = isOk;
  }
  ok() {
    return this.status === 200;
  }
  created() {
    return this.status === 201;
  }
  accepted() {
    return this.status === 202;
  }
  noContent() {
    return this.status === 204;
  }
  movedPermanently() {
    return this.status === 301;
  }
  found() {
    return this.status === 302;
  }
  badRequest() {
    return this.status === 400;
  }
  unauthorized() {
    return this.status === 401;
  }
  paymentRequired() {
    return this.status === 402;
  }
  forbidden() {
    return this.status === 403;
  }
  notFound() {
    return this.status === 404;
  }
  requestTimeout() {
    return this.status === 408;
  }
  conflict() {
    return this.status === 409;
  }
  unprocessableEntity() {
    return this.status === 422;
  }
  tooManyRequests() {
    return this.status === 429;
  }
  serverError() {
    return this.status === 500;
  }
}

class Fetcher {
  defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  queryParams;
  bodyData;
  isFormData = false;
  customHeaders = {};
  attachments = [];
  isMultipart = false;
  digestAuth;
  withQueryParams(params) {
    this.queryParams = params;
    return this;
  }
  withHeaders(headers) {
    this.customHeaders = { ...this.customHeaders, ...headers };
    return this;
  }
  accept(contentType) {
    this.defaultHeaders.Accept = contentType;
    return this;
  }
  acceptJson() {
    return this.accept("application/json");
  }
  withToken(token) {
    this.customHeaders.Authorization = `Bearer ${token}`;
    return this;
  }
  withBasicAuth(username, password) {
    const credentials = btoa(`${username}:${password}`);
    this.customHeaders.Authorization = `Basic ${credentials}`;
    return this;
  }
  withDigestAuth(username, password) {
    this.digestAuth = { username, password };
    return this;
  }
  withBody(data) {
    this.bodyData = data;
    return this;
  }
  asForm() {
    this.isFormData = true;
    this.defaultHeaders["Content-Type"] = "application/x-www-form-urlencoded";
    return this;
  }
  attach(name, content, filename, headers) {
    const blobContent = typeof content === "string" ? new Blob([content], { type: headers?.["Content-Type"] || "text/plain" }) : content;
    this.attachments.push({
      name,
      content: blobContent,
      filename,
      headers
    });
    this.isMultipart = true;
    delete this.defaultHeaders["Content-Type"];
    return this;
  }
  getHeaders() {
    return {
      ...this.defaultHeaders,
      ...this.customHeaders
    };
  }
  addQueryParams(url) {
    if (!this.queryParams)
      return url;
    const searchParams = new URLSearchParams;
    Object.entries(this.queryParams).forEach(([key, value]) => {
      if (value != null)
        searchParams.append(key, String(value));
    });
    const queryString = searchParams.toString();
    if (!queryString)
      return url;
    const hasParams = url.includes("?");
    return url + (hasParams ? "&" : "?") + queryString;
  }
  async formatBody(body) {
    const finalBody = body || this.bodyData;
    if (this.isMultipart) {
      const formData = new FormData;
      if (finalBody) {
        Object.entries(finalBody).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
      }
      for (const attachment of this.attachments) {
        if (attachment.headers) {
          const blob = attachment.content instanceof Blob ? new Blob([attachment.content], { type: attachment.headers["Content-Type"] }) : attachment.content;
          formData.append(attachment.name, blob, attachment.filename);
        } else {
          formData.append(attachment.name, attachment.content, attachment.filename);
        }
      }
      return formData;
    }
    if (this.isFormData && finalBody) {
      const formData = new URLSearchParams;
      Object.entries(finalBody).forEach(([key, value]) => {
        if (value != null)
          formData.append(key, String(value));
      });
      return formData.toString();
    }
    return finalBody ? JSON.stringify(finalBody) : undefined;
  }
  resetState() {
    this.queryParams = undefined;
    this.bodyData = undefined;
    this.isFormData = false;
    this.isMultipart = false;
    this.customHeaders = {};
    this.attachments = [];
    this.digestAuth = undefined;
    this.defaultHeaders["Content-Type"] = "application/json";
  }
  async handleDigestAuth(response, url, method, body) {
    if (response.status !== 401 || !this.digestAuth)
      return response;
    const authHeader = response.headers.get("WWW-Authenticate");
    if (!authHeader?.startsWith("Digest "))
      return response;
    const challenge = authHeader.substring(7).split(",").reduce((acc, part) => {
      const [key, value] = part.trim().split("=");
      acc[key] = value?.replace(/["']/g, "");
      return acc;
    }, {});
    const ha1 = await this.generateMD5(`${this.digestAuth.username}:${challenge.realm}:${this.digestAuth.password}`);
    const ha2 = await this.generateMD5(`${method}:${url}`);
    const nonceCount = "00000001";
    const cnonce = await this.generateMD5(Date.now().toString()).then((hash) => hash.substring(0, 8));
    const response_value = await this.generateMD5(`${ha1}:${challenge.nonce}:${nonceCount}:${cnonce}:${challenge.qop}:${ha2}`);
    const digestResponse = {
      username: `"${this.digestAuth.username}"`,
      realm: `"${challenge.realm}"`,
      nonce: `"${challenge.nonce}"`,
      uri: `"${url}"`,
      algorithm: challenge.algorithm ? `"${challenge.algorithm}"` : undefined,
      qop: `"${challenge.qop}"`,
      nc: nonceCount,
      cnonce: `"${cnonce}"`,
      response: `"${response_value}"`,
      opaque: challenge.opaque ? `"${challenge.opaque}"` : undefined
    };
    const authValue = Object.entries(digestResponse).filter(([_, value]) => value !== undefined).map(([key, value]) => `${key}=${value}`).join(", ");
    this.customHeaders.Authorization = `Digest ${authValue}`;
    return fetch(url, {
      method,
      headers: this.getHeaders(),
      body: body ? this.formatBody(body) : undefined
    });
  }
  async generateMD5(str) {
    const encoder = new TextEncoder;
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  async request(url, method, body) {
    const urlWithParams = this.addQueryParams(url);
    const formattedBody = await this.formatBody(body);
    let response = await fetch(urlWithParams, {
      method,
      headers: this.getHeaders(),
      body: formattedBody
    });
    if (this.digestAuth) {
      response = await this.handleDigestAuth(response, urlWithParams, method, body);
    }
    const data = await response.json();
    this.resetState();
    return new FetcherResponseImpl(data, response.status, response.headers, response.ok);
  }
  async get(url) {
    return this.request(url, "GET");
  }
  async post(url, body) {
    return this.request(url, "POST", body);
  }
  async put(url, body) {
    return this.request(url, "PUT", body);
  }
  async patch(url, body) {
    return this.request(url, "PATCH", body);
  }
  async delete(url) {
    return this.request(url, "DELETE");
  }
}
var fetcher = new Fetcher;
// ../api/src/generate-openapi.ts
import { path } from "@stacksjs/path";
async function generateOpenApi() {
  const routeLists = await route.getRoutes();
  const openAPISpec = {
    openapi: "3.0.0",
    info: {
      title: "Generated API",
      version: "1.0.0"
    },
    paths: {},
    components: {
      schemas: {}
    }
  };
  routeLists.forEach((route2) => {
    const path2 = route2.url.replace(/\{([^}]+)\}/g, "{$1}");
    if (!openAPISpec.paths[path2]) {
      openAPISpec.paths[path2] = {};
    }
    openAPISpec.paths[path2][route2.method.toLowerCase()] = {
      summary: route2.name,
      operationId: route2.callback,
      parameters: route2.paramNames.map((param) => ({
        name: param,
        in: "path",
        required: true,
        schema: {
          type: "string"
        }
      })),
      responses: {
        [route2.statusCode]: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {}
              }
            }
          }
        }
      }
    };
    if (route2.responseSchema) {
      const schemaName = `${route2.name.replace(/\./g, "")}Response`;
      openAPISpec.components.schemas[schemaName] = route2.responseSchema;
      openAPISpec.paths[path2][route2.method.toLowerCase()].responses[route2.statusCode].content["application/json"].schema = {
        $ref: `#/components/schemas/${schemaName}`
      };
    }
    if (route2.requestSchema) {
      const schemaName = `${route2.name.replace(/\./g, "")}Request`;
      openAPISpec.components.schemas[schemaName] = route2.requestSchema;
      openAPISpec.paths[path2][route2.method.toLowerCase()].requestBody.content["application/json"].schema = {
        $ref: `#/components/schemas/${schemaName}`
      };
    }
  });
  const file = Bun.file(path.frameworkPath(`api/openapi.json`));
  const writer = file.writer();
  writer.write(JSON.stringify(openAPISpec));
  await writer.end();
}
// src/generate/index.ts
import { runCommand } from "@stacksjs/cli";
import { Action, NpmScript } from "@stacksjs/enums";
import { log } from "@stacksjs/logging";
import { frameworkPath, projectPath } from "@stacksjs/path";
import { runNpmScript } from "@stacksjs/utils";
async function invoke(options) {
  if (options?.types)
    await generateTypes(options);
  else if (options?.entries)
    await generateLibEntries(options);
  else if (options?.webTypes)
    await generateWebTypes(options);
  else if (options?.customData)
    await generateVsCodeCustomData2();
  else if (options?.ideHelpers)
    await generateIdeHelpers(options);
  else if (options?.componentMeta)
    await generateComponentMeta();
  else if (options?.coreSymlink)
    await generateCoreSymlink();
  else if (options?.modelFiles)
    await generateModelFiles();
  else if (options?.openApiSpec)
    await generateOpenApiSpec();
}
function generate(options) {
  return invoke(options);
}
async function generateLibEntries(options) {
  const result = await runAction(Action.GenerateLibraryEntries, {
    ...options,
    cwd: projectPath()
  });
  if (result.isErr()) {
    log.error("There was an error generating your library entry points", result.error);
    process.exit();
  }
  log.success("Library entry points generated successfully");
}
async function generateWebTypes(options) {
  const result = await runNpmScript(NpmScript.GenerateWebTypes, options);
  if (result.isErr()) {
    log.error("There was an error generating the web-types.json file.", result.error);
    process.exit();
  }
  log.success("Successfully generated the web-types.json file");
}
async function generateVsCodeCustomData2() {
  const result = await generateVsCodeCustomData();
  if (result.isErr()) {
    log.error("There was an error generating the custom-elements.json file.", result.error);
    process.exit();
  }
  await runAction(Action.LintFix, { verbose: true, cwd: projectPath() });
  log.success("Successfully generated the custom-elements.json file");
}
async function generateIdeHelpers(options) {
  const result = await runNpmScript(NpmScript.GenerateIdeHelpers, options);
  if (result.isErr()) {
    log.error("There was an error generating IDE helpers.", result.error);
    process.exit();
  }
  await runAction(Action.LintFix, { verbose: true, cwd: projectPath() });
  log.success("Successfully generated IDE helpers");
}
async function generateComponentMeta() {
  const result = await generateVsCodeCustomData();
  if (result.isErr()) {
    log.error("There was an error generating your component meta information.", result.error);
    process.exit();
  }
  await runAction(Action.LintFix, { verbose: true, cwd: projectPath() });
  log.success("Successfully generated component meta information");
}
async function generateTypes(options) {
  const result = await runNpmScript(NpmScript.GenerateTypes, {
    cwd: frameworkPath(),
    ...options
  });
  if (result.isErr()) {
    log.error("There was an error generating your types.", result.error);
    process.exit();
  }
  log.success("Types were generated successfully");
}
function generatePkgxConfig() {
  log.success("Successfully generated `./pkgx.yaml` based on your config");
}
async function generateSeeder() {}
async function generateCoreSymlink() {
  await runCommand(`ln -s ${frameworkPath()} ${projectPath(".stacks")}`);
}
async function generateOpenApiSpec() {
  await generateOpenApi();
  log.success("Successfully generated Open API Spec");
}
export {
  invoke,
  generateWebTypes,
  generateVsCodeCustomData2 as generateVsCodeCustomData,
  generateTypes,
  generateSeeder,
  generatePkgxConfig,
  generateOpenApiSpec,
  generateLibEntries,
  generateIdeHelpers,
  generateCoreSymlink,
  generateComponentMeta,
  generate
};

export { invoke, generate, generateLibEntries, generateWebTypes, generateVsCodeCustomData2 as generateVsCodeCustomData, generateIdeHelpers, generateComponentMeta, generateTypes, generatePkgxConfig, generateSeeder, generateCoreSymlink, generateOpenApiSpec };
