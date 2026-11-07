export function stagingBuildAllowed(env: Record<string, string | undefined>): boolean;
export function previewEnabled(env: Record<string, string | undefined>, verifiedStagingBuild?: boolean): boolean;
export function validArticle(article: unknown): boolean;
export function cleanArticleHtml(html: unknown, slug?: string, title?: string): string;

export function validStagingArticle(article: unknown): boolean;

export function safeImageUrl(value: unknown): string | null;
export function articleImageUrls(html: unknown): string[];

export function collectStagingArticles<T>(listPage: (options: {limit: number; offset: number; publishedOnly: boolean}) => Promise<T[]>): Promise<T[]>;

export function removeStagingName(value: string, slug: string): string;
