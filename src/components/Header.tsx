import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'אודות', href: '#about' },
  { label: 'עבודות', href: '#portfolio' },
  { label: 'תהליך', href: '#process' },
  { label: 'צור קשר', href: '#contact' },
]

function NavTab({
  children,
  href,
  setPosition,
  onClick,
}: {
  children: React.ReactNode
  href: string
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>
  onClick?: () => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      className="relative z-10 list-none"
    >
      <a
        href={href}
        onClick={onClick}
        className="block px-4 py-2 text-sm font-heading font-semibold tracking-[1px] uppercase transition-colors duration-200"
        style={{ color: 'var(--text-mid)' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-mid)')}
      >
        {children}
      </a>
    </li>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500 py-5"
      style={{
        background: scrolled ? 'rgba(250,250,250,0.85)' : 'rgba(250,250,250,0.6)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        boxShadow: scrolled ? '0 2px 32px rgba(0,0,0,0.07)' : 'none',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between relative">

        {/* Logo */}
        <a
          href="#"
          className="font-heading font-bold uppercase flex items-center gap-1.5"
          style={{ color: 'var(--text)', fontSize: '1rem', letterSpacing: '0.06em', textDecoration: 'none' }}
        >
          <span style={{ color: 'var(--orange)' }}>GULI</span>STUDIO
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <ul
            className="relative flex w-fit items-center rounded-full p-1"
            style={{
              background: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 2px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.95)',
              backdropFilter: 'blur(12px)',
            }}
            onMouseLeave={() => setPosition(pv => ({ ...pv, opacity: 0 }))}
          >
            {navLinks.map(link => (
              <NavTab key={link.href} href={link.href} setPosition={setPosition}>
                {link.label}
              </NavTab>
            ))}
            <motion.li
              animate={position}
              className="absolute z-0 top-1 h-[calc(100%-8px)] rounded-full pointer-events-none"
              style={{ background: 'var(--orange)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </ul>
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 font-heading font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300"
          style={{
            color: 'var(--orange)',
            border: '1px solid rgba(255,92,26,0.3)',
            padding: '8px 18px',
            borderRadius: 999,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--orange)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--orange)'
          }}
        >
          נדבר
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] w-6 h-5 justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="תפריט"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-px w-full origin-center"
            style={{ background: 'var(--text)' }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-px w-full"
            style={{ background: 'var(--text)' }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-px w-full origin-center"
            style={{ background: 'var(--text)' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t"
            style={{ background: 'rgba(250,250,250,0.97)', borderColor: 'rgba(0,0,0,0.05)' }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
              className="px-6 py-8 flex flex-col gap-6"
            >
              {navLinks.map(link => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: 16 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="text-base font-heading font-semibold tracking-[1px] uppercase flex items-center justify-between"
                  style={{ color: 'var(--text-mid)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-mid)')}
                >
                  {link.label}
                  <span style={{ color: 'var(--orange)', fontSize: '0.8rem', opacity: 0.6 }}>↗</span>
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="mt-4 text-center font-heading font-semibold text-sm tracking-[0.15em] uppercase py-4 rounded-full"
                style={{ background: 'var(--orange)', color: '#fff' }}
              >
                נבנה משהו יחד
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
