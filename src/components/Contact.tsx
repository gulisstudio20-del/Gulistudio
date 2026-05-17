import { useEffect, useRef, useState } from 'react'

const WEB3FORMS_KEY = '2881ff54-8e38-43d3-af24-fbd128e3842f'

const serviceChips = ['אתר תדמית', 'חנות', 'מיתוג', 'UI/UX', 'אחר']

type FormState = { name: string; email: string; phone: string; service: string; message: string }

function validate(form: FormState): Record<string, string> {
  const e: Record<string, string> = {}
  if (form.name.trim().length < 2) e.name = 'נא להזין שם מלא'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'נא להזין אימייל תקין'
  if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim())) e.phone = 'נא להזין מספר טלפון תקין'
  if (form.message.trim().length < 5) e.message = 'נא לכתוב על הפרויקט'
  return e
}

const inputStyle = {
  padding: '15px 18px',
  border: '1px solid var(--line-2)',
  borderRadius: 12,
  background: '#fff',
  fontFamily: 'var(--f-hebrew)',
  fontSize: 16,
  color: 'var(--ink)',
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
  width: '100%',
}

const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: '0.04em',
  color: 'var(--mute)',
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const empty: FormState = { name: '', email: '', phone: '', service: 'אתר תדמית', message: '' }
  const [form, setForm] = useState<FormState>(empty)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return }
    setFieldErrors({})
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `פנייה חדשה מהאתר — ${form.service}`,
          from_name: form.name,
          ...form,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'sent' : 'error')
      if (data.success) setForm(empty)
    } catch { setStatus('error') }
  }

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [field]: e.target.value }))
    if (fieldErrors[field]) setFieldErrors(p => { const n = { ...p }; delete n[field]; return n })
  }

  const focusStyle = (hasError: boolean) => ({
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = hasError ? '#b3261e' : 'var(--accent)'
      e.currentTarget.style.boxShadow = hasError ? '0 0 0 4px rgba(179,38,30,0.12)' : '0 0 0 4px var(--accent-glow)'
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = hasError ? '#b3261e' : 'var(--line-2)'
      e.currentTarget.style.boxShadow = 'none'
    },
  })

  return (
    <section id="contact" ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '120px 36px', maxWidth: 860, margin: '0 auto' }}>

      <div data-reveal style={{ marginBottom: 50 }}>
        <span className="eyebrow" style={{ marginBottom: 18, display: 'inline-block' }}>✦ GET IN TOUCH</span>
        <h2 className="h-display" style={{ marginTop: 18 }}>
          נבנה <em>משהו יחד</em>
        </h2>
      </div>

      <div data-reveal>
        {status === 'sent' ? (
          <div style={{ padding: 80, textAlign: 'center', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-soft)', border: '1px solid var(--accent)', display: 'grid', placeItems: 'center', margin: '0 auto 24px' }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p style={{ fontWeight: 700, fontSize: 22, color: 'var(--ink)', marginBottom: 10 }}>ההודעה נשלחה!</p>
            <p style={{ color: 'var(--mute)', fontSize: 17 }}>אחזור אליך בהקדם.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '48px 52px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-sm)' }}>

            {/* שם + אימייל */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <label style={labelStyle}>
                שם *
                <input
                  type="text" placeholder="ישראל ישראלי"
                  value={form.name} onChange={set('name')}
                  style={{ ...inputStyle, borderColor: fieldErrors.name ? '#b3261e' : 'var(--line-2)' }}
                  {...focusStyle(!!fieldErrors.name)}
                />
                {fieldErrors.name && <span style={{ color: '#b3261e', fontSize: 15, marginTop: 2 }}>{fieldErrors.name}</span>}
              </label>
              <label style={labelStyle}>
                אימייל *
                <input
                  type="email" placeholder="hello@example.com"
                  value={form.email} onChange={set('email')}
                  style={{ ...inputStyle, borderColor: fieldErrors.email ? '#b3261e' : 'var(--line-2)' }}
                  {...focusStyle(!!fieldErrors.email)}
                />
                {fieldErrors.email && <span style={{ color: '#b3261e', fontSize: 15, marginTop: 2 }}>{fieldErrors.email}</span>}
              </label>
            </div>

            {/* טלפון */}
            <label style={labelStyle}>
              טלפון *
              <input
                type="tel" placeholder="050-000-0000"
                value={form.phone} onChange={set('phone')}
                style={{ ...inputStyle, borderColor: fieldErrors.phone ? '#b3261e' : 'var(--line-2)' }}
                {...focusStyle(!!fieldErrors.phone)}
              />
              {fieldErrors.phone && <span style={{ color: '#b3261e', fontSize: 15, marginTop: 2 }}>{fieldErrors.phone}</span>}
            </label>

            {/* סוג פרויקט */}
            <label style={labelStyle}>
              סוג פרויקט
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                {serviceChips.map(chip => (
                  <button key={chip} type="button" onClick={() => setForm(p => ({ ...p, service: chip }))}
                    style={{
                      padding: '10px 18px',
                      border: `1px solid ${form.service === chip ? 'var(--ink)' : 'var(--line-2)'}`,
                      borderRadius: 'var(--r-pill)', fontSize: 16,
                      background: form.service === chip ? 'var(--ink)' : '#fff',
                      color: form.service === chip ? '#fff' : 'var(--ink-2)',
                      transition: 'all .2s', cursor: 'pointer',
                    }}
                  >{chip}</button>
                ))}
              </div>
            </label>

            {/* הודעה */}
            <label style={labelStyle}>
              ספר/י לי על הפרויקט *
              <textarea
                rows={5} placeholder="מה מחפשים? מה חסר?"
                value={form.message} onChange={set('message')}
                style={{ ...inputStyle, resize: 'vertical', borderColor: fieldErrors.message ? '#b3261e' : 'var(--line-2)' }}
                {...focusStyle(!!fieldErrors.message)}
              />
              {fieldErrors.message && <span style={{ color: '#b3261e', fontSize: 15, marginTop: 2 }}>{fieldErrors.message}</span>}
            </label>

            {status === 'error' && (
              <p style={{ color: '#b3261e', fontSize: 15 }}>משהו השתבש. נסה שוב או כתוב ישירות ל-gulisstudio20@gmail.com</p>
            )}

            <button type="submit" disabled={status === 'sending'} className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', padding: '20px 18px', fontSize: 17, opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'wait' : 'pointer' }}>
              <span>{status === 'sending' ? 'שולח...' : 'שלח הודעה'}</span>
              <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
