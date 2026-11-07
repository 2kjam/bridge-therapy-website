import "server-only";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { BlogClient } from "babylovegrowth-next-js-blog";
import { previewEnabled as policyPreviewEnabled, validStagingArticle, collectStagingArticles, removeStagingName } from "./policy.mjs";

export { cleanArticleHtml } from "./policy.mjs";

export function previewEnabled(env: NodeJS.ProcessEnv) {
  return policyPreviewEnabled(env, process.env.BRIDGE_BUILD_CMS_STAGING === "true");
}

let apiQueue: Promise<unknown> = Promise.resolve();
let nextRequestAt = 0;
function pacedFetch(input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) {
  const task = apiQueue.then(async () => {
    const wait = nextRequestAt - Date.now();
    if (wait > 0) await new Promise(resolve => setTimeout(resolve, wait));
    nextRequestAt = Date.now() + 1500;
    const response = await fetch(input, { ...init, redirect: "error", signal: AbortSignal.timeout(15000) });
    if (response.status === 429) {
      const seconds = Number(response.headers.get("retry-after") ?? "2");
      if (Number.isFinite(seconds) && seconds >= 0 && seconds <= 5) {
        await new Promise(resolve => setTimeout(resolve, Math.max(1500, seconds * 1000)));
        nextRequestAt = Date.now() + 1500;
        return fetch(input, { ...init, redirect: "error", signal: AbortSignal.timeout(15000) });
      }
    }
    return response;
  });
  apiQueue = task.catch(() => undefined);
  return task;
}

function client() {
  if (!previewEnabled(process.env)) throw new Error("CMS preview is disabled");
  return new BlogClient({
    apiKey: process.env.BABYLOVEGROWTH_BLOG_API_KEY,
    revalidate: false,
    // Never permit a custom host or follow redirects carrying the credential.
    fetch: pacedFetch,
  });
}

function cleanMetadata<T extends {slug: string; title: string; excerpt: string; meta_description: string}>(article: T): T {
  return { ...article, title: removeStagingName(article.title, article.slug), excerpt: removeStagingName(article.excerpt, article.slug), meta_description: removeStagingName(article.meta_description, article.slug) };
}

const cachedArticles = unstable_cache(async () => {
  const cms = client();
  return (await collectStagingArticles(options => cms.listArticles(options))).map(cleanMetadata);
}, ["bridge-staging-generated-articles-v1"], { revalidate: 300 });
const cachedDetail = unstable_cache(async (id: number) => client().getArticleById(id), ["bridge-staging-article-detail-v1"], { revalidate: 300 });

export async function previewArticles() {
  if (!previewEnabled(process.env)) return [];
  try {
    // Refresh on reads after five minutes; avoid vendor rate limits.
    return await cachedArticles();
  } catch {
    // Do not expose upstream response bodies, account details or keys in logs/UI.
    throw new Error("BabyLoveGrowth preview is unavailable. Check the server-side integration configuration.");
  }
}

export const previewArticle = cache(async (slug: string) => {
  if (!previewEnabled(process.env)) return null;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  // The vendor slug endpoint does not reliably return unpublished drafts.
  // Resolve the validated list entry, then use its stable numeric ID.
  const summary = (await previewArticles()).find(article => article.slug === slug);
  if (!summary) return null;
  try {
    const article = await cachedDetail(summary.id);
    return validStagingArticle(article) && article?.slug === slug && typeof article.content_html === "string" && article.content_html.trim() ? cleanMetadata(article) : null;
  } catch (error) {
    console.error("CMS detail failure type", error instanceof Error ? error.name : "unknown");
    throw new Error("BabyLoveGrowth article preview is unavailable.");
  }
});
