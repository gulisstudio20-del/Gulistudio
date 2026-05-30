import { useEffect, useRef, useState } from 'react'

const steps = [
  { num: '01', title: 'שיחת אפיון', desc: 'רק אתם ואני. כל מה שיש לכם להגיד — תזרקו רעיונות. אני כאן בשביל להקשיב.', time: 'כמה זה עולה? מה התהליך?' },
  { num: '02', title: 'תכנון מבנה האתר', desc: 'בואו נקשקש, אבל לא ככה — הרי כבר דיברנו מספיק. התכוונתי במחברת. תנו לי להכין לכם סקיצה יפה למבנה האתר החדש שלכם.', time: 'כמה דפים יהיו? מה יהיה בכל עמוד?' },
  { num: '03', title: 'עיצוב ואישור', desc: 'כן, הנה צבעתי ואפילו העברתי למחשב — מה אתם אומרים? מתחיל להיראות כמו אתר, לא?', time: 'אפשר לשנות צבעים? כמה סבבי תיקונים יש?' },
  { num: '04', title: 'בניית האתר', desc: 'הופה — איך הציור הפך לקוד מסובך במחשב? אל תדאגו, נחזיר אותו חזרה להיות יפיפה על המסך שלכם.', time: 'יהיה מותאם למובייל? מה עם גוגל?' },
  { num: '05', title: 'העלאה ומסירה', desc: 'בדיקות סופיות, חיבור למערכות סליקה, טפסים ורספונסיביות מובייל. ואל תדאגו — לא אשאיר אתכם ככה לבד. אסביר לכם כל מה שאתם צריכים לדעת על האתר החדש שלכם.', time: 'מה קורה אחרי? יש תמיכה?' },
]

export default function WorkProcess() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollActive, setScrollActive] = useState<number | null>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
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

  // Mobile only: scroll-based number coloring — triggers when li enters center of screen
  useEffect(() => {
    if (!isMobile) return
    const observers: IntersectionObserver[] = []
    numRefs.current.forEach((el, i) => {
      if (!el) return
      // observe the parent li, not just the number span, for a more stable trigger
      const li = el.closest('li')
      if (!li) return
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setScrollActive(i)
      }, { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' })
      obs.observe(li)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [isMobile])

  const isActive = (i: number) => isMobile ? scrollActive === i : active === i

  return (
    <section id="process" ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '120px 36px', maxWidth: 1320, margin: '0 auto' }}>

      <div data-reveal style={{ marginBottom: 32 }}>
        <span className="eyebrow">✦ תהליך · 04</span>
      </div>

      <h2 data-reveal className="h-display" style={{ maxWidth: '14ch', marginBottom: 80 }}>
        תהליך שבו <em>אסטרטגיה</em> פוגשת תוצאה.
      </h2>

      <ol style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 0, listStyle: 'none', padding: 0, margin: 0 }}>
        {/* Vertical line — desktop only */}
        {!isMobile && (
          <div style={{ position: 'absolute', top: 0, bottom: 0, insetInlineStart: 60, width: 1, background: 'var(--line-2)' }} />
        )}

        {steps.map((step, i) => {
          const active_i = isActive(i)
          const delay = 0.1 + i * 0.12
          return (
            <li
              key={step.num}
              onMouseEnter={() => !isMobile && setActive(i)}
              onMouseLeave={() => !isMobile && setActive(null)}
              style={{
                position: 'relative',
                display: isMobile ? 'flex' : 'grid',
                gridTemplateColumns: isMobile ? undefined : '180px 1fr',
                flexDirection: isMobile ? 'row' : undefined,
                gap: isMobile ? 16 : 60,
                alignItems: isMobile ? 'flex-start' : 'center',
                padding: isMobile ? '24px 0' : '44px 0',
                borderBottom: '1px solid var(--line)',
                cursor: 'default',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
              }}
            >
              {/* Number */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <span
                  ref={el => { numRefs.current[i] = el }}
                  style={{
                    fontFamily: 'var(--f-latin)', fontWeight: 700,
                    fontSize: isMobile ? 'clamp(52px,12vw,80px)' : 140,
                    lineHeight: 1.1,
                    color: 'transparent',
                    WebkitTextStroke: `1px ${active_i ? 'transparent' : 'var(--line-2)'}`,
                    letterSpacing: '-0.03em',
                    position: 'relative', display: 'inline-block',
                    transition: 'all .35s',
                  }}
                >
                  {step.num}
                  <span style={{
                    position: 'absolute', inset: 0,
                    color: 'var(--accent)', WebkitTextStroke: '0',
                    clipPath: active_i ? 'inset(0)' : 'inset(100% 0 0 0)',
                    transition: 'clip-path .6s cubic-bezier(.2,.8,.2,1)',
                  }}>{step.num}</span>
                </span>
              </div>

              {/* Body */}
              <div style={{ maxWidth: isMobile ? undefined : 520, flex: isMobile ? 1 : undefined, paddingTop: isMobile ? 12 : 0 }}>
                {!isMobile && (
                  <span aria-hidden style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 56, height: 1, background: 'var(--accent)',
                    transformOrigin: 'right center',
                    transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                    transition: `transform 0.7s cubic-bezier(.16,1,.3,1) ${delay + 0.15}s`,
                    opacity: 0.7,
                  }} />
                )}
                <h3 style={{ margin: '0 0 12px', fontSize: isMobile ? 'clamp(20px,4.5vw,26px)' : 'clamp(24px,2vw,32px)', fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.2 }}>{step.title}</h3>
                <p style={{ margin: '0 0 14px', fontSize: isMobile ? 17 : 19, color: 'var(--mute)', lineHeight: 1.75 }}>{step.desc}</p>
                <span style={{ fontFamily: 'var(--f-latin)', fontSize: 16, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>{step.time}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
