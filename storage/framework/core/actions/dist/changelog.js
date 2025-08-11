// @bun
// src/changelog.ts
import { execSync, log, parseOptions, runCommand } from "@stacksjs/cli";
import { projectPath } from "@stacksjs/path";
log.debug("Generating changelog");
var fromRevision = await execSync("git describe --abbrev=0 --tags HEAD^");
log.debug("FromRevision", fromRevision);
var toRevision = await execSync("git describe");
log.debug("ToRevision", toRevision);
var options = parseOptions();
log.debug("Changelog Options", options);
var command = options?.dryRun ? `bunx --bun changelogen --no-output --from ${fromRevision} --to ${toRevision}` : `bunx --bun changelogen --output CHANGELOG.md --from ${fromRevision} --to ${toRevision}`;
await runCommand(command, {
  cwd: projectPath(),
  quiet: options?.quiet,
  verbose: options?.verbose
});
