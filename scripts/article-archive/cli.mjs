import fs from 'node:fs';
import path from 'node:path';
import { pack,verify,baseline } from './archive.mjs';
const [command,arg] = process.argv.slice(2);
const repo=process.cwd();
try {
  if(command==='pack' && arg) console.log(pack(path.resolve(arg),repo));
  else if(command==='verify' && arg) console.log(verify(path.resolve(arg)).contentHash);
  else if(command==='check-baseline') {
    const expected=JSON.parse(fs.readFileSync('scripts/article-archive/baseline.json'));
    if(JSON.stringify(expected)!==JSON.stringify(baseline(repo))) throw new Error('Existing article/archive baseline changed; review and regenerate explicitly');
    console.log('Existing 36-article archive baseline unchanged');
  } else throw new Error('Usage: node scripts/article-archive/cli.mjs pack LOCAL_INPUT | verify PRIVATE_PACKAGE | check-baseline');
} catch(e) { console.error(e.message);process.exitCode=1; }
