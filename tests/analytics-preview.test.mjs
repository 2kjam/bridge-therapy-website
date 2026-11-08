import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stagingBuildAllowed} from '../lib/babylovegrowth/policy.mjs';
test('preview has no collection, persistence or automatic overlay',()=>{
 const source=fs.readFileSync('components/analytics-preferences-preview.tsx','utf8');
 assert.doesNotMatch(source,/gtag|dataLayer|createAnalytics|createElement|fetch\(|localStorage|sessionStorage|document\.|window\.|<script|<details[^>]*\bopen=/);
 assert.match(source,/<summary>Analytics preferences/);assert.match(source,/preview only/);
 assert.doesNotMatch(fs.readFileSync('components/analytics-preferences-preview.module.css','utf8'),/position:\s*(?:fixed|absolute)|z-index/);
 assert.match(fs.readFileSync('components/footer.tsx','utf8'),/BRIDGE_BUILD_CMS_STAGING === "true" && <AnalyticsPreferencesPreview/);
});
test('preview build identity excludes production and unrelated branches',()=>{
 assert.equal(stagingBuildAllowed({SITE_ID:'c9ac64dc-b248-4666-bc90-6219f2b483a4',BRANCH:'staging'}),true);
 for(const env of [{SITE_ID:'1c0ce777-b889-4f6b-8292-ef7590a4a25e',BRANCH:'main'},{SITE_ID:'c9ac64dc-b248-4666-bc90-6219f2b483a4',BRANCH:'main'},{}])assert.equal(stagingBuildAllowed(env),false);
});
