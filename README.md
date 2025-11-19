## Generate

1. The below needs to used at least once to create a snapshot
    ```typescript
    for await (const chunk of stream.textStream) {
        process.stdout.write(chunk);
    }
    ```
2. The response from `.generate()` doesn't have a `runId`.
