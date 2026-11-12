// Owner-approved attribution only; generated signatures never establish authorship.
const jenniferArticles = new Map([
  [1089880, "adjustment-disorder-therapy"],
  [1096084, "how-much-does-therapy-cost-in-texas"],
  [1077552, "blended-family-counseling"],
  [1083766, "christian-grief-counseling"],
  [1086181, "marriage-communication-problems"],
]);

export function stagingArticleAuthor(article: { id: number; slug: string }) {
  if (jenniferArticles.get(article.id) !== article.slug) return undefined;
  return {
    name: "Jennifer Wood LPC-S",
    profilePath: "/therapists/jennifer-wood/",
  } as const;
}
