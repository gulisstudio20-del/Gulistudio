import { useEffect, useRef } from 'react'

const voices = [
  {
    big: true,
    quote: 'לא רק שיפרה לי את האתר. היא הבינה את העסק. התקשורת והאמינות מרגישות כמו שלא חשבנו שאפשר להגיע למקום הזה ברגע.',
    em: 'הבינה את העסק.',
    name: 'שירית כ.',
    role: 'בעלים, Pilates Loft',
    initials: 'ש',
    stars: true,
  },
  {
    quote: 'עבדנו עם 3 מעצבות לפני אביגייל. אף אחת לא תפסה את ה-DNA של המותג. כאן, בשבוע אחד, היה ברור, ישר מהתחלה.',
    name: 'נועה ק.',
    role: 'Founder, Skej',
    initials: 'נ',
  },
  {
    quote: 'קיבלתי את האתר על פני 3 חודשים בראשון. לא ידעתי מה לצפות — עד האתר שעלה חי, סוף סוף.',
    name: 'רונן נ.',
    role: 'בעלים, Komorebi Spa',
    initials: 'ר',
  },
  {
    quote: 'הגדרתי תוצאות ולא פרויקט. מה שקיבלתי בתמורה — הכל.',
    name: 'אלון נ.',
    role: 'Origin Café',
    initials: 'א',
  },
]

const stats = [
  { value: '4.9', label: 'דירוג ממוצע' },
  { value: '24+', label: 'פרויקטים' },
  { value: '92%', label: 'חוזרים לפרויקט' },
  { value: '100%', label: 'נמסר בזמן' },
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

  return (
    <section id="voices" ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '120px 36px', maxWidth: 1320, margin: '0 auto' }}>

      <div data-reveal style={{ marginBottom: 32 }}>
        <span className="eyebrow">✦ VOICES · 05</span>
      </div>

      <h2 data-reveal className="h-display" style={{ maxWidth: '16ch', marginBottom: 60 }}>
        מה שלקוחות אומרים אחרי שהאתר עולה לאוויר.
      </h2>

      {/* Grid */}
      <div data-reveal style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: 18 }}>
        {voices.map((v, i) => (
          <figure
            key={i}
            style={{
              margin: 0,
              background: v.big ? 'var(--ink)' : 'var(--paper)',
              color: v.big ? '#fff' : 'var(--ink)',
              border: `1px solid ${v.big ? 'var(--ink)' : 'var(--line)'}`,
              borderRadius: 'var(--r-lg)',
              padding: v.big ? 50 : 36,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', gap: 30,
              gridColumn: v.big ? '1 / 2' : undefined,
              gridRow: v.big ? '1 / 3' : undefined,
              transition: 'transform .25s, box-shadow .25s, border-color .25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = v.big ? 'var(--ink)' : 'var(--line)'; e.currentTarget.style.boxShadow = '' }}
          >
            {v.big && (
              <span style={{ fontFamily: 'var(--f-serif)', fontSize: 140, lineHeight: 0.6, color: 'var(--accent)', fontStyle: 'italic', display: 'block' }}>"</span>
            )}
            <blockquote style={{ margin: 0, fontSize: v.big ? 'clamp(22px,2.1vw,32px)' : 'clamp(15px,1.2vw,18px)', lineHeight: v.big ? 1.35 : 1.6, fontWeight: v.big ? 500 : 400, letterSpacing: v.big ? '-0.01em' : 0 }}>
              {v.quote}
            </blockquote>
            <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
              <span style={{
                display: 'inline-grid', placeItems: 'center',
                width: v.big ? 46 : 38, height: v.big ? 46 : 38,
                borderRadius: '50%', background: 'var(--accent)', color: '#fff',
                fontWeight: 700, fontSize: v.big ? 18 : 15,
              }}>
                {v.initials}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontWeight: 600, fontSize: 14 }}>{v.name}</strong>
                <span style={{ color: v.big ? 'rgba(255,255,255,0.55)' : 'var(--mute)', fontSize: 12 }}>{v.role}</span>
              </div>
              {v.stars && <span style={{ marginInlineStart: 'auto', color: 'var(--accent)', letterSpacing: '0.1em', fontSize: 14 }}>★★★★★</span>}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Stats foot */}
      <div data-reveal style={{
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        gap: 18, marginTop: 60, padding: 36,
        background: 'var(--paper)', border: '1px solid var(--line)',
        borderRadius: 'var(--r-lg)',
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <b style={{ fontFamily: 'var(--f-latin)', fontSize: 42, fontWeight: 700, color: i === 0 ? 'var(--accent)' : 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</b>
            <span style={{ fontSize: 12, color: 'var(--mute)', letterSpacing: '0.04em' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
