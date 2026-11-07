export function stagingBuildAllowed(env: Record<string, string | undefined>): boolean;
export function previewEnabled(env: Record<string, string | undefined>, verifiedStagingBuild?: boolean): boolean;
export function validArticle(article: unknown): boolean;
export function cleanArticleHtml(html: unknown): string;
