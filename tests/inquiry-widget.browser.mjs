import assert from "node:assert/strict";
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
  payload=Object.fromEntries(new URLSearchParams(route.request().postData())); calls++;
  if(mode==='network') return route.abort();
  await route.fulfill({status:mode==='success'?200:503,contentType:'text/html',body:mode==='success'?'Accepted':'Unavailable'});
 });
 const panel=page.locator('#inquiry-widget-panel');
 const button=name=>panel.getByRole('button',{name,exact:true});
 const answer=value=>page.locator('#widget-answer').fill(value);
 const proceed=()=>button('Continue').click();
 await page.goto(base+'/',{waitUntil:'networkidle'});
 await expect(page.getByRole('button',{name:'Dismiss welcome prompt'})).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Dismiss welcome prompt'})).toBeVisible({timeout:5500});
 await page.getByRole('button',{name:'Dismiss welcome prompt'}).click();
 await page.reload({waitUntil:'networkidle'}); await page.waitForTimeout(4300);
 await expect(page.getByRole('button',{name:'Dismiss welcome prompt'})).toHaveCount(0);
 await page.locator('#chat-open').focus(); await page.keyboard.press('Enter');
 await expect(panel).toBeVisible(); await expect(panel.locator('h2')).toBeFocused();
 await expect(panel.getByText(/sensitive medical/)).toBeVisible();
 await button('Start').click(); await proceed(); await expect(page.locator('#widget-error')).toContainText('Enter your first name');
 await answer('Test'); await proceed(); await proceed(); await expect(page.locator('#widget-error')).toContainText('Enter your last name');
 await answer('Visitor'); await proceed(); await answer('invalid'); await proceed(); await expect(page.locator('#widget-error')).toContainText('valid email');
 await answer('visitor@example.com'); await proceed(); await button('Skip').click();
 await expect(page.locator('#widget-answer')).toHaveValue('');
 await page.selectOption('#widget-answer','erin-young'); await proceed();
 await button('Add a message').click(); await expect(panel.getByText(/sensitive medical/)).toBeVisible();
 await answer('Synthetic widget test & encoding + only'); await proceed();
 await expect(panel).toContainText('Erin Young');
 await button('Edit answers').click(); await expect(page.locator('#widget-answer')).toHaveValue('Test');
 await answer('Edited'); await proceed(); await proceed(); await proceed(); await answer('903-555-0100'); await proceed(); await proceed(); await button('Add a message').click(); await proceed();
 await page.keyboard.press('Escape'); await expect(panel).toHaveCount(0); await expect(page.locator('#chat-open')).toBeFocused();
 await page.locator('#chat-open').click(); await expect(panel).toContainText('Edited Visitor');
 await button('Send Inquiry').click(); await expect(page.locator('#widget-error')).toContainText("wasn't sent");
 await expect(button('Send Inquiry')).toBeEnabled();
 assert.equal(payload.source_page,'/'); assert.equal(payload.inquiry_source,'chat_widget');
 assert.equal(payload.first_name,'Edited'); assert.equal(payload.preferred_therapist,'erin-young');
 assert.equal(payload['bot-field'],''); assert.equal(payload.message,'Synthetic widget test & encoding + only');
 assert.deepEqual(Object.keys(payload).sort(),['form-name','first_name','last_name','email','phone','preferred_therapist','message','source_page','inquiry_source','bot-field'].sort());
 assert.equal(payload['form-name'],'bridge-contact-inquiry');
 mode='network'; await button('Send Inquiry').click(); await expect(button('Send Inquiry')).toBeEnabled(); await expect(page.locator('#widget-error')).toContainText("wasn't sent");
 mode='success'; await button('Send Inquiry').click(); await expect(panel.locator('h2')).toContainText('Your inquiry has been sent');
 assert.equal(calls,3);
 await expect(panel).toContainText('does not confirm an appointment');
 const storage=await page.evaluate(()=>({session:{...sessionStorage},local:{...localStorage}}));
 assert.deepEqual(storage,{session:{'bridge-inquiry-prompt-shown':'1'},local:{}});
 const slugs=['jennifer-wood','erin-young','jill-kirkley','alyxandrah-white','misty-shultz','kim-gonzales','kelley-bell','denise-santos','sarah-bell','sarah-critzman'];
 for(const slug of slugs) {
  await page.goto(base+'/therapists/'+slug+'/?ignored=private',{waitUntil:'networkidle'});
  await page.locator('#chat-open').click(); await button('Start').click();
  await answer('Test'); await proceed(); await answer('Visitor'); await proceed(); await answer('visitor@example.com'); await proceed(); await button('Skip').click();
  await expect(page.locator('#widget-answer')).toHaveValue(slug);
  await proceed(); await button('No message \u2014 review inquiry').click(); await button('Send Inquiry').click();
  await expect(panel.locator('h2')).toContainText('Your inquiry has been sent');
  assert.equal(payload.source_page,'/therapists/'+slug+'/'); assert.equal(payload.message,'');
 }
 for(const width of [375,390,768,1440]) {
  await page.setViewportSize({width,height:844});
  await page.goto(base+'/contact/',{waitUntil:'networkidle'}); await page.locator('#chat-open').click();
  const bounds=await panel.boundingBox(); assert.ok(bounds.x>=0&&bounds.y>=0&&bounds.x+bounds.width<=width&&bounds.y+bounds.height<=844);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:path.join(os.tmpdir(),`widget-${width}.png`)});
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: delayed prompt, session dismissal, keyboard/focus/Escape, required fields/email, phone entry/skip, selection, all 10 profile contexts, message/skip, review/edit, HTTP/network failures/retry, success, exact payload, pathname only, storage privacy, close/reopen, 375/390/768/1440 layouts; no real submissions.');
} finally {await browser.close();}
