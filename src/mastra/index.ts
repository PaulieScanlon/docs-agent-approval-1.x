import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/loggers";
import { Observability } from "@mastra/observability";

import { planningAgent } from "./agents/planning-agent";
import { galleryTool } from "./tools/activity-tool";
import { weatherTool } from "./tools/weather-tool";

export const mastra = new Mastra({
  agents: { planningAgent },
  tools: { weatherTool, galleryTool },
  logger: new PinoLogger(),
  storage: new LibSQLStore({
    id: "mastra-storage",
    url: ":memory:"
  }),
  observability: new Observability({
    // Enables Tracing
    default: { enabled: true }
  })
});
