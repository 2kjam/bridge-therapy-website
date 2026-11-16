// Adam’s November 16, 2026 standing direction: new Bridge articles use
// Jennifer unless he specifies otherwise. This applies only to validated CMS
// previews; historical/local production bylines remain unchanged.
export function stagingArticleAuthor(_article: { id: number; slug: string }) {
  void _article; // Keep the call contract available for future explicit exceptions.
  return {
    name: "Jennifer Wood LPC-S",
    profilePath: "/therapists/jennifer-wood/",
  } as const;
}
