import type { BlogArticle } from "babylovegrowth-next-js-blog";

// Verified on this exact BabyLoveGrowth article and visually checked at 1280x720.
// Its new CDN is deliberately NOT added to the general media allowlist.
const originalFile = '1795482456454_Client-pausing-during-an-emotion-regulation-session.jpeg';
export function stagingArticleCover(article?: Pick<BlogArticle, "id" | "slug">) {
  if (article?.id !== 1320874 || article.slug !== 'emotional-regulation-therapy') return undefined;
  return {
    file: originalFile,
    src: `/api/cms-media/?slug=emotional-regulation-therapy&file=${originalFile}`,
    metadataUrl: `https://media.ai-fast-cdn.com/blog-images/organization-65684/${originalFile}`,
    alt: 'Client pausing during an emotion regulation session',
    width: 1280, height: 720,
    state: 'verified-original-cover',
  };
}
