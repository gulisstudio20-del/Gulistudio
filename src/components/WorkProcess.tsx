import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    number: '01',
    title: 'שיחת אפיון',
    description: 'מתחילים בשיחה פתוחה — מבינים את החזון שלך, קהל היעד, המטרות העסקיות, והתחושה שאתה רוצה שהאתר יעביר.',
  },
  {
    number: '02',
    title: 'תכנון מבנה האתר',
    description: 'בונים את השלד — מפת הניווט, היררכיית התוכן, וזרימת המשתמש. כל החלטה מונעת ממטרה אחת: שהגולש ירגיש בדיוק איפה שצריך.',
  },
  {
    number: '03',
    title: 'עיצוב ואישור הלקוח',
    description: 'מעצבים ממשק מלא — צבעים, טיפוגרפיה, לייאאוט. לא ממשיכים שלב אחד קדימה לפני שאתה מרוצה ב-100%.',
  },
  {
    number: '04',
    title: 'בניית האתר',
    description: 'מפה הופכים פיקסלים לקוד — אתר מהיר, נגיש, ומותאם לכל מסך. כל שורת קוד נכתבת בקפידה עם תשומת לב לפרטים.',
  },
  {
    number: '05',
    title: 'העלאה לאוויר',
    description: 'עוברים בדיקות אחרונות, מוודאים שהכל עובד כשורה — ומשיקים. האתר שלך חי ומוכן לעולם.',
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function WorkProcess() {
  const { ref: sectionRef, inView: sectionVisible } = useInView(0.1)
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ background: 'var(--bg)', padding: '140px 0' }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div
          style={{
            marginBottom: 100,
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: 20,
            fontWeight: 500,
          }}>
            תהליך העבודה
          </p>
          <h2 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            color: 'var(--text)',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.03em',
            maxWidth: 560,
          }}>
            המקום שבו{' '}
            <em style={{
              fontStyle: 'italic',
              color: 'var(--orange)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
            }}>
              אסטרטגיה
            </em>{' '}
            פוגשת תוצאה
          </h2>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {steps.map((step, i) => {
            const delay = 0.1 + i * 0.12
            const isActive = activeStep === i
            const isLast = i === steps.length - 1

            return (
              <div
                key={step.number}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1px 1fr',
                  gap: '0 40px',
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Number column */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  paddingTop: 8,
                  paddingBottom: isLast ? 0 : 56,
                }}>
                  <span className="process-num" style={{
                    fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                    fontWeight: 900,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    color: isActive ? 'var(--orange)' : 'rgba(0,0,0,0.07)',
                    userSelect: 'none',
                  }}>
                    {step.number}
                  </span>
                </div>

                {/* Divider line column */}
                <div style={{ position: 'relative' }}>
                  {/* Dot */}
                  <div
                    className={isActive ? 'dot-pulse' : ''}
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActive ? 10 : 7,
                      height: isActive ? 10 : 7,
                      borderRadius: '50%',
                      background: isActive ? 'var(--orange)' : 'rgba(0,0,0,0.2)',
                      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                      zIndex: 2,
                    }}
                  />
                  {/* Line */}
                  {!isLast && (
                    <div style={{
                      position: 'absolute',
                      top: 24,
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 1,
                      background: 'rgba(0,0,0,0.08)',
                    }} />
                  )}
                </div>

                {/* Content column */}
                <div style={{
                  paddingTop: 6,
                  paddingBottom: isLast ? 0 : 56,
                  borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.05)',
                  position: 'relative',
                }}>
                  {/* Horizontal accent line — draws in from right to left when section enters */}
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 56,
                      height: 1,
                      background: 'var(--orange)',
                      transformOrigin: 'right center',
                      transform: sectionVisible ? 'scaleX(1)' : 'scaleX(0)',
                      transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay + 0.15}s`,
                      opacity: 0.7,
                    }}
                  />
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '-0.025em',
                    color: 'var(--text)',
                    marginBottom: 10,
                    transition: 'color 0.3s ease',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-mid)',
                    lineHeight: 1.7,
                    maxWidth: 480,
                    maxHeight: isActive ? 100 : 0,
                    overflow: 'hidden',
                    opacity: isActive ? 1 : 0,
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
