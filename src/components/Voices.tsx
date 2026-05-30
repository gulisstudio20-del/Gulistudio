import { useEffect, useRef } from 'react'

const voices = [
  {
    big: true,
    quote: 'הגענו לאביגיל עם קונספט אמנותי ומורכב — מסעדת אומקאסה תת-קרקעית ביפנית מלאה. מה שקיבלנו בסוף עלה על כל ציפייה. האתר מרגיש כמו חלק מהחוויה עצמה.',
    name: 'יאיר מ.',
    role: 'בעלים, Kaizen Restaurant',
    initials: 'י',
    stars: true,
  },
  {
    quote: 'עבדנו עם שלוש מעצבות לפני אביגיל, אף אחת לא הבינה לעומק את הדנא של המותג שלנו, ברגע שהתחלנו לעבוד איתה ישר הבנו שזה זה.',
    name: 'נועה ק.',
    role: 'Founder, Skej',
    initials: 'נ',
  },
  {
    quote: 'קיבלתי את האתר הראשון שלי לעסק, להגיד את האמת לא ציפיתי למשהו ברמה הזאת.',
    name: 'רונן נ.',
    role: 'בעלים, Komorebi',
    initials: 'ר',
  },
  {
    quote: 'רצינו אתר לעסק המשפחתי, לאחר עבודה עם אביגיל קיבלנו תוצאות ששוות הכל.',
    name: 'אלון נ.',
    role: 'Origin Café',
    initials: 'א',
  },
]

export default function Voices() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  function handle3D(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.02)`
  }

  function reset3D(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget.style.transform = ''
  }

  return (
    <section id="voices" ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '80px 20px', maxWidth: 1320, margin: '0 auto' }}>

      <div data-reveal style={{ marginBottom: 24 }}>
        <span className="eyebrow">✦ VOICES · 05</span>
      </div>

      <h2 data-reveal className="h-display" style={{ maxWidth: '20ch', marginBottom: 40 }}>
        מה שלקוחות אומרים אחרי שהאתר עולה לאוויר.
      </h2>

      <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {voices.map((v, i) => (
          <figure
            key={i}
            onMouseMove={handle3D}
            onMouseLeave={reset3D}
            style={{
              margin: 0,
              background: '#141414',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--r-lg)',
              padding: v.big ? 28 : 24,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', gap: 20,
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              cursor: 'default',
              willChange: 'transform',
            }}
          >
            {v.big && (
              <span style={{ fontFamily: 'var(--f-serif)', fontSize: 80, lineHeight: 0.6, color: 'var(--accent)', fontStyle: 'italic', display: 'block' }}>"</span>
            )}
            <blockquote style={{ margin: 0, fontSize: v.big ? 'clamp(20px,4vw,28px)' : 'clamp(17px,3vw,20px)', lineHeight: 1.6, fontWeight: v.big ? 500 : 400, letterSpacing: v.big ? '-0.01em' : 0, color: '#fff' }}>
              {v.quote}
            </blockquote>
            <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15 }}>
              <span style={{
                display: 'inline-grid', placeItems: 'center',
                width: 42, height: 42,
                borderRadius: '50%', background: 'var(--accent)', color: '#fff',
                fontWeight: 700, fontSize: 17, flexShrink: 0,
              }}>
                {v.initials}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontWeight: 600, fontSize: 18, color: '#fff' }}>{v.name}</strong>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>{v.role}</span>
              </div>
              {v.stars && <span style={{ marginInlineStart: 'auto', color: 'var(--accent)', fontSize: 15 }}>★★★★★</span>}
            </figcaption>
          </figure>
        ))}
      </div>

    </section>
  )
}
