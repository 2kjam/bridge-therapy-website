import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";

const moduleUrl = (file) =>
  "data:text/javascript;base64," +
  Buffer.from(
    ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
  ).toString("base64");
const sharedUrl = moduleUrl("lib/inquiry.ts");
const { therapists, therapistValue, validateInquiry, sendInquiry } = await import(sharedUrl);
const valid = {
  first_name: "Test",
  last_name: "Visitor",
  email: "visitor@example.com",
  phone: "903-283-8729",
  preferred_therapist: "",
  message: "Synthetic test",
  "bot-field": "",
};

test("validation and therapist allowlist", () => {
  assert.deepEqual(validateInquiry(valid).errors, {});
  const {last_name, message, ...chat} = valid;
  assert.equal(last_name, "Visitor");
  assert.ok(message);
  assert.deepEqual(validateInquiry(chat, "chat_widget").errors, {});
  assert.ok(validateInquiry(chat, "contact_form").errors.last_name);
  assert.ok(!("last_name" in validateInquiry(valid, "chat_widget").data));
  for (const key of ["first_name", "last_name", "email"])
    assert.ok(validateInquiry({ ...valid, [key]: "" }).errors[key]);
  assert.ok(validateInquiry({ ...valid, email: "invalid" }).errors.email);
  assert.ok(
    validateInquiry({ ...valid, preferred_therapist: "invented" }).errors.preferred_therapist,
  );
  assert.ok(
    validateInquiry({ ...valid, message: "x".repeat(2001) }).errors.message,
  );
  assert.ok(validateInquiry({ ...valid, first_name: {} }).errors.first_name);
  for (const [slug] of therapists) assert.equal(therapistValue(slug), slug);
  assert.equal(therapistValue("unknown"), "");
});


test("both sources construct the same Netlify request; mocked responses do not prove storage", async () => {
 const originalFetch = globalThis.fetch;
 const requests = [];
 const definition = fs.readFileSync("public/__forms.html", "utf8");
 const { parse } = await import("parse5");
 const nodes = (node) => [node, ...(node.childNodes ?? []).flatMap(nodes)];
 const fields = nodes(parse(definition)).filter(n => ["input", "textarea", "select"].includes(n.tagName)).map(n => n.attrs.find(a=>a.name === "name").value).sort();
 const sample = {...valid, first_name:"A & B", last_name:"O'Name", message:"A+B & = ? / Unicode \u00e9"};
 try {
  globalThis.fetch = async (url, options) => { requests.push({url,...options}); return new Response("Mock HTTP response only", {status:200}); };
  await sendInquiry(sample, "/contact/", "contact_form");
  const {last_name, message, ...chat} = sample;
  assert.ok(last_name); assert.ok(message);
  await assert.rejects(sendInquiry(chat, "/contact/", "contact_form"), /validation/);
  assert.equal(requests.length, 1);
  await sendInquiry(chat, "/therapists/erin-young/", "chat_widget");
  for (const [i, request] of requests.entries()) {
   assert.equal(request.url, "/__forms.html"); assert.equal(request.method,"POST");
   assert.deepEqual(request.headers, {"Content-Type":"application/x-www-form-urlencoded"});
   const params=new URLSearchParams(request.body);
   assert.deepEqual([...params.keys()].sort(), i === 0 ? fields : fields.filter(key => key !== "last_name" && key !== "message"));
   assert.equal(params.get("form-name"), "bridge-contact-inquiry");
   assert.equal(params.get("source_page"), i===0 ? "/contact/" : "/therapists/erin-young/");
   assert.equal(params.get("inquiry_source"), i===0 ? "contact_form" : "chat_widget");
   for (const [key,value] of Object.entries(i === 0 ? sample : chat)) assert.equal(params.get(key),value);
  }
  const core = request => { const p=new URLSearchParams(request.body); p.delete("last_name"); p.delete("message"); p.delete("source_page"); p.delete("inquiry_source"); return p.toString(); };
  assert.equal(core(requests[0]),core(requests[1]));
  for (const source of ["contact_form","chat_widget"]) {
   for (const html of [definition, definition.replaceAll('data-netlify="true"','').replaceAll('data-netlify-honeypot="bot-field"','')]) {
    globalThis.fetch=async()=>new Response(html,{status:200});
    await assert.rejects(sendInquiry(valid,"/contact/",source), /Form definition returned/);
   }
   globalThis.fetch=async()=>new Response("Unavailable",{status:503});
   await assert.rejects(sendInquiry(valid,"/contact/",source));
   globalThis.fetch=async()=>{throw new Error("Mock network failure");};
   await assert.rejects(sendInquiry(valid,"/contact/",source));
   let attempted=false;
   globalThis.fetch=async()=>{attempted=true;return new Response("Mock");};
   await assert.rejects(sendInquiry({...valid,"bot-field":"filled"},"/contact/",source));
   assert.equal(attempted,false);
  }
 } finally {globalThis.fetch=originalFetch;}
});

test("chat phone/email validation is enforced by submission; Contact phone stays optional", async () => {
 const originalFetch=globalThis.fetch;
 let calls=0;
 globalThis.fetch=async()=>{calls++;return new Response("Mock");};
 try {
  assert.deepEqual(validateInquiry({...valid,phone:""}, "contact_form").errors,{});
  for(const phone of ["9032838729","903-283-8729","(903) 283-8729","903 283 8729","+1 903 283 8729","+1 (903) 283-8729","19032838729"])
   assert.deepEqual(validateInquiry({...valid,phone},"chat_widget").errors,{});
  for(const phone of ["","123","555","abcdefghij","903-28","0000000000","903abc2838729"]) {
   assert.equal(validateInquiry({...valid,phone},"chat_widget").errors.phone,"Please enter a valid phone number.");
   await assert.rejects(sendInquiry({...valid,phone},"/","chat_widget"),/validation/);
  }
  for(const email of ["","adam","adam@","@domain.com","adam@domain","adam domain.com"]) {
   assert.equal(validateInquiry({...valid,email},"chat_widget").errors.email,"Enter a valid email address.");
   await assert.rejects(sendInquiry({...valid,email},"/","chat_widget"),/validation/);
  }
  for(const email of ["adam@example.com","adam.wood@example.com"])
   assert.deepEqual(validateInquiry({...valid,email},"chat_widget").errors,{});
  assert.equal(calls,0);
 } finally {globalThis.fetch=originalFetch;}
});
