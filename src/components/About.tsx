import { useEffect, useRef, useState } from 'react'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400)
          setValue(Math.round((1 - Math.pow(1 - t, 3)) * target))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{value}{suffix}</span>
}

const pillars = [
  { mark: '✦', title: 'דיוק', desc: 'כל פרט חשוב. כל פיקסל במקום. כל מילה בשירות.' },
  { mark: '◈', title: 'מהירות', desc: 'קוד נקי = אתר מהיר = לקוחות שנשארים.' },
  { mark: '◎', title: 'שיתוף פעולה', desc: 'את/ה מכיר/ה את העסק שלך, אני מכיר/ת את הדיגיטל.' },
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
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '80px 20px', maxWidth: 1320, margin: '0 auto' }}>

      <div data-reveal style={{ marginBottom: 32 }}>
        <span className="eyebrow">✦ ABOUT · 01</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 48, alignItems: 'start' }}>

        {/* Text */}
        <div>
          <h2 data-reveal className="h-display" style={{ marginBottom: 32 }}>
            אתר הוא <em>הפנים הדיגיטליות</em> של העסק שלך.
          </h2>

          <p data-reveal style={{ fontSize: 'clamp(18px,1.3vw,21px)', lineHeight: 1.75, color: 'var(--ink-2)', maxWidth: '56ch', marginBottom: 18 }}>
            אתר שעובד נכון לא צריך לצעוק כדי שישימו לב אליו. הוא צריך
            להיות מדויק — כל דבר במקום שלו. כל כפתור במקומו הנכון. כל פיקסל מחושב.
          </p>

          <p data-reveal style={{ fontSize: 'clamp(18px,1.3vw,21px)', lineHeight: 1.75, color: 'var(--mute)', maxWidth: '52ch' }}>
            אני מתמחה בבניית חוויות דיגיטליות שמשלבות עיצוב מדויק עם ביצועים
            אמיתיים — מהאסטרטגיה ועד הפיקסל האחרון. ובניית אתרים שהגולש ירגיש כמו אמנות.
          </p>

          <div data-reveal style={{
            marginTop: 40, display: 'flex', flexDirection: 'column', gap: 18,
            padding: 24, background: 'var(--paper)',
            border: '1px solid var(--line)', borderRadius: 'var(--r-md)',
          }}>
            {pillars.map(p => (
              <div key={p.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', fontSize: 18, marginTop: 4 }}>{p.mark}</span>
                <div>
                  <strong style={{ display: 'block', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{p.title}</strong>
                  <p style={{ margin: 0, fontSize: 17, color: 'var(--mute)', lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a data-reveal href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginTop: 32, color: 'var(--accent)',
            borderBottom: '1px solid var(--accent)',
            paddingBottom: 4, fontWeight: 600, fontSize: 18,
          }}>
            נדבר
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
          </a>
        </div>

        {/* Card — browser mock */}
        <div data-reveal style={{
          position: 'relative', background: 'var(--paper)',
          border: '1px solid var(--line)', borderRadius: 'var(--r-lg)',
          overflow: 'hidden', boxShadow: 'var(--shadow-md)',
        }}>
          {/* Corner accents */}
          {[
            { top: 12, left: 12, borderRight: 0, borderBottom: 0 },
            { top: 12, right: 12, borderLeft: 0, borderBottom: 0 },
            { bottom: 12, left: 12, borderRight: 0, borderTop: 0 },
            { bottom: 12, right: 12, borderLeft: 0, borderTop: 0 },
          ].map((s, i) => (
            <i key={i} aria-hidden style={{ position: 'absolute', width: 18, height: 18, border: '1px solid var(--accent)', zIndex: 2, ...s }} />
          ))}

          {/* Chrome bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '14px 18px', borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
              <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, display: 'block' }} />
            ))}
            <span style={{ fontFamily: 'var(--f-latin)', fontSize: 14, color: 'var(--mute)', margin: '0 auto', letterSpacing: '0.04em' }}>
              avigail.studio/portfolio
            </span>
          </div>

          {/* Body */}
          <div style={{ position: 'relative', padding: '40px 32px', minHeight: 420 }}>
            {/* Watermark */}
            <div aria-hidden style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              fontFamily: 'var(--f-latin)', fontWeight: 800, fontSize: 260,
              color: 'rgba(10,10,10,0.04)', letterSpacing: '-0.06em',
              pointerEvents: 'none', zIndex: 0,
            }}>GS</div>

            {/* Stats */}
            <div style={{
              position: 'relative', zIndex: 1,
              display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10,
              padding: 16, background: 'rgba(255,255,255,0.65)',
              border: '1px solid var(--line)', borderRadius: 'var(--r-md)',
              marginBottom: 20, backdropFilter: 'blur(6px)',
            }}>
              {[
                { label: 'פרויקטים', target: 24, suffix: '+', color: 'var(--accent)' },
                { label: 'שביעות רצון', target: 100, suffix: '%', color: 'var(--ink)' },
                { label: 'שנות ניסיון', target: 5, suffix: '+', color: 'var(--mute)' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--f-latin)', fontSize: 15, letterSpacing: '0.10em', color: 'var(--mute)', textTransform: 'uppercase' }}>{s.label}</span>
                  <span style={{ fontFamily: 'var(--f-latin)', fontSize: 'clamp(28px,5vw,42px)', fontWeight: 700, color: s.color, lineHeight: 1, letterSpacing: '-0.03em' }}>
                    <CountUp target={s.target} suffix={s.suffix} />
                  </span>
                </div>
              ))}
            </div>

            {/* Stack */}
            <div style={{ position: 'relative', zIndex: 1, marginTop: 22 }}>
              <span style={{ display: 'block', fontFamily: 'var(--f-latin)', fontSize: 15, letterSpacing: '0.14em', color: 'var(--mute)', textTransform: 'uppercase', marginBottom: 10 }}>STACK</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['React', 'Next.js', 'Tailwind', 'Framer', 'Figma', 'Webflow'].map(t => (
                  <span key={t} style={{ padding: '7px 16px', border: '1px solid var(--line-2)', borderRadius: 'var(--r-pill)', fontSize: 16, color: 'var(--ink-2)', background: 'rgba(255,255,255,0.5)' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div style={{ position: 'relative', zIndex: 1, marginTop: 22 }}>
              <span style={{ display: 'block', fontFamily: 'var(--f-latin)', fontSize: 15, letterSpacing: '0.14em', color: 'var(--mute)', textTransform: 'uppercase', marginBottom: 10 }}>SERVICES</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--f-latin)', fontSize: 17, color: 'var(--ink-2)' }}>
                {['01 → Web Design', '02 → UI / UX', '03 → Branding', '04 → Development'].map(s => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
