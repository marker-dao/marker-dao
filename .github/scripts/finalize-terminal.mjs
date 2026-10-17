import { readFile, writeFile } from 'node:fs/promises';

// The upstream effect uses the contribution calendar (including PRs/reviews),
// so its total is contributions rather than commits. Keep the original layout.
const path = process.argv[2] ?? 'profile-effects/terminal.svg';
const svg = await readFile(path, 'utf8');
const original = '>commits....</text>';
const replacement = '>contribs...</text>';
if (svg.split(original).length !== 2) {
  throw new Error('Expected exactly one upstream contribution-total label.');
}
await writeFile(path, svg.replace(original, replacement));
console.log('Terminal total correctly labeled as contributions.');
