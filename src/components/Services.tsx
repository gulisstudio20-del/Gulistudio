import { useEffect, useRef, useState } from 'react'

const services = [
  {
    num: '01',
    title: 'בניית אתרים',
    titleEn: 'Web Design',
    desc: 'אתר שנבנה במיוחד עבורך — מהקונספט ועד הפיקסל האחרון. מהיר, נגיש, ומותאם לכל מסך.',
    tags: ['React', 'Next.js', 'Responsive'],
  },
  {
    num: '02',
    title: 'פיתוח',
    titleEn: 'Development',
    desc: 'קוד נקי, מהיר, ומדויק. React, Next.js ו-TypeScript — ביצועים שלא מתפשרים.',
    tags: ['TypeScript', 'Performance', 'Clean Code'],
  },
  {
    num: '03',
    title: 'מיתוג',
    titleEn: 'Branding',
    desc: 'זהות ויזואלית שמספרת סיפור לפני שנאמרת מילה. לוגו, צבעים, וטיפוגרפיה.',
    tags: ['Logo', 'Visual Identity', 'Typography'],
  },
  {
    num: '04',
    title: 'ממשק וחוויה',
    titleEn: 'UI / UX',
    desc: 'חוויית משתמש שגורמת לאנשים להישאר. פשוט, אינטואיטיבי, ויפה מרגע ראשון.',
    tags: ['User Flow', 'Wireframes', 'Prototyping'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
              setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, i * 80)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 md:px-10 max-w-[1400px] mx-auto">

      {/* Header */}
      <div
        className="flex items-end justify-between pb-10 mb-2 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div>
          <p
            data-reveal
            className="text-xs tracking-[5px] uppercase mb-3 transition-all duration-700"
            style={{ color: 'var(--orange)', opacity: 0, transform: 'translateY(20px)', fontWeight: 700 }}
          >
            What I Do
          </p>
          <h2
            data-reveal
            className="font-heading font-bold uppercase leading-none transition-all duration-700"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: 'var(--text)', opacity: 0, transform: 'translateY(20px)' }}
          >
            שירותים
          </h2>
        </div>
        <p
          data-reveal
          className="hidden md:block text-sm transition-all duration-700"
          style={{ color: 'var(--text-lt)', opacity: 0, transform: 'translateY(20px)' }}
        >
          כל מה שצריך — תחת קורת גג אחת
        </p>
      </div>

      {/* Service rows */}
      <div className="flex flex-col">
        {services.map((s, i) => {
          const isHovered = hoveredIdx === i
          return (
            <div
              key={i}
              data-reveal
              className="transition-all duration-700 cursor-default"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className="grid items-start gap-6 py-8 border-b"
                style={{
                  gridTemplateColumns: '70px 1fr auto',
                  borderColor: 'var(--border)',
                  background: isHovered ? 'rgba(255,92,26,0.025)' : 'transparent',
                  borderRadius: isHovered ? 12 : 0,
                  transition: 'background 0.3s ease',
                  padding: isHovered ? '28px 16px' : '28px 0',
                  margin: isHovered ? '0 -16px' : '0',
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: '0.7rem',
                    color: isHovered ? 'var(--orange)' : 'rgba(0,0,0,0.2)',
                    letterSpacing: '0.05em',
                    paddingTop: 5,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {s.num}
                </span>

                {/* Content */}
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3
                      className="font-heading font-semibold transition-all duration-300"
                      style={{
                        fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)',
                        color: 'var(--text)',
                        transform: isHovered ? 'translateX(-4px)' : 'translateX(0)',
                      }}
                    >
                      {s.title}
                    </h3>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-lt)',
                        letterSpacing: '0.05em',
                        fontWeight: 500,
                        opacity: isHovered ? 1 : 0.5,
                        transition: 'opacity 0.3s',
                      }}
                    >
                      {s.titleEn}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-mid)',
                      lineHeight: 1.65,
                      maxWidth: 480,
                      maxHeight: isHovered ? 80 : 0,
                      overflow: 'hidden',
                      opacity: isHovered ? 1 : 0,
                      transition: 'max-height 0.4s ease, opacity 0.35s ease',
                    }}
                  >
                    {s.desc}
                  </p>
                  {/* Tags */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 6,
                      marginTop: isHovered ? 10 : 0,
                      maxHeight: isHovered ? 40 : 0,
                      overflow: 'hidden',
                      opacity: isHovered ? 1 : 0,
                      transition: 'max-height 0.4s ease 0.05s, opacity 0.35s ease 0.05s, margin 0.3s ease',
                      flexWrap: 'wrap',
                    }}
                  >
                    {s.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--orange)',
                          background: 'rgba(255,92,26,0.08)',
                          padding: '4px 10px',
                          borderRadius: 999,
                          border: '1px solid rgba(255,92,26,0.15)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <span
                  style={{
                    color: 'var(--orange)',
                    fontSize: '1.1rem',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translate(0, 0)' : 'translate(-4px, 4px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    paddingTop: 4,
                  }}
                >
                  ↗
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
