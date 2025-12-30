// Core content type definitions for mock phase
export interface Sermon {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO date string
  speaker: string;
  series?: string;
  audioUrl?: string;
  videoUrl?: string;
  summary?: string;
  tags?: string[];
  scriptureRefs?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  start: string; // ISO date
  end?: string; // ISO date
  location?: string;
  category?: string;
  description?: string;
  registrationLink?: string;
}
