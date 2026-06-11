# AgentSkillsHub

**The open-source skill library for AI agents.**

Browse, inspect, copy, and install reusable skills for Codex, Claude Code, Cursor, Gemini CLI, Windsurf, OpenAI Agents SDK, LangChain, MCP tools, and more.

AgentSkillsHub is not just a list of links. Every included skill ships with a readable prompt, structured manifest, example, compatibility metadata, safety label, and install path.

```bash
npx agentskill install nextjs-seo-auditor --target codex
```

> The repository currently launches with 51 skills, 10 composed agents, and 10 MCP integration guides. The `npx` command is the intended published package interface; while developing this repository, use `node cli/index.mjs`.

## Why

AI agents are powerful, but useful workflows are still rewritten from scratch. AgentSkillsHub makes those instructions inspectable, portable, and improvable in public.

- **Copy-paste ready:** each skill contains a complete prompt and output contract.
- **Installable:** the CLI maps packages to the conventions of supported agents.
- **Auditable:** manifests expose compatibility, difficulty, and permissions.
- **Testable:** catalog validation catches duplicates and incomplete packages.
- **Composable:** agent recipes combine focused skills instead of creating giant prompts.

## Explore

| Collection | Included |
| --- | ---: |
| Skills | 51 |
| Composed agents | 10 |
| MCP guides | 10 |
| Categories | 7 |

Categories include Coding, AI Apps, Marketing, Design, Business, Productivity, and Security.

## Run the website

```bash
npm install
npm run generate
npm run dev
```

The React website includes instant search, category filters, tool compatibility filters, skill detail drawers, copy controls, install commands, responsive layouts, and safety labels.

## CLI

```bash
# List available skills
node cli/index.mjs list

# Inspect one skill
node cli/index.mjs show nextjs-seo-auditor

# Install into a project
node cli/index.mjs install nextjs-seo-auditor --target codex --dir ../my-project
```

Supported targets: `codex`, `cursor`, `claude`, `gemini`, and `windsurf`.

## Package format

```text
skills/coding/nextjs-seo-auditor/
├── SKILL.md
├── manifest.json
└── examples.md
```

The catalog lives in `data/skills.json`. Running `npm run generate` creates every package, the browser index at `public/skills.json`, the agent recipes, and MCP guides.

## Safety labels

Skills disclose the strongest relevant capability:

- `Read-only`
- `Writes files`
- `Calls external APIs`
- `Uses browser`
- `Uses email/calendar`
- `Needs API key`
- `High-risk action`

Safety labels are review aids, not a sandbox. Inspect prompts and tool permissions before use.

## Validate the repository

```bash
npm run check
```

This regenerates content, validates all package files, runs lint, and builds the production website.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md), add an entry to `data/skills.json`, generate the package, strengthen its task-specific prompt and examples, and run the full check.

## Roadmap

- Published `agentskill` npm package
- Dedicated routes and shareable skill URLs
- Community quality scoring and verification
- Registry-backed usage rankings
- Automated prompt and manifest test fixtures
- More runtime adapters for agent frameworks

## License

MIT
# agentskillshub
