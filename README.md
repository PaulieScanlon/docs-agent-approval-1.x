# Agent Approval Issue Reproduction

This repository reproduces an issue with agent tool approval and resume functionality in Mastra.

## Issue Summary

When using a tool with `requireApproval: true` that suspends execution (using `workflow.suspend()`), calling `agent.resumeStream()` fails with the error:

```
Error: No snapshot found for this workflow run: agentic-loop <run-id>
```

**Expected Behavior:** When a tool with `requireApproval: true` suspends execution, `agent.resumeStream()` should be able to resume the workflow with the provided resume data.

**Actual Behavior:** The `resumeStream()` call fails because no snapshot is found for the workflow run, even though the tool successfully suspended.

## Package Versions

All packages are using the latest beta versions:

- `@mastra/core`: `^1.0.0-beta.4`
- `@mastra/libsql`: `^1.0.0-beta.1`
- `@mastra/loggers`: `^1.0.0-beta.1`
- `@mastra/memory`: `^1.0.0-beta.1`
- `@mastra/observability`: `^1.0.0-beta.1`
- `@mastra/server`: `^1.0.0-beta.4`
- `mastra`: `^1.0.0-beta.3` (dev)
- `zod`: `^4.1.12`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your OpenAI API key. The examples use `openai/gpt-5.1` model, so `OPENAI_API_KEY` is required.

3. Storage is configured in `src/mastra/index.ts` using `LibSQLStore` with `url: "file:./mastra.db"` for persistence. The database file is gitignored and will be created on first run.

## Examples

### Example A: Tool Approval with `requireToolApproval` (✅ Works)

This example demonstrates the **working** approach using `requireToolApproval: true` in the stream call.

**Files:**
- `src/approve-agent-a.ts` - Approves a tool call
- `src/decline-agent-a.ts` - Declines a tool call
- `src/mastra/agents/test-agent-a.ts` - Agent using `testToolA`
- `src/mastra/tools/test-tool-a.ts` - Simple weather tool

**How it works:**
1. Calls `agent.stream()` with `requireToolApproval: true`
2. Consumes the initial stream
3. After 2 seconds, calls `agent.approveToolCall()` or `agent.declineToolCall()`
4. Consumes the approval/decline response stream

**Run:**
```bash
npx tsx src/approve-agent-a.ts
# or
npx tsx src/decline-agent-a.ts
```

### Example B: Tool with `requireApproval` and Suspend/Resume (❌ Fails)

This example demonstrates the **failing** approach using a tool with `requireApproval: true` that suspends execution.

**Files:**
- `src/resume-agent-b.ts` - Attempts to resume a suspended tool
- `src/mastra/agents/test-agent-b.ts` - Agent using `testToolB`
- `src/mastra/tools/test-tool-b.ts` - Tool with `requireApproval: true` that suspends

**How it works:**
1. Calls `agent.stream()` **without** `requireToolApproval: true`
2. The tool (`testToolB`) has `requireApproval: true` and calls `workflow.suspend()` when `resumeData.approved` is falsy
3. After 2 seconds, attempts to call `agent.resumeStream()` with approval data
4. **Fails** with "No snapshot found for this workflow run"

**Run:**
```bash
npx tsx src/resume-agent-b.ts
```

**Expected Error:**
```
handleResume
consumeStream error Error: No snapshot found for this workflow run: agentic-loop <run-id>
    at Run._resume (/path/to/node_modules/@mastra/core/dist/chunk-XXBWX7DT.js:4449:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
    at async Object.start (/path/to/node_modules/@mastra/core/dist/chunk-XXBWX7DT.js:6806:47)
```

## Key Differences

| Aspect | Example A (Works) | Example B (Fails) |
|--------|------------------|-------------------|
| Stream call | `requireToolApproval: true` | No `requireToolApproval` |
| Tool config | No `requireApproval` | `requireApproval: true` |
| Tool behavior | Simple execution | Suspends with `workflow.suspend()` |
| Resume method | `approveToolCall()` / `declineToolCall()` | `resumeStream()` |
| Result | ✅ Works | ❌ No snapshot error |

## Related Documentation

This follows the patterns described in: [Human in the Loop with Tools](https://mastra.ai/docs/v1/agents/human-in-the-loop-with-tools)

## Environment

- Node.js: `>=20.9.0`
- TypeScript: `^5.9.3`
