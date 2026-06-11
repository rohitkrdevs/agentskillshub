import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Code2, Command, Copy, ExternalLink, Menu, Search, ShieldCheck, Sparkles, X } from 'lucide-react'
import './App.css'

type Skill = { slug:string; name:string; category:string; description:string; focus:string; difficulty:string; safety:string; featured?:boolean; compatibility:string[]; install:string; prompt:string; path:string }
const categories = ['All','Coding','AI Apps','Marketing','Design','Business','Productivity','Security']
const tools = ['All tools','Codex','Claude Code','Cursor','Gemini CLI','Windsurf']

function CopyButton({ value, label='Copy' }: { value:string; label?:string }) {
  const [copied,setCopied]=useState(false)
  const copy=async()=>{ await navigator.clipboard.writeText(value); setCopied(true); setTimeout(()=>setCopied(false),1500) }
  return <button className="copy-button" onClick={copy} type="button">{copied?<Check size={15}/>:<Copy size={15}/>}<span>{copied?'Copied':label}</span></button>
}

function Header({ browse }: { browse:()=>void }) {
  const [open,setOpen]=useState(false)
  return <header className="site-header">
    <a className="brand" href="#top"><span className="brand-mark"><Command size={18}/></span>AgentSkillsHub</a>
    <button className="mobile-menu" type="button" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
    <nav className={open?'nav open':'nav'}><button type="button" onClick={browse}>Skills</button><a href="#agents">Agents</a><a href="#mcp">MCP Tools</a><a href="#contribute">Contribute</a></nav>
    <a className="github-link" href="https://github.com" target="_blank" rel="noreferrer"><Code2 size={17}/> GitHub <ExternalLink size={13}/></a>
  </header>
}

function SkillCard({ skill,index,onOpen }: { skill:Skill; index:number; onOpen:(skill:Skill)=>void }) {
  return <article className={`skill-card ${index===0?'feature-card':''}`}>
    <div className="skill-number">{String(index+1).padStart(2,'0')}</div>
    <div className="skill-main"><div className="skill-meta"><span>{skill.category}</span><span>{skill.difficulty}</span></div><h3>{skill.name}</h3><p>{skill.description}</p><div className="tool-list">{skill.compatibility.slice(0,index===0?5:3).map(tool=><span key={tool}>{tool}</span>)}</div></div>
    <div className="skill-actions"><span className={`safety safety-${skill.safety.toLowerCase().replaceAll(' ','-')}`}><ShieldCheck size={14}/>{skill.safety}</span><button className="open-skill" type="button" onClick={()=>onOpen(skill)}>View skill <ArrowRight size={17}/></button></div>
  </article>
}

function SkillDrawer({ skill,onClose }: { skill:Skill|null; onClose:()=>void }) {
  useEffect(()=>{ if(!skill)return; const close=(e:KeyboardEvent)=>e.key==='Escape'&&onClose(); document.body.classList.add('drawer-open'); addEventListener('keydown',close); return()=>{document.body.classList.remove('drawer-open');removeEventListener('keydown',close)} },[skill,onClose])
  if(!skill)return null
  return <div className="drawer-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><aside className="skill-drawer" role="dialog" aria-modal="true" aria-labelledby="skill-title">
    <button className="drawer-close" type="button" onClick={onClose} aria-label="Close"><X/></button>
    <div className="drawer-heading"><span>{skill.category} / {skill.difficulty}</span><h2 id="skill-title">{skill.name}</h2><p>{skill.description}</p></div>
    <section><h3>Install</h3><div className="code-block"><code>{skill.install}</code><CopyButton value={skill.install}/></div></section>
    <section><h3>What it covers</h3><p>{skill.focus}.</p></section>
    <section><div className="section-title-row"><h3>Full prompt</h3><CopyButton value={skill.prompt} label="Copy prompt"/></div><pre className="prompt-block">{skill.prompt}</pre></section>
    <div className="drawer-footer"><span><ShieldCheck size={16}/>Safety: {skill.safety}</span><a href={`https://github.com/search?q=${encodeURIComponent(skill.path)}`} target="_blank" rel="noreferrer">View source <ExternalLink size={14}/></a></div>
  </aside></div>
}

function App(){
  const [skills,setSkills]=useState<Skill[]>([]),[error,setError]=useState(false),[query,setQuery]=useState(''),[category,setCategory]=useState('All'),[tool,setTool]=useState('All tools'),[visible,setVisible]=useState(9),[selected,setSelected]=useState<Skill|null>(null)
  useEffect(()=>{fetch('/skills.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(setSkills).catch(()=>setError(true))},[])
  const filtered=useMemo(()=>skills.filter(s=>{const q=query.trim().toLowerCase();return(!q||`${s.name} ${s.description} ${s.category} ${s.focus}`.toLowerCase().includes(q))&&(category==='All'||s.category===category)&&(tool==='All tools'||s.compatibility.includes(tool))}),[skills,query,category,tool])
  const browse=()=>document.querySelector('#skills')?.scrollIntoView({behavior:'smooth'})
  const choose=(item:string)=>{setCategory(item);setVisible(9);browse()}
  return <div id="top"><Header browse={browse}/><main>
    <section className="hero"><div className="hero-copy"><h1>Skills that make<br/>agents <span>useful.</span></h1><p>Discover, inspect, and install production-ready skills for Codex, Claude Code, Cursor, Gemini CLI, Windsurf, and more.</p><label className="hero-search"><Search size={22}/><input value={query} onChange={e=>setQuery(e.target.value)} onFocus={browse} placeholder={`Search ${skills.length||50} skills, agents, and tools...`}/><kbd>⌘ K</kbd></label><div className="hero-actions"><button className="primary-action" type="button" onClick={browse}>Browse skills <ArrowRight size={18}/></button><a href="#contribute">Submit a skill</a></div></div>
      <div className="hero-console"><div className="console-top"><span>Quick install</span><span>agentskill CLI</span></div><div className="console-body"><span>$</span><code>npx agentskill install<br/>nextjs-seo-auditor<br/><em>--target codex</em></code></div><div className="console-result"><Check size={16}/>Installed to <code>.codex/skills/</code></div><div className="console-anatomy"><div><Copy/><span><strong>Prompt</strong>Task instructions</span></div><div><ShieldCheck/><span><strong>Safety</strong>Permission labels</span></div><div><Sparkles/><span><strong>Examples</strong>Known-good outputs</span></div></div></div>
    </section>
    <section className="category-rail">{categories.map(item=><button className={category===item?'active':''} key={item} onClick={()=>choose(item)}>{item}</button>)}</section>
    <section className="catalog" id="skills"><div className="catalog-header"><div><span className="section-index">01 / CATALOG</span><h2>{query||category!=='All'?'Search results':'Popular skills'}</h2></div><div className="catalog-controls"><label><span>Works with</span><select value={tool} onChange={e=>setTool(e.target.value)}>{tools.map(item=><option key={item}>{item}</option>)}</select><ChevronDown size={15}/></label><span className="result-count">{filtered.length} results</span></div></div>
      {error&&<div className="empty-state">Catalog unavailable. Run <code>npm run generate</code>.</div>}{!error&&!skills.length&&<div className="loading">Loading catalog...</div>}{skills.length>0&&!filtered.length&&<div className="empty-state"><Search/><strong>No matching skills</strong><span>Try another phrase, category, or tool.</span></div>}
      <div className="skill-grid">{filtered.slice(0,visible).map((skill,index)=><SkillCard skill={skill} index={index} key={skill.slug} onOpen={setSelected}/>)}</div>{visible<filtered.length&&<button className="load-more" onClick={()=>setVisible(v=>v+9)}>Load more skills <span>{filtered.length-visible}</span></button>}
    </section>
    <section className="how-it-works" id="agents"><div><span className="section-index">02 / HOW IT WORKS</span><h2>One skill.<br/>Every agent.</h2></div><div className="steps"><article><span>01</span><h3>Inspect</h3><p>Read the prompt, inputs, outputs, examples, and safety scope before use.</p></article><article><span>02</span><h3>Install</h3><p>Choose your target. The CLI puts the right files in the right place.</p></article><article><span>03</span><h3>Adapt</h3><p>Fork the source, tune the workflow, and contribute improvements upstream.</p></article></div></section>
    <section className="open-standard" id="mcp"><div><span className="section-index">03 / OPEN FORMAT</span><h2>Prompts are only the beginning.</h2></div><p>Every package combines instructions, examples, structured metadata, compatibility tags, and safety labels. Agents understand it. Humans can audit it.</p><div className="file-tree"><code>skill/<br/>├── SKILL.md<br/>├── manifest.json<br/>└── examples.md</code></div></section>
    <section className="contribute" id="contribute"><div><span className="section-index">04 / COMMUNITY</span><h2>Built in public.<br/>Improved by use.</h2></div><div><p>Found a workflow worth sharing? Start from the template, validate it locally, and open a pull request.</p><a className="primary-action" href="https://github.com" target="_blank" rel="noreferrer">Contribute on GitHub <ArrowRight size={18}/></a></div></section>
  </main><footer><a className="brand" href="#top"><span className="brand-mark"><Command size={17}/></span>AgentSkillsHub</a><p>Open-source skills for agents that do real work.</p><span>MIT License · 2026</span></footer><SkillDrawer skill={selected} onClose={()=>setSelected(null)}/></div>
}
export default App
