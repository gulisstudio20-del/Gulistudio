import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [glowOpacity, setGlowOpacity] = useState(1)

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const { bottom } = section.getBoundingClientRect()
      setGlowOpacity(Math.max(0, Math.min(1, bottom / window.innerHeight)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background effects */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: glowOpacity,
          background: 'radial-gradient(ellipse 70% 55% at 55% 35%, rgba(255,92,26,0.13) 0%, transparent 70%)',
          transition: 'opacity 0.12s linear',
        }}
      />
      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,92,26,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,92,26,0.07) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 100% 90% at 50% 40%, black 0%, transparent 85%)',
        }}
      />
      {/* Watermark letter */}
      <div
        aria-hidden
        className="pointer-events-none absolute select-none"
        style={{
          bottom: '-8%',
          right: '-3%',
          fontWeight: 900,
          fontSize: 'clamp(18rem, 30vw, 44rem)',
          color: 'rgba(0,0,0,0.028)',
          lineHeight: 1,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '-0.06em',
        }}
      >
        G
      </div>

      {/* Main content — centered, full width */}
      <div
        className="relative z-10 flex-1 flex items-center justify-center"
        style={{
          width: 'min(100% - 2rem, 1100px)',
          margin: '0 auto',
          padding: 'clamp(6rem, 10vw, 9rem) clamp(1rem, 4vw, 3rem) clamp(3rem, 6vw, 5rem)',
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          style={{ direction: 'rtl', textAlign: 'center', width: '100%' }}
          className="flex flex-col items-center"
        >
          {/* Availability badge */}
          <motion.div variants={item} className="flex items-center gap-2.5 justify-center mb-8">
            <span
              className="text-xs tracking-[0.22em] uppercase"
              style={{ color: 'var(--text-lt)', fontWeight: 500 }}
            >
              פתוחה לפרויקטים חדשים
            </span>
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: 'var(--orange)', animation: 'pulse 2s infinite' }}
            />
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={item}
            className="font-heading font-bold uppercase leading-[0.88] select-none"
            style={{ fontSize: 'clamp(5rem, 14vw, 13rem)', color: 'var(--text)' }}
          >
            GULI
            <br />
            <span style={{ color: 'var(--orange)' }}>STU</span>
            DIO
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            variants={item}
            className="font-heading font-bold uppercase leading-none mt-4"
            style={{
              fontSize: 'clamp(1rem, 2.8vw, 2.4rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(0,0,0,0.18)',
              letterSpacing: '0.12em',
            }}
          >
            Web Architecture
          </motion.h2>

          {/* Divider */}
          <motion.div
            variants={item}
            style={{
              width: 48,
              height: 2,
              background: 'var(--orange)',
              borderRadius: 2,
              margin: '28px auto',
              opacity: 0.6,
            }}
          />

          {/* Description */}
          <motion.p
            variants={item}
            className="leading-relaxed"
            style={{
              color: 'var(--text-mid)',
              fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
              maxWidth: '42ch',
              textAlign: 'center',
            }}
          >
            בונה חוויות דיגיטליות שמרגישות כמו אמנות.
            <br />
            <span style={{ color: 'var(--text-lt)', fontSize: '0.88em' }}>
              UI UX · Branding · Graphic Design
            </span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex gap-4 mt-10 justify-center flex-wrap">
            <motion.a
              href="#contact"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="font-heading font-semibold text-sm tracking-[0.18em] uppercase"
              style={{
                background: 'var(--orange)',
                color: '#fff',
                padding: '16px 36px',
                borderRadius: 999,
                boxShadow: '0 8px 32px rgba(255,92,26,0.3)',
                minWidth: 190,
                textAlign: 'center',
                display: 'inline-block',
              }}
            >
              בואו נבנה ביחד
            </motion.a>
            <motion.a
              href="#portfolio"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="font-heading font-semibold text-sm tracking-[0.18em] uppercase"
              style={{
                background: 'rgba(0,0,0,0.04)',
                color: 'var(--text)',
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '16px 36px',
                borderRadius: 999,
                backdropFilter: 'blur(10px)',
                minWidth: 150,
                textAlign: 'center',
                display: 'inline-block',
              }}
            >
              עבודות
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee separator line hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 flex justify-center pb-10"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 group"
          style={{ color: 'var(--text-lt)' }}
        >
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>גלול למטה</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ animation: 'bounceDown 1.8s ease-in-out infinite' }}
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
