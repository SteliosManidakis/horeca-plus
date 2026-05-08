"use client";

import { useMemo, useState } from "react";
import { serviceSelectOptions, type Locale } from "src/content/services";

type Props = {
  locale: Locale;
  initialService?: string;
};

type State = "idle" | "sending" | "ok" | "error";

function copy(locale: Locale, el: string, en: string) {
  return locale === "el" ? el : en;
}

export default function ConsultationForm({ locale, initialService = "" }: Props) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const serviceOptions = useMemo(() => serviceSelectOptions, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: String(data.get("firstName") || "").trim(),
      lastName: String(data.get("lastName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      company: String(data.get("company") || "").trim(),
      businessType: String(data.get("businessType") || "").trim(),
      service: String(data.get("service") || "").trim(),
      message: String(data.get("message") || "").trim(),
      locale,
    };

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone) {
      setError(copy(locale, "Συμπλήρωσε όνομα, επώνυμο, email και κινητό.", "Please fill in first name, last name, email and mobile phone."));
      return;
    }

    setState("sending");
    setError(null);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `HTTP_${res.status}`);
      }

      setState("ok");
      form.reset();
    } catch (err: any) {
      setState("error");
      setError(err?.message || copy(locale, "Κάτι πήγε στραβά. Προσπάθησε ξανά.", "Something went wrong. Please try again."));
    }
  }

  if (state === "ok") {
    return (
      <p className="consultationForm__status" role="status">
        {copy(locale, "Ευχαριστούμε. Το αίτημα στάλθηκε και θα επικοινωνήσουμε μαζί σου.", "Thank you. Your request has been sent and we will contact you.")}
      </p>
    );
  }

  return (
    <form className="consultationForm" onSubmit={onSubmit} noValidate>
      <div className="consultationForm__row">
        <label>
          <span>{copy(locale, "Όνομα", "First name")}</span>
          <input name="firstName" autoComplete="given-name" />
        </label>
        <label>
          <span>{copy(locale, "Επώνυμο", "Last name")}</span>
          <input name="lastName" autoComplete="family-name" />
        </label>
      </div>

      <div className="consultationForm__row">
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label>
          <span>{copy(locale, "Κινητό τηλέφωνο", "Mobile phone")}</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>

      <div className="consultationForm__row">
        <label>
          <span>{copy(locale, "Επιχείρηση", "Company")}</span>
          <input name="company" autoComplete="organization" />
        </label>
        <label>
          <span>{copy(locale, "Τύπος επιχείρησης", "Business type")}</span>
          <select name="businessType" defaultValue="">
            <option value="">{copy(locale, "Επίλεξε", "Select")}</option>
            <option value="restaurant">{copy(locale, "Εστιατόριο / Food service", "Restaurant / Food service")}</option>
            <option value="cafe-bar">{copy(locale, "Cafe / Bar", "Cafe / Bar")}</option>
            <option value="hotel">{copy(locale, "Ξενοδοχείο", "Hotel")}</option>
            <option value="tourism">{copy(locale, "Τουριστική επιχείρηση", "Tourism business")}</option>
            <option value="new-business">{copy(locale, "Νέα επιχείρηση", "New business")}</option>
            <option value="other">{copy(locale, "Άλλο", "Other")}</option>
          </select>
        </label>
      </div>

      <label>
        <span>{copy(locale, "Υπηρεσία ενδιαφέροντος", "Service of interest")}</span>
        <select name="service" defaultValue={initialService}>
          <option value="">{copy(locale, "Δεν είμαι σίγουρος ακόμα", "I am not sure yet")}</option>
          {serviceOptions.map((service) => (
            <option key={service.id} value={service.id}>
              {service.label[locale]}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>{copy(locale, "Μήνυμα", "Message")}</span>
        <textarea
          name="message"
          rows={6}
          placeholder={copy(locale, "Πες μας λίγα λόγια για την επιχείρηση και την ανάγκη σου.", "Tell us briefly about the business and your current need.")}
        />
      </label>

      {error && (
        <p className="consultationForm__error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={state === "sending"}>
        {state === "sending"
          ? copy(locale, "Αποστολή...", "Sending...")
          : copy(locale, "Αποστολή αιτήματος", "Send request")}
      </button>
    </form>
  );
}
