// Generic monthly devotional importer — reusable every month, no code changes needed.
//
// Usage:
//   1. Add SANITY_API_TOKEN (Editor permission, from sanity.io/manage → API → Tokens) to .env.local
//   2. Prepare a data file exporting `DEVOTIONALS` — see scripts/devotionals-data/2026-07.mjs
//      for the reference example and field shapes.
//   3. node --env-file=.env.local scripts/import-devotionals.mjs scripts/devotionals-data/<file>.mjs
//
// Safe to re-run — each document has a deterministic _id and is written with
// createOrReplace, so re-running just overwrites that month's documents.

import path from "path";
import { pathToFileURL } from "url";
import { importDevotionals } from "./lib/sanity-devotional-import.mjs";

const fileArg = process.argv[2];

if (!fileArg) {
  console.error(
    "Usage: node --env-file=.env.local scripts/import-devotionals.mjs scripts/devotionals-data/<file>.mjs"
  );
  process.exit(1);
}

const dataPath = pathToFileURL(path.resolve(process.cwd(), fileArg)).href;

const { DEVOTIONALS } = await import(dataPath);

if (!Array.isArray(DEVOTIONALS)) {
  throw new Error(`${fileArg} must export a "DEVOTIONALS" array.`);
}

await importDevotionals(DEVOTIONALS).catch((err) => {
  console.error("Import failed:", err.message);
  process.exit(1);
});
