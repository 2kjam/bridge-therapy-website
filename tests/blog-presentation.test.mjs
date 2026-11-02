import test from "node:test";
import assert from "node:assert/strict";
import { presentArticleBody } from "../lib/blog-presentation.ts";

test("technical normalization preserves text, anchors and external destinations", () => {
  const html = '<h1 id="section">Title</h1><a href="https://www.thebridgetherapy.com/schedule-an-apointment?source=blog#form">Book</a><a href="/our-story/#team">Team</a><a href="https://example.com/our-story">External</a><a href="/our-story/child">Child</a>';
  assert.equal(presentArticleBody(html), '<h2 id="section">Title</h2><a href="/contact/?source=blog#form">Book</a><a href="/about/#team">Team</a><a href="https://example.com/our-story">External</a><a href="/our-story/child">Child</a>');
});
