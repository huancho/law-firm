"use client"

import { LoaderCircleIcon } from "lucide-react"
import { useActionState, useState } from "react"

import { sendInquiry, type ContactState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { H3, P, Small } from "@/components/ui/typography"
import { firm, practiceAreas } from "@/lib/firm"
import { cn } from "@/lib/utils"

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 aria-invalid:border-destructive aria-invalid:ring-destructive/20"

function Field({
  id,
  label,
  hint,
  description,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  description?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-medium">
        {label}
        {hint && (
          <span className="font-normal text-muted-foreground"> {hint}</span>
        )}
      </label>
      {children}
      {description && (
        <p
          id={`${id}-description`}
          className="text-small text-muted-foreground"
        >
          {description}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-small text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    sendInquiry,
    { status: "idle" }
  )

  // useActionState can't be reset, so "Send another message" remembers which
  // success it dismissed. The next submission returns a new state object.
  const [dismissed, setDismissed] = useState<ContactState>()

  const { errors, values } = state
  const sent = state.status === "success" && state !== dismissed

  // The confirmation shares a grid cell with the form, which stays in layout
  // (hidden) so the card keeps its height instead of collapsing on success.
  // Both sides are transitions, so either one leaves quickly and the other
  // rises in as it clears, in both directions.
  return (
    <div className="grid *:col-start-1 *:row-start-1">
      <div
        role="status"
        className={cn(
          "flex flex-col items-start justify-center gap-5 transition-[opacity,translate,visibility] delay-150 duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
          !sent &&
            "invisible translate-y-2 opacity-0 delay-0 duration-150 ease-in"
        )}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="size-12 text-brass-700 dark:text-brass-200"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            pathLength={1}
            transform="rotate(-90 24 24)"
            className={cn(sent && "draw-in [--delay:200ms]")}
          />
          <path
            d="m15.5 24.5 6 6 11-12"
            pathLength={1}
            className={cn(sent && "draw-in [--delay:550ms] [--duration:350ms]")}
          />
        </svg>
        <div className="flex flex-col gap-3">
          <H3>Thanks, we’ve got your message.</H3>
          <P className="text-muted-foreground">
            An attorney will read it and get back to you within one business
            day. If it can’t wait, call us at {firm.phone}.
          </P>
        </div>
        <Button
          variant="outline"
          onClick={() => setDismissed(state)}
          className="h-11 px-5 text-base"
        >
          Send another message
        </Button>
      </div>
      <form
        action={formAction}
        noValidate
        className={cn(
          "flex flex-col gap-5 transition-[opacity,translate,visibility] delay-150 duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
          sent &&
            "invisible -translate-y-2 opacity-0 delay-0 duration-150 ease-in"
        )}
      >
        {/* Fields dim while sending, so the spinner reads as the only live thing. */}
        <div
          className={cn(
            "flex flex-col gap-5 transition-opacity duration-200",
            pending && "pointer-events-none opacity-60"
          )}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name" error={errors?.name}>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                defaultValue={values?.name}
                aria-invalid={!!errors?.name || undefined}
                aria-describedby={errors?.name ? "name-error" : undefined}
                className={fieldClass}
              />
            </Field>
            <Field id="email" label="Email" error={errors?.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                required
                defaultValue={values?.email}
                aria-invalid={!!errors?.email || undefined}
                aria-describedby={errors?.email ? "email-error" : undefined}
                className={fieldClass}
              />
            </Field>
            <Field id="phone" label="Phone" hint="(optional)">
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                defaultValue={values?.phone}
                className={fieldClass}
              />
            </Field>
            <Field id="area" label="Practice area">
              <select
                id="area"
                name="area"
                defaultValue={values?.area ?? ""}
                className={cn(fieldClass, "h-[2.875rem] py-0")}
              >
                <option value="">Not sure yet</option>
                {practiceAreas.map((area) => (
                  <option key={area.name} value={area.name}>
                    {area.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field
            id="message"
            label="How can we help?"
            description="A short summary is enough for now. Leave out anything confidential."
            error={errors?.message}
          >
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              defaultValue={values?.message}
              aria-invalid={!!errors?.message || undefined}
              aria-describedby={cn(
                "message-description",
                errors?.message && "message-error"
              )}
              className={cn(fieldClass, "resize-y")}
            />
          </Field>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Small className="text-balance">
            Contacting us does not create an attorney–client relationship.
          </Small>
          {/* Both labels share a grid cell so the button keeps its width. */}
          <Button
            type="submit"
            disabled={pending}
            className="grid h-11 px-5 text-base *:col-start-1 *:row-start-1 disabled:opacity-100"
          >
            <span
              className={cn(
                "transition-[opacity,scale] duration-150",
                pending && "scale-95 opacity-0"
              )}
            >
              Send message
            </span>
            <span
              className={cn(
                "flex items-center justify-center gap-2 transition-[opacity,scale] duration-150",
                !pending && "scale-95 opacity-0"
              )}
            >
              <LoaderCircleIcon className="animate-spin motion-reduce:animate-none" />
              Sending…
            </span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export { ContactForm }
