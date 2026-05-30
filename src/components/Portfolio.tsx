import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    id: 'p1', num: '01', year: '2026',
    title: 'Origin Café',
    tagLabel: 'Web Design · Branding',
    url: 'https://origin-fvun.vercel.app/',
    img: '/images/portfolio-1.png',
    desc: 'אתר תדמית לבית קפה שמרגישים בו עוד לפני שהקפה מגיע.',
    tags: ['web', 'brand'],
    accent: '#C8924A',
    bg: 'linear-gradient(160deg,#F9EFE0,#F0E0C4)',
  },
  {
    id: 'p2', num: '02', year: '2025',
    title: 'Komorebi Spa',
    tagLabel: 'Web Design · Landing',
    url: 'https://komorebi-liard.vercel.app/',
    img: '/images/portfolio-2.png',
    desc: 'Landing page לספא יפני. שקט ויזואלי ואווירה שמשדרת קצב מכוון.',
    tags: ['web'],
    accent: '#6B5A47',
    bg: 'linear-gradient(160deg,#EFE6D4,#D9C9AC)',
  },
  {
    id: 'p3', num: '03', year: '2025',
    title: 'Skej Boards',
    tagLabel: 'Branding · E-commerce',
    url: 'https://skej-one.vercel.app',
    img: '/images/portfolio-3.png',
    desc: 'חנות אונליין לסקייטבורדים — עיצוב עירוני ו-UX נקי.',
    tags: ['brand', 'ecom'],
    accent: '#FF3A00',
    bg: 'linear-gradient(160deg,#F5F4ED,#E4E2D8)',
  },
  {
    id: 'p4', num: '04', year: '2025',
    title: 'Japanis Sushi',
    tagLabel: 'UI / UX · Web Design',
    url: 'https://japanis.vercel.app/',
    img: '/images/portfolio-4.png',
    desc: 'אתר למסעדת סושי. סימפל, נקי, Mobile-first.',
    tags: ['web'],
    accent: '#E63946',
    bg: 'linear-gradient(160deg,#FFF5F5,#FFE0E2)',
  },
  {
    id: 'p5', num: '05', year: '2026',
    title: 'Kaizen',
    tagLabel: 'Web Design · Restaurant',
    url: 'https://kaizen-zeta-woad.vercel.app',
    img: '/images/portfolio-5.png',
    desc: 'Landing page למסעדת אומקאסה יפנית. אפלולי, מדויק, ומרגיש יוקרה עוד לפני שמגיעים.',
    tags: ['web'],
    accent: '#C8924A',
    bg: 'linear-gradient(160deg,#2A2222,#1A1818)',
    dark: true,
  },
]

const filters = [
  { label: 'הכל', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Branding', value: 'brand' },
  { label: 'E-commerce', value: 'ecom' },
]

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState('all')
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState<string | null>(null)
  const [imgLoaded, setImgLoaded] = useState<Record<string, boolean>>({})

  const visible = projects.filter(p => filter === 'all' || p.tags.includes(filter))

  useEffect(() => { setIndex(0) }, [filter])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[0] as HTMLElement
    if (!card) return
    track.style.transform = `translateX(${index * (card.offsetWidth + 24)}px)`
  }, [index, filter])

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const goTo = (i: number) => setIndex(Math.max(0, Math.min(visible.length - 1, i)))

  return (
    <section id="work" ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div data-reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
        <div>
          <span className="eyebrow" style={{ marginBottom: 12, display: 'block' }}>✦ SELECTED WORK · 2024–2026</span>
          <h2 className="h-display" style={{ margin: 0 }}>תיק עבודות</h2>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {filters.map(f => {
            const count = f.value === 'all' ? projects.length : projects.filter(p => p.tags.includes(f.value)).length
            const active = filter === f.value
            return (
              <button key={f.value} onClick={() => setFilter(f.value)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 20px', fontSize: 17, fontWeight: 500,
                color: active ? '#fff' : 'var(--mute)',
                background: active ? 'var(--ink)' : 'transparent',
                border: `1px solid ${active ? 'var(--ink)' : 'var(--line-2)'}`,
                borderRadius: 'var(--r-pill)', transition: 'all .2s', cursor: 'pointer',
              }}>
                {f.label}
                <em style={{ fontStyle: 'normal', fontFamily: 'var(--f-latin)', fontSize: 14, opacity: 0.6 }}>{count}</em>
              </button>
            )
          })}
        </div>
      </div>

      {/* Carousel */}
      <div style={{ overflow: 'hidden', borderRadius: 20 }}>
        <div
          ref={trackRef}
          style={{ display: 'flex', gap: 24, transition: 'transform .75s cubic-bezier(.7,0,.2,1)', willChange: 'transform' }}
        >
          {visible.map((p, i) => {
            const isActive = i === index
            return (
              <article
                key={p.id}
                style={{
                  flex: '0 0 100%',
                  borderRadius: 20,
                  background: p.bg,
                  border: '1px solid var(--line)',
                  overflow: 'hidden',
                  opacity: isActive ? 1 : 0.18,
                  filter: isActive ? 'none' : 'blur(3px) saturate(0.4)',
                  transform: isActive ? 'scale(1)' : 'scale(0.96)',
                  transition: 'opacity .6s, filter .6s, transform .75s cubic-bezier(.7,0,.2,1)',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {/* Screenshot — full width, browser frame */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ display: 'block', position: 'relative', background: 'rgba(0,0,0,0.04)' }}
                >
                  {/* Browser chrome */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '11px 18px',
                    background: p.dark ? 'rgba(30,24,24,0.92)' : 'rgba(255,255,255,0.88)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: `1px solid ${p.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
                  }}>
                    {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                      <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, flexShrink: 0 }} />
                    ))}
                    <span style={{
                      flex: 1, textAlign: 'center',
                      background: p.dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)', borderRadius: 6,
                      padding: '5px 14px', fontSize: 15,
                      fontFamily: 'var(--f-latin)', color: p.dark ? 'rgba(255,235,210,0.5)' : 'var(--mute)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {p.url.replace('https://', '').replace(/\/$/, '')}
                    </span>
                    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth={2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6M10 14L21 3"/></svg>
                  </div>

                  {/* Image */}
                  <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
                    {!imgLoaded[p.id] && (
                      <div style={{ position: 'absolute', inset: 0, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'var(--f-latin)', fontSize: 64, fontWeight: 900, color: 'rgba(0,0,0,0.05)' }}>GS</span>
                      </div>
                    )}
                    <img
                      src={p.img}
                      alt={`${p.title} screenshot`}
                      onLoad={() => setImgLoaded(prev => ({ ...prev, [p.id]: true }))}
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'top center',
                        display: 'block',
                        transform: hovered === p.id ? 'scale(1.02)' : 'scale(1)',
                        transition: 'transform 0.5s cubic-bezier(.2,.8,.2,1), opacity 0.35s',
                        opacity: imgLoaded[p.id] ? 1 : 0,
                      }}
                    />
                    {/* Hover overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(0,0,0,0.22)',
                      opacity: hovered === p.id ? 1 : 0,
                      transition: 'opacity 0.3s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      color: '#fff', fontSize: 17, fontWeight: 700,
                    }}>
                      <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6M10 14L21 3"/></svg>
                      כניסה לאתר
                    </div>
                  </div>
                </a>

                {/* Info row — clean & minimal */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  alignItems: 'center',
                  gap: 20,
                  padding: '22px 28px',
                }}>
                  {/* Number */}
                  <span style={{
                    fontFamily: 'var(--f-latin)', fontWeight: 900,
                    fontSize: 17, letterSpacing: '0.04em',
                    color: p.accent, opacity: 0.9,
                  }}>{p.num}</span>

                  {/* Title + desc */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 4 }}>
                      <h3 style={{ margin: 0, fontFamily: 'var(--f-hebrew)', fontWeight: 800, fontSize: 'clamp(20px,2.2vw,26px)', letterSpacing: '-0.02em', lineHeight: 1, color: p.dark ? '#fff' : 'var(--ink)' }}>
                        {p.title}
                      </h3>
                      <span style={{
                        fontSize: 15, fontFamily: 'var(--f-latin)',
                        color: p.dark ? 'rgba(255,235,210,0.6)' : 'var(--mute)', letterSpacing: '0.04em',
                        padding: '4px 12px',
                        background: p.dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,10,0.05)',
                        border: `1px solid ${p.dark ? 'rgba(255,255,255,0.15)' : 'var(--line-2)'}`,
                        borderRadius: 'var(--r-pill)',
                        whiteSpace: 'nowrap',
                      }}>{p.tagLabel}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 17, color: p.dark ? 'rgba(255,235,210,0.55)' : 'var(--mute)', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>

                  {/* CTA */}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '12px 22px',
                      background: p.dark ? p.accent : 'var(--ink)', color: '#fff',
                      borderRadius: 'var(--r-pill)',
                      fontSize: 17, fontWeight: 700,
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                      transition: 'transform .2s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    כניסה לאתר
                    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Nav controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, padding: '0 4px' }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {visible.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`פרויקט ${i + 1}`} style={{
              width: i === index ? 28 : 7, height: 7,
              borderRadius: 999,
              background: i === index ? 'var(--accent)' : 'rgba(10,10,10,0.14)',
              border: 0, cursor: 'pointer', transition: 'all .3s', padding: 0,
            }} />
          ))}
        </div>

        {/* Counter + arrows */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'var(--f-latin)', fontSize: 17, color: 'var(--mute)' }}>
            <b style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em' }}>{String(index + 1).padStart(2,'0')}</b>
            <span style={{ color: 'var(--mute-2)', margin: '0 4px' }}>/</span>
            {String(visible.length).padStart(2,'0')}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{dir:-1,label:'הקודם',path:'M15 6l6 6-6 6M21 12H3'},{dir:1,label:'הבא',path:'M9 6l-6 6 6 6M3 12h18'}].map(btn => (
              <button key={btn.dir} onClick={() => goTo(index + btn.dir)} aria-label={btn.label}
                disabled={btn.dir === -1 ? index === 0 : index >= visible.length - 1}
                style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--ink)', color: '#fff',
                  display: 'grid', placeItems: 'center', border: 0, cursor: 'pointer',
                  opacity: (btn.dir === -1 && index === 0) || (btn.dir === 1 && index >= visible.length - 1) ? 0.25 : 1,
                  transition: 'opacity .2s',
                }}>
                <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d={btn.path}/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA bottom */}
      <div data-reveal style={{ marginTop: 56, paddingTop: 48, borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>רוצה שהפרויקט הבא יהיה האתר שלך?</p>
        <a href="#contact" className="btn btn--primary" style={{ fontSize: 16, padding: '15px 30px' }}>
          <span>בואו נדבר</span>
          <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
        </a>
      </div>
    </section>
  )
}
