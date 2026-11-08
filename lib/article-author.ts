import type { BlogPost } from "@/lib/blog";
import type { TherapistSchemaRecord } from "@/lib/seo/schema-data";

type AuthorPost = Pick<BlogPost,
  "legacyPath" | "status" | "authorType" | "authorProfilePath" | "displayedByline"
>;

export function getArticleAuthor(
  post: AuthorPost,
  verifiedAuthors: readonly TherapistSchemaRecord[],
): TherapistSchemaRecord | undefined {
  if (
    post.status !== "published" ||
    post.authorType !== "Person" ||
    !/^\/blog\/[a-z0-9-]+\/$/.test(post.legacyPath)
  ) return undefined;

  const author = verifiedAuthors.find((person) => person.path === post.authorProfilePath);
  const normalize = (name: string) => name.replace(/[,\s]/g, "").toLowerCase();
  return author && normalize(author.name) === normalize(post.displayedByline)
    ? author
    : undefined;
}
