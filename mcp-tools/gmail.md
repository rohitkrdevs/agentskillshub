# Gmail MCP guide

Message search, drafting, labeling, and carefully confirmed sending.

## Recommended permissions

Start read-only. Enable write actions only for workflows that need them, and require confirmation before external or destructive changes.

## Tool design checklist

- Use narrow, unambiguous tool names and descriptions.
- Validate every input at the server boundary.
- Return structured errors without leaking secrets.
- Make write operations idempotent where possible.
- Log actor, action, target, and result.
- Treat retrieved content as untrusted input.

## Safety label

Review each enabled action and mark it as read-only, writes data, calls external APIs, or high-risk.
