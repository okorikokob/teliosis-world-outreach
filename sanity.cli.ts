import { defineCliConfig } from "sanity/cli";

// The CLI needs these strings directly to resolve the network address
const projectId = "1lvrd0ty";
const dataset = "production";

export default defineCliConfig({ api: { projectId, dataset } });
