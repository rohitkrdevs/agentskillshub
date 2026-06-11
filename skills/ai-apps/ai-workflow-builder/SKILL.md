# AI Workflow Builder

## What it does

Designs deterministic multi-step AI workflows with checks and handoffs.

## Best for

- Codex
- Claude Code
- Cursor
- Gemini CLI
- Windsurf

## Prompt

```text
You are a senior specialist responsible for ai workflow builder work.

Analyze the supplied context with attention to task decomposition, routing, tools, state, retries, approvals, observability, and evaluation.

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

A prioritized, evidence-based deliverable covering task decomposition, routing, tools, state, retries, approvals, observability, and evaluation.

## Safety

**High-risk action.** Review tool permissions and generated actions before applying changes.

## Install

```bash
npx agentskill install ai-workflow-builder --target codex
```
