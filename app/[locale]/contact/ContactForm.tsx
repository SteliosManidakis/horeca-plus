'use client'
import { useState } from 'react'

type State = 'idle' | 'sending' | 'ok' | 'error'
type Opt = 'yes' | 'open' | null

export default function ContactForm({ t }: { t: any }) {
  const [state, setState] = useState<State>('idle')
  const [formError, setFormError] = useState<string | null>(null)
  const [horeca, setHoreca] = useState<Opt>(null)
  const [tourism, setTourism] = useState<Opt>(null)

  function toggle(current: Opt, value: Exclude<Opt, null>, set: (v: Opt)=>void) {
    set(current === value ? null : value)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement // <-- πιάσε το ΠΡΙΝ από await
    setFormError(null)

    const data = new FormData(form)                 // <-- χρησιμοποίησέ το εδώ
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!name)   { setFormError(t.contact?.errors?.nameRequired   ?? 'Το όνομα είναι υποχρεωτικό'); return }
    if (!email)  { setFormError(t.contact?.errors?.emailRequired  ?? 'Το email είναι υποχρεωτικό'); return }
    if (!message){ setFormError(t.contact?.errors?.messageRequired?? 'Το μήνυμα είναι υποχρεωτικό'); return }
    if (!horeca && !tourism) {
      setFormError(t.contact?.errors?.segmentRequired ?? 'Διάλεξε τουλάχιστον έναν τομέα')
      return
    }

    const payload = {
      name,
      email,
      city: String(data.get('city') || '').trim(),
      message,
      horeca,
      tourism,
      labels: {
        horeca: horeca ? t.contact.options[horeca] : null,
        tourism: tourism ? t.contact.options[tourism] : null,
      }
    }

    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store'
      })

      if (res.ok) {
        setState('ok')
        form.reset()                  // <-- και εδώ, ΟΧΙ e.currentTarget.reset()
        setHoreca(null); setTourism(null)
        return
      }

      const body = await res.json().catch(() => ({} as any))
      setFormError(
        body?.error === 'missing_fields'
          ? (t.contact?.errors?.messageRequired ?? 'Συμπλήρωσε όλα τα πεδία')
          : body?.error || `HTTP_${res.status}`
      )
      setState('error')
    } catch (err: any) {
      console.error('contact submit error:', err)
      setFormError('Σφάλμα δικτύου. Προσπάθησε ξανά.')
      setState('error')
    }
  }

  if (state === 'ok') return <p role="status">✔️ {t.contact.success}</p>
  if (state === 'error') return <p role="alert">❌ {formError || t.contact.error}</p>

  const wrap = { display:'grid', gap:12, maxWidth:520 } as const
  const input = { padding:'10px 12px', border:'1px solid #000', borderRadius:6 } as const
  const label = { fontSize:16, fontWeight:600 } as const
  const group = { display:'grid', gap:8, padding:'10px 12px', border:'1px solid #000', borderRadius:8, background:'#fff' } as const
  const hint  = { fontSize:14, color:'#666' } as const

  return (
    <form onSubmit={onSubmit} style={wrap} noValidate>
      <input name="name" placeholder={t.contact.name} style={input} />
      <input name="email" type="email" placeholder={t.contact.email} style={input} />

      <fieldset style={group} aria-describedby="horeca-hint">
        <legend style={label}>{t.contact.q_horeca}</legend>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <label style={{display:'flex', gap:8, alignItems:'center', cursor:'pointer'}}>
            <input type="checkbox" checked={horeca==='yes'} onChange={()=>toggle(horeca,'yes',setHoreca)} />
            {t.contact.options.yes}
          </label>
          <label style={{display:'flex', gap:8, alignItems:'center', cursor:'pointer'}}>
            <input type="checkbox" checked={horeca==='open'} onChange={()=>toggle(horeca,'open',setHoreca)} />
            {t.contact.options.open}
          </label>
        </div>
        <span id="horeca-hint" style={hint}>{t.contact.hints.horeca}</span>
      </fieldset>

      <fieldset style={group} aria-describedby="tourism-hint">
        <legend style={label}>{t.contact.q_tourism}</legend>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <label style={{display:'flex', gap:8, alignItems:'center', cursor:'pointer'}}>
            <input type="checkbox" checked={tourism==='yes'} onChange={()=>toggle(tourism,'yes',setTourism)} />
            {t.contact.options.yes}
          </label>
          <label style={{display:'flex', gap:8, alignItems:'center', cursor:'pointer'}}>
            <input type="checkbox" checked={tourism==='open'} onChange={()=>toggle(tourism,'open',setTourism)} />
            {t.contact.options.open}
          </label>
        </div>
        <span id="tourism-hint" style={hint}>{t.contact.hints.tourism}</span>
      </fieldset>

      <input name="city" placeholder={t.contact.city} style={input} />

      <textarea name="message" placeholder={t.contact.message} rows={5} style={input} />

      {formError && <p role="alert" style={{color:'#c00', fontSize:14}}>{formError}</p>}

      <button type="submit" disabled={state==='sending'}
        style={{ padding:'10px 14px', borderRadius:6, border:'1px solid #222', background:'#111', color:'#fff' }}>
        {state==='sending' ? '...' : t.contact.send}
      </button>
    </form>
  )
}
