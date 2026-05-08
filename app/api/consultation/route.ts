import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getServiceById, type Locale } from "src/content/services";

export const runtime = "nodejs";

function env(name: string) {
  return process.env[name];
}

function envOrThrow(...names: string[]) {
  for (const name of names) {
    const value = env(name);
    if (value) return value;
  }
  throw new Error(`Missing ENV: ${names.join(" or ")}`);
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  businessType?: string;
  service?: string;
  message?: string;
  locale?: Locale;
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const company = String(body.company || "").trim();
    const businessType = String(body.businessType || "").trim();
    const serviceId = String(body.service || "").trim();
    const message = String(body.message || "").trim();
    const locale: Locale = body.locale === "en" ? "en" : "el";

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    const smtpHost = envOrThrow("SMTP_HOST");
    const smtpPort = Number(env("SMTP_PORT") || 465);
    const smtpSecure = String(env("SMTP_SECURE")).toLowerCase() === "true" || smtpPort === 465;
    const smtpUser = envOrThrow("SMTP_USER");
    const smtpPass = envOrThrow("SMTP_PASS");
    const contactTo = envOrThrow("CONTACT_TO_EMAIL", "CONTACT_TO");
    const senderName = env("BREVO_SENDER_NAME") || "HORECA Plus";
    const senderEmail = env("BREVO_SENDER_EMAIL") || smtpUser;

    const service = getServiceById(serviceId);
    const serviceLabel = service ? service.title[locale] : "Not selected";
    const fullName = `${firstName} ${lastName}`.trim();

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const preheader = `New consultation request from ${fullName}`;
    const text = [
      `Request type: Consultation request`,
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      company ? `Company: ${company}` : "",
      businessType ? `Business type: ${businessType}` : "",
      `Service: ${serviceLabel}`,
      "",
      message || "No message provided.",
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(preheader)}</div>
      <div style="font:14px/1.55 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111">
        <h1 style="font-size:20px;margin:0 0 16px">Consultation request</h1>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        ${businessType ? `<p><strong>Business type:</strong> ${escapeHtml(businessType)}</p>` : ""}
        <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
        <p style="white-space:pre-wrap">${escapeHtml(message || "No message provided.")}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: contactTo,
      replyTo: `"${fullName}" <${email}>`,
      subject: `Consultation request - ${serviceLabel} - ${fullName}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Consultation POST error:", error?.message || error);
    return NextResponse.json({ ok: false, error: error?.message || "server_error" }, { status: 500 });
  }
}
