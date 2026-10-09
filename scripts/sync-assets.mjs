#!/usr/bin/env node
/**
 * sync-assets.mjs
 * ---------------------------------------------------------------------------
 * Copies every local file referenced in `src/data/assets.js` into `public/`
 * using its `publicPath`. This maps your machine's files into the project so
 * the site is portable (deployable to Vercel / GitHub Pages).
 *
 *   npm run sync:assets          copy files
 *   npm run sync:assets -- --dry  show the plan only, copy nothing
 * ---------------------------------------------------------------------------
 */
import { existsSync, mkdirSync, copyFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  profilePhoto,
  documents,
  workSections,
} from "../src/data/assets.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const dryRun = process.argv.includes("--dry");

/** Flatten the manifest into one list of { source, destination, label }. */
const targets = [
  {
    source: profilePhoto.localPath,
    destination: profilePhoto.publicPath,
    label: "profile photo",
  },
  ...documents.map((doc) => ({
    source: doc.localPath,
    destination: doc.publicPath,
    label: doc.label,
  })),
  ...workSections.flatMap((section) =>
    section.items.map((item) => ({
      source: item.localPath,
      destination: item.publicPath,
      label: `${section.kicker} · ${item.title}`,
    })),
  ),
];

let copied = 0;
let missing = 0;

console.log("\n  Asset sync — project root:", root, "\n");

for (const target of targets) {
  const destination = join(publicDir, target.destination);

  if (!existsSync(target.source)) {
    missing += 1;
    console.log(`  MISSING  ${target.label}\n           ${target.source}`);
    continue;
  }

  const size = statSync(target.source).size;
  const kb = `${(size / 1024).toFixed(0)} kB`;

  if (dryRun) {
    console.log(`  would copy  ${kb.padStart(8)}  public/${target.destination}`);
    continue;
  }

  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(target.source, destination);
  copied += 1;
  console.log(`  copied      ${kb.padStart(8)}  public/${target.destination}`);
}

console.log(
  `\n  Done. ${copied} file(s) ${dryRun ? "would be " : ""}copied, ${missing} missing.\n`,
);

if (missing > 0) process.exitCode = 0; // report, but do not break `npm run dev`