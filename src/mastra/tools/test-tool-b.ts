import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const testToolB = createTool({
  id: "test-tool-b",
  description: "Fetches art galleries for a location",
  inputSchema: z.object({
    location: z.string()
  }),
  outputSchema: z.object({
    activities: z.array(z.string())
  }),
  resumeSchema: z.object({
    approved: z.boolean()
  }),
  suspendSchema: z.object({
    reason: z.string()
  }),
  execute: async ({ location }, { workflow } = {}) => {
    const { resumeData: { approved } = {}, suspend } = workflow ?? {};

    if (!approved) {
      return suspend?.({ reason: "Human approval required." });
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${location} gallery&format=json&limit=20&extratags=1`,
      {
        headers: {
          "User-Agent": "Mastra Planning Agent"
        }
      }
    );
    const data = await response.json();
    const activities = data.map((place: any) => place.name).filter((name: string) => name);

    return { activities };
  },
  requireApproval: true
});
