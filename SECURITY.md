# Security policy

Agent skills can cause tools to read data, write files, call services, or modify external systems. Treat every contributed prompt and MCP guide as code that requires review.

## Reporting

Do not open public issues for vulnerabilities that expose secrets or enable harmful actions. Use GitHub private vulnerability reporting for the repository.

## Baseline

- Start with read-only access.
- Scope credentials and filesystem access narrowly.
- Require confirmation before external, destructive, financial, email, calendar, or publishing actions.
- Treat retrieved content as untrusted and potentially prompt-injecting.
- Log tool calls without logging secrets.
