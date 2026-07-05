import { useEffect, useRef, useState } from 'react'
import { openWhatsApp } from '../lib/whatsapp'

// טקסט כהה שעומד ב-AA (≥4.5:1) על רקע הכתום
const onAccentDark = 'rgba(46,18,6,0.9)'

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

function useModalKeys(onClose: () => void, scrollRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    // Small timeout so the element is painted before focusing
    const t = setTimeout(() => scrollRef.current?.focus(), 50)
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, scrollRef])

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const el = scrollRef.current
    if (!el) return
    const step = 80
    if (e.key === 'ArrowDown') { e.preventDefault(); el.scrollBy({ top: step, behavior: 'smooth' }) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); el.scrollBy({ top: -step, behavior: 'smooth' }) }
    if (e.key === 'PageDown')  { e.preventDefault(); el.scrollBy({ top: el.clientHeight * 0.85, behavior: 'smooth' }) }
    if (e.key === 'PageUp')    { e.preventDefault(); el.scrollBy({ top: -el.clientHeight * 0.85, behavior: 'smooth' }) }
    if (e.key === 'End')       { e.preventDefault(); el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }) }
    if (e.key === 'Home')      { e.preventDefault(); el.scrollTo({ top: 0, behavior: 'smooth' }) }
  }

  return handleKeyDown
}

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 9000,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(28,25,20,0.45)',
  backdropFilter: 'blur(6px)',
  padding: '24px',
  animation: 'fadeInModal .25s ease',
}

const modalCloseStyle: React.CSSProperties = {
  position: 'fixed', top: 24, left: 24,
  width: 40, height: 40, borderRadius: '50%',
  background: 'rgba(253,251,247,0.9)',
  border: '1px solid rgba(28,25,20,0.25)',
  color: 'var(--ink)', fontSize: 22, lineHeight: 1,
  cursor: 'pointer', display: 'grid', placeItems: 'center',
  transition: 'background .2s, transform .15s',
  zIndex: 9001,
}

const modalBoxStyle: React.CSSProperties = {
  background: 'var(--paper)',
  border: '1px solid var(--line-2)',
  borderRadius: 20,
  padding: '44px 48px',
  width: '100%',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  color: 'var(--ink)',
  boxShadow: '0 24px 80px -10px rgba(28,25,20,0.3)',
  position: 'relative',
  direction: 'rtl',
  outline: 'none',
}

function ModalClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      aria-label="סגור"
      style={modalCloseStyle}
      onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'scale(1.1)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(253,251,247,0.9)'; e.currentTarget.style.transform = 'scale(1)' }}
    >×</button>
  )
}

function AccessibilityModal({ onClose }: { onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const handleKeyDown = useModalKeys(onClose, scrollRef)

  const h3Style: React.CSSProperties = {
    fontFamily: 'var(--f-hebrew)', fontWeight: 800, fontSize: 20,
    color: 'var(--ink)', margin: '28px 0 12px', borderBottom: '1px solid var(--line-2)', paddingBottom: 8,
  }
  const pStyle: React.CSSProperties = {
    fontFamily: 'var(--f-hebrew)', fontSize: 16, lineHeight: 1.85,
    color: 'var(--ink-2)', margin: '0 0 10px', textAlign: 'right',
  }
  const liStyle: React.CSSProperties = {
    fontFamily: 'var(--f-hebrew)', fontSize: 16, lineHeight: 1.85,
    color: 'var(--ink-2)', marginBottom: 6,
  }
  const boldStyle: React.CSSProperties = { fontWeight: 700, color: 'var(--ink)' }

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label="הצהרת נגישות" style={modalOverlayStyle}>
      <ModalClose onClose={onClose} />

      <div
        ref={scrollRef}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{ ...modalBoxStyle, maxWidth: 680, maxHeight: '82vh', textAlign: 'center' }}
      >
        <h2 style={{ fontFamily: 'var(--f-hebrew)', fontWeight: 900, fontSize: 28, color: 'var(--ink)', margin: '0 0 8px' }}>
          הצהרת נגישות
        </h2>
        <p style={{ ...pStyle, textAlign: 'center', marginBottom: 24, color: 'var(--mute)', fontSize: 14 }}>
          עודכן לאחרונה: 1.6.2026
        </p>

        <p style={pStyle}>
          GULISTUDIO מאמין בשוויון הזכות לגישה למידע ולשירותים עבור כלל המשתמשים, לרבות אנשים עם מוגבלויות.
        </p>
        <p style={pStyle}>
          אתר זה פועל בהתאם לדרישות <span style={boldStyle}>חוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998</span>, ותקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.
        </p>

        <h3 style={h3Style}>מצב הנגישות הנוכחי</h3>
        <p style={pStyle}>
          אנו נמצאים בתהליך שיפור מתמשך של נגישות האתר לעמידה בדרישות <span style={boldStyle}>תקן ישראלי 5568</span> ורמת AA של WCAG 2.1.
        </p>
        <p style={{ ...pStyle, marginBottom: 8 }}>אנו פועלים לשפר בין היתר את התחומים הבאים:</p>
        <ul style={{ textAlign: 'right', paddingRight: 20, paddingLeft: 0, margin: '0 0 16px' }}>
          {[
            'תמיכה בניווט באמצעות מקלדת בלבד',
            'תמיכה בקוראי מסך',
            'חלופות טקסטואליות לתמונות ואלמנטים ויזואליים',
            'יחסי ניגוד צבע עומדים בדרישות התקן',
            'מבנה כותרות ברור וסדור',
          ].map(item => (
            <li key={item} style={liStyle}>{item}</li>
          ))}
        </ul>
        <p style={pStyle}>
          ייתכן שחלק מהתכנים או הדפים באתר טרם הותאמו במלואם. אנו עושים כמיטב יכולתנו לאתר ולתקן כל ליקוי.
        </p>

        <h3 style={h3Style}>פנייה בנושא נגישות — רכז/ת נגישות</h3>
        <p style={pStyle}>נתקלת בקושי לגשת לתוכן כלשהו? נשמח לעזור ולטפל בפנייתך בהקדם.</p>
        <p style={pStyle}><span style={boldStyle}>שם רכזת הנגישות:</span> אביגיל</p>
        <p style={pStyle}><span style={boldStyle}>דוא"ל:</span> gulisstudio20@gmail.com</p>
        <p style={{ ...pStyle, marginTop: 16, color: 'var(--mute)', fontSize: 15 }}>
          פניות יטופלו תוך <span style={boldStyle}>5 ימי עסקים</span>.
        </p>
      </div>
    </div>
  )
}

function LegalModal({ title, content, onClose }: { title: string; content: string; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const handleKeyDown = useModalKeys(onClose, scrollRef)

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label={title} style={modalOverlayStyle}>
      <ModalClose onClose={onClose} />

      <div
        ref={scrollRef}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{ ...modalBoxStyle, maxWidth: 640, maxHeight: '80vh' }}
      >
        <h2 style={{ fontFamily: 'var(--f-hebrew)', fontWeight: 900, fontSize: 28, color: 'var(--ink)', margin: '0 0 28px' }}>{title}</h2>
        <pre style={{
          fontFamily: 'var(--f-hebrew)', fontSize: 17, lineHeight: 1.9,
          color: 'var(--ink-2)',
          whiteSpace: 'pre-wrap', margin: 0, textAlign: 'right',
        }}>{content}</pre>
      </div>
    </div>
  )
}

export default function Footer() {
  const [modal, setModal] = useState<null | 'terms' | 'privacy' | 'accessibility'>(null)
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

  return (
    <>
    {modal === 'accessibility' && (
      <AccessibilityModal onClose={() => setModal(null)} />
    )}
    {(modal === 'terms' || modal === 'privacy') && (
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

        {/* Top — CTA */}
        <div style={{
          padding: '72px 0 60px',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          textAlign: 'center',
        }}>
          <span style={{ display: 'block', fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: onAccentDark, marginBottom: 20, fontFamily: 'var(--f-latin)', fontWeight: 600 }}>
            ✦ מוכנים להתחיל?
          </span>
          <h2 style={{
            fontFamily: 'var(--f-hebrew)', fontWeight: 900,
            fontSize: 'clamp(36px,8vw,90px)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            color: '#fff', margin: '0 0 16px',
          }}>
            בואו נהפוך<br />
            <em style={{ fontFamily: 'var(--f-serif)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>רעיון</em>
            {' '}לאתר
          </h2>
          <p style={{ fontSize: 19, fontWeight: 600, color: '#fff', lineHeight: 1.65, maxWidth: 420, margin: '0 auto 32px' }}>
            הפרוייקט החדש שלכם במרחק שיחה אחת — תשאירו הודעה ואחזור אליכם בהקדם.
          </p>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '18px 38px',
            background: '#fff', color: 'var(--accent)',
            borderRadius: 'var(--r-pill)',
            fontSize: 18, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
            transition: 'transform .2s cubic-bezier(.16,1,.3,1), box-shadow .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(0,0,0,0.24)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18)' }}
          >
            <span>להשארת הודעה</span>
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
          </a>
        </div>

        {/* Mid — links */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap',
          padding: '36px 0',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
        }}>
          {/* קשר */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--f-latin)', fontSize: 15, letterSpacing: '0.14em', textTransform: 'uppercase', color: onAccentDark, fontWeight: 600, marginBottom: 16 }}>קשר</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <li>
                <a href="https://instagram.com/gulisstudio" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 17, fontWeight: 600, color: '#fff', textDecoration: 'none', transition: 'opacity .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >Instagram</a>
              </li>
              <li>
                <button onClick={openWhatsApp}
                  style={{ fontSize: 17, fontWeight: 600, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--f-hebrew)', transition: 'opacity .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >WhatsApp</button>
              </li>
            </ul>
          </div>
          {/* משפטי */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--f-latin)', fontSize: 15, letterSpacing: '0.14em', textTransform: 'uppercase', color: onAccentDark, fontWeight: 600, marginBottom: 16 }}>משפטי</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              {([['terms', 'תנאי שימוש'], ['privacy', 'מדיניות פרטיות'], ['accessibility', 'הצהרת נגישות']] as const).map(([key, label]) => (
                <li key={key}>
                  <button onClick={() => setModal(key)}
                    style={{ fontSize: 17, fontWeight: 600, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', transition: 'opacity .2s', fontFamily: 'var(--f-hebrew)', padding: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >{label}</button>
                </li>
              ))}
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
            <span style={{ fontSize: 15, fontWeight: 500, color: onAccentDark, letterSpacing: '0.05em' }}>Web Architecture</span>
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, color: onAccentDark, margin: 0 }}>
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
        WebkitTextStroke: '1px rgba(255,255,255,0.18)',
        userSelect: 'none', pointerEvents: 'none',
        whiteSpace: 'nowrap',
        zIndex: 0,
      }}>GULISTUDIO</div>

    </footer>
    </>
  )
}
