import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const rowTopRef = useRef<HTMLSpanElement>(null)
  const rowBotRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect()
      const mx = ((e.clientX - r.left) / r.width - 0.5) * 2
      const my = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (rowTopRef.current) rowTopRef.current.style.transform = `translate(${mx * 0.04 * 30}px, ${my * 0.04 * 16}px)`
      if (rowBotRef.current) rowBotRef.current.style.transform = `translate(${mx * -0.04 * 30}px, ${my * -0.04 * 16}px)`
    }
    const onLeave = () => {
      if (rowTopRef.current) rowTopRef.current.style.transform = ''
      if (rowBotRef.current) rowBotRef.current.style.transform = ''
    }
    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => { hero.removeEventListener('mousemove', onMove); hero.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '120px 36px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 1,
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
      >
        {/* Tag */}
        <motion.div variants={item}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '9px 16px',
            background: 'rgba(255,232,221,0.7)',
            border: '1px solid rgba(255,77,20,0.18)',
            borderRadius: 'var(--r-pill)',
            fontSize: 13, color: 'var(--accent)', fontWeight: 500,
            marginBottom: 32,
            backdropFilter: 'blur(8px)',
          }}>
            <span className="status-dot" aria-hidden="true" />
            פתוחה לפרויקטים חדשים
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={item}
          style={{
            fontFamily: 'var(--f-latin)',
            fontWeight: 700,
            fontSize: 'clamp(72px, 16vw, 240px)',
            lineHeight: 0.86,
            letterSpacing: '-0.04em',
            margin: 0,
            pointerEvents: 'none',
          }}
          aria-label="Guli Studio"
        >
          <span
            ref={rowTopRef}
            style={{ display: 'block', color: 'var(--ink)', willChange: 'transform', transition: 'transform 200ms cubic-bezier(.2,.8,.2,1)' }}
          >
            GULI
          </span>
          <span
            ref={rowBotRef}
            style={{ display: 'block', marginTop: '-0.18em', willChange: 'transform', transition: 'transform 200ms cubic-bezier(.2,.8,.2,1)' }}
          >
            <span style={{ color: 'var(--accent)' }}>STU</span>DIO
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.div variants={item} style={{ marginTop: 38, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <span style={{ display: 'block', width: 38, height: 2, background: 'var(--accent)', marginBottom: 6 }} />
          <p style={{ fontSize: 'clamp(18px,1.4vw,22px)', color: 'var(--ink-2)', margin: 0, fontWeight: 500 }}>
            בונה חוויות דיגיטליות שמרגישות כמו אמנות.
          </p>
          <p style={{ fontFamily: 'var(--f-latin)', fontSize: 12, letterSpacing: '0.22em', color: 'var(--mute)', textTransform: 'uppercase', margin: 0 }}>
            UI · UX · Branding · Web Architecture
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={item} style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#contact" className="btn btn--primary">
            <span>בואו נבנה ביחד</span>
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
          </a>
          <a href="#work" className="btn btn--ghost">
            <span>תיק עבודות</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Coords — bottom right */}
      <div style={{
        position: 'absolute', bottom: 50, right: 36,
        display: 'flex', flexDirection: 'column', gap: 4,
        fontFamily: 'var(--f-latin)', fontSize: 10, letterSpacing: '0.16em',
        color: 'var(--mute)', textTransform: 'uppercase', textAlign: 'right',
      }} className="hidden md:flex">
        {[['LAT', '32.0853°N'], ['LON', '34.7818°E'], ['STUDIO', 'Tel Aviv']].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <span style={{ color: 'var(--mute-2)', minWidth: 50 }}>{k}</span>
            <span style={{ color: 'var(--ink-2)', fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Watermark G */}
      <div aria-hidden style={{
        position: 'absolute', bottom: -120, left: -60,
        fontFamily: 'var(--f-latin)', fontWeight: 700, fontSize: 500,
        lineHeight: 1, color: 'rgba(10,10,10,0.035)',
        pointerEvents: 'none', zIndex: -1, letterSpacing: '-0.05em',
        userSelect: 'none',
      }} className="hidden md:block">G</div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          fontFamily: 'var(--f-hebrew)', fontSize: 12, color: 'var(--mute)', letterSpacing: '0.1em',
        }}
      >
        <span>גלול</span>
        <span style={{ position: 'relative', display: 'block', width: 1, height: 56, background: 'var(--line-2)', overflow: 'hidden', borderRadius: 1 }}>
          <span style={{
            position: 'absolute', top: -20, left: 0, width: 1, height: 20,
            background: 'var(--accent)', borderRadius: 1,
            animation: 'scroll-dot 2.2s ease-in-out infinite',
          }} />
        </span>
      </motion.a>
    </section>
  )
}
