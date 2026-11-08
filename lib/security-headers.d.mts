export const contentSecurityPolicy: string;
export const analyticsContentSecurityPolicy: string;
export const securityHeaders: Array<{ key: string; value: string }>;
export function securityHeaderRule(
  cspHeaderName?: "Content-Security-Policy" | "Content-Security-Policy-Report-Only",
  analyticsEnabled?: boolean,
): {
  source: string;
  headers: Array<{ key: string; value: string }>;
};
export function applySecurityHeaders(
  headers: Headers,
  cspHeaderName?: "Content-Security-Policy" | "Content-Security-Policy-Report-Only",
): void;
