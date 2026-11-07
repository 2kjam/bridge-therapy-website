import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsArticleTemplate } from "@/components/blog/cms-article";
import { previewEnabled, previewArticle } from "@/lib/babylovegrowth/client";
import { ArticleTemplate } from "@/components/blog/article-template";
import { getNewBlogPosts, draftPreviewEnabled } from "@/lib/blog";
import { publicPageMetadata } from "@/lib/seo/metadata";
import { canonicalUrl } from "@/lib/seo/policy";
import { assetUrl } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = true;
export const dynamic = "force-dynamic";
export function generateStaticParams() {
  return getNewBlogPosts(draftPreviewEnabled()).map((post) => ({
    slug: post.id,
  }));
}
function findPost(slug: string) {
  const post = getNewBlogPosts(draftPreviewEnabled()).find(
    (post) => post.legacyPath === `/blog/${slug}/`,
  );
  return post;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const post = findPost(slug);
  if (!post) {
    const article = previewEnabled(process.env) ? await previewArticle(slug) : null;
    if (!article) notFound();
    return { title: { absolute: `${article.title} | The Bridge` }, description: article.meta_description, robots: { index: false, follow: false } };
  }
  const image = post.featuredImage!;
  return {
    ...publicPageMetadata(post.legacyPath),
    ...(post.status === "draft"
      ? { robots: { index: false, follow: false } }
      : {}),
    title: { absolute: post.seo.title },
    description: post.seo.description,
    openGraph: {
      type: "article",
      title: post.seo.title,
      description: post.seo.description,
      url: canonicalUrl(post.legacyPath),
      siteName: "The Bridge Therapeutic Services",
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      images: [
        {
          url: assetUrl(image.src),
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: [assetUrl(image.src)],
    },
  };
}
export default async function ArticlePage({ params }: Props) {
  const slug = (await params).slug;
  const post = findPost(slug);
  if (post) return <ArticleTemplate post={post} />;
  const article = previewEnabled(process.env) ? await previewArticle(slug) : null;
  if (!article) notFound();
  return <CmsArticleTemplate article={article} />;
}
