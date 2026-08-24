import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
execFileSync('bash',['scripts/build-site.sh'],{stdio:'inherit'});
const required=['index.html','site.css','site.js','premium.css','app.html','app-v2.css','app.js','app-shell.js','styles.css','growth.css','guide-v2.css','manifest.webmanifest','sw.js','icon.svg','sample-packet.html','privacy.html','terms.html','stripe-service-not-received.html','freelancer-chargeback-response.html','shopify-chargeback-evidence.html','robots.txt','sitemap.xml','.nojekyll'];
for(const file of required)assert.ok(statSync(`public/${file}`).isFile(),`Missing public/${file}`);
for(const file of ['site.js','app.js','app-shell.js','sw.js'])execFileSync(process.execPath,['--check',`public/${file}`],{stdio:'inherit'});
const manifest=JSON.parse(readFileSync('public/manifest.webmanifest','utf8'));assert.equal(manifest.start_url,'./app.html');
const home=readFileSync('public/index.html','utf8'),app=readFileSync('public/app.html','utf8');
assert.match(home,/Build the record/);assert.match(home,/site\.css/);assert.match(home,/premium\.css/);assert.doesNotMatch(home,/id="builder"/);assert.match(app,/id="builder"/);assert.match(app,/app-v2\.css/);assert.match(app,/premium\.css/);
const ids=['processor','reason','saleType','deadline','caseId','amount','merchant','transactionDate','description','evidenceList','timelineForm','timelineList','scoreValue','scoreRing','responseDraft','evidenceIndex','finalChecks','loadDemo','regenerate','printPacket','exportCase','importCase','resetCase','toast'];for(const id of ids)assert.match(app,new RegExp(`id="${id}"`),`Missing #${id}`);
for(const file of required.filter(f=>f.endsWith('.html')&&!['index.html','app.html'].includes(f))){const html=readFileSync(`public/${file}`,'utf8');assert.match(html,/guide-v2\.css/);assert.match(html,/premium\.css/)}
const deployable=required.filter(f=>!f.endsWith('.svg')&&f!=='.nojekyll').map(f=>readFileSync(`public/${f}`,'utf8')).join('\n');assert.doesNotMatch(deployable,/sk_live_|pk_live_|AKIA[0-9A-Z]{16}|checkout\.stripe\.com|buy\.stripe\.com/);console.log(JSON.stringify({ok:true,files:required.length}));
