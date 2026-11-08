import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('staging has no Analytics popup, footer control or provider loader',()=>{
 for(const path of ['components/footer.tsx','app/layout.tsx'])assert.doesNotMatch(fs.readFileSync(path,'utf8'),/AnalyticsPreferences|analytics-choice-title|gtag|dataLayer|googletagmanager/);
 assert.equal(fs.existsSync('components/analytics-preferences-preview.tsx'),false);
 assert.equal(fs.existsSync('components/analytics-preferences-preview.module.css'),false);
 const csp=fs.readFileSync('lib/security-headers.mjs','utf8');assert.doesNotMatch(csp,/googletagmanager|google-analytics/);
});
