import type { BlogPost } from "@/lib/blog";
import { getArticleAuthor } from "@/lib/article-author";
import { therapists } from "@/lib/seo/schema-data";
import type { TherapistSchemaRecord } from "@/lib/seo/schema-data";
import optimizedImages from "@/lib/optimized-images.json";

export function ArticleAuthorCard({ post }: { post: BlogPost }) {
  const author = getArticleAuthor(post, therapists);
  if (!author) return null;
  return <VerifiedArticleAuthorCard author={author} displayedByline={post.displayedByline} />;
}

export function VerifiedArticleAuthorCard({ author, displayedByline }: { author: TherapistSchemaRecord; displayedByline: string }) {
  const portrait = optimizedImages[author.image as keyof typeof optimizedImages]?.variants[0];
  const firstName = author.name.split(/[ ,]/)[0];
  // Reuse verified profile facts; this is authorship, not a clinical-review claim.
  return (
    <footer className="blog-author-card" aria-labelledby="article-author-name">
      <img
        className="blog-author-portrait"
        src={portrait?.src ?? author.image}
        width={portrait?.width ?? 240}
        height={portrait?.height ?? 360}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="blog-author-copy">
        <p className="blog-author-eyebrow">About the author</p>
        <h2 id="article-author-name">{displayedByline}</h2>
        <p className="blog-author-credential">{author.credential}</p>
        {author.role && (
          <p className="blog-author-role">
            {author.role === "Co-owner"
              ? "Co-owner at The Bridge Therapeutic Services"
              : author.role}
          </p>
        )}
        <a href={author.path}>
          View {firstName}’s profile <span aria-hidden="true">→</span>
        </a>
      </div>
    </footer>
  );
}
