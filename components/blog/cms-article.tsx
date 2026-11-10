import { VerifiedArticleAuthorCard } from "@/components/blog/article-author-card";
import { stagingArticleAuthor } from "@/lib/babylovegrowth/authorship";
import { stagingArticleMetadata } from "@/lib/babylovegrowth/presentation";
import { therapists } from "@/lib/seo/schema-data";
import { StructuredData } from "@/components/structured-data";
import { canonicalUrl } from "@/lib/seo/policy";
import { ORGANIZATION_ID, personId } from "@/lib/seo/schema";
import { SiteShell } from "@/components/site-shell";
import { blogStyles } from "@/components/blog/article-template";
import { cleanArticleHtml, articlePresentation } from "@/lib/babylovegrowth/policy.mjs";
import { presentArticleBody } from "@/lib/blog-presentation";
import type { BlogArticle } from "babylovegrowth-next-js-blog";
export function CmsArticleTemplate({ article }: { article: BlogArticle }) {
  const attribution = stagingArticleAuthor(article);
  const author = attribution && therapists.find(person => person.path === attribution.profilePath);
  const seo = stagingArticleMetadata(article);
  const presentation = articlePresentation(presentArticleBody(cleanArticleHtml(article.content_html, article.slug, article.title)));
  return <SiteShell styles={[...blogStyles, "/cms-article.css"]}>
    {attribution && author && <StructuredData data={{
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: seo.description,
      inLanguage: "en-US",
      author: { "@type": "Person", "@id": personId(author.path), name: attribution.name, url: canonicalUrl(author.path) },
      publisher: { "@id": ORGANIZATION_ID },
    }} />}
    <main id="main" className="blog-page">
      <nav className="blog-breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/blog/">Blog</a></li><li aria-current="page">{article.title}</li></ol></nav>
      <article aria-labelledby="article-title" className="blog-article cms-article" data-cms-article-id={article.id} data-cms-updated-at={article.updated_at}>
        <header className="blog-article-header"><h1 id="article-title">{article.title}</h1><div className="blog-meta"><span>Draft: awaiting publication approval</span>{attribution && author && <span>Written By <a href={author.path}>{attribution.name}</a></span>}</div></header>
        {presentation.heroHtml && <div className="cms-article-hero" dangerouslySetInnerHTML={{ __html: presentation.heroHtml }} />}
        <div className="legacy-article-body cms-article-body" dangerouslySetInnerHTML={{ __html: presentation.bodyHtml }} />
        {attribution && author && <VerifiedArticleAuthorCard author={author} displayedByline={attribution.name} />}
      </article>
      <div className="blog-return"><a href="/blog/">← All articles</a></div>
    </main>
  </SiteShell>;
}
