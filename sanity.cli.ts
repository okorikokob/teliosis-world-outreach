import { defineCliConfig } from "sanity/cli";

// The CLI needs these strings directly to resolve the network address
const projectId = process.env.SANITY_PROJECT_ID || "1lvrd0ty";
const dataset = process.env.SANITY_DATASET || "production";

export default defineCliConfig({ api: { projectId, dataset } });
