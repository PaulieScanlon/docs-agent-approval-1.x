import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";

const step1 = createStep({
  id: "step-1",
  description: "Fetches weather for a location",
  inputSchema: z.object({
    location: z.string()
  }),
  outputSchema: z.object({
    weather: z.string()
  }),
  execute: async ({ inputData }) => {
    const { location } = inputData;

    const response = await fetch(`https://wttr.in/${location}?format=3`);
    const weather = await response.text();

    return {
      weather
    };
  }
});

export const weatherWorkflow = createWorkflow({
  id: "weather-workflow",
  inputSchema: z.object({
    location: z.string()
  }),
  outputSchema: z.object({
    activities: z.string()
  })
})
  .then(step1)
  .commit();
