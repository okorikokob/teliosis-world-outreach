import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { UploadIcon } from "@sanity/icons";
import { schemaTypes } from "./sanity/schemas";
import { ImportDevotionalsTool } from "./sanity/tools/ImportDevotionalsTool";

export default defineConfig({
  name: "default",
  title: "Teliosis World Outreach",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET!,

  basePath: "/studio",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  tools: (prev) => [
    ...prev,
    {
      name: "import-devotionals",
      title: "Import Devotionals",
      icon: UploadIcon,
      component: ImportDevotionalsTool,
    },
  ],
});
