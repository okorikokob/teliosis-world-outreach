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
  content: any;
  readTime: number;
  audioUrl?: string;
  topics?: string[];
  featured: boolean;
  coverImage?: any;
}

export interface Leader {
  _id: string;
  name: string;
  role: string;
  description: string;
  image: any;
  order: number;
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

const leaderFields = `
  _id,
  name,
  role,
  description,
  image,
  order
`;

// Fetch all devotionals (sorted by date, newest first)
export async function getAllDevotionals(): Promise<Devotional[]> {
  return client.fetch(`*[_type == "devotional"] | order(publishedAt desc) { ${devotionalFields} }`);
}

// Fetch the most recent devotional up to now
export async function getFeaturedDevotional(): Promise<Devotional | null> {
  // Cast options to any to silence the TypeScript error for `next`:
  return client.fetch(
    `*[_type == "devotional" && publishedAt <= now()] | order(publishedAt desc)[0] { ${devotionalFields} }`,
    { next: { revalidate: 3600 } } as any
  );
}

// Fetch single devotional by slug
export async function getDevotionalBySlug(slug: string): Promise<Devotional | null> {
  return client.fetch(`*[_type == "devotional" && slug.current == $slug][0] { ${devotionalFields} }`, { slug });
}

// Fetch devotionals by topic
export async function getDevotionalsByTopic(topic: string): Promise<Devotional[]> {
  return client.fetch(
    `*[_type == "devotional" && $topic in topics] | order(publishedAt desc) { ${devotionalFields} }`,
    { topic }
  );
}

// Fetch recent devotionals (for archive grid)
export async function getRecentDevotionals(limit = 6): Promise<Devotional[]> {
  return client.fetch(`*[_type == "devotional"] | order(publishedAt desc)[0...${limit}] { ${devotionalFields} }`);
}

// Fetch all leaders (sorted by display order)
export async function getAllLeaders(): Promise<Leader[]> {
  return client.fetch(`*[_type == "leader"] | order(order asc) { ${leaderFields} }`);
}

// Search devotionals by title/excerpt/scripture
export async function searchDevotionals(term: string): Promise<Devotional[]> {
  // Use a different parameter name (`term`) and pass it as `$term` to avoid confusion
  return client.fetch(
    `*[_type == "devotional" && (
      title match $term ||
      excerpt match $term ||
      scripture match $term
    )] | order(publishedAt desc) { ${devotionalFields} }`,
    { term: `*${term}*` }
  );
}
