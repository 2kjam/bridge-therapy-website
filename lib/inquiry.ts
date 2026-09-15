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
export async function sendInquiry(data: Inquiry, sourcePage: string, inquirySource: "contact_form" | "chat_widget") {
  // A filled/missing honeypot can be silently discarded by Netlify. Never
  // present that as successful delivery, or remove the value to bypass it.
  if (data["bot-field"] !== "") throw new Error("Inquiry submission failed");
  const response = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      "form-name": "bridge-contact-inquiry",
      ...data,
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
export function validateInquiry(input: unknown) {
  const errors: Partial<Record<keyof Inquiry, string>> = {};
  const data = {} as Inquiry;
  const source =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};
  for (const key of Object.keys(limits) as (keyof Inquiry)[]) {
    const value = source[key];
    data[key] = typeof value === "string" ? value.trim() : "";
    if (value !== undefined && typeof value !== "string")
      errors[key] = "Please enter a valid value.";
    if (data[key].length > limits[key])
      errors[key] = `Please use ${limits[key]} characters or fewer.`;
  }
  if (!data.first_name) errors.first_name = "Enter your first name.";
  if (!data.last_name) errors.last_name = "Enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";
  if (!therapists.some(([slug]) => slug === data.preferred_therapist))
    errors.preferred_therapist = "Choose a therapist from the list.";
  return { data, errors };
}
