import "dotenv/config";

import { mastra } from "./mastra";

const agent = mastra.getAgent("weatherAgent");

const response = await agent.generate("What's the weather in London?");

// const response = await agent.generate("What's the weather in London?", {
//   requireToolApproval: true
// });

console.log("Response created, runId:", response);

// const handleApproval = async () => {
//   const approvedStream = await agent.approveToolCall({ runId: stream.runId });

//   // console.log("Tool call approved, reading stream...");

//   for await (const chunk of approvedStream.textStream) {
//     process.stdout.write(chunk);
//   }
//   process.stdout.write("\n");
// };

// setTimeout(() => {
//   handleApproval();
// }, 2000);
