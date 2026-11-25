import type { BlogArticle } from "babylovegrowth-next-js-blog";
import { safeImageUrl } from './policy.mjs';

// Exact staging draft only. Prefer its intended vendor cover when available.
// A reviewed existing site photo fills the card while that cover is absent/invalid.
export function stagingArticleCover(article?: Pick<BlogArticle, "id" | "slug" | "title" | "hero_image_url">) {
  if (article?.id !== 1320874 || article.slug !== 'emotional-regulation-therapy') return undefined;
  if (safeImageUrl(article.hero_image_url)) {
    return {
      src: `/api/cms-media/?slug=${article.slug}&file=${encodeURIComponent(new URL(article.hero_image_url).pathname.split('/').pop()!)}`,
      metadataUrl: article.hero_image_url,
      alt: article.title,
      width: undefined, height: undefined,
      state: 'vendor-cover',
    };
  }
  return {
    src: '/assets/presentation/home/replacements/anxiety-800.webp',
    metadataUrl: 'https://www.thebridgetherapy.com/assets/presentation/home/replacements/anxiety-800.webp',
    alt: 'Person writing in a notebook',
    width: 800, height: 1227,
    state: article.hero_image_url ? 'invalid-vendor-cover' : 'missing-vendor-cover',
  };
}
