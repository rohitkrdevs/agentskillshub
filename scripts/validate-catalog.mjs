import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const skills = JSON.parse(await readFile(path.join(root, 'data', 'skills.json'), 'utf8'));
const slugs = new Set();

for (const skill of skills) {
  if (slugs.has(skill.slug)) throw new Error(`Duplicate slug: ${skill.slug}`);
  slugs.add(skill.slug);
  for (const key of ['slug', 'name', 'category', 'description', 'focus', 'difficulty', 'safety']) {
    if (!skill[key]) throw new Error(`${skill.slug} is missing ${key}`);
  }
  const category = skill.category.toLowerCase().replace(/\s+/g, '-');
  const dir = path.join(root, 'skills', category, skill.slug);
  await Promise.all(['SKILL.md', 'manifest.json', 'examples.md'].map((file) => access(path.join(dir, file))));
}

if (skills.length < 50) throw new Error(`Expected at least 50 skills, found ${skills.length}`);
console.log(`Validated ${skills.length} unique skills and their generated files.`);
