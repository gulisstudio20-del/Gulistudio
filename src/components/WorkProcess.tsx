import { useEffect, useRef, useState } from 'react'

const steps = [
  { num: '01', title: 'שיחת אפיון', desc: '30 דקות. לא מכירות. מקשיבה. מספר לי על העסק שלך — ואני אבין מה דרושה ממנה.', time: '~ שעה 01' },
  { num: '02', title: 'תכנון מבנה האתר', desc: 'מפת האתר, ארכיטקטורת המידע ו-wireframes. כל עמוד עובד — קודם בשחור ולבן, כדי שנוודא שזה עובד.', time: '~ שבוע 02' },
  { num: '03', title: 'עיצוב ואישור הלקוח', desc: 'עיצוב מלא ב-Figma. שתי סבבי תיקוניים כלולים בכל פרויקט. מוסיפה סבב — ללא חיוב נוסף.', time: '~ שבועות 03–04' },
  { num: '04', title: 'בניית האתר', desc: 'קוד נקי, מהיר, רספונסיבי. אופטימיזציה, אנימציות, SEO בסיס, ומפתחות שכל ספק אחר יוכל פשוט להתמקד בעבודתו.', time: '~ שבועות 05–06' },
  { num: '05', title: 'העלאה ומסירה', desc: 'בדיקות סופיות, SSL, מניטורינג, SEO בסיס, ומסירה. אני נותנת שירות תחזוקה לאחר — ביחד שלם.', time: '~ שבוע 07' },
]

export default function WorkProcess() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="process" ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '120px 36px', maxWidth: 1320, margin: '0 auto' }}>

      <div data-reveal style={{ marginBottom: 32 }}>
        <span className="eyebrow">✦ PROCESS · 04</span>
      </div>

      <h2 data-reveal className="h-display" style={{ maxWidth: '14ch', marginBottom: 80 }}>
        תהליך שבו <em>אסטרטגיה</em> פוגשת תוצאה.
      </h2>

      <ol style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 30, listStyle: 'none', padding: 0 }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, insetInlineStart: 60, width: 1, background: 'var(--line-2)' }} />

        {steps.map((step, i) => {
          const isActive = active === i
          const delay = 0.1 + i * 0.12
          return (
            <li
              key={step.num}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                position: 'relative', display: 'grid',
                gridTemplateColumns: '180px 1fr', gap: 60,
                alignItems: 'center', padding: '44px 0',
                borderBottom: '1px solid var(--line)',
                cursor: 'default',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
              }}
            >
              {/* Number */}
              <div style={{ position: 'relative' }}>
                <span style={{
                  fontFamily: 'var(--f-latin)', fontWeight: 700,
                  fontSize: 140, lineHeight: 1.1,
                  color: 'transparent',
                  WebkitTextStroke: `1px ${isActive ? 'transparent' : 'var(--line-2)'}`,
                  letterSpacing: '-0.03em',
                  position: 'relative', display: 'inline-block',
                  transition: 'all .35s',
                }}>
                  {step.num}
                  <span style={{
                    position: 'absolute', inset: 0,
                    color: 'var(--accent)', WebkitTextStroke: '0',
                    clipPath: isActive ? 'inset(0)' : 'inset(100% 0 0 0)',
                    transition: 'clip-path .6s cubic-bezier(.2,.8,.2,1)',
                  }}>{step.num}</span>
                </span>
              </div>

              {/* Body */}
              <div style={{ maxWidth: 520 }}>
                {/* Accent line */}
                <span aria-hidden style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 56, height: 1, background: 'var(--accent)',
                  transformOrigin: 'right center',
                  transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                  transition: `transform 0.7s cubic-bezier(.16,1,.3,1) ${delay + 0.15}s`,
                  opacity: 0.7,
                }} />
                <h3 style={{ margin: '0 0 10px', fontSize: 'clamp(22px,2vw,30px)', fontWeight: 700, letterSpacing: '-0.015em' }}>{step.title}</h3>
                <p style={{ margin: '0 0 12px', fontSize: 15, color: 'var(--mute)', lineHeight: 1.7 }}>{step.desc}</p>
                <span style={{ fontFamily: 'var(--f-latin)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>{step.time}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
