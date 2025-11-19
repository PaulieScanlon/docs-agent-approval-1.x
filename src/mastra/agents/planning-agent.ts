import { Agent } from "@mastra/core/agent";
import { weatherTool } from "../tools/weather-tool";
import { galleryTool } from "../tools/activity-tool";
// import { Memory } from "@mastra/memory";
// import { LibSQLStore } from "@mastra/libsql";

export const planningAgent = new Agent({
  id: "planning-agent",
  name: "planning-agent",
  instructions:
    "You are a planning agent. Use the weatherTool to get weather information and the galleryTool to find art galleries for a location.",
  model: "openai/gpt-4.1-mini",
  tools: { weatherTool, galleryTool }
  // memory: new Memory({
  //   storage: new LibSQLStore({
  //     id: "libsql-agent-storage",
  //     url: "file:libsql-agent.db"
  //   })
  // })
});
