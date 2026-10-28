import fs from "node:fs";
import path from "node:path";

export interface BlogPost {
  id: string;
  status?: "draft" | "published";
  authorType?: "Organization";
  legacyPath: string;
  title: string;
  publishedAt: string;
  publicationDate: string;
  publicationTimezone: string;
  displayedByline: string;
  authorProfilePath?: string;
  bylinePrefix?: "Written By" | "Written by";
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

// Presentation-only metadata. The migrated records and source snapshots remain
// exact historical evidence, including blank Squarespace descriptions and one
// source title that contained a literal HTML break tag.
const presentationSeo: Record<string, Partial<BlogPost["seo"]>> = {
  "/news/2026/1/18/how-emdr-therapy-helps-heal-trauma-and-ptsd": {
    description:
      "Learn how EMDR therapy may help people process traumatic memories, reduce emotional intensity, and support healing at The Bridge in Tyler, TX.",
  },
  "/news/2026/1/18/is-emdr-therapy-safe-and-effective": {
    description:
      "Explore common questions about EMDR safety, evidence, preparation, pacing, and readiness from The Bridge Therapeutic Services in Tyler, TX.",
  },
  "/news/2021/12/8/screen-time-recommendations": {
    description:
      "Review screen-time recommendations for children, including age-based limits, family routines, parental controls, and screen-free bedtime habits.",
  },
  "/news/2019/5/21/storm-anxiety": {
    description:
      "Learn how storms can trigger anxiety and find grounding, preparation, and parenting strategies discussed by The Bridge therapists in Tyler, TX.",
  },
  "/news/2021/4/11/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg":
    {
      description:
        "Read The Bridge's community spotlight with Beth Reed about Sight.org, intentional living, faith, and her family's adoption story.",
    },
  "/news/2026/1/18/what-is-emdr-therapy-and-how-does-it-work": {
    description:
      "Learn what EMDR stands for, how bilateral stimulation is used, and what a structured EMDR therapy process may involve in Tyler, TX.",
  },
  "/news/2019/11/30/simple-ways-to-lower-stress-during-the-holidays": {
    title:
      "Simple Ways to Lower Stress During the Holidays — The Bridge Therapeutic Services",
  },
};

const presentationTitles: Record<string, string> = {
  "/news/2019/11/30/simple-ways-to-lower-stress-during-the-holidays":
    "Simple Ways to Lower Stress During the Holidays",
};

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
      const seoOverride = presentationSeo[record.legacyPath];
      return {
        ...record,
        title: presentationTitles[record.legacyPath] ?? record.title,
        seo: { ...record.seo, ...seoOverride },
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

// Native articles share the migrated article model, template and cards. Source
// evidence directories remain reserved for the 19 immutable Squarespace records.
export function getNewBlogPosts(includeDrafts = false): BlogPost[] {
  const directory = path.join(process.cwd(), "content", "new-blog");
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const root = path.join(directory, entry.name);
      const post = JSON.parse(
        fs.readFileSync(path.join(root, "metadata.json"), "utf8"),
      ) as BlogPost;
      if (
        !/^\/blog\/[a-z0-9-]+\/$/.test(post.legacyPath) ||
        !post.title ||
        post.authorType !== "Organization" ||
        !["draft", "published"].includes(post.status ?? "")
      )
        throw new Error("Invalid native blog metadata");
      if (
        post.status === "published" &&
        (!/^\d{4}-\d{2}-\d{2}$/.test(post.publicationDate) ||
          !Number.isFinite(Date.parse(post.publishedAt)))
      )
        throw new Error("An approved publication date is required");
      return {
        ...post,
        bodyHtml: fs.readFileSync(path.join(root, "body.html"), "utf8"),
      };
    })
    .filter((post) => post.status === "published" || includeDrafts);
}

export function draftPreviewEnabled(): boolean {
  return (
    process.env.BRIDGE_PREVIEW_DRAFTS === "true" &&
    !process.env.NETLIFY &&
    !process.env.CONTEXT
  );
}

export function getPublishedBlogPosts(): BlogPost[] {
  return [...getBlogPosts(), ...getNewBlogPosts()].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getVisibleBlogPosts(): BlogPost[] {
  return [...getBlogPosts(), ...getNewBlogPosts(draftPreviewEnabled())].sort(
    (a, b) =>
      Number(b.status === "draft") - Number(a.status === "draft") ||
      b.publishedAt.localeCompare(a.publishedAt),
  );
}
