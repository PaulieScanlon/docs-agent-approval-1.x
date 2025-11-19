import "dotenv/config";

import { mastra } from "./mastra";

const agent = mastra.getAgent("planningAgent");

const stream = await agent.stream("Plan my trip to London", {
  requireToolApproval: true
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}

const handleApproval = async () => {
  console.log("handleApproval");
  const approvedStream = await agent.approveToolCall({ runId: stream.runId });

  for await (const chunk of approvedStream.textStream) {
    process.stdout.write(chunk);
  }
  process.stdout.write("\n");
};

setTimeout(() => {
  handleApproval();
}, 2000);

const handleDecline = async () => {
  const declinedStream = await agent.declineToolCall({ runId: stream.runId });

  for await (const chunk of declinedStream.textStream) {
    process.stdout.write(chunk);
  }
  process.stdout.write("\n");
};

// setTimeout(() => {
//   handleDecline();
// }, 2000);
