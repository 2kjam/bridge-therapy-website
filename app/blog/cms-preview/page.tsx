import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { blogStyles } from "@/components/blog/article-template";
import { previewEnabled, previewArticles } from "@/lib/babylovegrowth/client";

export const metadata: Metadata = {
  title: "CMS preview | The Bridge",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function CmsPreview() {
  if (!previewEnabled(process.env)) notFound();
  const articles = await previewArticles();
  return <SiteShell styles={blogStyles}>
    <main id="main" className="blog-page">
      <h1>BabyLoveGrowth article preview</h1>
      <p>Staging preview only. New articles appear here automatically for review. Nothing moves to the public blog without approval.</p>
      {articles.length ? <ul>{articles.map(article => <li key={article.id} data-cms-article-id={article.id} data-cms-updated-at={article.updated_at}>
        <a href={`/blog/cms-preview/${article.slug}/`}>{article.title}</a>
      </li>)}</ul> : <p>No approved articles for The Bridge were returned.</p>}
      <a href="/blog/">Return to the existing blog</a>
    </main>
  </SiteShell>;
}
