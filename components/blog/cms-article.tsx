import { SiteShell } from "@/components/site-shell";
import { blogStyles } from "@/components/blog/article-template";
import { cleanArticleHtml } from "@/lib/babylovegrowth/client";
import type { BlogArticle } from "babylovegrowth-next-js-blog";
export function CmsArticleTemplate({ article }: { article: BlogArticle }) {
  return <SiteShell styles={[...blogStyles, "/cms-article.css"]}>
    <main id="main" className="blog-page">
      <nav className="blog-breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/blog/">Blog</a></li><li aria-current="page">{article.title}</li></ol></nav>
      <article className="blog-article cms-article" data-cms-article-id={article.id} data-cms-updated-at={article.updated_at}>
        <header className="blog-article-header"><h1>{article.title}</h1></header>
        <div className="legacy-article-body cms-article-body" dangerouslySetInnerHTML={{ __html: cleanArticleHtml(article.content_html, article.slug, article.title) }} />
      </article>
      <div className="blog-return"><a href="/blog/">← All articles</a></div>
    </main>
  </SiteShell>;
}
