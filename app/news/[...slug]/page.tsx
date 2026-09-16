import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/blog/article-template";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.legacyPath.slice("/news/".length).split("/"),
  }));
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  return {
    title: { absolute: post.seo.title },
    description: post.seo.description,
    // Production canonical/OG infrastructure is deferred; inherit global staging robots.
  };
}

export default async function LegacyArticlePage({ params }: Props) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  return <ArticleTemplate post={post} />;
}
