import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium, expect } from "@playwright/test";
import os from "node:os";
import path from "node:path";
const base = "http://localhost:3011";
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
  await button('Start').click(); await answer('Test'); await proceed(); await answer('Visitor'); await proceed(); await answer('visitor@example.com'); await proceed(); await button('Skip').click();
 }
 await page.goto(base+'/',{waitUntil:'networkidle'});
 await expect(page.getByRole('button',{name:'Dismiss welcome prompt'})).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Dismiss welcome prompt'})).toBeVisible({timeout:5500});
 await page.getByRole('button',{name:'Dismiss welcome prompt'}).click();
 await page.reload({waitUntil:'networkidle'}); await page.waitForTimeout(4300);
 await expect(page.getByRole('button',{name:'Dismiss welcome prompt'})).toHaveCount(0);
 await page.locator('#chat-open').focus(); await page.keyboard.press('Enter');
 await expect(panel).toBeVisible(); await expect(button('Start')).toBeFocused();
 await expect(log.getByText(/sensitive medical/)).toBeVisible();
 await button('Start').click(); await expect(page.locator('#widget-answer')).toBeFocused(); await proceed(); await expect(page.locator('#widget-error')).toContainText('Enter your first name');
 await answer('Test'); await proceed(); await bubble('Test'); await expect(log).toContainText("Thanks, Test. What's your last name?");
 await expect(page.locator('#widget-answer')).toHaveValue('');
 await proceed(); await expect(page.locator('#widget-error')).toContainText('Enter your last name');
 await answer('Visitor'); await proceed(); await answer('invalid'); await proceed(); await expect(page.locator('#widget-error')).toContainText('valid email');
 await expect(log.locator('[data-speaker="visitor"]').filter({hasText:'invalid'})).toHaveCount(0);
 await answer('visitor@example.com'); await proceed(); await button('Skip').click(); await bubble('Skip');
 await expect(panel.locator('select')).toHaveCount(0);
 await expect(panel.getByRole('button',{name:'Not sure — help me choose',exact:true})).toBeVisible();
 await button('Erin Young').click(); await bubble('Erin Young');
 await button('Add a message').click(); await expect(page.locator('#widget-privacy')).toBeVisible();
 await answer('Synthetic widget test & encoding + only'); await proceed(); await bubble('Synthetic widget test');
 await expect(log.locator('dl').last()).toContainText('Erin Young');
 await button('Make a Change').click(); await button('First name').click(); await expect(page.locator('#widget-answer')).toHaveValue('Test');
 await answer('Edited'); await proceed(); await expect(log.locator('dl').last()).toContainText('Edited Visitor');
 await button('Make a Change').click(); await button('Phone').click(); await answer('903-555-0100'); await proceed();
 await expect(log.locator('dl').last()).toContainText('903-555-0100');
 assert.ok(await log.evaluate(n=>n.scrollHeight-n.clientHeight-n.scrollTop<3));
 await page.keyboard.press('Escape'); await expect(panel).toHaveCount(0); await expect(page.locator('#chat-open')).toBeFocused();
 await page.locator('#chat-open').click(); await expect(log.locator('dl').last()).toContainText('Edited Visitor');
 await button('Send Inquiry').click(); await expect(button('Try Again')).toBeEnabled(); await expect(log).toContainText("wasn't sent");
 assert.equal(payload.source_page,'/'); assert.equal(payload.inquiry_source,'chat_widget');
 assert.equal(payload.first_name,'Edited'); assert.equal(payload.preferred_therapist,'erin-young');
 assert.equal(payload['bot-field'],''); assert.equal(payload.message,'Synthetic widget test & encoding + only');
 assert.deepEqual(Object.keys(payload).sort(),['form-name','first_name','last_name','email','phone','preferred_therapist','message','source_page','inquiry_source','bot-field'].sort());
 assert.equal(payload['form-name'],'bridge-contact-inquiry');
 for(const failure of ['network','static']) {mode=failure; await button('Try Again').click(); await expect(button('Try Again')).toBeEnabled(); await expect(log).toContainText("wasn't sent");}
 mode='success'; await button('Try Again').click(); await expect(log).toContainText('Your inquiry has been sent');
 assert.equal(calls,4);
 await expect(log).toContainText('does not confirm an appointment');
 const storage=await page.evaluate(()=>({session:{...sessionStorage},local:{...localStorage}}));
 assert.deepEqual(storage,{session:{'bridge-inquiry-prompt-shown':'1'},local:{}});
 const slugs=['jennifer-wood','erin-young','jill-kirkley','alyxandrah-white','misty-shultz','kim-gonzales','kelley-bell','denise-santos','sarah-bell','sarah-critzman'];
 const first=['Jennifer','Erin','Jill','Alyx','Misty','Kim','Kelley','Denise','Sarah','Sarah'];
 for(const [i,slug] of slugs.entries()) {
  await page.goto(base+'/therapists/'+slug+'/?ignored=private',{waitUntil:'networkidle'});
  await page.locator('#chat-open').click(); await details();
  await expect(log).toContainText("'s profile"); await button('Yes, '+first[i]).click();
  await button('No, send my inquiry').click(); await button('Send Inquiry').click(); await expect(log).toContainText('Your inquiry has been sent');
  assert.equal(payload.source_page,'/therapists/'+slug+'/'); assert.equal(payload.preferred_therapist,slug); assert.equal(payload.message,'');
 }
 await page.goto(base+'/therapists/jennifer-wood/',{waitUntil:'networkidle'});
 await page.locator('#chat-open').click(); await details(); await button("I'm not sure").click();
 await button('No, send my inquiry').click(); await button('Make a Change').click(); await button('Therapist').click();
 await button('Jill Kirkley').click(); await expect(log.locator('dl').last()).toContainText('Jill Kirkley');
 await button('Send Inquiry').click(); await expect(log).toContainText('Your inquiry has been sent'); assert.equal(payload.preferred_therapist,'jill-kirkley');
 for(const width of [375,390,768,1440]) {
  await page.setViewportSize({width,height:844});
  await page.goto(base+'/therapists/jennifer-wood/',{waitUntil:'networkidle'}); await page.locator('#chat-open').click(); await details();
  await button('Help me choose someone else').click(); await button('Denise Santos').click();
  await button('Add a message').click();
  assert.equal(await panel.locator('input:not([name="bot-field"]),textarea').count(),1);
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
 console.log('PASS: transcript/bubbles, composer, scroll, validation, skip/message, chips, all 10 profile confirmations, alternative therapist, edit/retry, delayed prompt/session, focus/Escape, unchanged payload, mocked HTTP/network/static errors and success, storage privacy, four widths and reduced-height viewport. No real submissions.');
} finally {await browser.close();}
