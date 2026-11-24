import test from 'node:test';
import assert from 'node:assert/strict';
import { publicAnalyticsPaths, publicPageView, analyticsOrigin, analyticsTitle } from '../lib/analytics-public-paths.mjs';
test('only exact reviewed public canonical paths are reported',()=>{
 assert.equal(new Set(publicAnalyticsPaths).size,publicAnalyticsPaths.length);
 for(const path of publicAnalyticsPaths){const p=publicPageView(path);assert.equal(p.page_location,analyticsOrigin+path);assert.equal(p.page_title,analyticsTitle);assert.equal(p.page_referrer,'');assert.deepEqual(Object.keys(p).sort(),['content_group','page_location','page_referrer','page_title']);if(path!=='/')assert.deepEqual(publicPageView(path.slice(0,-1)),p);}
});
test('sensitive, unknown, absolute, encoded, query and fragment input fails closed',()=>{
 for(const path of ['/contact/','/privacy/','/book/','/booking/','/appointments/','/intake/','/login/','/account/','/api/contact/','/blog/unapproved-draft/','/therapists/private-identifier/','//evil.example/','https://www.thebridgetherapy.com/about/','/about/?email=synthetic@example.test','/about/#private','/about//','/about/../contact/','/%61bout/',null,{},''])assert.equal(publicPageView(path),null,String(path));
});
