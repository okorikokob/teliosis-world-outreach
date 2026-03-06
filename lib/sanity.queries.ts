import { client } from "./sanity.client";

// TypeScript types for your data
export interface Devotional {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  scripture: string;
  excerpt: string;
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

// GROQ Queries
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
  return client.fetch(
    `*[_type == "devotional"] | order(publishedAt desc) {
      ${devotionalFields}
    }`
  );
}

// Fetch featured devotional (today's spotlight)
export async function getFeaturedDevotional(): Promise<Devotional | null> {
  return client.fetch(
    `*[_type == "devotional" && featured == true] | order(publishedAt desc) [0] {
      ${devotionalFields}
    }`
  );
}

// Fetch single devotional by slug
export async function getDevotionalBySlug(slug: string): Promise<Devotional | null> {
  return client.fetch(
    `*[_type == "devotional" && slug.current == $slug][0] {
      ${devotionalFields}
    }`,
    { slug }
  );
}

// Fetch devotionals by topic
export async function getDevotionalsByTopic(topic: string): Promise<Devotional[]> {
  return client.fetch(
    `*[_type == "devotional" && $topic in topics] | order(publishedAt desc) {
      ${devotionalFields}
    }`,
    { topic }
  );
}

// Fetch recent devotionals (for archive grid)
export async function getRecentDevotionals(limit: number = 6): Promise<Devotional[]> {
  return client.fetch(
    `*[_type == "devotional"] | order(publishedAt desc) [0...${limit}] {
      ${devotionalFields}
    }`
  );
}

// Fetch all leaders (sorted by display order)
export async function getAllLeaders(): Promise<Leader[]> {
  return client.fetch(
    `*[_type == "leader"] | order(order asc) {
      ${leaderFields}
    }`
  );
}

// Search devotionals
export async function searchDevotionals(query: string): Promise<Devotional[]> {
  return client.fetch(
    `*[_type == "devotional" && (
      title match $query ||
      excerpt match $query ||
      scripture match $query
    )] | order(publishedAt desc) {
      ${devotionalFields}
    }`,
    { query: `*${query}*` }
  );
}
