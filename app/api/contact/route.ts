import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Να τρέχει σε Node runtime (όχι Edge)
export const runtime = 'nodejs'

function envOrThrow(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ENV: ${name}`)
  return v
}

// helpers για ασφαλές HTML
function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
function escapeAttr(s: string) {
  return escapeHtml(s).replace(/"/g, '&quot;')
}

export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/contact' })
}

type Body = {
  name?: string
  email?: string
  message?: string
  city?: string
  horeca?: 'yes' | 'open' | null
  tourism?: 'yes' | 'open' | null
  labels?: { horeca?: string | null; tourism?: string | null }
}

export async function POST(req: Request) {
  try {
    const {
      name = '',
      email = '',
      message = '',
      city = '',
      horeca = null,
      tourism = null,
      labels = {}
    }: Body = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
    }

    const SMTP_HOST = envOrThrow('SMTP_HOST')
    const SMTP_PORT = Number(process.env.SMTP_PORT || 465)
    const SMTP_SECURE = String(process.env.SMTP_SECURE).toLowerCase() === 'true' || SMTP_PORT === 465
    const SMTP_USER = envOrThrow('SMTP_USER')
    const SMTP_PASS = envOrThrow('SMTP_PASS')
    const CONTACT_TO = envOrThrow('CONTACT_TO')

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE, // true για 465, false για 587
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    await transporter.verify().catch((e) => {
      console.error('SMTP verify failed:', e)
      throw new Error('smtp_verify_failed')
    })

    // Περιγραφικά strings για τα checkboxes
    const horecaStr = horeca ? (labels?.horeca ?? horeca) : '—'
    const tourismStr = tourism ? (labels?.tourism ?? tourism) : '—'

    // Plain text (fallback)
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      city ? `City: ${city}` : '',
      `HORECA: ${horecaStr}`,
      `Tourism: ${tourismStr}`,
      '',
      message
    ].filter(Boolean).join('\n')

    // HTML
    const html = `
      <div style="font:14px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111">
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeAttr(email)}">${escapeHtml(email)}</a></p>
        ${city ? `<p><strong>City:</strong> ${escapeHtml(city)}</p>` : ''}

        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />

        <p><strong>HORECA:</strong> ${escapeHtml(horecaStr)}</p>
        <p><strong>Tourism:</strong> ${escapeHtml(tourismStr)}</p>

        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />

        <div>
          <strong>Message:</strong>
          <p style="white-space:pre-wrap;margin-top:8px">${escapeHtml(message)}</p>
        </div>
      </div>
    `

    const info = await transporter.sendMail({
      from: `"HORECA Plus" <${SMTP_USER}>`, // με Gmail πρέπει να ταιριάζει
      to: CONTACT_TO,
      replyTo: email,
      subject: `New contact from ${name}`,
      text,
      html,
    })

    console.log('Mail sent:', info.messageId)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Contact POST error:', e?.message || e)
    return NextResponse.json({ ok: false, error: e?.message || 'server_error' }, { status: 500 })
  }
}
