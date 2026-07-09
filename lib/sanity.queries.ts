import { client } from "./sanity.client";

// TypeScript types for your data
export interface Devotional {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  scripture: string;
  excerpt: string;
  verseText: string;
  confession?: string;
  pray?: string;
  meditationScripture?: string;
  meditationText?: string;
  content: unknown;
  readTime: number;
  audioUrl?: string;
  topics?: string[];
  featured: boolean;
  coverImage?: unknown;
}

export interface Leader {
  _id: string;
  name: string;
  role: string;
  description: string;
  image: unknown;
  order: number;
}

export interface Sermon {
  _id: string;
  title: string;
  slug: { current: string };
  speaker: string;
  series?: string;
  description?: string;
  date: string;
  duration?: string;
  audioUrl: string;
  published?: boolean;
}

// GROQ field selections
const devotionalFields = `
  _id,
  title,
  slug,
  publishedAt,
  scripture,
  excerpt,
  content,
  readTime,
  audioUrl,
  topics,
  featured,
  verseText,
  confession,
  pray,
  meditationScripture,
  meditationText,
  coverImage
`;

const sermonFields = `
  _id,
  title,
  slug,
  speaker,
  series,
  description,
  date,
  duration,
  audioUrl,
  published
`;

const leaderFields = `
  _id,
  name,
  role,
  description,
  image,
  order
`;

// ─────────────────────────────────────────────
// DEVOTIONALS
// ─────────────────────────────────────────────

/**
 * Fetch devotionals published up to now — future-dated entries (written ahead
 * of time for upcoming days) are excluded until their date actually arrives.
 */
export async function getAllDevotionals(): Promise<Devotional[]> {
  return client.fetch(`*[_type == "devotional" && publishedAt <= now()] { ${devotionalFields} }`);
}

/**
 * AUTOMATIC TODAY'S SPOTLIGHT.
 *
 * No manual "featured" toggle needed. Just post all your devotionals
 * with the correct publishedAt date for each day (e.g. June 1 → June 30).
 *
 * This query finds whichever devotional falls within today's date window
 * in WAT (West Africa Time, UTC+1). At midnight WAT each day, the next
 * devotional automatically becomes the spotlight.
 *
 * HOW TO SET DATES IN SANITY:
 * Set each devotional's publishedAt to: 2025-06-01T00:00:00+01:00
 * (replace the date for each entry — the +01:00 ensures WAT alignment)
 *
 * Revalidates every hour so the switch happens within 60 mins of midnight.
 */
export async function getFeaturedDevotional(): Promise<Devotional | null> {
  // Build today's date window in WAT (UTC+1), independent of the server's
  // runtime timezone. Previously this used toLocaleString + setHours, which
  // zeroes the hour in the *server's local* timezone — correct on a machine
  // set to WAT, but off by a day on Vercel's UTC runtime.
  const now = new Date();
  const watParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const watYear = Number(watParts.find((p) => p.type === "year")?.value);
  const watMonth = Number(watParts.find((p) => p.type === "month")?.value);
  const watDay = Number(watParts.find((p) => p.type === "day")?.value);

  // Midnight WAT expressed as a UTC instant (WAT is UTC+1, no DST).
  const WAT_OFFSET_MS = 60 * 60 * 1000;
  const todayWAT = new Date(Date.UTC(watYear, watMonth - 1, watDay, 0, 0, 0) - WAT_OFFSET_MS);
  const tomorrowWAT = new Date(todayWAT.getTime() + 24 * 60 * 60 * 1000);

  const todayISO = todayWAT.toISOString();
  const tomorrowISO = tomorrowWAT.toISOString();

  const result = await client.fetch<Devotional | null>(
    `*[_type == "devotional" && publishedAt >= $today && publishedAt < $tomorrow] | order(publishedAt desc)[0] { ${devotionalFields} }`,
    { today: todayISO, tomorrow: tomorrowISO },
    { next: { revalidate: 3600 } } // recheck every hour
  );

  // Fallback: if no devotional is found for today (e.g. a gap in posting),
  // show the most recent past devotional so the spotlight is never empty.
  if (!result) {
    return client.fetch<Devotional | null>(
      `*[_type == "devotional" && publishedAt < $tomorrow] | order(publishedAt desc)[0] { ${devotionalFields} }`,
      { tomorrow: tomorrowISO },
      { next: { revalidate: 3600 } }
    );
  }

  return result;
}

/**
 * Fetch a single devotional by slug for the detail page.
 */
export async function getDevotionalBySlug(slug: string): Promise<Devotional | null> {
  return client.fetch(`*[_type == "devotional" && slug.current == $slug][0] { ${devotionalFields} }`, { slug });
}

/**
 * Fetch devotionals filtered by topic.
 */
export async function getDevotionalsByTopic(topic: string): Promise<Devotional[]> {
  return client.fetch(`*[_type == "devotional" && $topic in topics] | order(publishedAt asc) { ${devotionalFields} }`, {
    topic,
  });
}

/**
 * Fetch recent devotionals for preview sections (e.g. homepage carousel).
 * These show newest first since it's a "recent" preview.
 */
export async function getRecentDevotionals(limit = 6): Promise<Devotional[]> {
  return client.fetch(`*[_type == "devotional"] | order(publishedAt desc)[0...${limit}] { ${devotionalFields} }`);
}

/**
 * Full-text search across title, excerpt, and scripture.
 * Returns ascending order so results feel like browsing the archive.
 */
export async function searchDevotionals(term: string): Promise<Devotional[]> {
  return client.fetch(
    `*[_type == "devotional" && (
      title match $term ||
      excerpt match $term ||
      scripture match $term
    )] | order(publishedAt asc) { ${devotionalFields} }`,
    { term: `*${term}*` }
  );
}

// ─────────────────────────────────────────────
// LEADERS
// ─────────────────────────────────────────────

export async function getAllLeaders(): Promise<Leader[]> {
  return client.fetch(`*[_type == "leader"] | order(order asc) { ${leaderFields} }`);
}

// ─────────────────────────────────────────────
// SERMONS
// ─────────────────────────────────────────────

export async function getAllSermons(limit?: number): Promise<Sermon[]> {
  const slice = typeof limit === "number" ? `[0...${limit}]` : "";
  return client.fetch(
    `*[_type == "sermon" && (!defined(published) || published == true)] | order(date desc) ${slice} { ${sermonFields} }`
  );
}

export async function getSermonBySlug(slug: string): Promise<Sermon | null> {
  return client.fetch(
    `*[_type == "sermon" && slug.current == $slug && (!defined(published) || published == true)][0] { ${sermonFields} }`,
    { slug }
  );
}
