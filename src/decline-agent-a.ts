import "dotenv/config";

import { mastra } from "./mastra";

const agent = mastra.getAgent("testAgentA");

const stream = await agent.stream("What's the weather London", {
  requireToolApproval: true
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}

const handleDecline = async () => {
  console.log("handleDecline");
  const declinedStream = await agent.declineToolCall({ runId: stream.runId });

  for await (const chunk of declinedStream.textStream) {
    process.stdout.write(chunk);
  }
  process.stdout.write("\n");
};

setTimeout(() => {
  handleDecline();
}, 2000);
