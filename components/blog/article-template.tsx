import { StructuredData } from "@/components/structured-data";
import { articleSchema } from "@/lib/seo/schema";
import { blogHero } from "@/lib/presentation-images";
import { presentArticleBody } from "@/lib/blog-presentation";
import { SiteShell } from "@/components/site-shell";
import { blogDate, getVisibleBlogPosts, type BlogPost } from "@/lib/blog";

export const blogStyles = [
  "/style.css",
  "/homepage-ending.css",
  "/typography.css",
  "/team-menu.css",
  "/reference-palette.css",
  "/polish.css",
  "/ivory-design.css",
  "/blog.css",
] as const;

export function ArticleTemplate({ post }: { post: BlogPost }) {
  const posts = getVisibleBlogPosts();
  const hero = post.featuredImage
    ? blogHero(post.featuredImage.src)
    : undefined;
  const index = posts.findIndex((entry) => entry.id === post.id);
  const newer = posts[index - 1];
  const older = posts[index + 1];
  // This article already opens with the same Erin image in its preserved body.
  const isTraumaticMemories =
    post.legacyPath === "/news/2019/2/3/traumatic-memories-and-treatment";
  return (
    <SiteShell styles={blogStyles}>
      <StructuredData data={articleSchema(post)} />
      <main id="main" className="blog-page">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/blog/">Blog</a>
            </li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </nav>
        <article
          className={
            isTraumaticMemories
              ? "blog-article blog-article--traumatic-memories"
              : "blog-article"
          }
          aria-labelledby="article-title"
        >
          <header className="blog-article-header">
            <h1 id="article-title">{post.title}</h1>
            <div className="blog-meta">
              {post.publicationDate ? (
                <time dateTime={post.publicationDate}>{blogDate(post)}</time>
              ) : (
                <span>Draft: awaiting publication approval</span>
              )}
              <span>
                {post.bylinePrefix ?? "Written By"}{" "}
                {post.authorProfilePath ? (
                  <a href={post.authorProfilePath}>{post.displayedByline}</a>
                ) : (
                  post.displayedByline
                )}
              </span>
            </div>
          </header>
          {post.featuredImage && !isTraumaticMemories && (
            <img
              className="blog-featured-image"
              srcSet={hero?.srcSet}
              sizes={
                hero?.srcSet
                  ? "(max-width: 600px) calc(100vw - 46px), (max-width: 884px) calc(100vw - 64px), 820px"
                  : undefined
              }
              src={hero?.src ?? post.featuredImage.src}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              style={{
                aspectRatio: `${post.featuredImage.width} / ${post.featuredImage.height}`,
              }}
              alt={post.featuredImage.alt}
              fetchPriority="high"
            />
          )}
          {/* Trusted, reviewed local HTML only. Source evidence stays intact; presentation normalizes headings and links. */}
          <div
            className="legacy-article-body"
            data-original-article-body
            dangerouslySetInnerHTML={{
              __html: presentArticleBody(post.bodyHtml),
            }}
          />
        </article>
        <nav className="blog-neighbors" aria-label="Article navigation">
          {older && (
            <a href={older.legacyPath}>
              <span>Older article</span>
              {older.title}
            </a>
          )}
          {newer && (
            <a href={newer.legacyPath}>
              <span>Newer article</span>
              {newer.title}
            </a>
          )}
        </nav>
        <div className="blog-return">
          <a href="/blog/">← All articles</a>
        </div>
      </main>
    </SiteShell>
  );
}
