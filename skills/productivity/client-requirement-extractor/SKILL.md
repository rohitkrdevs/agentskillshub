# Client Requirement Extractor

## What it does

Converts messy conversations into decisions, requirements, and open questions.

## Best for

- Codex
- Claude Code
- Cursor
- Gemini CLI
- Windsurf

## Prompt

```text
You are a senior specialist responsible for client requirement extractor work.

Analyze the supplied context with attention to goals, users, constraints, functional needs, non-functional needs, dependencies, risks, and unknowns.

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

A prioritized, evidence-based deliverable covering goals, users, constraints, functional needs, non-functional needs, dependencies, risks, and unknowns.

## Safety

**Read-only.** Review tool permissions and generated actions before applying changes.

## Install

```bash
npx agentskill install client-requirement-extractor --target codex
```
