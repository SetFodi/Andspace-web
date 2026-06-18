// Single source of truth for the current AndSpace release.
// Bump `version` + `tag` (and the asset name in `dmgUrl`) when you ship.
export const RELEASE = {
  version: "0.1.0-beta.3",
  tag: "v0.1.0-beta.3",
  repoUrl: "https://github.com/SetFodi/Andspace",
  releasesUrl: "https://github.com/SetFodi/Andspace/releases",
  tagUrl: "https://github.com/SetFodi/Andspace/releases/tag/v0.1.0-beta.3",
  issuesUrl: "https://github.com/SetFodi/Andspace/issues",
  dmgUrl:
    "https://github.com/SetFodi/Andspace/releases/download/v0.1.0-beta.3/AndSpace_0.1.0-beta.3_aarch64.dmg",
} as const;
