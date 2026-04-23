import { createClient } from "next-sanity";

import { createImageUrlBuilder } from "@sanity/image-url";

import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn: process.env.NODE_ENV === "production",
  useCdn: true, // Always fetch fresh data for development and production to ensure real-time updates
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
