export const measurementId: string;
export const productionOrigin: string;
export const tagSource: string;
export const analyticsReleaseApproved: boolean;
export function analyticsBuildAllowed(env: Record<string,string|undefined>, phase: string, approved?: boolean): boolean;
export function safePageView(): Record<string,string>;
export function analyticsConfiguration(): Record<string,unknown>;
export const deniedConsent: Record<string,string>;
