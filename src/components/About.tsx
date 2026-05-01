import { useEffect, useRef } from 'react'
import './About.css'

const stats = [
  { num: '5', label: 'פרויקטים' },
  { num: '100%', label: 'מותאם אישית' },
  { num: '✦', label: 'Web Architecture' },
]

const values = [
  { icon: '✦', title: 'דיוק', desc: 'כל פרט חשוב. כל פיקסל במקום.' },
  { icon: '◈', title: 'מהירות', desc: 'קוד נקי = אתר מהיר = לקוחות שנשארים.' },
  { icon: '◎', title: 'שיתוף פעולה', desc: 'את/ה מכיר/ה את העסק שלך, אני מכיר/ה את הדיגיטל.' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
              }, i * 120)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-10 max-w-[1400px] mx-auto">

      <div className="grid md:grid-cols-2 gap-16 items-start">

        {/* Left — visual panel */}
        <div
          data-reveal
          className="transition-all duration-700"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          {/* Main card */}
          <div
            className="relative w-full"
            style={{
              aspectRatio: '3/3.6',
              background: 'linear-gradient(145deg, #f7f7f7 0%, #efefef 100%)',
              borderRadius: 28,
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.85)',
            }}
          >
            {/* Corner accents */}
            <div style={{ position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderTop: '2px solid var(--orange)', borderRight: '2px solid var(--orange)', opacity: 0.5, borderRadius: '0 8px 0 0' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, width: 36, height: 36, borderBottom: '2px solid var(--orange)', borderLeft: '2px solid var(--orange)', opacity: 0.5, borderRadius: '0 0 8px 0' }} />

            {/* Decorative grid pattern */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(255,92,26,0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,92,26,0.06) 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
                maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 10%, transparent 90%)',
                pointerEvents: 'none',
              }}
            />
            {/* Large decorative GS */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -52%)',
                fontWeight: 900,
                fontSize: 'clamp(7rem, 14vw, 12rem)',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.06em',
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(0,0,0,0.1)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              GS
            </div>

            {/* Values overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(255,255,255,0.96) 60%, transparent)',
                padding: '32px 28px 28px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {values.map(v => (
                  <div key={v.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: 'var(--orange)', fontSize: '0.75rem', marginTop: 3, flexShrink: 0 }}>{v.icon}</span>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text)', marginRight: 6 }}>{v.title}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-lt)' }}>{v.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — text + stats */}
        <div
          style={{ direction: 'rtl', textAlign: 'right' }}
          className="flex flex-col"
        >
          <p
            data-reveal
            className="text-xs tracking-[5px] uppercase mb-5 transition-all duration-700"
            style={{ color: 'var(--orange)', opacity: 0, transform: 'translateY(24px)', fontWeight: 700 }}
          >
            About
          </p>

          <h2
            data-reveal
            className="font-heading font-bold uppercase leading-tight mb-6 transition-all duration-700"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', color: 'var(--text)', opacity: 0, transform: 'translateY(24px)' }}
          >
            אתר אינטרנט הוא
            <br />
            <span style={{ color: 'var(--orange)' }}>המבנה הדיגיטלי</span>
            <br />
            של העסק שלך
          </h2>

          <p
            data-reveal
            className="text-base leading-relaxed mb-4 transition-all duration-700"
            style={{ color: 'var(--text-mid)', opacity: 0, transform: 'translateY(24px)', maxWidth: '42ch' }}
          >
            אתר שעובד נכון לא צריך לצעוק כדי שישימו לב אליו.
            הוא צריך להיות מדויק — כל דבר במקום שלו.
          </p>
          <p
            data-reveal
            className="text-base leading-relaxed mb-10 transition-all duration-700"
            style={{ color: 'var(--text-lt)', opacity: 0, transform: 'translateY(24px)', fontSize: '0.9rem', maxWidth: '40ch' }}
          >
            אני מתמחה בבניית חוויות דיגיטליות שמשלבות עיצוב
            מדויק עם ביצועים אמיתיים — מהאסטרטגיה ועד הפיקסל האחרון.
          </p>

          {/* Stats row */}
          <div
            data-reveal
            className="grid grid-cols-3 transition-all duration-700"
            style={{
              opacity: 0,
              transform: 'translateY(24px)',
              gap: '1px',
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {stats.map(s => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center text-center"
                style={{ background: 'var(--bg)', padding: '24px 12px' }}
              >
                <span
                  style={{
                    fontWeight: 900,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: 'var(--orange)',
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-lt)',
                    marginTop: 6,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            data-reveal
            className="mt-8 transition-all duration-700"
            style={{ opacity: 0, transform: 'translateY(24px)' }}
          >
            <a
              href="#contact"
              className="font-heading font-semibold text-sm tracking-[0.18em] uppercase inline-flex items-center gap-2"
              style={{
                color: 'var(--orange)',
                borderBottom: '1px solid rgba(255,92,26,0.3)',
                paddingBottom: 4,
                transition: 'border-color 0.25s, gap 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--orange)'
                e.currentTarget.style.gap = '10px'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,92,26,0.3)'
                e.currentTarget.style.gap = '8px'
              }}
            >
              נדבר
              <span>↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
