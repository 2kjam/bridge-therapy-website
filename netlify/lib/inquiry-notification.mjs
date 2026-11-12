// Server-only module. Recipient settings and provider responses never reach visitors.
const sites = new Set(['c9ac64dc-b248-4666-bc90-6219f2b483a4', '1c0ce777-b889-4f6b-8292-ef7590a4a25e']);
const formName = 'bridge-contact-inquiry';
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const record = value => value && typeof value === 'object' && !Array.isArray(value) ? value : null;
const clean = (value, limit) => typeof value === 'string' ? value.trim().replace(/\0/g, '').slice(0, limit) : '';
const escape = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const fail = () => new Error('Inquiry notification failed. The submission remains in Netlify Forms.');
export function recipients(value) {
  if (typeof value !== 'string') throw fail();
  const list = [...new Set(value.split(',').map(v => v.trim()).filter(Boolean))];
  if (!list.length || list.length > 10 || list.some(v => !/^[^\s<>@,]+@[^\s<>@,]+\.[^\s<>@,]+$/.test(v))) throw fail();
  return list;
}
export function normalize(event) {
  const root = record(event); if (!root) return null;
  const outer = record(root.data), wrapped = record(outer?.payload), legacy = record(root.payload);
  if (record(outer?.data)) return {data:outer.data, meta:[root, outer]};
  if (record(wrapped?.data)) return {data:wrapped.data, meta:[root, outer, wrapped]};
  if (record(legacy?.data)) return {data:legacy.data, meta:[root, legacy]};
  return outer ? {data:outer, meta:[root]} : null;
}
export function createNotifier({env = key => globalThis.Netlify?.env.get(key), fetchImpl = globalThis.fetch, sleep = ms => new Promise(r => setTimeout(r,ms))} = {}) {
  return async function formSubmitted(event) {
    if (env('INQUIRY_NOTIFICATIONS_ENABLED') !== 'true') return;
    if (!sites.has(env('SITE_ID'))) throw fail();
    const submission = normalize(event); if (!submission) return;
    const {data, meta} = submission;
    const names = [...meta.map(m => m.form_name),data['form-name'],data['notification-form']].filter(v => typeof v === 'string' && v.trim()).map(v=>v.trim());
    if (!names.length || names.some(v=>v !== formName) || data['bot-field']) return;
    const id = clean(data['notification-id'], 36);
    if (!uuid.test(id)) throw fail();
    const from = env('INQUIRY_NOTIFICATION_FROM'), key = env('RESEND_API_KEY');
    if (!from || /[\r\n]/.test(from) || !key) throw fail();
    const to = recipients(env('INQUIRY_NOTIFICATION_TO'));
    const source = ({contact_form:'Contact form',chat_widget:'Chatbot'})[data.inquiry_source] || 'Website inquiry';
    const fields = [['First name','first_name',80],['Last name','last_name',80],['Email','email',254],['Phone','phone',40],['Preferred therapist','preferred_therapist',40],['Message','message',2000]];
    const rows = fields.map(([label,field,limit])=>[label,clean(data[field],limit)]).filter(([,value])=>value);
    const message = {from,to,subject:'New Bridge website inquiry',text:rows.map(([label,value])=>label+': '+value).join('\n\n')+'\n\nSource: '+source,html:'<html lang="en"><body><h1>New website inquiry</h1><dl>'+rows.map(([label,value])=>'<dt>'+label+'</dt><dd>'+escape(value).replace(/\n/g,'<br>')+'</dd>').join('')+'</dl><p style="font-size:12px;color:#666">Source: '+source+'</p></body></html>'};
    // Validation mode sends no visitor data and can only reach the owner's mailbox.
    if (env('INQUIRY_NOTIFICATION_TEST_MODE') === 'true') {
      message.to = ['adam.wood@2kjam.com']; message.subject = 'SYNTHETIC TEST — Bridge inquiry notification';
      message.text = 'Synthetic Bridge notification delivery check.'; delete message.html;
    }
    const body = JSON.stringify(message);
    const headers = {Authorization:'Bearer '+key,'Content-Type':'application/json','Idempotency-Key':'bridge/'+env('SITE_ID')+'/'+(env('INQUIRY_NOTIFICATION_TEST_MODE') === 'true' ? 'test/' : 'live/')+id};
    for (let attempt=0; attempt<3; attempt++) {
      let retry = false;
      try {
        const response = await fetchImpl('https://api.resend.com/emails',{method:'POST',headers,body,signal:AbortSignal.timeout(10000)});
        if (response.ok) return;
        retry = response.status === 429 || response.status >= 500;
        await response.body?.cancel();
      } catch {retry = true;}
      if (!retry || attempt === 2) throw fail();
      await sleep(1000*2**attempt);
    }
  };
}
