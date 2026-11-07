import { StructuredData } from "@/components/structured-data";
import { staticPageSchema } from "@/lib/seo/schema";
import { publicPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { blogStyles } from "@/components/blog/article-template";
import { blogDate, getVisibleBlogPosts } from "@/lib/blog";
import { previewEnabled, previewArticles } from "@/lib/babylovegrowth/client";
import { safeImageUrl } from "@/lib/babylovegrowth/policy.mjs";
import { blogThumbnail } from "@/lib/presentation-images";

export const metadata: Metadata = {
  ...publicPageMetadata("/blog/"),
  title: "Blog | The Bridge Therapeutic Services",
  description:
    "Read articles from The Bridge Therapeutic Services about counseling, anxiety, EMDR, trauma, relationships, faith, and family life in Tyler, TX.",
};

export const dynamic = "force-dynamic";
export default async function BlogPage() {
  const localPosts = getVisibleBlogPosts();
  const reserved = new Set(localPosts.map(p => p.legacyPath));
  let cmsPosts: Awaited<ReturnType<typeof previewArticles>> = [];
  let cmsUnavailable = false;
  if (previewEnabled(process.env)) {
    try { cmsPosts = (await previewArticles()).filter(p => !reserved.has(`/blog/${p.slug}/`) && !["cms-preview", "media"].includes(p.slug)); }
    catch { cmsUnavailable = true; }
  }
  return (
    <SiteShell styles={blogStyles}>
      <StructuredData data={staticPageSchema("/blog/")} />
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
        {cmsUnavailable && <p role="status">New articles are temporarily unavailable. Please try again shortly.</p>}
        <div className="blog-grid">
          {cmsPosts.map(post => <article className="blog-card" key={`cms-${post.id}`} data-cms-article-id={post.id} data-cms-updated-at={post.updated_at}>
            <a className="blog-card-link" href={`/blog/${post.slug}/`}>
              {safeImageUrl(post.hero_image_url) && <img src={`/api/cms-media/?slug=${encodeURIComponent(post.slug)}&file=${encodeURIComponent(new URL(post.hero_image_url).pathname.split("/").pop()!)}`} alt={post.title} loading="lazy" />}
              <div className="blog-card-copy">
                <h2>{post.title}</h2>
                <p>{post.excerpt || post.meta_description}</p>
                <span className="blog-read">Read article <span aria-hidden="true">→</span></span>
              </div>
            </a>
          </article>)}
          {getVisibleBlogPosts().map((post, index) => (
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
                  {post.publicationDate ? (
                    <time dateTime={post.publicationDate}>
                      {blogDate(post)}
                    </time>
                  ) : (
                    <span>Draft: awaiting publication approval</span>
                  )}
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
