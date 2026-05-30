import { useEffect, useRef } from 'react'

const pillars = [
  { mark: '✦', title: 'דיוק', desc: 'כל פרט חשוב. כל פיקסל במקום. כל מילה בשירות.' },
  { mark: '◈', title: 'מהירות', desc: 'קוד נקי = אתר מהיר = גולשים שנשארים.' },
  { mark: '◎', title: 'שיתוף פעולה', desc: 'את/ה מכיר/ה את העסק שלך, אני מבינה מה אנשים אוהבים — ביחד זה עובד.' },
]

const process = [
  { n: '01', title: 'אפיון', desc: 'מבינים את העסק, הקהל, והחזון.' },
  { n: '02', title: 'עיצוב', desc: 'בונים חוויה שמרגישה נכון ונראית מושלם.' },
  { n: '03', title: 'פיתוח', desc: 'מממשים בקוד נקי, מהיר ומדויק.' },
  { n: '04', title: 'השקה', desc: 'מוציאים לאוויר — ואתם מרגישים את זה.' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{ position: 'relative', zIndex: 1 }}>

      {/* ── Top: light zone ── */}
      <div style={{ padding: '100px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>

        <div data-reveal style={{ marginBottom: 40 }}>
          <span className="eyebrow">✦ ABOUT · 01</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 56, alignItems: 'start' }}>

          {/* Left: Text */}
          <div>
            <h2 data-reveal className="h-display" style={{ marginBottom: 32 }}>
              אתר הוא <em>הפנים הדיגיטליות</em> של העסק שלך.
            </h2>

            <p data-reveal style={{ fontSize: 'clamp(17px,1.2vw,20px)', lineHeight: 1.8, color: 'var(--ink-2)', maxWidth: '54ch', marginBottom: 20 }}>
              משנה לי מה אתם רוצים. משנה לי התמונה הספציפית שאתם לא מוכנים לוותר עליה.
              בואו נגשים את החלום שלכם אחד לאחד.
            </p>

            <p data-reveal style={{ fontSize: 'clamp(17px,1.2vw,20px)', lineHeight: 1.8, color: 'var(--mute)', maxWidth: '50ch', marginBottom: 36 }}>
              כל פרט חשוב. כל פיקסל מחושב. ואני כאן בשבילכם לאורך כל הדרך.
            </p>

            {/* Pillars */}
            <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {pillars.map(p => (
                <div key={p.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{
                    color: 'var(--accent)', fontSize: 16, marginTop: 3,
                    flexShrink: 0, width: 22,
                  }}>{p.mark}</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: 18, fontWeight: 700, marginBottom: 4, color: 'var(--ink)' }}>{p.title}</strong>
                    <p style={{ margin: 0, fontSize: 16, color: 'var(--mute)', lineHeight: 1.65 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a data-reveal href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              marginTop: 36, color: 'var(--accent)',
              borderBottom: '1px solid var(--accent)',
              paddingBottom: 4, fontWeight: 600, fontSize: 18,
              textDecoration: 'none',
            }}>
              נדבר
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
            </a>
          </div>

          {/* Right: Dark process card */}
          <div data-reveal style={{
            background: '#141414',
            borderRadius: 24,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 12px 48px rgba(0,0,0,0.28)',
          }}>
            {/* Card header */}
            <div style={{
              padding: '28px 32px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{
                fontFamily: 'var(--f-latin)', fontSize: 12,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}>THE PROCESS</span>
              <span style={{
                fontFamily: 'var(--f-latin)', fontSize: 12,
                color: 'rgba(255,130,60,0.7)', letterSpacing: '0.08em',
              }}>✦ GULISTUDIO</span>
            </div>

            {/* Steps */}
            <div style={{ padding: '8px 0 8px' }}>
              {process.map((step, i) => (
                <div
                  key={step.n}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '44px 1fr',
                    gap: 16,
                    alignItems: 'center',
                    padding: '20px 32px',
                    borderBottom: i < process.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--f-latin)', fontWeight: 900,
                    fontSize: 13, letterSpacing: '0.08em',
                    color: 'rgba(255,130,60,0.65)',
                  }}>{step.n}</span>
                  <div>
                    <strong style={{
                      display: 'block', fontSize: 18, fontWeight: 700,
                      color: '#fff', marginBottom: 3, letterSpacing: '-0.01em',
                      fontFamily: 'var(--f-hebrew)',
                    }}>{step.title}</strong>
                    <span style={{
                      fontSize: 14, color: 'rgba(255,255,255,0.38)',
                      lineHeight: 1.55,
                    }}>{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div style={{
              padding: '20px 32px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--f-latin)', letterSpacing: '0.04em' }}>
                מהרעיון ועד ההשקה
              </span>
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 18px',
                background: 'var(--accent)', color: '#fff',
                borderRadius: 'var(--r-pill)',
                fontSize: 13, fontWeight: 700, textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'opacity .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                מתחילים
                <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dark band: statement ── */}
      <div data-reveal style={{
        background: '#141414',
        padding: '72px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span style={{
            display: 'block', fontFamily: 'var(--f-latin)',
            fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(255,130,60,0.6)', marginBottom: 24,
          }}>✦ DESIGN PHILOSOPHY</span>
          <p style={{
            margin: 0,
            fontFamily: 'var(--f-hebrew)',
            fontSize: 'clamp(22px,2.8vw,36px)',
            fontWeight: 700, lineHeight: 1.5,
            color: '#fff',
            letterSpacing: '-0.01em',
          }}>
            אני לא מעצבת אתרים — אני בונה את הרושם הראשון <span style={{ whiteSpace: 'nowrap' }}>שלך.</span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 400, fontSize: '0.78em' }}>
              כי בעולם שמלא בסתם, טוב לא מספיק.
            </span>
          </p>
        </div>
      </div>

    </section>
  )
}
