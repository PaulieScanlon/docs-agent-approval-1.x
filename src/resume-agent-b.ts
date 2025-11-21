import "dotenv/config";

import { mastra } from "./mastra";

const agent = mastra.getAgent("testAgentB");

const stream = await agent.stream("What are some art galleries in London");

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}

const handleResume = async () => {
  console.log("handleResume");
  const resumedStream = await agent.resumeStream({
    approved: true,
    runId: stream.runId
  });

  for await (const chunk of resumedStream.textStream) {
    process.stdout.write(chunk);
  }
  process.stdout.write("\n");
};

setTimeout(() => {
  handleResume();
}, 2000);
