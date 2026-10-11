"use client";

import { startTransition, useActionState, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { sendEnquiry } from "@/app/actions/send-enquiry";
import { projectTypes, readEnquiry, validateEnquiry, type EnquiryField, type FieldErrors } from "@/lib/enquiry";
import { cn } from "@/lib/cn";

const fieldOrder: EnquiryField[] = ["name", "email", "projectType", "message"];

export function EnquiryForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [state, action, pending] = useActionState(sendEnquiry, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const errors = state.status === "invalid" && Object.keys(clientErrors).length === 0 ? state.errors : clientErrors;
  const values = state.status === "invalid" || state.status === "error" ? state.values : null;

  // Move focus to the outcome so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (state.status === "success" || state.status === "error") resultRef.current?.focus();
    if (state.status === "invalid") focusFirstError(state.errors);
  }, [state]);

  function focusFirstError(errs: FieldErrors) {
    const first = fieldOrder.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  if (state.status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="border border-line p-6 outline-none sm:p-8">
        <CircleCheck aria-hidden className="size-7 text-signal" />
        <p className="mt-5 font-display text-2xl tracking-[-0.02em] text-fg">Thanks, your message is on its way.</p>
        <p className="mt-2 text-muted">I’ll reply to the email address you provided.</p>
      </div>
    );
  }

  const field = (name: EnquiryField) => ({
    id: `${uid}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
    defaultValue: values?.[name] ?? "",
    onChange: () => {
      if (!errors[name]) return;
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    },
  });

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      onSubmit={(event) => {
        // Submit manually so React doesn't auto-reset the form: after a failed
        // send, everything the visitor typed (including the select) stays put.
        // Without JS the native action submission still works.
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const errs = validateEnquiry(readEnquiry(data));
        setClientErrors(errs);
        if (Object.keys(errs).length > 0) focusFirstError(errs);
        else startTransition(() => action(data));
      }}
      className="space-y-6"
    >
      {state.status === "error" && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="border border-line p-4 text-small text-fg outline-none">
          {state.message} Please try again, or email{" "}
          <a href={`mailto:${fallbackEmail}`} className="text-signal underline underline-offset-4">
            {fallbackEmail}
          </a>
          .
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" error={errors.name} htmlFor={`${uid}-name`} errorId={`${uid}-name-error`}>
          <input {...field("name")} type="text" autoComplete="name" className={inputClass(!!errors.name)} />
        </Field>
        <Field label="Email" error={errors.email} htmlFor={`${uid}-email`} errorId={`${uid}-email-error`}>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" className={inputClass(!!errors.email)} />
        </Field>
      </div>
      <Field label="What do you need?" error={errors.projectType} htmlFor={`${uid}-projectType`} errorId={`${uid}-projectType-error`}>
        <select {...field("projectType")} className={cn(inputClass(!!errors.projectType), "appearance-none")}>
          <option value="" disabled>
            Choose one
          </option>
          {projectTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Project details" error={errors.message} htmlFor={`${uid}-message`} errorId={`${uid}-message-error`}>
        <textarea {...field("message")} rows={5} className={cn(inputClass(!!errors.message), "resize-y py-3")} />
      </Field>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group/btn inline-flex h-12 items-center gap-3 rounded-control bg-signal pr-5 pl-6 font-medium text-ink transition-[background-color,scale] duration-(--duration-base) hover:bg-fg hover:text-bg active:scale-[0.97] disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Sending…" : "Send enquiry"}
        {pending ? (
          <LoaderCircle aria-hidden className="size-4 motion-safe:animate-spin" />
        ) : (
          <ArrowRight aria-hidden className="size-4 transition-transform duration-(--duration-base) group-hover/btn:translate-x-1" />
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  errorId,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-label text-muted uppercase">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-2 text-small text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (invalid: boolean) =>
  cn(
    "block min-h-12 w-full rounded-frame border bg-surface px-4 text-fg transition-colors duration-(--duration-fast) placeholder:text-muted focus:border-fg focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
    invalid ? "border-danger" : "border-line hover:border-muted",
  );
