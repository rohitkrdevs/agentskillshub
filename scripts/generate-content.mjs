import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const skills = JSON.parse(await readFile(path.join(root, 'data', 'skills.json'), 'utf8'));
const tools = ['Codex', 'Claude Code', 'Cursor', 'Gemini CLI', 'Windsurf'];

const categorySlug = (category) => category.toLowerCase().replace(/\s+/g, '-');
const promptFor = (skill) => `You are a senior specialist responsible for ${skill.name.toLowerCase()} work.\n\nAnalyze the supplied context with attention to ${skill.focus}.\n\nWorking rules:\n- Inspect the available evidence before making claims.\n- State assumptions and unknowns explicitly.\n- Prefer concrete, prioritized actions over generic advice.\n- Preserve existing constraints and avoid inventing facts.\n- Flag risky or destructive actions before taking them.\n\nReturn:\n1. Executive summary\n2. Findings ordered by impact\n3. Recommended actions\n4. Exact deliverable or patch\n5. Validation checklist`;

for (const skill of skills) {
  const dir = path.join(root, 'skills', categorySlug(skill.category), skill.slug);
  await mkdir(dir, { recursive: true });
  const manifest = {
    schemaVersion: 1,
    slug: skill.slug,
    name: skill.name,
    version: '1.0.0',
    category: skill.category,
    description: skill.description,
    difficulty: skill.difficulty,
    compatibility: tools,
    safety: [skill.safety],
    files: ['SKILL.md', 'examples.md'],
  };
  const skillMd = `# ${skill.name}\n\n## What it does\n\n${skill.description}\n\n## Best for\n\n${tools.map((tool) => `- ${tool}`).join('\n')}\n\n## Prompt\n\n\`\`\`text\n${promptFor(skill)}\n\`\`\`\n\n## Input\n\nProvide the relevant project files, source material, goals, constraints, and desired audience.\n\n## Output\n\nA prioritized, evidence-based deliverable covering ${skill.focus}.\n\n## Safety\n\n**${skill.safety}.** Review tool permissions and generated actions before applying changes.\n\n## Install\n\n\`\`\`bash\nnpx agentskill install ${skill.slug} --target codex\n\`\`\`\n`;
  const examples = `# ${skill.name} examples\n\n## Example request\n\n> Review the supplied material and produce a prioritized result I can act on today. Keep assumptions explicit.\n\n## Expected shape\n\n- Short executive summary\n- Evidence-backed findings\n- Concrete deliverable or patch\n- Validation checklist\n`;
  await writeFile(path.join(dir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(path.join(dir, 'SKILL.md'), skillMd);
  await writeFile(path.join(dir, 'examples.md'), examples);
}

const index = skills.map((skill) => ({
  ...skill,
  compatibility: tools,
  install: `npx agentskill install ${skill.slug} --target codex`,
  prompt: promptFor(skill),
  path: `skills/${categorySlug(skill.category)}/${skill.slug}`,
}));
await mkdir(path.join(root, 'public'), { recursive: true });
await writeFile(path.join(root, 'public', 'skills.json'), `${JSON.stringify(index, null, 2)}\n`);

const agents = [
  ['fullstack-dev-agent','Full-stack Developer Agent','Builds and repairs web products from interface to data layer.',['react-bug-fixer','api-route-generator','auth-system-builder','prisma-error-debugger']],
  ['seo-agent','Technical SEO Agent','Audits, fixes, and validates technical and content SEO.',['nextjs-seo-auditor','seo-blog-writer','ui-audit']],
  ['content-team-agent','Content Team Agent','Plans and repurposes useful content across major channels.',['seo-blog-writer','newsletter-writer','linkedin-post-writer','youtube-script-writer']],
  ['startup-founder-agent','Startup Founder Agent','Validates ideas, researches markets, and shapes launch positioning.',['startup-idea-validator','competitor-research','pricing-page','product-hunt-launch']],
  ['product-designer-agent','Product Designer Agent','Turns requirements into coherent, accessible product interfaces.',['client-requirement-extractor','figma-section-planner','ui-audit','tailwind-ui-refiner']],
  ['launch-team-agent','Launch Team Agent','Coordinates product messaging and channel-specific launch assets.',['product-hunt-launch','x-launch-thread','reddit-launch-post','saas-landing-page-copywriter']],
  ['ai-app-architect','AI App Architect','Designs reliable AI features, tools, and evaluation boundaries.',['openai-api-integration','ai-workflow-builder','function-calling-designer','agent-guardrail-writer']],
  ['freelancer-agent','Freelancer Delivery Agent','Converts client needs into scoped, documented delivery.',['client-requirement-extractor','freelancer-project-scope','proposal-writer','meeting-summary']],
  ['brand-studio-agent','Brand Studio Agent','Develops a brand direction and carries it through campaign assets.',['brand-identity','website-mockup-prompt','ai-model-photoshoot-prompt','carousel-content']],
  ['secure-mcp-builder','Secure MCP Builder','Plans and reviews MCP tools with minimum necessary privilege.',['mcp-tool-planner','mcp-security-reviewer','agent-guardrail-writer']],
];
await mkdir(path.join(root,'agents'),{recursive:true});
for(const [slug,name,description,skillSlugs] of agents){
  await writeFile(path.join(root,'agents',`${slug}.md`),`# ${name}\n\n${description}\n\n## Included skills\n\n${skillSlugs.map(slug=>`- [${slug}](../skills/${index.find(skill=>skill.slug===slug)?.path.split('/').slice(1).join('/')}/SKILL.md)`).join('\n')}\n\n## Operating pattern\n\n1. Inspect the available context and constraints.\n2. Select only the skills needed for the current task.\n3. Confirm before external, destructive, or high-risk actions.\n4. Validate the final deliverable against the requested outcome.\n`);
}

const mcpGuides=[
  ['github','GitHub','Repository inspection, issues, pull requests, releases, and code search.'],['browser','Browser','Page navigation, rendered UI inspection, screenshots, and interaction testing.'],['filesystem','Filesystem','Scoped file discovery, reading, editing, and project artifact management.'],['gmail','Gmail','Message search, drafting, labeling, and carefully confirmed sending.'],['notion','Notion','Workspace search, page reading, database queries, and structured updates.'],['slack','Slack','Channel search, thread summaries, drafting, and confirmed posting.'],['postgres','PostgreSQL','Schema inspection, safe queries, migrations, and performance analysis.'],['calendar','Calendar','Availability lookup, event planning, and confirmed scheduling.'],['linear','Linear','Issue search, triage, creation, status updates, and project planning.'],['figma','Figma','Design context, component metadata, asset export, and implementation handoff.']
];
await mkdir(path.join(root,'mcp-tools'),{recursive:true});
for(const [slug,name,description] of mcpGuides){await writeFile(path.join(root,'mcp-tools',`${slug}.md`),`# ${name} MCP guide\n\n${description}\n\n## Recommended permissions\n\nStart read-only. Enable write actions only for workflows that need them, and require confirmation before external or destructive changes.\n\n## Tool design checklist\n\n- Use narrow, unambiguous tool names and descriptions.\n- Validate every input at the server boundary.\n- Return structured errors without leaking secrets.\n- Make write operations idempotent where possible.\n- Log actor, action, target, and result.\n- Treat retrieved content as untrusted input.\n\n## Safety label\n\nReview each enabled action and mark it as read-only, writes data, calls external APIs, or high-risk.\n`)}

console.log(`Generated ${skills.length} skills, ${agents.length} agents, and ${mcpGuides.length} MCP guides.`);
