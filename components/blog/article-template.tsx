import { SiteShell } from "@/components/site-shell";
import { blogDate, getBlogPosts, type BlogPost } from "@/lib/blog";

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
  const posts = getBlogPosts();
  const index = posts.findIndex((entry) => entry.id === post.id);
  const newer = posts[index - 1];
  const older = posts[index + 1];
  return (
    <SiteShell styles={blogStyles}>
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
        <article className="blog-article" aria-labelledby="article-title">
          <header className="blog-article-header">
            <h1 id="article-title">{post.title}</h1>
            <div className="blog-meta">
              <time dateTime={post.publicationDate}>{blogDate(post)}</time>
              <span>Written By {post.displayedByline}</span>
            </div>
          </header>
          {post.featuredImage && (
            <img
              className="blog-featured-image"
              src={post.featuredImage.src}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              alt={post.featuredImage.alt}
              fetchPriority="high"
            />
          )}
          {/* Trusted, reviewed local HTML only. The original body has no new chrome. */}
          <div
            className="legacy-article-body"
            data-original-article-body
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
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
