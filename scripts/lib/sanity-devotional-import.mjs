// Shared logic for turning a month's worth of devotional data into Sanity
// "devotional" documents. Used by scripts/import-devotionals.mjs — not meant
// to be run directly.

import { createClient } from "@sanity/client";

function getClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-01";
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID (check .env.local).");
  }
  if (!token) {
    throw new Error(
      "Missing SANITY_API_TOKEN. Create one at https://www.sanity.io/manage (your project → API → Tokens → " +
        "Add API token → Editor permission), then add SANITY_API_TOKEN=... to .env.local and re-run."
    );
  }

  return { client: createClient({ projectId, dataset, apiVersion, token, useCdn: false }), dataset };
}

function key() {
  return Math.random().toString(36).slice(2, 10);
}

function block(text, style = "normal") {
  return {
    _key: key(),
    _type: "block",
    style,
    markDefs: [],
    children: [{ _key: key(), _type: "span", text, marks: [] }],
  };
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['".,!?;:()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function excerptFrom(text) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 197) return clean;
  return clean.slice(0, 197).replace(/\s+\S*$/, "") + "…";
}

function readTimeFor(paragraphs) {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.min(30, Math.max(1, Math.round(words / 200)));
}

function validate(d, index) {
  const label = d?.date ? d.date : `entry #${index + 1}`;
  const required = ["date", "title", "scripture", "verseText", "discussion"];
  for (const field of required) {
    if (!d?.[field] || (field === "discussion" && !Array.isArray(d.discussion))) {
      throw new Error(`${label}: missing required field "${field}"`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date)) {
    throw new Error(`${label}: date must be in YYYY-MM-DD form, got "${d.date}"`);
  }
  if (d.discussion.length === 0) {
    throw new Error(`${label}: discussion[] must have at least one paragraph`);
  }
}

/**
 * Imports an array of devotional-day objects into Sanity as "devotional"
 * documents. Each object: { date, title, scripture, verseText, discussion[],
 * confession?, pray?, meditationScripture?, meditationText?, action? }.
 *
 * Idempotent — uses a deterministic _id (`devotional-<date>`) and
 * createOrReplace, so re-running just overwrites the same documents.
 */
export async function importDevotionals(devotionals) {
  devotionals.forEach(validate);

  const { client, dataset } = getClient();
  console.log(`Importing ${devotionals.length} devotionals into dataset "${dataset}"...`);

  for (const d of devotionals) {
    const content = d.discussion.map((p) => block(p));

    if (d.action) {
      content.push(block("Action", "h3"));
      content.push(block(d.action));
    }

    const doc = {
      _id: `devotional-${d.date}`,
      _type: "devotional",
      title: d.title,
      slug: { _type: "slug", current: slugify(d.title) },
      publishedAt: `${d.date}T06:00:00+01:00`,
      scripture: d.scripture,
      verseText: d.verseText,
      excerpt: excerptFrom(d.discussion[0]),
      content,
      readTime: readTimeFor(d.discussion),
      confession: d.confession,
      pray: d.pray,
      meditationScripture: d.meditationScripture,
      meditationText: d.meditationText,
      featured: false,
    };

    Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k]);

    await client.createOrReplace(doc);
    console.log(`  ✓ ${d.date} — ${d.title}`);
  }

  console.log(`Done. All ${devotionals.length} devotionals are live in Sanity.`);
}
