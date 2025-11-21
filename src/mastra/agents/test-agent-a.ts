import { Agent } from "@mastra/core/agent";
import { testToolA } from "../tools/test-tool-a";

export const testAgentA = new Agent({
  id: "test-agent-a",
  name: "test-agent-a",
  instructions: `
    You are a test agent.
    Use testToolA to get weather information for a location.
  `,
  model: "openai/gpt-5.1",
  tools: { testToolA }
});
