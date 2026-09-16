import fs from "node:fs";
import path from "node:path";

export interface BlogPost {
  id: string;
  legacyPath: string;
  title: string;
  publishedAt: string;
  publicationDate: string;
  publicationTimezone: string;
  displayedByline: string;
  excerptHtml: string;
  categories: string[];
  tags: string[];
  seo: {
    title: string;
    description: string;
    sourceCanonical: string;
    sourceOpenGraphImage: string;
  };
  featuredImage: {
    src: string;
    sourceUrl: string;
    width: number;
    height: number;
    alt: string;
  } | null;
  bodyHtml: string;
}

const root = path.join(process.cwd(), "content", "blog");

// Only reviewed local records are loaded; request parameters never become file paths.
export function getBlogPosts(): BlogPost[] {
  const posts = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const directory = path.join(root, entry.name);
      const record = JSON.parse(
        fs.readFileSync(path.join(directory, "metadata.json"), "utf8"),
      );
      if (
        !/^\/news\/(?:[a-z0-9-]+\/)*[a-z0-9-]+$/.test(record.legacyPath) ||
        !record.title ||
        !record.displayedByline ||
        !/^\d{4}-\d{2}-\d{2}$/.test(record.publicationDate) ||
        !Number.isFinite(Date.parse(record.publishedAt)) ||
        typeof record.seo?.title !== "string" ||
        typeof record.seo?.description !== "string"
      ) {
        throw new Error(`Invalid blog metadata: ${entry.name}`);
      }
      return {
        ...record,
        bodyHtml: fs.readFileSync(path.join(directory, "body.html"), "utf8"),
      } as BlogPost;
    });
  if (new Set(posts.map((post) => post.legacyPath)).size !== posts.length) {
    throw new Error("Duplicate legacy blog path");
  }
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPost(segments: string[]): BlogPost | undefined {
  return getBlogPosts().find(
    (post) => post.legacyPath === `/news/${segments.join("/")}`,
  );
}

export function blogDate(post: Pick<BlogPost, "publicationDate">): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${post.publicationDate}T12:00:00Z`));
}
