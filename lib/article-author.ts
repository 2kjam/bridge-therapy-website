import type { BlogPost } from "@/lib/blog";
import type { TherapistSchemaRecord } from "@/lib/seo/schema-data";

type AuthorPost = Pick<BlogPost,
  "legacyPath" | "status" | "authorType" | "authorProfilePath" | "displayedByline"
>;

const verifiedLegacyProfiles = new Set([
  "/therapists/jennifer-wood/",
  "/therapists/erin-young/",
]);

export function getArticleAuthor(
  post: AuthorPost,
  verifiedAuthors: readonly TherapistSchemaRecord[],
): TherapistSchemaRecord | undefined {
  const publishedNative = post.status === "published" &&
    post.authorType === "Person" && /^\/blog\/[a-z0-9-]+\/$/.test(post.legacyPath);
  // The migrated collection has no status/type fields. Keep its existing verified
  // primary bylines, including owner-confirmed Erin records; never infer from bodies.
  const verifiedLegacy = (post.status === undefined || post.status === "published") &&
    (post.authorType === undefined || post.authorType === "Person") &&
    /^\/news\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\/?$/.test(post.legacyPath) &&
    verifiedLegacyProfiles.has(post.authorProfilePath ?? "");
  if (!publishedNative && !verifiedLegacy) return undefined;

  const author = verifiedAuthors.find((person) => person.path === post.authorProfilePath);
  const normalize = (name: string) => name.replace(/[,\s]/g, "").toLowerCase();
  return author && normalize(author.name) === normalize(post.displayedByline)
    ? author
    : undefined;
}
