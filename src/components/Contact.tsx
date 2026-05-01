import { useEffect, useRef, useState } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzzbnwqr' // החלף בקישור שלך מ-formspree.io

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
              setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, i * 120)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 md:px-10 max-w-[1400px] mx-auto">

      <div className="pb-10 mb-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <p data-reveal className="text-xs tracking-[5px] uppercase mb-4 transition-all duration-700" style={{ color: 'var(--orange)', opacity: 0, transform: 'translateY(20px)' }}>
          Get In Touch
        </p>
        <h2 data-reveal className="font-heading font-bold uppercase leading-none transition-all duration-700" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: 'var(--text)', opacity: 0, transform: 'translateY(20px)' }}>
          נבנה
          <br />
          <span style={{ color: 'var(--orange)' }}>משהו ביחד</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-20">

        {/* Left */}
        <div>
          <p data-reveal className="leading-relaxed mb-10 transition-all duration-700" style={{ color: 'var(--text-mid)', opacity: 0, transform: 'translateY(20px)' }}>
            יש לך פרויקט? רעיון? מותג שמחכה להיוולד?
            <br />
            אני כאן.
          </p>

          <div data-reveal className="flex flex-col gap-5 mb-12 transition-all duration-700" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            {[
              { href: 'https://instagram.com/gulistudio', label: '@gulistudio', icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              )},
            ].map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm transition-colors duration-300"
                style={{ color: 'var(--text-mid)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-mid)')}
              >
                <span className="w-8 h-8 flex items-center justify-center border transition-all duration-300"
                  style={{ borderColor: 'var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  {link.icon}
                </span>
                {link.label}
              </a>
            ))}
          </div>

          <div data-reveal className="p-5 border transition-all duration-700" style={{ borderColor: 'rgba(255,92,26,0.2)', background: 'rgba(255,92,26,0.03)', opacity: 0, transform: 'translateY(20px)' }}>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--orange)', animation: 'pulse 2s infinite' }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--orange)' }}>פתוח לפרויקטים</span>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div data-reveal className="transition-all duration-700" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          {status === 'sent' ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-14 h-14 flex items-center justify-center" style={{ border: '1px solid var(--orange)', background: 'rgba(255,92,26,0.05)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--orange)' }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p className="font-heading font-semibold text-lg" style={{ color: 'var(--text)' }}>ההודעה נשלחה!</p>
              <p className="text-sm" style={{ color: 'var(--text-lt)' }}>אחזור אליך בהקדם 🧡</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              {[
                { name: 'name', label: 'שם', type: 'text', placeholder: 'ישראל ישראלי' },
                { name: 'email', label: 'אימייל', type: 'email', placeholder: 'hello@example.com' },
              ].map(f => (
                <div key={f.name} className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-lt)' }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    value={form[f.name as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                    className="bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300"
                    style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-lt)' }}>הודעה</label>
                <textarea
                  rows={4}
                  placeholder="ספר/י לי על הפרויקט..."
                  required
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="bg-transparent border-b py-3 text-sm outline-none resize-none transition-colors duration-300"
                  style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>
              {status === 'error' && (
                <p className="text-sm" style={{ color: '#e53e3e' }}>משהו השתבש. נסה שוב או כתב ישירות ל-gulisstudio20@gmail.com</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-1 w-full py-4 font-heading font-semibold text-xs tracking-[4px] uppercase transition-all duration-300"
                style={{ background: 'var(--orange)', color: '#fff', borderRadius: 4, opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'wait' : 'pointer' }}
                onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                onMouseLeave={e => { e.currentTarget.style.opacity = status === 'sending' ? '0.7' : '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {status === 'sending' ? 'שולח...' : 'שלח הודעה ↗'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
