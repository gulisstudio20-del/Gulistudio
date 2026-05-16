import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    id: 'p1', num: '01', year: '2026',
    title: 'Origin', titleEm: 'Café',
    tags: ['web', 'brand'], tagLabel: 'Web Design · Branding',
    variant: 'pc--cream',
    url: 'https://origincafe.co.il',
    desc: 'אתר תדמית לבית קפה שמרגישים בו עוד לפני שהקפה מגיע. אווירה חמה, עיצוב שמזמין להישאר.',
    stack: ['UI / UX', 'Branding', 'Next.js'],
    Mock: () => (
      <div style={{ background: '#FFF8F0', color: '#2A1A0E', fontFamily: 'var(--f-serif), serif', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 11, fontFamily: 'var(--f-hebrew)', color: '#5C4332', padding: '0 0 10px' }}>
          <span>תפריט</span><span>פינות</span><span>אודות</span>
          <span style={{ marginInlineStart: 'auto', fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: 16 }}>Origin <i style={{ color: '#C8924A', fontStyle: 'normal', fontSize: 8 }}>✦</i></span>
        </div>
        <p style={{ textAlign: 'center', fontFamily: 'var(--f-hebrew)', fontSize: 12, color: '#8B6B4F', margin: '14px 0 6px', letterSpacing: '0.06em' }}>בית קפה שכונתי · פינה חמה</p>
        <h3 style={{ margin: 0, textAlign: 'center', fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: 'clamp(44px,8vw,84px)', lineHeight: 0.9, fontWeight: 400 }}>Origin</h3>
        <p style={{ textAlign: 'center', fontFamily: 'var(--f-hebrew)', fontSize: 13, color: '#5C4332', margin: '12px 0 0' }}>קפה טוב, אנשים טובים.</p>
      </div>
    ),
  },
  {
    id: 'p2', num: '02', year: '2025',
    title: 'Komorebi', titleEm: 'Spa',
    tags: ['web'], tagLabel: 'Web Design · Landing',
    variant: 'pc--sand',
    url: 'https://komorebi-spa.com',
    desc: 'Landing page לספא יפני. שקט ויזואלי, טיפוגרפיה יפנית ואווירה שמשדרת קצב איטי ומכוון.',
    stack: ['Web Design', 'Strategy', 'Motion'],
    Mock: () => (
      <div style={{ background: '#EDE7DD', color: '#1A1A1A', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'center', fontFamily: 'var(--f-latin)', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, fontSize: 9, letterSpacing: '0.12em', color: '#8B7355', textTransform: 'uppercase' }}>
          <span>komorebi</span><span>·</span><span>spa</span>
        </div>
        <div>
          <h3 style={{ margin: 0, fontFamily: 'var(--f-serif)', fontSize: 44, lineHeight: 0.95, fontWeight: 400 }}>木<br/>漏<br/>れ<br/>日</h3>
          <p style={{ fontFamily: 'var(--f-hebrew)', fontSize: 13, color: '#5C4F3D', lineHeight: 1.6, margin: '8px 0 14px' }}>אור שעובר דרך עצים.<br/>ספא יפני בלב העיר.</p>
          <div style={{ display: 'inline-block', padding: '8px 16px', background: '#1A1A1A', color: '#EDE7DD', fontFamily: 'var(--f-hebrew)', fontSize: 12, borderRadius: 999 }}>לחץ לקביעת →</div>
        </div>
      </div>
    ),
  },
  {
    id: 'p3', num: '03', year: '2025',
    title: 'Skej', titleEm: 'Boards',
    tags: ['brand', 'ecom'], tagLabel: 'Branding · E-commerce',
    variant: 'pc--bone',
    url: 'https://skej.co.il',
    desc: 'אתר לסקייטבורדים ואקססוריז עם עיצוב עירוני, UX נקי וחנות אונליין שפועלת.',
    stack: ['Branding', 'Shopify', 'E-commerce'],
    Mock: () => (
      <div style={{ background: '#F5F5F0', color: '#0A0A0A', fontFamily: 'var(--f-latin)', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 12, fontWeight: 700, fontSize: 11, letterSpacing: '0.06em', paddingBottom: 10, borderBottom: '2px solid #0A0A0A', marginBottom: 14 }}>
          <span style={{ background: '#FF3A00', color: '#fff', padding: '3px 10px', marginInlineEnd: 'auto' }}>SKEJ</span>
          <span>SHOP</span><span>CART</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {[
            { bg: 'linear-gradient(135deg,#FF3A00,#2A0F00)', label: 'Cruiser', price: '₪480' },
            { bg: 'radial-gradient(circle,#0A0A0A 40%,#2A2A2A)', label: 'גלגלים', price: '₪120' },
            { bg: '#E8E6DF', label: 'ציוד', price: '₪35' },
          ].map(c => (
            <div key={c.label} style={{ background: '#fff', padding: 10, borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)', fontSize: 11, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ aspectRatio: '1', borderRadius: 3, background: c.bg }} />
              <span>{c.label}</span>
              <b style={{ color: '#FF3A00' }}>{c.price}</b>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'p4', num: '04', year: '2025',
    title: 'Japanis', titleEm: 'Sushi',
    tags: ['web'], tagLabel: 'UI / UX · Web Design',
    variant: 'pc--blush',
    url: 'https://japanis.co.il',
    desc: 'אתר למסעדת סושי. תפריט נקי, סימפל, סגנון וטעם. Mobile-first ולוקים ראשונים.',
    stack: ['UI / UX', 'Design System', 'Mobile'],
    Mock: () => (
      <div style={{ background: '#FAFAFA', color: '#0F1419', fontFamily: 'var(--f-hebrew)', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 14, fontSize: 12, alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontWeight: 800, color: '#E63946', marginInlineEnd: 'auto', fontSize: 16 }}>Japanis</span>
          <span>תפריט</span><span>סניפים</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 'clamp(32px,5vw,50px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em' }}>סושי<br/>טרי.</h3>
          <div>
            <p style={{ color: '#5C5C5C', fontSize: 13, lineHeight: 1.55, margin: 0 }}>ב-25 דקות ספורות. טעם שמדבר בעצמו.</p>
            <div style={{ display: 'inline-block', background: '#E63946', color: '#fff', padding: '8px 16px', borderRadius: 999, fontSize: 12, marginTop: 10 }}>הזמן עכשיו</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'p5', num: '05', year: '2024',
    title: 'Lior', titleEm: 'Bar',
    tags: ['brand', 'web'], tagLabel: 'Branding · Portfolio',
    variant: 'pc--ink',
    url: 'https://liorbar.com',
    desc: 'פורטפוליו לצלם-במאי. אתר שמכניס את הסיסמה ואת החוויה — אסתטיקה שקפה שהעבודה שם.',
    stack: ['Branding', 'Portfolio', 'SEO'],
    Mock: () => (
      <div style={{ background: '#0E0E0E', color: '#E8E2D5', fontFamily: 'var(--f-latin)', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 14, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9C9890', marginBottom: 16 }}>
          <span style={{ color: '#E8E2D5', fontWeight: 700, marginInlineEnd: 'auto' }}>LIOR<i style={{ color: '#9C7C50', fontStyle: 'normal' }}>·</i>BAR</span>
          <span>WORK</span><span>CONTACT</span>
        </div>
        <h3 style={{ margin: 0, fontFamily: 'var(--f-hebrew)', fontSize: 'clamp(38px,6vw,58px)', lineHeight: 0.95, fontWeight: 800, letterSpacing: '-0.02em' }}>צלם<br/>במאי.</h3>
        <p style={{ fontFamily: 'var(--f-hebrew)', fontSize: 13, color: '#9C9890', margin: '10px 0 16px' }}>סינמה & ויזואל. תל אביב.</p>
        <div style={{ display: 'flex', gap: 8, fontFamily: 'var(--f-hebrew)', fontSize: 12, paddingTop: 10, borderTop: '1px solid rgba(232,226,213,0.15)' }}>
          <span>תיעוד</span><span style={{ color: '#9C7C50' }}>·</span><span>מסחרי</span><span style={{ color: '#9C7C50' }}>·</span><span>ברנד</span>
        </div>
      </div>
    ),
  },
  {
    id: 'p6', num: '06', year: '2024',
    title: 'Pilates', titleEm: 'Loft',
    tags: ['web', 'ecom'], tagLabel: 'Web · Booking System',
    variant: 'pc--clay',
    url: 'https://pilatesloft.co.il',
    desc: 'סטודיו פילאטיס עם מערכת הזמנות אונליין. עיצוב עפר, טיפוגרפיה רומנטית ואווירה אמיתית.',
    stack: ['UX / UI', 'Booking', 'Arbox'],
    Mock: () => (
      <div style={{ background: '#F4EFE8', color: '#3D332A', fontFamily: 'var(--f-hebrew)', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#6B5A47', marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: 18, color: '#3D332A', marginInlineEnd: 'auto' }}>PilatesLoft</span>
          <span>שעות</span><span>צרפות</span>
        </div>
        <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--f-serif)', fontSize: 'clamp(26px,4vw,40px)', lineHeight: 1, fontWeight: 400 }}>
          תרגול שקט, <em style={{ color: '#B5896A' }}>שישנה אותך.</em>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            { time: '07:00', name: 'פילאטיס בוקר', status: 'פנוי' },
            { time: '09:00', name: 'Reformer Mid', status: 'שמורה', hi: true },
            { time: '18:30', name: 'Mat Flow', status: 'תפוס' },
          ].map(r => (
            <div key={r.time} style={{ display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: 10, padding: '9px 13px', background: r.hi ? '#B5896A' : 'rgba(255,255,255,0.6)', borderRadius: 10, fontSize: 12, alignItems: 'center', color: r.hi ? '#F4EFE8' : 'inherit' }}>
              <b style={{ fontFamily: 'var(--f-latin)', color: r.hi ? 'rgba(255,255,255,0.85)' : '#B5896A' }}>{r.time}</b>
              <span>{r.name}</span>
              <i style={{ fontStyle: 'normal', fontSize: 11, color: r.hi ? 'rgba(255,255,255,0.7)' : '#6B5A47' }}>{r.status}</i>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

const filters = [
  { label: 'הכל', value: 'all', count: 6 },
  { label: 'Web', value: 'web', count: 4 },
  { label: 'Branding', value: 'brand', count: 3 },
  { label: 'E-commerce', value: 'ecom', count: 2 },
]

const bgMap: Record<string, string> = {
  'pc--ink':   'linear-gradient(160deg,#1A1A1A 0%,#0A0A0A 100%)',
  'pc--cream': 'linear-gradient(160deg,#F9EFE0,#F5E6D0)',
  'pc--sand':  'linear-gradient(160deg,#EFE6D4,#D9C9AC)',
  'pc--bone':  'linear-gradient(160deg,#F5F4ED,#E8E5DA)',
  'pc--blush': 'linear-gradient(160deg,#FFE7E0,#FDD3C6)',
  'pc--clay':  'linear-gradient(160deg,#F0E4D6,#DCC2A8)',
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState('all')
  const [index, setIndex] = useState(0)

  const visible = projects.filter(p => filter === 'all' || p.tags.includes(filter))

  useEffect(() => { setIndex(0) }, [filter])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[0] as HTMLElement
    if (!card) return
    const gap = 28
    const step = card.offsetWidth + gap
    track.style.transform = `translateX(${index * step}px)`
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
    <section id="work" ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '120px 36px 100px', maxWidth: 1320, margin: '0 auto' }}>

      {/* Head */}
      <div data-reveal style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'flex-end', marginBottom: 56 }}>
        <div>
          <span className="eyebrow" style={{ marginBottom: 14, display: 'inline-block' }}>✦ SELECTED · 2024–2026</span>
          <h2 className="h-display">
            תיק עבודות
            <span style={{ display: 'block', fontFamily: 'var(--f-latin)', fontSize: 15, fontWeight: 400, letterSpacing: '0.18em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 14 }}>/ made by avigail</span>
          </h2>
        </div>
        <div>
          <p style={{ fontSize: 17, color: 'var(--mute)', margin: '0 0 20px', lineHeight: 1.6 }}>לחצו על פרויקט לכניסה לאתר.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {filters.map(f => (
              <button key={f.value} onClick={() => setFilter(f.value)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 18px', fontSize: 15, fontWeight: 500,
                color: filter === f.value ? '#fff' : 'var(--mute)',
                background: filter === f.value ? 'var(--ink)' : 'transparent',
                border: `1px solid ${filter === f.value ? 'var(--ink)' : 'var(--line-2)'}`,
                borderRadius: 'var(--r-pill)', transition: 'all .2s', cursor: 'pointer',
              }}>
                {f.label}
                <em style={{ fontStyle: 'normal', fontFamily: 'var(--f-latin)', fontSize: 12, color: filter === f.value ? 'rgba(255,255,255,.6)' : 'var(--mute-2)', letterSpacing: '0.06em' }}>{f.count}</em>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 32, padding: '0 0 40px' }}>
        <div
          ref={trackRef}
          style={{ display: 'flex', gap: 28, transition: 'transform .85s cubic-bezier(.7,0,.2,1)', willChange: 'transform' }}
        >
          {visible.map((p, i) => {
            const isActive = i === index
            const dark = p.variant === 'pc--ink'
            return (
              <article
                key={p.id}
                style={{
                  flex: '0 0 100%',
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
                  minHeight: 560,
                  borderRadius: 28,
                  background: bgMap[p.variant] ?? 'var(--paper)',
                  border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'var(--line)'}`,
                  color: dark ? '#F5F4ED' : 'var(--ink)',
                  opacity: isActive ? 1 : 0.22,
                  filter: isActive ? 'none' : 'blur(4px) saturate(0.5)',
                  transform: isActive ? 'scale(1)' : 'scale(0.88)',
                  transition: 'opacity .6s ease, filter .6s ease, transform .85s cubic-bezier(.7,0,.2,1)',
                  pointerEvents: isActive ? 'auto' : 'none',
                  overflow: 'hidden',
                }}
              >
                {/* Preview — left column */}
                <div style={{ position: 'relative', padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
                  {/* Tag chip */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 14px', alignSelf: 'flex-start',
                    background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.8)',
                    border: `1px solid ${dark ? 'rgba(255,255,255,0.18)' : 'rgba(10,10,10,0.08)'}`,
                    borderRadius: 'var(--r-pill)', fontSize: 13, fontWeight: 500,
                    backdropFilter: 'blur(10px)',
                    marginBottom: 20,
                  }}>
                    <span className="status-dot" aria-hidden="true" />
                    {p.tagLabel}
                  </div>

                  {/* Mock preview */}
                  <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.35)', minHeight: 380 }}>
                    <div style={{ height: '100%', padding: '18px 22px', display: 'flex', flexDirection: 'column' }}>
                      <p.Mock />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div aria-hidden style={{
                  position: 'absolute', top: 40, bottom: 40, left: '50%',
                  width: 1,
                  background: dark
                    ? 'linear-gradient(to bottom,transparent,rgba(255,255,255,0.2) 20%,rgba(255,255,255,0.3) 50%,rgba(255,255,255,0.2) 80%,transparent)'
                    : 'linear-gradient(to bottom,transparent,rgba(10,10,10,0.1) 20%,rgba(10,10,10,0.18) 50%,rgba(10,10,10,0.1) 80%,transparent)',
                  transform: 'translateX(-50%)',
                }} />

                {/* Info — right column */}
                <div style={{ padding: '40px 44px 40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
                  {/* Num + year */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: 'var(--f-latin)', marginBottom: 8 }}>
                    <span style={{ fontSize: 56, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1 }}>{p.num}</span>
                    <span style={{ fontSize: 12, letterSpacing: '0.16em', color: dark ? 'rgba(255,255,255,0.4)' : 'var(--mute)', textTransform: 'uppercase' }}>{p.year}</span>
                  </div>

                  <h3 style={{ margin: 0, fontFamily: 'var(--f-hebrew)', fontWeight: 800, fontSize: 'clamp(36px,4vw,56px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
                    {p.title}{' '}
                    <em style={{ fontStyle: 'italic', fontFamily: 'var(--f-serif)', fontWeight: 400, color: 'var(--accent)', fontSize: '0.82em' }}>{p.titleEm}</em>
                  </h3>

                  <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: dark ? 'rgba(245,244,237,0.65)' : 'var(--mute)', maxWidth: '34ch' }}>{p.desc}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
                    {p.stack.map(s => (
                      <span key={s} style={{ padding: '6px 14px', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,10,0.05)', border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(10,10,10,0.07)'}`, borderRadius: 'var(--r-pill)', fontSize: 13, color: dark ? 'rgba(245,244,237,0.85)' : 'var(--ink-2)' }}>{s}</span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: 10,
                      display: 'inline-flex', alignItems: 'center', gap: 12,
                      padding: '14px 24px',
                      background: dark ? '#F5F4ED' : 'var(--ink)',
                      color: dark ? '#0A0A0A' : '#fff',
                      borderRadius: 'var(--r-pill)',
                      fontSize: 16, fontWeight: 700,
                      alignSelf: 'flex-start',
                      transition: 'transform .2s, box-shadow .2s',
                      boxShadow: '0 6px 24px -8px rgba(10,10,10,0.25)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px -8px rgba(10,10,10,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 24px -8px rgba(10,10,10,0.25)' }}
                  >
                    כניסה לאתר
                    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginTop: 24, padding: '0 4px' }}>
        {/* Dot nav */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {visible.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`פרויקט ${i + 1}`} style={{
              width: i === index ? 40 : 10,
              height: 10, borderRadius: 999,
              background: i === index ? 'var(--accent)' : 'rgba(10,10,10,0.12)',
              border: 0, cursor: 'pointer', transition: 'all .3s', padding: 0,
            }} />
          ))}
        </div>

        {/* Counter */}
        <div style={{ fontFamily: 'var(--f-latin)', fontSize: 15, letterSpacing: '0.04em', color: 'var(--mute)' }}>
          <b style={{ fontWeight: 800, fontSize: 28, color: 'var(--accent)', letterSpacing: '-0.03em' }}>
            {String(index + 1).padStart(2, '0')}
          </b>
          <span style={{ color: 'var(--mute-2)', margin: '0 6px' }}>/</span>
          <span>{String(visible.length).padStart(2, '0')}</span>
        </div>

        {/* Arrow buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { label: 'הקודם', dir: -1, icon: <path d="M15 6l6 6-6 6M21 12H3"/> },
            { label: 'הבא', dir: 1, icon: <path d="M9 6l-6 6 6 6M3 12h18"/> },
          ].map(btn => (
            <button key={btn.label} onClick={() => goTo(index + btn.dir)} aria-label={btn.label}
              disabled={(btn.dir === -1 ? index === 0 : index >= visible.length - 1)}
              style={{
                width: 60, height: 60, borderRadius: '50%', background: 'var(--ink)', color: '#fff',
                display: 'grid', placeItems: 'center', border: 0, cursor: 'pointer',
                transition: 'background .25s, transform .3s, box-shadow .35s',
                boxShadow: '0 6px 20px -8px rgba(10,10,10,.3)',
                opacity: (btn.dir === -1 && index === 0) || (btn.dir === 1 && index >= visible.length - 1) ? 0.3 : 1,
              }}
              onMouseEnter={e => { const b = e.currentTarget; if (!b.disabled) { b.style.background = 'var(--accent)'; b.style.transform = 'translateY(-2px)' } }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.transform = '' }}
            >
              <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                {btn.icon}
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div data-reveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '60px 0 0', marginTop: 60, borderTop: '1px solid var(--line)' }}>
        <p style={{ margin: 0, fontSize: 24, fontWeight: 600, color: 'var(--ink)' }}>רוצות שפרויקט שלך יהיה הבא?</p>
        <a href="#contact" className="btn btn--primary" style={{ fontSize: 17, padding: '16px 32px' }}>
          <span>בואו נדבר</span>
          <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
        </a>
      </div>
    </section>
  )
}
