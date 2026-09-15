export const therapists = [
  ["", "Not sure — help me choose"],
  ["jennifer-wood", "Jennifer Wood, LPC-S"],
  ["erin-young", "Erin Young, LCSW-S"],
  ["jill-kirkley", "Jill Kirkley, LPC"],
  ["alyxandrah-white", "Alyxandrah “Alyx” White, LMFT"],
  ["misty-shultz", "Misty Shultz, LPC"],
  ["kim-gonzales", "Kim Gonzales, LMSW"],
  ["kelley-bell", "Kelley Bell, LPC"],
  ["denise-santos", "Denise Santos, LPC"],
  ["sarah-bell", "Sarah Bell, LPC-A"],
  ["sarah-critzman", "Sarah Critzman, LMSW"],
] as const;

export const limits = {
  first_name: 80,
  last_name: 80,
  email: 254,
  phone: 40,
  message: 2000,
  preferred_therapist: 40,
  "bot-field": 200,
};
export type Inquiry = Record<keyof typeof limits, string>;
export type ChatInquiry = Omit<Inquiry, "last_name" | "message">;
export type InquirySource = "contact_form" | "chat_widget";
type ValidationResult<T> = { data: T; errors: Partial<Record<keyof T, string>> };
export async function sendInquiry(data: Inquiry | ChatInquiry, sourcePage: string, inquirySource: InquirySource) {
  // A filled/missing honeypot can be silently discarded by Netlify. Never
  // present that as successful delivery, or remove the value to bypass it.
  if (data["bot-field"] !== "") throw new Error("Inquiry submission failed");
  const checked = validateInquiry(data, inquirySource);
  if (Object.keys(checked.errors).length) throw new Error("Inquiry validation failed");
  const response = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      "form-name": "bridge-contact-inquiry",
      ...checked.data,
      source_page: sourcePage,
      inquiry_source: inquirySource,
    }).toString(),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error("Inquiry submission failed");
  const body = await response.text();
  // A static-file fallback can return 200 without processing the POST. This
  // catches our form blueprint, including Netlify's post-processed version.
  // It is a negative guard, not proof of storage or spam-filter acceptance.
  if (/<form\b[^>]*\bname\s*=\s*["']?bridge-contact-inquiry(?:["'\s>])/i.test(body))
    throw new Error("Form definition returned instead of a submission response");
}
export function therapistValue(value: string | null) {
  return therapists.some(([slug]) => slug === value) ? value! : "";
}
export function validateInquiry(input: unknown, inquirySource: "chat_widget"): ValidationResult<ChatInquiry>;
export function validateInquiry(input: unknown, inquirySource?: "contact_form"): ValidationResult<Inquiry>;
export function validateInquiry(input: unknown, inquirySource: InquirySource): ValidationResult<Inquiry | ChatInquiry>;
export function validateInquiry(input: unknown, inquirySource: InquirySource = "contact_form") {
  const errors: Partial<Record<keyof Inquiry, string>> = {};
  const data = {} as Inquiry;
  const source =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};
  for (const key of Object.keys(limits) as (keyof Inquiry)[]) {
    if ((key === "last_name" || key === "message") && inquirySource === "chat_widget") continue;
    const value = source[key];
    data[key] = typeof value === "string" ? value.trim() : "";
    if (value !== undefined && typeof value !== "string")
      errors[key] = "Please enter a valid value.";
    if (data[key].length > limits[key])
      errors[key] = `Please use ${limits[key]} characters or fewer.`;
  }
  if (!data.first_name) errors.first_name = "Enter your first name.";
  if (inquirySource === "contact_form" && !data.last_name) errors.last_name = "Enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";
  if (inquirySource === "chat_widget") {
    const digits = data.phone.replace(/\D/g, "");
    const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
    if (!/^\+?[\d\s().-]+$/.test(data.phone) || !/^[2-9]\d{2}[2-9]\d{6}$/.test(national))
      errors.phone = "Please enter a valid phone number.";
  }
  if (!therapists.some(([slug]) => slug === data.preferred_therapist))
    errors.preferred_therapist = "Choose a therapist from the list.";
  return { data, errors };
}
