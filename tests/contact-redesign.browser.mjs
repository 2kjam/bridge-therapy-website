import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium, expect} from '@playwright/test';

const base=process.env.INQUIRY_TEST_URL || 'http://127.0.0.1:3012';
if(!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(base))throw new Error('Use a local server.');
const browser=await chromium.launch({channel:'msedge'});
const results=[];
fs.mkdirSync('test-results/contact-redesign',{recursive:true});
try {
 for(const width of [375,390,768,1024,1280,1440]) {
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage();
  await page.route('**/__forms.html',route=>route.abort());
  const images=[];page.on('request',r=>{if(r.resourceType()==='image')images.push(r.url());});
  await page.goto(`${base}/contact/`,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  expect(images.some(u=>u.includes('/presentation/menu/'))).toBe(false);
  expect(images.some(u=>u.endsWith('/assets/kalynne.jpg'))).toBe(false);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveText('Your next chapter can start with a conversation.');
  await expect(page.locator('main img')).toHaveCount(1);
  const portrait=page.locator('.contact-portrait img');
  await expect(portrait).toHaveJSProperty('naturalWidth',720);
  await expect(portrait).toHaveAttribute('alt','Kalynne Arrick, Office Manager at The Bridge Therapeutic Services');
  await expect(page.locator('.contact-staff-role')).toHaveText('Office Manager');
  await expect(page.locator('main')).not.toContainText('You are not alone here.');
  await expect(page.locator('#location')).toContainText('3800 Paluxy Drive, Suite 240');
  await expect(page.locator('.contact-information')).toContainText('8:00 AM–7:00 PM');
  await expect(page.locator('.contact-information')).toContainText('within 24 hours');
  await expect(page.locator('.contact-information a[href="tel:9032838729"]')).toHaveCount(1);
  await expect(page.locator('.contact-information a[href="mailto:info@thebridgetherapy.com"]')).toHaveCount(1);
  const metrics=await page.evaluate(()=>{
   const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
   return {hero:box('.contact-intro'),intro:box('.contact-copy'),portrait:box('.contact-portrait'),identity:box('.contact-staff'),information:box('.contact-information'),form:box('#inquiry'),faq:box('#questions'),columns:getComputedStyle(document.querySelector('.contact-layout')).gridTemplateColumns,lowerColumns:getComputedStyle(document.querySelector('.contact-details-layout')).gridTemplateColumns};
  });
  const dimensions=width<=600?[260,338]:width<=800?[300,390]:width<=1377?[340,442]:[360,468];
  assert.deepEqual([metrics.portrait.width,metrics.portrait.height],dimensions);
  if(width>=1280){assert.ok(metrics.intro.x+metrics.intro.width<metrics.portrait.x);assert.ok(metrics.portrait.x+metrics.portrait.width<metrics.identity.x);}
  if(width<=600){assert.ok(metrics.intro.y+metrics.intro.height<metrics.portrait.y);assert.ok(metrics.portrait.y+metrics.portrait.height<metrics.identity.y);}
  assert.ok(metrics.faq.y>=metrics.form.y+metrics.form.height);
  if(width>=1024){assert.ok(metrics.information.x+metrics.information.width<=metrics.form.x);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for(const name of ['First Name (required)','Last Name (required)','Email (required)','Phone (optional)','Preferred Therapist','Message (optional)'])await expect(page.getByLabel(name,{exact:true})).toBeVisible();
  const meet=page.getByRole('link',{name:'Meet Kalynne'});
  await meet.focus();expect(await meet.evaluate(n=>getComputedStyle(n).outlineStyle)).not.toBe('none');
  await expect(meet).toHaveAttribute('href','/staff/kalynne-arrick/');
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:`test-results/contact-redesign/contact-${width}.png`,fullPage:true});
  for(const details of await page.locator('.contact-faq details').all()){await details.locator('summary').click();await expect(details).toHaveAttribute('open','');}
  await page.getByRole('button',{name:'Send Inquiry'}).scrollIntoViewIfNeeded();
  const unobstructed=await page.getByRole('button',{name:'Send Inquiry'}).evaluate(n=>{const r=n.getBoundingClientRect();return n.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));});
  assert.ok(unobstructed,'Chat widget must not obstruct submission');
  results.push({width,...metrics});await context.close();
 }
} finally {await browser.close();}
fs.writeFileSync('test-results/contact-redesign/metrics.json',JSON.stringify(results,null,2));
console.log('PASS: six Contact layouts, authentic portrait dimensions, factual content, labels, focus, FAQs, unobstructed submit, and deferred menu images. No inquiry submitted.');
