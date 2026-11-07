import "server-only";
import { BlogClient } from "babylovegrowth-next-js-blog";
import { previewEnabled as policyPreviewEnabled, validStagingArticle, collectStagingArticles } from "./policy.mjs";

export { cleanArticleHtml } from "./policy.mjs";

export function previewEnabled(env: NodeJS.ProcessEnv) {
  return policyPreviewEnabled(env, process.env.BRIDGE_BUILD_CMS_STAGING === "true");
}

function client() {
  if (!previewEnabled(process.env)) throw new Error("CMS preview is disabled");
  return new BlogClient({
    apiKey: process.env.BABYLOVEGROWTH_BLOG_API_KEY,
    revalidate: false,
    // Never permit a custom host or follow redirects carrying the credential.
    fetch: (input, init) => fetch(input, {
      ...init, redirect: "error", signal: AbortSignal.timeout(15000),
    }),
  });
}

export async function previewArticles() {
  try {
    // Fresh reads: new generated articles appear without a deploy or vendor publication.
    const cms = client();
    return await collectStagingArticles(options => cms.listArticles(options));
  } catch {
    // Do not expose upstream response bodies, account details or keys in logs/UI.
    throw new Error("BabyLoveGrowth preview is unavailable. Check the server-side integration configuration.");
  }
}

export async function previewArticle(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  // Direct detail lookup avoids downloading the entire archive for every image.
  // Ownership, slug and generated HTML are still checked before rendering.
  try {
    const article = await client().getArticleBySlug(slug);
    return validStagingArticle(article) && article?.slug === slug && typeof article.content_html === "string" && article.content_html.trim() ? article : null;
  } catch {
    throw new Error("BabyLoveGrowth article preview is unavailable.");
  }
}
