import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {measurementId,analyticsReleaseApproved,analyticsBuildAllowed,productionOrigin,safePageView,analyticsConfiguration,analyticsEnabledForChoice} from '../lib/analytics-policy.mjs';
import {createAnalyticsController} from '../lib/analytics-client.mjs';
import {contentSecurityPolicy,analyticsContentSecurityPolicy,securityHeaderRule} from '../lib/security-headers.mjs';
const env={NETLIFY:'true',NODE_ENV:'production',CONTEXT:'production',SITE_ID:'1c0ce777-b889-4f6b-8292-ef7590a4a25e',BRANCH:'main',URL:productionOrigin};
test('verified GA4 destination is distinct from unapproved GTM; activation fails closed',()=>{
 assert.equal(measurementId,'G-61RSPK36Y0');assert.equal(analyticsReleaseApproved,true);assert.equal(analyticsBuildAllowed(env,'phase-production-build'),true);
 assert.equal(analyticsBuildAllowed(env,'phase-production-build',false),false);
 assert.equal(analyticsBuildAllowed(env,'phase-production-build',true),true);
 for(const patch of [{SITE_ID:'c9ac64dc-b248-4666-bc90-6219f2b483a4'},{CONTEXT:'deploy-preview'},{BRANCH:'staging'},{URL:'https://bridge-therapy-staging.netlify.app'},{URL:'https://main--bridge-therapy-website.netlify.app'},{PULL_REQUEST:'true'},{REVIEW_ID:'123'},{NETLIFY_PREVIEW_SERVER:'true'},{NODE_ENV:'development'}])assert.equal(analyticsBuildAllowed({...env,...patch},'phase-production-build',true),false);
 assert.equal(analyticsBuildAllowed({...env,BRIDGE_BUILD_ANALYTICS:'true'},'phase-development-server',true),false);
});
test('safe payloads have no treatment path, title, referrer, campaign data or user fields',()=>{
 assert.deepEqual(safePageView(),{page_location:productionOrigin+'/',page_title:'The Bridge Therapeutic Services',page_referrer:'',content_group:'Website'});
 const config=analyticsConfiguration();assert.equal(config.send_page_view,false);assert.equal(config.allow_google_signals,false);assert.equal(config.allow_ad_personalization_signals,false);assert.equal(config.allow_interest_groups,false);assert.equal(config.ignore_referrer,true);
 assert.ok(!('user_id' in config));assert.ok(!('user_properties' in config));assert.ok(!('client_id' in config));
 for(const name of ['campaign_id','campaign_source','campaign_medium','campaign_name','campaign_term','campaign_content'])assert.equal(config[name],'');
});
function browser(origin=productionOrigin){
 const appended=[],cookies=[];const win={location:{origin,get href(){throw Error('Do not read URL');},get search(){throw Error('Do not read query');}}};
 const doc={head:{appendChild:s=>appended.push(s)},createElement:tag=>{assert.equal(tag,'script');return{};},set cookie(s){cookies.push(s);},get cookie(){throw Error('Do not read cookie values');},get body(){throw Error('Do not read page or form content');}};
 return {win,doc,appended,cookies,controller:createAnalyticsController(win,doc),commands:()=>win.dataLayer?.map(a=>[...a])??[]};
}
test('controller is inert until enabled by caller and sends only fixed pageviews',()=>{
 const b=browser();assert.equal(b.appended.length,0);assert.equal(b.commands().length,0);
 b.controller.pageview('/religious-trauma-therapy/?email=synthetic@example.test#private');
 assert.equal(b.appended.length,1);assert.equal(b.appended[0].src,'https://www.googletagmanager.com/gtag/js?id=G-61RSPK36Y0');assert.equal(b.appended[0].referrerPolicy,'no-referrer');assert.equal(b.appended[0].async,true);
 const consent=b.commands().filter(a=>a[0]==='consent');assert.ok(consent.every(a=>a[2].analytics_storage==='granted' && a[2].ad_storage==='denied' && a[2].ad_user_data==='denied' && a[2].ad_personalization==='denied'));
 const event=b.commands().find(a=>a[0]==='event');assert.deepEqual(event,['event','page_view',{send_to:measurementId,...safePageView()}]);
 assert.doesNotMatch(JSON.stringify(b.commands()),/synthetic|trauma|private|email|user_id|user_properties/);
 b.controller.pageview('/religious-trauma-therapy/?email=synthetic@example.test#private');assert.equal(b.commands().filter(a=>a[0]==='event').length,1);
 b.controller.pageview('/contact/');assert.equal(b.appended.length,1);assert.equal(b.commands().filter(a=>a[0]==='event').length,2);
});
test('nonproduction hosts never load or queue Analytics even if controller is invoked',()=>{
 for(const origin of ['https://bridge-therapy-staging.netlify.app','https://www.thebridgetherapy.com.attacker.example','http://www.thebridgetherapy.com','http://localhost:3000']){const b=browser(origin);b.controller.pageview('/');assert.equal(b.appended.length,0);assert.equal(b.commands().length,0);}
});
test('withdrawal disables destination, keeps storage denied and expires only known GA cookies',()=>{
 const b=browser();b.controller.pageview('/');b.controller.stop();assert.equal(b.win['ga-disable-G-61RSPK36Y0'],true);assert.ok(b.cookies.every(s=>/^_ga(?:_61RSPK36Y0)?=; Max-Age=0;/.test(s)));assert.equal(b.cookies.length,6);
 const last=b.commands().at(-1);assert.equal(last[0],'consent');assert.ok(Object.values(last[2]).every(v=>v==='denied'));
});
test('exact-path CSP proposal is isolated; baseline and all other directives remain unchanged',()=>{
 const parse=s=>new Map(s.split('; ').map(d=>{const[k,...v]=d.split(' ');return[k,v]}));const base=parse(contentSecurityPolicy),next=parse(analyticsContentSecurityPolicy);
 assert.deepEqual(next.get('script-src'),[...base.get('script-src'),'https://www.googletagmanager.com/gtag/js']);
 for(const name of ['connect-src','img-src'])assert.deepEqual(next.get(name),[...base.get(name),'https://www.google-analytics.com/g/collect','https://region1.google-analytics.com/g/collect']);
 for(const [name,value] of base)if(!['script-src','connect-src','img-src'].includes(name))assert.deepEqual(next.get(name),value);
 assert.doesNotMatch(analyticsContentSecurityPolicy,/unsafe-eval|doubleclick|googleadservices|\*\.google|gtm\.js/);
 assert.equal(securityHeaderRule().headers.find(h=>h.key==='Content-Security-Policy').value,contentSecurityPolicy);
 assert.equal(securityHeaderRule('Content-Security-Policy',true).headers.find(h=>h.key==='Content-Security-Policy').value,analyticsContentSecurityPolicy);
});
test('tracking has no visible UI or form/chat extraction',()=>{
 const source=fs.readFileSync('lib/analytics-client.mjs','utf8');assert.doesNotMatch(source,/querySelector|addEventListener|FormData|\.value|innerHTML|textContent|location\.(?:href|search|hash)|document\.(?:title|referrer)/);
 const tracker=fs.readFileSync('components/analytics-tracker.tsx','utf8');assert.match(tracker,/return null/);assert.match(tracker,/allowedPaths\.includes\(pathname\)/);assert.match(tracker,/choice === "pending"/);
 const choice=fs.readFileSync('components/analytics-choice.ts','utf8');assert.match(choice,/useSyncExternalStore/);assert.match(choice,/globalPrivacyControl/);assert.match(choice,/bridge.analytics-choice.v1/);
});
test('footer has only an ordinary privacy link; controls are on the privacy page',()=>{
 const footer=fs.readFileSync('components/footer.tsx','utf8');assert.doesNotMatch(footer,/AnalyticsPreferences|<button|<details/);assert.match(footer,/<a href="\/privacy\/">Privacy/);
 assert.equal(fs.existsSync('components/analytics-preferences.tsx'),false);
 assert.equal(fs.existsSync('components/analytics-preferences.module.css'),false);
 const page=fs.readFileSync('app/privacy/page.tsx','utf8');assert.match(page,/<AnalyticsPrivacyControls/);assert.match(page,/policies.google.com\/technologies\/partner-sites/);
 assert.doesNotMatch(fs.readFileSync('public/privacy.css','utf8'),/position:\s*(fixed|absolute)|z-index/);
});
test('ordinary analytics defaults wait for hydration and preserve saved/browser opt-outs',()=>{
 for(const choice of ['unknown','granted'])assert.equal(analyticsEnabledForChoice(choice),true);
 for(const choice of ['denied','blocked','pending'])assert.equal(analyticsEnabledForChoice(choice),false);
 const source=fs.readFileSync('components/analytics-choice.ts','utf8');assert.match(source,/serverChoice = \(\) => "pending"/);
 assert.equal(analyticsConfiguration().cookie_expires,7776000);
 const b=browser();b.controller.pageview('/');b.controller.stop();b.controller.pageview('/');
 assert.equal(b.commands().filter(a=>a[0]==='event').length,2);assert.equal(b.commands().filter(a=>a[0]==='consent').at(-1)[2].analytics_storage,'granted');
});
