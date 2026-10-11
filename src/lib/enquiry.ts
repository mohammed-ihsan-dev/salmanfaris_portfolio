/** Shared enquiry validation, used by the form (instant feedback) and the server action (authoritative). */

export const projectTypes = [
  "Commercial / promotional video",
  "Motion graphics",
  "Social media content",
  "Educational content",
  "Event or wedding film",
  "Full-time role",
  "Something else",
] as const;

export type EnquiryField = "name" | "email" | "projectType" | "message";
export type EnquiryValues = Record<EnquiryField, string>;
export type FieldErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors; values: EnquiryValues }
  | { status: "error"; message: string; values: EnquiryValues }
  | { status: "success" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readEnquiry(form: FormData): EnquiryValues {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  return { name: get("name"), email: get("email"), projectType: get("projectType"), message: get("message") };
}

export function validateEnquiry(v: EnquiryValues): FieldErrors {
  const errors: FieldErrors = {};
  if (v.name.length < 2) errors.name = "Please enter your name.";
  else if (v.name.length > 100) errors.name = "Please keep your name under 100 characters.";
  if (!EMAIL.test(v.email)) errors.email = "Please enter a valid email address, like name@company.com.";
  if (!(projectTypes as readonly string[]).includes(v.projectType)) errors.projectType = "Please choose what you need.";
  if (v.message.length < 20) errors.message = "Please add a few details (at least 20 characters).";
  else if (v.message.length > 4000) errors.message = "Please keep the message under 4,000 characters.";
  return errors;
}
