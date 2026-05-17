import { useEffect, useRef, useState } from 'react'

const WEB3FORMS_KEY = '2881ff54-8e38-43d3-af24-fbd128e3842f'

const TERMS_CONTENT = `תנאי שימוש

ברוכים הבאים ל-GULISTUDIO. השימוש באתר זה מהווה הסכמה לתנאים הבאים:

1. שימוש מותר
האתר מיועד לצפייה ולפנייה לשירותי עיצוב ובנייה של אתרי אינטרנט. אין להעתיק, לשכפל או להפיץ תכנים מהאתר ללא אישור מפורש בכתב.

2. קניין רוחני
כל התכנים, העיצובים, התמונות והטקסטים באתר הינם רכושה הבלעדי של GULISTUDIO ומוגנים בזכויות יוצרים.

3. אחריות
GULISTUDIO אינה אחראית לנזקים ישירים או עקיפים הנובעים משימוש באתר. המידע מוצג "כפי שהוא" ללא כל אחריות.

4. שינויים
אנו שומרים לעצמנו את הזכות לשנות את תנאי השימוש בכל עת. שינויים ייכנסו לתוקף מיד עם פרסומם.

5. יצירת קשר
לכל שאלה בנוגע לתנאי השימוש, ניתן לפנות אלינו דרך טופס יצירת הקשר באתר.

עדכון אחרון: מאי 2026`

const PRIVACY_CONTENT = `מדיניות פרטיות

GULISTUDIO מחויבת לשמירה על פרטיותכם. מדיניות זו מסבירה כיצד אנו אוספים ומשתמשים במידע:

1. מידע שנאסף
אנו אוספים מידע שמוסרים לנו ישירות דרך טופס יצירת הקשר: שם, כתובת דוא"ל, מספר טלפון והודעה. איננו אוספים מידע נוסף ללא הסכמתכם.

2. שימוש במידע
המידע משמש אך ורק לצורך מתן מענה לפניותיכם וליצירת קשר עסקי. אין אנו מוכרים, מעבירים או משתפים את המידע עם צדדים שלישיים.

3. אבטחת מידע
אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שנמסר לנו. הטפסים מועברים בצורה מוצפנת.

4. עוגיות (Cookies)
האתר עשוי להשתמש בעוגיות לשיפור חוויית הגלישה. ניתן לבטל עוגיות בהגדרות הדפדפן.

5. זכויותיכם
יש לכם זכות לבקש מחיקה של המידע שנמסר לנו בכל עת על ידי פנייה אלינו ישירות.

עדכון אחרון: מאי 2026`

function LegalModal({ title, content, onClose }: { title: string; content: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        padding: '24px',
        animation: 'fadeInModal .25s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(255,90,30,0.18)',
          backdropFilter: 'blur(28px) saturate(160%)',
          WebkitBackdropFilter: 'blur(28px) saturate(160%)',
          border: '1px solid rgba(255,120,60,0.35)',
          borderRadius: 20,
          padding: '44px 48px',
          maxWidth: 640, width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          color: '#fff',
          boxShadow: '0 24px 80px -10px rgba(255,60,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="סגור"
          style={{
            position: 'absolute', top: 18, left: 18,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', fontSize: 18, lineHeight: 1,
            cursor: 'pointer', display: 'grid', placeItems: 'center',
            transition: 'background .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
        >×</button>
        <h2 style={{ fontFamily: 'var(--f-hebrew)', fontWeight: 900, fontSize: 28, color: '#fff', margin: '0 0 28px' }}>{title}</h2>
        <pre style={{
          fontFamily: 'var(--f-hebrew)', fontSize: 17, lineHeight: 1.9,
          color: 'rgba(255,255,255,0.88)',
          whiteSpace: 'pre-wrap', margin: 0,
        }}>{content}</pre>
      </div>
    </div>
  )
}

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [modal, setModal] = useState<null | 'terms' | 'privacy'>(null)
  const watermarkRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const el = footerRef.current
      const wm = watermarkRef.current
      if (!el || !wm) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height * 0.6)))
      wm.style.transform = `translateX(-50%) translateY(${-8 * progress}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'פנייה חדשה מה-Footer',
          from_name: form.name,
          ...form,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'sent' : 'error')
      if (data.success) setForm({ name: '', email: '', phone: '', message: '' })
    } catch { setStatus('error') }
  }

  return (
    <>
    {modal && (
      <LegalModal
        title={modal === 'terms' ? 'תנאי שימוש' : 'מדיניות פרטיות'}
        content={modal === 'terms' ? TERMS_CONTENT : PRIVACY_CONTENT}
        onClose={() => setModal(null)}
      />
    )}
    <footer ref={footerRef} style={{ background: 'var(--accent)', color: '#fff', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative GS */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', right: '-3%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--f-latin)', fontWeight: 900,
        fontSize: 'clamp(200px, 30vw, 420px)',
        letterSpacing: '-0.06em', lineHeight: 1,
        color: 'rgba(0,0,0,0.07)',
        userSelect: 'none', pointerEvents: 'none',
        zIndex: 0,
      }}>GS</div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '0 20px' }}>

        {/* Top */}
        <div style={{
          padding: '60px 0 48px',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
        }}>
          {/* Heading */}
          <div>
            <span style={{ display: 'block', fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 20, fontFamily: 'var(--f-latin)' }}>
              ✦ מוכנים להתחיל?
            </span>
            <h2 style={{
              fontFamily: 'var(--f-hebrew)', fontWeight: 900,
              fontSize: 'clamp(36px,8vw,90px)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
              color: '#fff', margin: '0 0 16px',
            }}>
              בואו נהפוך<br />
              <em style={{ fontFamily: 'var(--f-serif)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>רעיון</em>
              {' '}לאתר
            </h2>
            <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: 380 }}>
              הפרוייקט החדש שלכם במרחק שיחה אחת — תשאירו הודעה ואחזור אליכם בהקדם.
            </p>
          </div>

          {/* Right — full form */}
          <div>
            {status === 'sent' ? (
              <div style={{ padding: 60, textAlign: 'center', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--r-lg)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p style={{ fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 8 }}>ההודעה נשלחה!</p>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16 }}>אחזור אליכם בהקדם.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '28px 24px', background: 'rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 'var(--r-lg)', backdropFilter: 'blur(8px)' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
                  {[
                    { name: 'name', label: 'שם', type: 'text', placeholder: 'ישראל ישראלי' },
                    { name: 'email', label: 'אימייל', type: 'email', placeholder: 'hello@example.com' },
                  ].map(f => (
                    <label key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 16, fontWeight: 600, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', fontFamily: 'var(--f-latin)' }}>
                      {f.label}
                      <input
                        type={f.type} placeholder={f.placeholder} required
                        value={form[f.name as 'name' | 'email']}
                        onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                        style={{ padding: '13px 16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, background: 'rgba(255,255,255,0.1)', fontFamily: 'var(--f-hebrew)', fontSize: 16, color: '#fff', outline: 'none', transition: 'border-color .2s, background .2s' }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                      />
                    </label>
                  ))}
                </div>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 16, fontWeight: 600, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', fontFamily: 'var(--f-latin)' }}>
                  טלפון
                  <input
                    type="tel" placeholder="050-000-0000" required
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    style={{ padding: '13px 16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, background: 'rgba(255,255,255,0.1)', fontFamily: 'var(--f-hebrew)', fontSize: 16, color: '#fff', outline: 'none', transition: 'border-color .2s, background .2s' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 16, fontWeight: 600, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', fontFamily: 'var(--f-latin)' }}>
                  הודעה
                  <textarea
                    rows={4} placeholder="ספר/י לי על הפרויקט..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ padding: '13px 16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, background: 'rgba(255,255,255,0.1)', fontFamily: 'var(--f-hebrew)', fontSize: 16, color: '#fff', resize: 'vertical', outline: 'none', transition: 'border-color .2s, background .2s' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                  />
                </label>

                {status === 'error' && (
                  <p style={{ color: 'rgba(255,200,185,1)', fontSize: 16 }}>משהו השתבש. נסה שוב.</p>
                )}

                <button type="submit" disabled={status === 'sending'}
                  style={{
                    width: '100%', padding: '17px 20px',
                    background: '#fff', color: 'var(--accent)',
                    border: 'none', borderRadius: 'var(--r-pill)',
                    fontSize: 16, fontWeight: 700, fontFamily: 'var(--f-hebrew)',
                    cursor: status === 'sending' ? 'wait' : 'pointer',
                    opacity: status === 'sending' ? 0.7 : 1,
                    transition: 'opacity .2s, transform .15s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  }}
                  onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = '' }}
                >
                  <span>{status === 'sending' ? 'שולח...' : 'שלח הודעה'}</span>
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Mid — links */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap',
          padding: '36px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          {/* קשר */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--f-latin)', fontSize: 15, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>קשר</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <li>
                <a href="https://instagram.com/gulistudio" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                >Instagram</a>
              </li>
            </ul>
          </div>
          {/* משפטי */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--f-latin)', fontSize: 15, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>משפטי</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <li>
                <button onClick={() => setModal('terms')}
                  style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color .2s', fontFamily: 'var(--f-hebrew)', padding: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                >תנאי שימוש</button>
              </li>
              <li>
                <button onClick={() => setModal('privacy')}
                  style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color .2s', fontFamily: 'var(--f-hebrew)', padding: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                >מדיניות פרטיות</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: '20px 0',
          display: 'flex', alignItems: 'center', flexWrap: 'wrap',
          justifyContent: 'space-between', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--f-latin)', fontWeight: 900, letterSpacing: '0.2em', fontSize: 16, color: '#fff' }}>GULISTUDIO</span>
            <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>Web Architecture</span>
          </div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            © {new Date().getFullYear()} GULISTUDIO · Built with care in Israel
          </p>
        </div>
      </div>

      {/* Giant GULISTUDIO outline watermark */}
      <div ref={watermarkRef} aria-hidden style={{
        position: 'absolute', bottom: -20, left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--f-latin)', fontWeight: 900,
        fontSize: 'clamp(60px,10vw,140px)',
        letterSpacing: '0.15em', lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.12)',
        userSelect: 'none', pointerEvents: 'none',
        whiteSpace: 'nowrap',
        zIndex: 0,
      }}>GULISTUDIO</div>

    </footer>
    </>
  )
}
