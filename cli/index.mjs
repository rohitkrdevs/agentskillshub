#!/usr/bin/env node
import { cp, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const catalog=JSON.parse(await readFile(path.join(packageRoot,'data','skills.json'),'utf8'));
const args=process.argv.slice(2),command=args[0],slug=args[1];
const value=(flag,fallback)=>{const i=args.indexOf(flag);return i>=0&&args[i+1]?args[i+1]:fallback};
const targets={codex:'.codex/skills',cursor:'.cursor/rules',claude:'.claude/skills',gemini:'.gemini/skills',windsurf:'.windsurf/rules'};
const categorySlug=(category)=>category.toLowerCase().replace(/\s+/g,'-');

const help=()=>console.log(`AgentSkillsHub CLI\n\nCommands:\n  agentskill list\n  agentskill show <slug>\n  agentskill install <slug> --target <codex|cursor|claude|gemini|windsurf> [--dir <project>]\n`);

if(!command||command==='help'||args.includes('--help')){help();process.exit(0)}
if(command==='list'){for(const skill of catalog)console.log(`${skill.slug.padEnd(34)} ${skill.category}`);process.exit(0)}
const skill=catalog.find(item=>item.slug===slug);
if(!skill){console.error(`Unknown skill: ${slug||'(missing)'}`);console.error('Run "agentskill list" to see available skills.');process.exit(1)}
if(command==='show'){console.log(`${skill.name}\n${skill.description}\n\nnpx agentskill install ${skill.slug} --target codex`);process.exit(0)}
if(command==='install'){
  const target=value('--target','codex');
  if(!targets[target]){console.error(`Unsupported target: ${target}`);process.exit(1)}
  const project=path.resolve(value('--dir',process.cwd()));
  const source=path.join(packageRoot,'skills',categorySlug(skill.category),skill.slug);
  const destination=path.join(project,targets[target],skill.slug);
  await mkdir(path.dirname(destination),{recursive:true});
  await cp(source,destination,{recursive:true,force:true});
  console.log(`Installed ${skill.name} to ${destination}`);
  process.exit(0);
}
console.error(`Unknown command: ${command}`);help();process.exit(1);
