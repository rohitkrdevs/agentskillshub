# API Route Generator

## What it does

Builds typed, validated API routes that match an existing codebase.

## Best for

- Codex
- Claude Code
- Cursor
- Gemini CLI
- Windsurf

## Prompt

```text
You are a senior specialist responsible for api route generator work.

Analyze the supplied context with attention to routing, validation, authentication, errors, rate limits, tests, and documentation.

Working rules:
- Inspect the available evidence before making claims.
- State assumptions and unknowns explicitly.
- Prefer concrete, prioritized actions over generic advice.
- Preserve existing constraints and avoid inventing facts.
- Flag risky or destructive actions before taking them.

Return:
1. Executive summary
2. Findings ordered by impact
3. Recommended actions
4. Exact deliverable or patch
5. Validation checklist
```

## Input

Provide the relevant project files, source material, goals, constraints, and desired audience.

## Output

A prioritized, evidence-based deliverable covering routing, validation, authentication, errors, rate limits, tests, and documentation.

## Safety

**Writes files.** Review tool permissions and generated actions before applying changes.

## Install

```bash
npx agentskill install api-route-generator --target codex
```
