// These reviewed presentation changes leave migrated bodies and source hashes intact.
// Only exact internal destinations change; anchors and visible link text survive.
const destinations: Record<string, string> = {
  "/schedule-an-apointment": "/contact/",
  "/our-story": "/about/",
  "/what-we-believe": "/christian-counseling-tyler/",
  "/news/2026/1/19/anxiety-therapy-in-tyler-tx": "/anxiety-counseling-tyler/",
  "/news/2026/1/18/emdr-therapy-for-trauma-and-ptsd-in-tyler-tx":
    "/emdr-therapy-tyler/",
};

export function presentArticleBody(html: string): string {
  return html
    .replace(/<(\/?)(h1)(?=[\s>])/gi, "<$1h2")
    .replace(
      /href="(?:https:\/\/(?:www\.)?thebridgetherapy\.com)?(\/[^"?#]*)([?#][^"]*)?"/g,
      (attribute, path: string, suffix = "") => {
        const target = destinations[path.replace(/\/$/, "")];
        return target ? `href="${target}${suffix}"` : attribute;
      },
    );
}
