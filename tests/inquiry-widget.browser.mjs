import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium, expect } from "@playwright/test";
import os from "node:os";
import path from "node:path";
const base = process.env.INQUIRY_TEST_URL || "http://localhost:3011";
if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(base)) throw new Error("Local tests only");
const browser = await chromium.launch({ headless: true, channel: "msedge" });
try {
 const page = await browser.newPage();
 const errors=[]; page.on('pageerror', e=>errors.push(e.message));
 let mode='http', payload, calls=0;
 await page.route('**/__forms.html', async route=> {
  assert.equal(route.request().method(),'POST');
  assert.equal(route.request().headers()['content-type'],'application/x-www-form-urlencoded');
  payload=Object.fromEntries(new URLSearchParams(route.request().postData())); calls++;
  if(mode==='static') return route.fulfill({status:200,contentType:'text/html',body:fs.readFileSync('public/__forms.html','utf8')});
  if(mode==='network') return route.abort();
  await route.fulfill({status:mode==='success'?200:503,contentType:'text/html',body:mode==='success'?'Mock response':'Unavailable'});
 });
 const panel=page.locator('#inquiry-widget-panel');
 const log=panel.getByRole('log');
 const button=name=>panel.getByRole('button',{name,exact:true});
 const answer=value=>page.locator('#widget-answer').fill(value);
 const proceed=()=>button('Send answer').click();
 const bubble=text=>expect(log.locator('[data-speaker="visitor"]').filter({hasText:text}).last()).toBeVisible();
 async function details() {
  await answer('Test'); await proceed(); await answer('visitor@example.com'); await proceed(); await answer('903-283-8729'); await proceed();
 }
 await page.clock.install(); await page.clock.pauseAt(await page.evaluate(()=>Date.now()+1000));
 await page.goto(base+'/',{waitUntil:'networkidle'});
 await expect(page.getByRole('button',{name:'Dismiss welcome prompt'})).toHaveCount(0);
 await page.clock.fastForward(1499);
 await expect(page.getByRole('button',{name:'Dismiss welcome prompt'})).toHaveCount(0);
 await page.clock.fastForward(1);
 await expect(page.getByRole('button',{name:'Dismiss welcome prompt'})).toBeVisible();
 const oldWelcome = "Hi. Welcome to The Bridge Therapeutic Services. Thank you for visiting our website. If you would like to make an appointment, or just have questions, please answer the following questions and we'll get back to you as soon as possible. Thank you.";
 await expect(page.getByRole('button',{name:oldWelcome,exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:oldWelcome,exact:true}).locator('..')).not.toContainText('sensitive medical');
 await page.clock.resume();
 await page.getByRole('button',{name:'Dismiss welcome prompt'}).click();
 await page.reload({waitUntil:'networkidle'}); await page.waitForTimeout(4300);
 await expect(page.getByRole('button',{name:'Dismiss welcome prompt'})).toHaveCount(0);
 await page.locator('#chat-open').focus(); await page.keyboard.press('Enter');
 await expect(panel).not.toContainText('Automated inquiry assistant');
 await expect(panel).toBeVisible(); await expect(page.locator('#widget-answer')).toBeFocused();
 await expect(panel).not.toContainText(/(?:inquiry|submitting)[^.]*confirm[^.]*appointment/i);
 const avatars=panel.locator('img[src="/assets/chat-assistant.webp"]');
 assert.ok(await avatars.count()>=2);
 assert.ok(await avatars.evaluateAll(images=>images.every(img=>img.complete&&img.naturalWidth===256&&img.alt==='')));
 await expect(page.locator('#chat-open img')).toHaveAttribute('src','/assets/chat-assistant.webp');
 await expect(log.locator('[data-speaker="assistant"] p')).toHaveText([oldWelcome, 'Can I get your name?']);
 await expect(page.locator('#widget-answer')).toBeFocused(); await expect(page.locator('#widget-answer')).toHaveAttribute('placeholder','Type an answer'); await proceed(); await expect(page.locator('#widget-error')).toContainText('Enter your first name');
 await page.clock.pauseAt(await page.evaluate(()=>Date.now()+1000));
 await answer('Test'); await proceed(); await bubble('Test');
 await expect(log.locator('[data-speaker="visitor"] img')).toHaveCount(0);
 assert.equal(await log.locator('[data-speaker="assistant"] img').count(),await log.locator('[data-speaker="assistant"]').count());
 await expect(log.locator('[data-typing]')).toBeVisible();
 await page.clock.fastForward(899);
 await expect(log).not.toContainText("What is your email address?");
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await log.locator('[data-typing] i').first().evaluate(n=>getComputedStyle(n).animationName),'none');
 await page.clock.fastForward(301);
 await page.clock.resume(); await expect(log).toContainText("What is your email address?");
 await expect(page.locator('#widget-answer')).toHaveValue('');

 for(const email of ['', 'adam','adam@','@domain.com','adam@domain','adam domain.com']) {
  await answer(email); await proceed();
  await expect(page.locator('#widget-error')).toHaveText('Enter a valid email address.');
  await expect(page.locator('#widget-answer')).toHaveAttribute('type','email');
  assert.equal(calls,0);
 }
 await answer('adam.wood@example.com'); await proceed();
 await expect(page.locator('#widget-answer')).toHaveAttribute('placeholder','Type phone number');
 for(const phone of ['', '123','555','abcdefghij','903-28','0000000000']) {
  await answer(phone); await proceed();
  await expect(page.locator('#widget-error')).toHaveText('Please enter a valid phone number.');
  await expect(page.locator('#widget-answer')).toHaveAttribute('type','tel');
  assert.equal(calls,0);
 }
 await answer('+1 (903) 283-8729'); await proceed();
 await expect(button('Send Inquiry')).toBeVisible();
 assert.equal(calls,0);
 await expect(panel.locator('textarea, dl, select')).toHaveCount(0);
 await expect(panel).not.toContainText(/Automated inquiry assistant|Here's what I'll send|last name|Make a Change|Add a message|Skip/i);
 await page.keyboard.press('Escape'); await expect(panel).toHaveCount(0); await expect(page.locator('#chat-open')).toBeFocused();
 await page.locator('#chat-open').click(); await expect(button('Send Inquiry')).toBeVisible();
 await expect(panel).not.toContainText(/(?:inquiry|submitting)[^.]*confirm[^.]*appointment/i);
 await button('Send Inquiry').click(); await expect(button('Try Again')).toBeEnabled(); await expect(log).toContainText("wasn't sent");
 assert.equal(payload.source_page,'/'); assert.equal(payload.inquiry_source,'chat_widget');
 assert.equal(payload.first_name,'Test'); assert.equal(payload.preferred_therapist,'');
 assert.equal(payload['bot-field'],''); assert.ok(!('message' in payload));
 assert.deepEqual(Object.keys(payload).sort(),['form-name','first_name','email','phone','preferred_therapist','source_page','inquiry_source','bot-field'].sort());
 assert.equal(payload['form-name'],'bridge-contact-inquiry');
 assert.ok(!('last_name' in payload));
 await expect(panel).not.toContainText(/last name/i);
 await expect(panel.locator('[autocomplete="family-name"]')).toHaveCount(0);
 for(const failure of ['network','static']) {mode=failure; await button('Try Again').click(); await expect(button('Try Again')).toBeEnabled(); await expect(log).toContainText("wasn't sent");}
 mode='success'; await button('Try Again').click(); await expect(log.locator('[data-speaker="assistant"] p').last()).toHaveText("Perfect. Thank you. We'll have someone contact you as soon as possible. If it's currently during business hours, you can call us directly at 903-283-8729");
 assert.equal(calls,4);
 await expect(panel).not.toContainText(/(?:inquiry|submitting)[^.]*confirm[^.]*appointment/i);
 const storage=await page.evaluate(()=>({session:{...sessionStorage},local:{...localStorage}}));
 assert.deepEqual(storage,{session:{'bridge-inquiry-prompt-shown':'1'},local:{}});
 await button('Restart conversation').click();
 await expect(log.locator('[data-speaker="visitor"]')).toHaveCount(0);
 await answer('Reset test'); await proceed(); await expect(log.locator('[data-typing]')).toBeVisible();
 await button('Restart conversation').click(); await page.waitForTimeout(1300);
 await expect(page.locator('#widget-answer')).toBeVisible(); await expect(log).not.toContainText('What is your email address?');
 await expect(page.locator('#widget-answer')).toHaveValue('');
 const slugs=['jennifer-wood','erin-young','jill-kirkley','alyxandrah-white','misty-shultz','kim-gonzales','kelley-bell','denise-santos','sarah-bell','sarah-critzman'];
 for(const slug of slugs) {
  await page.goto(base+'/therapists/'+slug+'/?ignored=private',{waitUntil:'networkidle'});
  await page.locator('#chat-open').click(); await details();
  await button('Restart conversation').click(); await details();
  await expect(panel).not.toContainText(/therapist in mind|last name|would you like to ask about/i);
  await button('Send Inquiry').click(); await expect(log).toContainText('Perfect. Thank you.');
  assert.equal(payload.source_page,'/therapists/'+slug+'/'); assert.equal(payload.preferred_therapist,slug); assert.ok(!('message' in payload));
 }
 for(const width of [375,390,768,1440]) {
  await page.setViewportSize({width,height:844});
  await page.goto(base+'/therapists/jennifer-wood/',{waitUntil:'networkidle'}); await page.locator('#chat-open').click(); await details();

  await button('Restart conversation').click();
  await answer('Test'); await proceed(); await answer('adam@example.com'); await proceed();
  await expect(panel.locator('input:not([name="bot-field"]),textarea')).toHaveCount(1);
  const bounds=await panel.boundingBox(); assert.ok(bounds.x>=0&&bounds.y>=0&&bounds.x+bounds.width<=width&&bounds.y+bounds.height<=844);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.ok(await log.evaluate(n=>n.scrollHeight-n.clientHeight-n.scrollTop<3));
  await page.screenshot({path:path.join(os.tmpdir(),`widget-chat-${width}.png`)});
  if(width<600) {
   await page.setViewportSize({width,height:430});
   await expect(page.locator('#widget-answer')).toBeVisible();
   const input=await page.locator('#widget-answer').boundingBox(); assert.ok(input.y>=0&&input.y+input.height<=430);
   await page.screenshot({path:path.join(os.tmpdir(),`widget-chat-keyboard-${width}.png`)});
  }
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: transcript/bubbles, composer, scroll, validation, required email/phone, no message/review/skip, all 10 automatic profile contexts, no therapist selection or last name, retry, delayed prompt/session, focus/Escape, source-aware payload, mocked HTTP/network/static errors and success, storage privacy, four widths and reduced-height viewport. No real submissions.');
} finally {await browser.close();}
