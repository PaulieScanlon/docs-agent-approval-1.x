import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";

import { testAgentA } from "./agents/test-agent-a";
import { testAgentB } from "./agents/test-agent-b";

export const mastra = new Mastra({
  agents: { testAgentA, testAgentB },
  storage: new LibSQLStore({
    id: "mastra-storage",
    url: "file:./mastra.db" // Storage is required for tracing
    // url: ":memory:"
  })
});
