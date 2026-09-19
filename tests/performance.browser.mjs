import { chromium } from '@playwright/test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const phase = process.argv[2] || 'after';
const base = process.env.INQUIRY_TEST_URL || 'http://127.0.0.1:3032';
const browser = await chromium.launch({ channel: 'msedge' });
const results = [];
try {
  for (const route of ['/', '/anxiety-counseling-tyler/', '/blog/']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const session = await context.newCDPSession(page);
    await session.send('Network.enable');
    const requests = [];
    session.on('Network.requestWillBeSent', e => { if (e.type === 'Image') requests.push({url:e.request.url,priority:e.request.initialPriority}); });
    await page.addInitScript(() => {
      window.__performanceProbe = { lcp: 0, cls: 0, element: '' };
      new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.__performanceProbe.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver(list => { const e = list.getEntries().at(-1); window.__performanceProbe.lcp = e.startTime; window.__performanceProbe.element = e.element?.outerHTML.slice(0,500); }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
    await page.goto(base + route, { waitUntil: 'load' });
    await page.waitForTimeout(3000);
    const metrics = await page.evaluate(() => {
      const entries = [...performance.getEntriesByType('navigation'), ...performance.getEntriesByType('resource')];
      const images = entries.filter(e => /\.(?:jpg|jpeg|png|webp|avif|svg)(?:[?#]|$)/i.test(e.name));
      return { ...window.__performanceProbe, totalTransfer: entries.reduce((n,e)=>n+e.transferSize,0), imageTransfer: images.reduce((n,e)=>n+e.transferSize,0), imageCount: images.length, scriptDecoded: entries.filter(e=>e.initiatorType==='script').reduce((n,e)=>n+e.decodedBodySize,0), images:images.map(e=>({url:e.name,transfer:e.transferSize})), preloads:[...document.querySelectorAll('link[rel="preload"][as="image"]')].map(e=>e.getAttribute('href')) };
    });
    results.push({ route, ...metrics, requests });
    if (phase === 'after') {
      assert.equal(requests.filter(r => r.url.includes('/presentation/menu/')).length, 0, 'Closed menus must not download portraits');
      assert.equal(metrics.preloads.some(src => src?.includes('/presentation/menu/')), false);
      if (route === '/') assert.equal(requests.some(r => r.url.includes('/ivory-lake.jpg')), false, 'Below-fold lake stays deferred');
      if (route === '/blog/') {
        assert.equal(requests.some(r => r.url.includes('/assets/blog/')), false, 'Index must not download preserved originals');
        assert.ok(requests.filter(r => r.url.includes('/presentation/blog/')).length < 18);
      }
    }
    await context.close();
  }
} finally { await browser.close(); }
fs.mkdirSync('test-results/performance', {recursive:true});
fs.writeFileSync('test-results/performance/'+phase+'.json', JSON.stringify(results,null,2));
console.log(JSON.stringify(results.map(({images,requests,preloads,...r})=>({...r,requestCount:requests.length,largest:images.sort((a,b)=>b.transfer-a.transfer).slice(0,5),preloads})),null,2));
