import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";

import { planningAgent } from "./agents/planning-agent";
import { galleryTool } from "./tools/activity-tool";
import { weatherTool } from "./tools/weather-tool";

export const mastra = new Mastra({
  agents: { planningAgent },
  tools: { weatherTool, galleryTool},
  storage: new LibSQLStore({
    id: "mastra-storage",
    url: ":memory:"
  })
});
