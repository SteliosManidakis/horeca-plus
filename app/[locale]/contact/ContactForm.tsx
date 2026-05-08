"use client";

import { useState } from "react";

type State = "idle" | "sending" | "ok" | "error";
type Opt = "yes" | "open" | null;

export default function ContactForm({ t }: { t: any }) {
  const [state, setState] = useState<State>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [horeca, setHoreca] = useState<Opt>(null);
  const [tourism, setTourism] = useState<Opt>(null);

  function toggle(current: Opt, value: Exclude<Opt, null>, set: (v: Opt) => void) {
    set(current === value ? null : value);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setFormError(null);

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name) {
      setFormError(t.contact?.errors?.nameRequired ?? "Το όνομα είναι υποχρεωτικό");
      return;
    }
    if (!email) {
      setFormError(t.contact?.errors?.emailRequired ?? "Το email είναι υποχρεωτικό");
      return;
    }
    if (!message) {
      setFormError(t.contact?.errors?.messageRequired ?? "Το μήνυμα είναι υποχρεωτικό");
      return;
    }
    if (!horeca && !tourism) {
      setFormError(t.contact?.errors?.segmentRequired ?? "Διάλεξε τουλάχιστον έναν τομέα");
      return;
    }

    const payload = {
      name,
      email,
      city: String(data.get("city") || "").trim(),
      message,
      horeca,
      tourism,
      labels: {
        horeca: horeca ? t.contact.options[horeca] : null,
        tourism: tourism ? t.contact.options[tourism] : null,
      },
    };

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (res.ok) {
        setState("ok");
        form.reset();
        setHoreca(null);
        setTourism(null);
        return;
      }

      const body = await res.json().catch(() => ({} as any));
      setFormError(
        body?.error === "missing_fields"
          ? t.contact?.errors?.messageRequired ?? "Συμπλήρωσε όλα τα πεδία"
          : body?.error || `HTTP_${res.status}`
      );
      setState("error");
    } catch (err: any) {
      console.error("contact submit error:", err);
      setFormError("Σφάλμα δικτύου. Προσπάθησε ξανά.");
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <p className="contactFormStatus" role="status">
        {t.contact.success}
      </p>
    );
  }

  if (state === "error") {
    return (
      <p className="contactFormError" role="alert">
        {formError || t.contact.error}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="contactForm" noValidate>
      <label>
        <span>{t.contact.name}</span>
        <input name="name" autoComplete="name" />
      </label>

      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" />
      </label>

      <fieldset>
        <legend>{t.contact.q_horeca}</legend>
        <div className="contactFormOptions">
          <label>
            <input type="checkbox" checked={horeca === "yes"} onChange={() => toggle(horeca, "yes", setHoreca)} />
            <span>{t.contact.options.yes}</span>
          </label>
          <label>
            <input type="checkbox" checked={horeca === "open"} onChange={() => toggle(horeca, "open", setHoreca)} />
            <span>{t.contact.options.open}</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>{t.contact.q_tourism}</legend>
        <div className="contactFormOptions">
          <label>
            <input type="checkbox" checked={tourism === "yes"} onChange={() => toggle(tourism, "yes", setTourism)} />
            <span>{t.contact.options.yes}</span>
          </label>
          <label>
            <input type="checkbox" checked={tourism === "open"} onChange={() => toggle(tourism, "open", setTourism)} />
            <span>{t.contact.options.open}</span>
          </label>
        </div>
      </fieldset>

      <label>
        <span>{t.contact.city}</span>
        <input name="city" autoComplete="address-level2" />
      </label>

      <label>
        <span>{t.contact.message}</span>
        <textarea name="message" rows={5} />
      </label>

      {formError && (
        <p className="contactFormError" role="alert">
          {formError}
        </p>
      )}

      <button type="submit" disabled={state === "sending"}>
        {state === "sending" ? "..." : t.contact.send}
      </button>
    </form>
  );
}
