import process from 'node:process';
import { x, NonZeroExitError } from 'tinyexec';
import { l as loadBumpConfig, i as isReleaseType, b as bumpConfigDefaults, v as versionBump, P as ProgressEvent, s as symbols } from './shared/bumpp.CUOJsIOV.mjs';
import c from 'ansis';
import cac from 'cac';
import { valid } from 'semver';
import 'args-tokenizer';
import 'readline';
import 'events';
import 'node:child_process';
import 'node:fs';
import 'node:path';
import 'jsonc-parser';
import 'node:fs/promises';
import 'tinyglobby';
import 'yaml';
import 'c12';
import 'escalade/sync';

var ExitCode = /* @__PURE__ */ ((ExitCode2) => {
  ExitCode2[ExitCode2["Success"] = 0] = "Success";
  ExitCode2[ExitCode2["FatalError"] = 1] = "FatalError";
  ExitCode2[ExitCode2["InvalidArgument"] = 9] = "InvalidArgument";
  return ExitCode2;
})(ExitCode || {});

const version = "10.1.1";

async function parseArgs() {
  try {
    const { args, resultArgs } = loadCliArgs();
    const parsedArgs = {
      help: args.help,
      version: args.version,
      quiet: args.quiet,
      options: await loadBumpConfig({
        preid: args.preid,
        commit: args.commit,
        tag: args.tag,
        sign: args.sign,
        push: args.push,
        all: args.all,
        noGitCheck: args.noGitCheck,
        confirm: !args.yes,
        noVerify: !args.verify,
        install: args.install,
        files: [...args["--"] || [], ...resultArgs],
        ignoreScripts: args.ignoreScripts,
        currentVersion: args.currentVersion,
        execute: args.execute,
        printCommits: args.printCommits,
        recursive: args.recursive
      })
    };
    if (parsedArgs.options.files && parsedArgs.options.files.length > 0) {
      const firstArg = parsedArgs.options.files[0];
      if (firstArg === "prompt" || isReleaseType(firstArg) || valid(firstArg)) {
        parsedArgs.options.release = firstArg;
        parsedArgs.options.files.shift();
      }
    }
    if (parsedArgs.options.recursive && parsedArgs.options.files?.length)
      console.log(c.yellow("The --recursive option is ignored when files are specified"));
    return parsedArgs;
  } catch (error) {
    return errorHandler$1(error);
  }
}
function loadCliArgs(argv = process.argv) {
  const cli = cac("bumpp");
  cli.version(version).usage("[...files]").option("--preid <preid>", "ID for prerelease").option("--all", `Include all files (default: ${bumpConfigDefaults.all})`).option("--no-git-check", `Skip git check`, { default: bumpConfigDefaults.noGitCheck }).option("-c, --commit [msg]", "Commit message", { default: true }).option("--no-commit", "Skip commit", { default: false }).option("-t, --tag [tag]", "Tag name", { default: true }).option("--no-tag", "Skip tag", { default: false }).option("--sign", "Sign commit and tag").option("--install", `Run 'npm install' after bumping version (default: ${bumpConfigDefaults.install})`, { default: false }).option("-p, --push", `Push to remote (default: ${bumpConfigDefaults.push})`).option("-y, --yes", `Skip confirmation (default: ${!bumpConfigDefaults.confirm})`).option("-r, --recursive", `Bump package.json files recursively (default: ${bumpConfigDefaults.recursive})`).option("--no-verify", "Skip git verification").option("--ignore-scripts", `Ignore scripts (default: ${bumpConfigDefaults.ignoreScripts})`).option("-q, --quiet", "Quiet mode").option("--current-version <version>", "Current version").option("--print-commits", "Print recent commits").option("-x, --execute <command>", "Commands to execute after version bumps").help();
  const result = cli.parse(argv);
  const rawArgs = cli.rawArgs;
  const args = result.options;
  const COMMIT_REG = /(?:-c|--commit|--no-commit)(?:=.*|$)/;
  const TAG_REG = /(?:-t|--tag|--no-tag)(?:=.*|$)/;
  const hasCommitFlag = rawArgs.some((arg) => COMMIT_REG.test(arg));
  const hasTagFlag = rawArgs.some((arg) => TAG_REG.test(arg));
  const { tag, commit, ...rest } = args;
  return {
    args: {
      ...rest,
      commit: hasCommitFlag ? commit : void 0,
      tag: hasTagFlag ? tag : void 0
    },
    resultArgs: result.args
  };
}
function errorHandler$1(error) {
  console.error(error.message);
  return process.exit(ExitCode.InvalidArgument);
}

async function main() {
  try {
    process.on("uncaughtException", errorHandler);
    process.on("unhandledRejection", errorHandler);
    const { help, version, quiet, options } = await parseArgs();
    if (help || version) {
      process.exit(ExitCode.Success);
    } else {
      if (!options.all && !options.noGitCheck) {
        await checkGitStatus();
      }
      if (!quiet)
        options.progress = options.progress ? options.progress : progress;
      await versionBump(options);
    }
  } catch (error) {
    errorHandler(error);
  }
}
async function checkGitStatus() {
  const { stdout } = await x("git", ["status", "--porcelain"]);
  if (stdout.trim()) {
    throw new Error(`Git working tree is not clean:
${stdout}`);
  }
}
function progress({ event, script, updatedFiles, skippedFiles, newVersion }) {
  switch (event) {
    case ProgressEvent.FileUpdated:
      console.log(symbols.success, `Updated ${updatedFiles.pop()} to ${newVersion}`);
      break;
    case ProgressEvent.FileSkipped:
      console.log(symbols.info, `${skippedFiles.pop()} did not need to be updated`);
      break;
    case ProgressEvent.GitCommit:
      console.log(symbols.success, "Git commit");
      break;
    case ProgressEvent.GitTag:
      console.log(symbols.success, "Git tag");
      break;
    case ProgressEvent.GitPush:
      console.log(symbols.success, "Git push");
      break;
    case ProgressEvent.NpmScript:
      console.log(symbols.success, `Npm run ${script}`);
      break;
  }
}
function errorHandler(error) {
  let message = error.message || String(error);
  if (error instanceof NonZeroExitError)
    message += `

${error.output?.stderr || ""}`;
  if (process.env.DEBUG || process.env.NODE_ENV === "development")
    message += `

${error.stack || ""}`;
  console.error(message);
  process.exit(ExitCode.FatalError);
}

export { checkGitStatus, main };
