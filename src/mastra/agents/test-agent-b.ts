import { Agent } from "@mastra/core/agent";
import { testToolB } from "../tools/test-tool-b";

export const testAgentB = new Agent({
  id: "test-agent-b",
  name: "test-agent-b",
  instructions: `
    You are a test agent.
    Use testToolB to get art gallery information for a location.
  `,
  model: "openai/gpt-5.1",
  tools: { testToolB }
});
