import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'p1',
    num: '01',
    title: 'Origin',
    tags: ['Branding', 'Web Design'],
    palette: ['#2A1A0E', '#C8924A', '#FFF8F0'],
    url: 'https://origin-fvun.vercel.app',
    image: '/images/portfolio-1.png',
    desc: 'אתר תדמית לבית קפה שמרגישים בו עוד לפני שהקפה מגיע. אווירה חמה, עיצוב שמזמין להישאר — ומידע ברור שמוביל לביקור.',
    what: ['עיצוב UI/UX', 'בניית אתר', 'מיתוג ויזואלי'],
  },
  {
    id: 'p2',
    num: '02',
    title: 'Komorebi',
    tags: ['Landing Page', 'Web Design'],
    palette: ['#FFF5F5', '#E8A0A0', '#2D1515'],
    url: 'https://komorebi-liard.vercel.app',
    image: '/images/portfolio-2.png',
    desc: 'דף נחיתה לקורס יפנית אונליין. כל אלמנט בעמוד נועד לגרום למבקר לרצות להתחיל — מהכותרת הראשונה ועד כפתור ההרשמה.',
    what: ['עיצוב דף נחיתה', 'בניית אתר', 'אופטימיזציה להמרה'],
  },
  {
    id: 'p3',
    num: '03',
    title: 'Skej',
    tags: ['E-Commerce', 'Branding'],
    palette: ['#0F0F0F', '#D4A853', '#F5F0E8'],
    url: 'https://skej-one.vercel.app',
    image: '/images/portfolio-3.png',
    desc: 'אתר למותג בגדים פרימיום. עיצוב מינימליסטי שמדבר בשפת האיכות — כי כשהמוצר מדבר בעצמו, התפקיד שלנו הוא לא לפריע.',
    what: ['עיצוב UI', 'חנות אונליין', 'מיתוג ויזואלי'],
  },
  {
    id: 'p4',
    num: '04',
    title: 'Japanis',
    tags: ['Web Design', 'UI/UX'],
    palette: ['#F0F4F0', '#4A7C6A', '#1A2A1E'],
    url: 'https://japanis.vercel.app',
    image: '/images/portfolio-4.png',
    desc: 'אתר לטיולים מאורגנים ליפן לישראלים. מסע שמתחיל עוד בגלילה — חוויה ויזואלית שמוכרת את היעד לפני שנאמרת מחיר.',
    what: ['עיצוב UI/UX', 'בניית אתר', 'חוויית משתמש'],
  },
]

// ─── Accordion row ────────────────────────────────────────────────────────────
function ProjectRow({
  project,
  isOpen,
  onToggle,
}: {
  project: typeof projects[0]
  isOpen: boolean
  onToggle: () => void
}) {
  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>

      {/* ── Trigger ── */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${project.id}`}
        className="w-full group"
        style={{
          display: 'grid',
          gridTemplateColumns: '52px 1fr auto',
          alignItems: 'center',
          gap: '0 20px',
          padding: '28px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'right',
          direction: 'rtl',
          transition: 'padding 0.2s',
        }}
      >
        {/* Number */}
        <span
          style={{
            fontWeight: 900,
            fontSize: '0.75rem',
            letterSpacing: '0.04em',
            color: isOpen ? 'var(--orange)' : 'rgba(0,0,0,0.18)',
            transition: 'color 0.3s',
            textAlign: 'right',
          }}
        >
          {project.num}
        </span>

        {/* Title + tags */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: 'clamp(1.15rem, 2.2vw, 1.75rem)',
                letterSpacing: '-0.02em',
                color: isOpen ? 'var(--orange)' : 'var(--text)',
                transition: 'color 0.3s',
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </span>
          </div>
          {/* Tags — נעלמות כשפתוח */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                style={{ display: 'flex', gap: 6, marginTop: 7, flexWrap: 'wrap' }}
              >
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-lt)',
                      background: 'rgba(0,0,0,0.04)',
                      padding: '3px 10px',
                      borderRadius: 999,
                      border: '1px solid var(--border)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle button */}
        <div
          aria-hidden
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isOpen ? 'var(--orange)' : 'transparent',
            border: `1px solid ${isOpen ? 'var(--orange)' : 'var(--border)'}`,
            flexShrink: 0,
            transition: 'background 0.3s, border-color 0.3s',
          }}
        >
          <motion.svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? '#fff' : 'var(--text-mid)'}
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <path d="M12 5v14M5 12h14" />
          </motion.svg>
        </div>
      </button>

      {/* ── Panel ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`panel-${project.id}`}
            role="region"
            aria-label={`פרטים על הפרויקט: ${project.title}`}
            key="panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease }}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, ease, delay: 0.08 }}
              style={{ paddingBottom: 44, direction: 'rtl' }}
            >

              {/* ── Preview mock ── */}
              <div
                style={{
                  width: '100%',
                  height: 'clamp(160px, 24vw, 340px)',
                  borderRadius: 18,
                  marginBottom: 32,
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 6px 32px rgba(0,0,0,0.07)',
                }}
                aria-hidden
              >
                {/* Browser chrome */}
                <div
                  style={{
                    height: 34,
                    background: '#f0f0f0',
                    borderBottom: '1px solid rgba(0,0,0,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 14px',
                    gap: 6,
                  }}
                >
                  {['#FF5F57', '#FFBD2E', '#28C840'].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  ))}
                  <div
                    style={{
                      flex: 1,
                      height: 18,
                      background: 'rgba(0,0,0,0.06)',
                      borderRadius: 4,
                      marginRight: 10,
                    }}
                  />
                </div>

                {/* Screenshot */}
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    position: 'absolute',
                    top: 34,
                    left: 0,
                    width: '100%',
                    height: 'calc(100% - 34px)',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    display: 'block',
                  }}
                />
              </div>

              {/* ── Content: desc + what + palette ── */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 16,
                }}
              >
                {/* Description card */}
                <div
                  style={{
                    background: 'linear-gradient(160deg, #fff 0%, rgba(0,0,0,0.015) 100%)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: '22px 24px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--orange)',
                      marginBottom: 12,
                    }}
                  >
                    על הפרויקט
                  </p>
                  <p
                    style={{
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: 'var(--text-mid)',
                    }}
                  >
                    {project.desc}
                  </p>
                </div>

                {/* What I did card */}
                <div
                  style={{
                    background: 'linear-gradient(160deg, #fff 0%, rgba(0,0,0,0.015) 100%)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: '22px 24px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--orange)',
                      marginBottom: 14,
                    }}
                  >
                    מה עשיתי
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {project.what.map(item => (
                      <li
                        key={item}
                        style={{
                          fontSize: '1rem',
                          color: 'var(--text-mid)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'var(--orange)',
                            flexShrink: 0,
                            opacity: 0.7,
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Palette card */}
                <div
                  style={{
                    background: 'linear-gradient(160deg, #fff 0%, rgba(0,0,0,0.015) 100%)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: '22px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--orange)',
                    }}
                  >
                    פלטת צבעים
                  </p>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1 }}>
                    {project.palette.map((color, i) => (
                      <div
                        key={color}
                        title={color}
                        style={{
                          flex: i === 0 ? 2 : 1,
                          height: 64,
                          borderRadius: 10,
                          background: color,
                          border: '1.5px solid rgba(0,0,0,0.07)',
                          transition: 'transform 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scaleY(1.06)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scaleY(1)')}
                      />
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {project.palette.map(color => (
                      <span
                        key={color}
                        style={{
                          flex: 1,
                          fontSize: '0.62rem',
                          color: 'var(--text-lt)',
                          letterSpacing: '0.04em',
                          textAlign: 'center',
                          fontFamily: 'monospace',
                        }}
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Live site link ── */}
              {project.url && (
                <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      background: 'var(--orange)',
                      padding: '12px 24px',
                      borderRadius: 999,
                      textDecoration: 'none',
                      transition: 'opacity 0.2s, gap 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.opacity = '0.88'
                      e.currentTarget.style.gap = '14px'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.gap = '10px'
                    }}
                  >
                    צפה באתר
                    <span style={{ fontSize: '1rem' }}>↗</span>
                  </a>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
              }, i * 90)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      aria-label="תיק עבודות"
      className="py-32 px-6 md:px-10 max-w-[1400px] mx-auto"
    >
      {/* Header */}
      <div
        className="flex items-end justify-between pb-10 mb-2 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div>
          <p
            data-reveal
            className="transition-all duration-700"
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              marginBottom: 10,
              opacity: 0,
              transform: 'translateY(20px)',
            }}
          >
            Made by Guli
          </p>
          <h2
            data-reveal
            className="font-heading font-bold uppercase leading-none transition-all duration-700"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              color: 'var(--text)',
              opacity: 0,
              transform: 'translateY(20px)',
            }}
          >
            תיק עבודות
          </h2>
        </div>
        <p
          data-reveal
          className="hidden md:block transition-all duration-700"
          style={{
            fontSize: '0.95rem',
            color: 'var(--text-lt)',
            opacity: 0,
            transform: 'translateY(20px)',
            maxWidth: '20ch',
            textAlign: 'right',
            lineHeight: 1.6,
          }}
        >
          לחצו על פרויקט
          <br />
          לפרטים נוספים
        </p>
      </div>

      {/* List */}
      <div
        data-reveal
        className="transition-all duration-700"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
        role="list"
        aria-label="רשימת פרויקטים"
      >
        {projects.map((project, i) => (
          <div key={project.id} role="listitem">
            <ProjectRow
              project={project}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(prev => (prev === i ? null : i))}
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        data-reveal
        className="flex justify-center mt-14 transition-all duration-700"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-lt)',
            borderBottom: '1px solid var(--border)',
            paddingBottom: 4,
            transition: 'color 0.25s, border-color 0.25s, gap 0.25s',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--orange)'
            e.currentTarget.style.borderColor = 'var(--orange)'
            e.currentTarget.style.gap = '16px'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--text-lt)'
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.gap = '10px'
          }}
        >
          רוצים אתר כזה?
          <span>בואו נדבר ↗</span>
        </a>
      </div>
    </section>
  )
}
