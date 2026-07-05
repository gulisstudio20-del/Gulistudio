import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    id: 'p5', num: '05', year: '2026',
    title: 'Kaizen',
    tagLabel: 'Web Design · Restaurant',
    url: 'https://kaizen-zeta-woad.vercel.app',
    img: '/images/portfolio-5.png',
    desc: 'אתר למסעדת שף אסייאתית. אווירה מינימליסטית ויוקרתית שמספרת את הסיפור לפני הארוחה.',
    tags: ['web'],
    accent: '#C8924A',
  },
  {
    id: 'p1', num: '01', year: '2026',
    title: 'Origin',
    tagLabel: 'Web Design · Branding',
    url: 'https://origin-fvun.vercel.app/',
    img: '/images/portfolio-1.png',
    desc: 'אתר תדמית לבית קפה שכונתי בתל אביב. חמימות, אותנטיות, ותחושת מקום אמיתי.',
    tags: ['web', 'brand'],
    accent: '#C8924A',
  },
  {
    id: 'p2', num: '02', year: '2025',
    title: 'Komorebi',
    tagLabel: 'Web Design · Landing',
    url: 'https://komorebi-liard.vercel.app/',
    img: '/images/portfolio-2.png',
    desc: 'אתר לקורס יפנית אונליין. עיצוב שמשדר רוגע, מיקוד ואהבה לשפה.',
    tags: ['web'],
    accent: '#8A9E7F',
  },
  {
    id: 'p3', num: '03', year: '2025',
    title: 'Skej',
    tagLabel: 'Branding · E-commerce',
    url: 'https://skej-one.vercel.app',
    img: '/images/portfolio-3.png',
    desc: 'אתר למותג בגדים — זהות ויזואלית חדה ו-UX נקי שמוכר.',
    tags: ['brand', 'ecom'],
    accent: '#FF3A00',
  },
  {
    id: 'p4', num: '04', year: '2025',
    title: 'Japanis',
    tagLabel: 'UI / UX · Web Design',
    url: 'https://japanis.vercel.app/',
    img: '/images/portfolio-4.png',
    desc: 'אתר לטיולים מאורגנים לישראלים ביפן. חוויה ויזואלית שמתחילה לפני היציאה מהבית.',
    tags: ['web'],
    accent: '#E05A5A',
  },
]

const filters = [
  { label: 'הכל', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Branding', value: 'brand' },
  { label: 'E-commerce', value: 'ecom' },
]

export default function Portfolio() {
  const headerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState('all')
  const [hovered, setHovered] = useState<string | null>(null)

  const visible = projects.filter(p => filter === 'all' || p.tags.includes(filter))

  useEffect(() => {
    const els = [headerRef.current, ctaRef.current].filter(Boolean) as HTMLElement[]
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const articles = gridRef.current?.querySelectorAll<HTMLElement>('article')
    if (!articles) return
    articles.forEach(a => { a.style.opacity = '0' })
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const art = entry.target as HTMLElement
        const i = [...articles].indexOf(art)
        setTimeout(() => { art.style.opacity = '1' }, i * 90)
        obs.unobserve(entry.target)
      })
    }, { threshold: 0.06 })
    articles.forEach(a => obs.observe(a))
    return () => obs.disconnect()
  }, [filter])

  return (
    <section id="work" style={{ position: 'relative', zIndex: 1, padding: '100px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>

      {/* ── Header ── */}
      <div ref={headerRef} data-reveal style={{ marginBottom: 52 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <h2 className="h-display" style={{ margin: 0 }}>תיק עבודות</h2>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 4 }}>
            {filters.map(f => {
              const count = f.value === 'all' ? projects.length : projects.filter(p => p.tags.includes(f.value)).length
              const active = filter === f.value
              return (
                <button key={f.value} onClick={() => setFilter(f.value)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '9px 18px', fontSize: 15, fontWeight: 500,
                  color: active ? '#fff' : 'var(--mute)',
                  background: active ? 'var(--ink)' : 'transparent',
                  border: `1px solid ${active ? 'var(--ink)' : 'var(--line-2)'}`,
                  borderRadius: 'var(--r-pill)', transition: 'all .2s', cursor: 'pointer',
                }}>
                  {f.label}
                  <em style={{ fontStyle: 'normal', fontFamily: 'var(--f-latin)', fontSize: 13, opacity: 0.5 }}>{count}</em>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div ref={gridRef} className="portfolio-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {visible.map((p, i) => {
          const isFeatured = i === 0 && filter === 'all'
          const isHov = hovered === p.id

          return (
            <article
              key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                gridColumn: isFeatured ? '1 / -1' : undefined,
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid var(--line)',
                background: 'var(--paper)',
                boxShadow: isHov ? '0 20px 56px rgba(28,25,20,0.18)' : '0 4px 20px rgba(28,25,20,0.08)',
                transform: isHov ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'opacity 0.6s ease, transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s',
              }}
            >
              {/* Image */}
              <a href={p.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', position: 'relative', overflow: 'hidden' }}>
                <div className="portfolio-card-img" style={{ height: isFeatured ? 460 : 280, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={p.img}
                    alt={`${p.title} screenshot`}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'top center', display: 'block',
                      transform: isHov ? 'scale(1.04)' : 'scale(1)',
                      transition: 'transform 0.6s cubic-bezier(.2,.8,.2,1)',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.38)',
                    opacity: isHov ? 1 : 0, transition: 'opacity 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    color: '#fff', fontSize: 16, fontWeight: 700,
                  }}>
                    <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6M10 14L21 3"/></svg>
                    כניסה לאתר
                  </div>
                </div>
              </a>

              {/* Info */}
              <div style={{ padding: '18px 22px 22px' }}>
                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--f-latin)', fontWeight: 900, fontSize: 12, letterSpacing: '0.1em', color: p.accent }}>{p.num}</span>
                  <span style={{ width: 1, height: 10, background: 'var(--line-2)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--f-latin)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--mute)' }}>{p.year}</span>
                  <span style={{ flex: 1 }} />
                  <span style={{
                    fontSize: 12, fontFamily: 'var(--f-latin)', letterSpacing: '0.04em',
                    color: 'var(--mute)',
                    padding: '3px 11px',
                    background: 'rgba(28,25,20,0.04)',
                    border: '1px solid var(--line-2)',
                    borderRadius: 'var(--r-pill)', whiteSpace: 'nowrap',
                  }}>{p.tagLabel}</span>
                </div>

                <h3 style={{
                  margin: '0 0 8px',
                  fontFamily: 'var(--f-hebrew)', fontWeight: 800,
                  fontSize: isFeatured ? 'clamp(24px,2.8vw,34px)' : 'clamp(20px,2vw,26px)',
                  letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--ink)',
                }}>
                  {p.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, flex: 1, minWidth: 0, color: 'var(--mute)' }}>
                    {p.desc}
                  </p>
                  <a
                    href={p.url} target="_blank" rel="noopener noreferrer"
                    style={{
                      flexShrink: 0,
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '10px 18px',
                      background: p.accent, color: '#fff',
                      borderRadius: 'var(--r-pill)',
                      fontSize: 14, fontWeight: 700,
                      whiteSpace: 'nowrap', textDecoration: 'none',
                      transition: 'opacity .2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.82' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                  >
                    לאתר
                    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* ── CTA ── */}
      <div ref={ctaRef} data-reveal style={{
        marginTop: 60, paddingTop: 52,
        borderTop: '1px solid var(--line)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>רוצה שהפרויקט הבא יהיה האתר שלך?</p>
        <a href="#contact" className="btn btn--primary" style={{ fontSize: 16, padding: '15px 30px' }}>
          <span>בואו נדבר</span>
          <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
        </a>
      </div>

    </section>
  )
}
