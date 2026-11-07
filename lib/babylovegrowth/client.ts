import "server-only";
import { BlogClient } from "babylovegrowth-next-js-blog";
import { previewEnabled as policyPreviewEnabled, validArticle } from "./policy.mjs";

export { cleanArticleHtml } from "./policy.mjs";

export function previewEnabled(env: NodeJS.ProcessEnv) {
  return policyPreviewEnabled(env, process.env.BRIDGE_BUILD_CMS_STAGING === "true");
}

function client() {
  if (!previewEnabled(process.env)) throw new Error("CMS preview is disabled");
  return new BlogClient({
    apiKey: process.env.BABYLOVEGROWTH_BLOG_API_KEY,
    revalidate: 3600,
    // Never permit a custom host or follow redirects carrying the credential.
    fetch: (input, init) => fetch(input, {
      ...init, redirect: "error", signal: AbortSignal.timeout(15000),
    }),
  });
}

export async function previewArticles() {
  try {
    // Bounded list for the three-day trial; no unbounded API pagination.
    return (await client().listArticles({ limit: 50 })).filter(validArticle);
  } catch {
    // Do not expose upstream response bodies, account details or keys in logs/UI.
    throw new Error("BabyLoveGrowth preview is unavailable. Check the server-side integration configuration.");
  }
}

export async function previewArticle(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  // Require a published entry in the validated website list as well as detail.
  const summary = (await previewArticles()).find((article) => article.slug === slug);
  if (!summary) return null;
  try {
    const article = await client().getArticleById(summary.id);
    return validArticle(article) && article?.slug === slug ? article : null;
  } catch {
    throw new Error("BabyLoveGrowth article preview is unavailable.");
  }
}
