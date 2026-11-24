export const measurementId: string;
export const productionOrigin: string;
export const tagSource: string;
export const analyticsReleaseApproved: boolean;
export function analyticsBuildAllowed(env: Record<string,string|undefined>, phase: string, approved?: boolean): boolean;
export function safePageView(pathname?: string): Record<string,string> | null;
export function analyticsConfiguration(pathname?: string): Record<string,unknown>;
export const deniedConsent: Record<string,string>;

export const measurementConsent: typeof deniedConsent;
export function analyticsEnabledForChoice(choice: string): boolean;
