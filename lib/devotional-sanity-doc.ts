// Builds a Sanity "devotional" document from a parsed docx day entry.
// Mirrors the field shape produced by scripts/lib/sanity-devotional-import.mjs
// (the manual monthly-import path) so both pipelines write identical documents.

import type { ParsedDevotionalDay } from "./devotional-docx-parser";

function randomKey(): string {
  return Math.random().toString(36).slice(2, 10);
}

function block(text: string, style: string = "normal") {
  return {
    _key: randomKey(),
    _type: "block",
    style,
    markDefs: [],
    children: [{ _key: randomKey(), _type: "span", text, marks: [] }],
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['".,!?;:()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function excerptFrom(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 197) return clean;
  return clean.slice(0, 197).replace(/\s+\S*$/, "") + "…";
}

function readTimeFor(paragraphs: string[]): number {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.min(30, Math.max(1, Math.round(words / 200)));
}

export interface DevotionalSanityDoc {
  _id: string;
  _type: "devotional";
  [key: string]: unknown;
}

export function buildDevotionalDoc(d: ParsedDevotionalDay): DevotionalSanityDoc {
  if (!d.date || !d.title || !d.scripture || !d.verseText) {
    const missing = ["date", "title", "scripture", "verseText"].filter(
      (field) => !d[field as keyof ParsedDevotionalDay]
    );
    throw new Error(`Missing required field(s): ${missing.join(", ")}`);
  }
  if (!Array.isArray(d.discussion) || d.discussion.length === 0) {
    throw new Error('Missing required field "discussion"');
  }

  const content = d.discussion.map((p) => block(p));
  if (d.action) {
    content.push(block("Action", "h3"));
    content.push(block(d.action));
  }

  const doc: DevotionalSanityDoc = {
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
  return doc;
}
