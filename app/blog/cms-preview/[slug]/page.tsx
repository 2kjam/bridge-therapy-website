import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { blogStyles } from "@/components/blog/article-template";
import { previewEnabled, previewArticle, cleanArticleHtml } from "@/lib/babylovegrowth/client";

export const metadata: Metadata = {
  title: "CMS article preview | The Bridge",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function CmsArticle({ params }: { params: Promise<{ slug: string }> }) {
  if (!previewEnabled(process.env)) notFound();
  const article = await previewArticle((await params).slug);
  if (!article) notFound();
  return <SiteShell styles={[...blogStyles, "/cms-article.css"]}>
    <main id="main" className="blog-page">
      <p>Staging preview. Requires editorial and clinical review before public release.</p>
      <article className="blog-article cms-article">
        <header className="blog-article-header"><h1>{article.title}</h1></header>
        <div className="legacy-article-body cms-article-body" dangerouslySetInnerHTML={{ __html: cleanArticleHtml(article.content_html, article.slug, article.title) }} />
      </article>
      <a href="/blog/cms-preview/">Back to CMS preview</a>
    </main>
  </SiteShell>;
}
