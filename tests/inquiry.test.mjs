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
const { therapists, therapistValue, validateInquiry } = await import(sharedUrl);
const valid = {
  first_name: "Test",
  last_name: "Visitor",
  email: "visitor@example.com",
  phone: "",
  preferred_therapist: "",
  message: "Synthetic test",
  "bot-field": "",
};

test("validation and therapist allowlist", () => {
  assert.deepEqual(validateInquiry(valid).errors, {});
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

