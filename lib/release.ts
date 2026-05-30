// Single source of truth for the current AndSpace release.
// Bump `version` + `tag` (and the asset name in `dmgUrl`) when you ship.
export const RELEASE = {
  version: "0.1.0-alpha.9",
  tag: "v0.1.0-alpha.9",
  repoUrl: "https://github.com/SetFodi/Andspace",
  releasesUrl: "https://github.com/SetFodi/Andspace/releases",
  issuesUrl: "https://github.com/SetFodi/Andspace/issues",
  dmgUrl:
    "https://github.com/SetFodi/Andspace/releases/download/v0.1.0-alpha.9/AndSpace_0.1.0-alpha.9_aarch64.dmg",
} as const;
