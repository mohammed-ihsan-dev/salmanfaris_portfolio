"use server";

import { readEnquiry, validateEnquiry, type EnquiryState } from "@/lib/enquiry";

/**
 * Delivers an enquiry by email through Resend (https://resend.com).
 * Required env: RESEND_API_KEY, CONTACT_TO_EMAIL. Optional: CONTACT_FROM_EMAIL
 * (must be on a domain verified in Resend; defaults to Resend's test sender),
 * RESEND_API_URL (only for local testing against a mock endpoint).
 * Success is only reported after Resend accepts the message.
 */
export async function sendEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  const values = readEnquiry(form);

  // Honeypot: real visitors never see or fill this field. Pretend success to bots.
  if (String(form.get("company_website") ?? "") !== "") return { status: "success" };

  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return { status: "error", message: "The enquiry form isn’t connected yet.", values };
  }

  try {
    const res = await fetch(process.env.RESEND_API_URL ?? "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio enquiry <onboarding@resend.dev>",
        to: [to],
        reply_to: values.email,
        subject: `New enquiry: ${values.projectType} — ${values.name}`,
        text: `Name: ${values.name}\nEmail: ${values.email}\nType: ${values.projectType}\n\n${values.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Resend rejected enquiry", res.status, await res.text().catch(() => ""));
      return { status: "error", message: "Your message couldn’t be sent right now.", values };
    }
    return { status: "success" };
  } catch (error) {
    console.error("Enquiry delivery failed", error);
    return { status: "error", message: "Your message couldn’t be sent right now.", values };
  }
}
