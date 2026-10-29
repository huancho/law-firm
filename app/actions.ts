"use server"

export type ContactState = {
  status: "idle" | "error" | "success"
  errors?: Partial<Record<"name" | "email" | "message", string>>
  values?: Record<string, string>
}

export async function sendInquiry(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    area: String(formData.get("area") ?? ""),
    message: String(formData.get("message") ?? "").trim(),
  }

  const errors: ContactState["errors"] = {}
  if (!values.name) errors.name = "Enter your name."
  if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Enter an email address like name@example.com."
  if (!values.message) errors.message = "Tell us briefly how we can help."

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values }
  }

  // Prototype: no email delivery yet. Wire this to the firm's intake inbox or CRM.
  await new Promise((resolve) => setTimeout(resolve, 600))

  return { status: "success" }
}
