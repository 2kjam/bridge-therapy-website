import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { blogStyles } from "@/components/blog/article-template";
import { blogDate, getBlogPosts } from "@/lib/blog";
import { blogThumbnail } from "@/lib/presentation-images";

export const metadata: Metadata = {
  title: "Blog | The Bridge Therapeutic Services",
};

export default function BlogPage() {
  return (
    <SiteShell styles={blogStyles}>
      <main id="main" className="blog-page blog-index">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            <li aria-current="page">Blog</li>
          </ol>
        </nav>
        <header className="blog-index-header">
          <p className="eyebrow">THE BRIDGE</p>
          <h1>Blog</h1>
        </header>
        <div className="blog-grid">
          {getBlogPosts().map((post, index) => (
            <article className="blog-card" key={post.id}>
              <a className="blog-card-link" href={post.legacyPath}>
                {post.featuredImage && (
                  <img
                    {...blogThumbnail(post.featuredImage.src)}
                    loading={index === 0 ? "eager" : "lazy"}
                    alt={post.featuredImage.alt}
                  />
                )}
                <div className="blog-card-copy">
                  <time dateTime={post.publicationDate}>{blogDate(post)}</time>
                  <h2>{post.title}</h2>
                  <p>{post.displayedByline}</p>
                  <span className="blog-read">
                    Read article <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
              {post.excerptHtml && (
                <div
                  className="blog-card-excerpt"
                  dangerouslySetInnerHTML={{ __html: post.excerptHtml }}
                />
              )}
            </article>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
