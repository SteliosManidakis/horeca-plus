'use client'

import { useState } from 'react'

type Props = {
  messages: any
}

export default function Newsletterform({ messages }: Props) {
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Εδώ θα καλέσεις όποιο provider θες. Προς το παρόν απλή επιβεβαίωση.
    setOk(true)
    setEmail('')
  }

  if (ok) return <p role="status">{messages.newsletter.success}</p>

  return (
    <form onSubmit={onSubmit} style={{display:'flex', gap:8}}>
      <input
        type="email"
        required
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder={messages.newsletter.placeholder}
        style={{padding:'10px 12px', border:'1px solid #ccc', borderRadius:6, minWidth:240}}
      />
      <button type="submit" style={{padding:'10px 14px', borderRadius:6, border:'1px solid #222', background:'#111', color:'#fff'}}>
        {messages.newsletter.button}
      </button>
    </form>
  )
}
