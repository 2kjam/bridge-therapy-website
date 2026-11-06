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
      <p>Staging preview only. These articles have not been added to the public blog. Images and embeds are omitted pending review.</p>
      {articles.length ? <ul>{articles.map(article => <li key={article.id}>
        <a href={`/blog/cms-preview/${article.slug}/`}>{article.title}</a>
      </li>)}</ul> : <p>No published articles for The Bridge were returned.</p>}
      <a href="/blog/">Return to the existing blog</a>
    </main>
  </SiteShell>;
}
