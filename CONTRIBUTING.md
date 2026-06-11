# Contributing

AgentSkillsHub accepts focused, testable skills that solve a repeatable task.

## Add a skill

1. Add one entry to `data/skills.json`.
2. Run `npm run generate`.
3. Review the generated `SKILL.md`, manifest, and example.
4. Improve the prompt and example when the generic baseline is not specific enough.
5. Run `npm run check` before opening a pull request.

## Quality bar

- One clear outcome and honest description.
- Explicit input and output contracts.
- Concrete instructions rather than persona filler.
- Accurate compatibility and safety labels.
- No secrets, copied proprietary prompts, or unverifiable claims.
- Confirmation boundaries for external or destructive actions.

See `templates/skill-template.md` for the human-readable format.
