import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const galleryTool = createTool({
  id: "gallery-tool",
  description: "Fetches art galleries for a location",
  inputSchema: z.object({
    location: z.string()
  }),
  outputSchema: z.object({
    activities: z.array(z.string())
  }),
  execute: async ({ location }) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${location} gallery&format=json&limit=20&extratags=1`);
    const data = await response.json();
    const activities = data.map((place: any) => place.name).filter((name: string) => name);

    return { activities };
  }
});
