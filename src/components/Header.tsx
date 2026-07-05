import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'אודות', href: '#about' },
  { label: 'עבודות', href: '#work' },
  { label: 'תהליך', href: '#process' },
  { label: 'שאלות', href: '#faq' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const baseHeader: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 80,
    background: scrolled
      ? 'rgba(246,242,234,0.92)'
      : 'linear-gradient(to bottom, var(--bg) 60%, transparent)',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
    transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
  }

  if (isMobile) {
    return (
      <header style={{ ...baseHeader, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo — right */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--f-latin)', letterSpacing: '0.04em', fontSize: 17, fontWeight: 700, textDecoration: 'none', color: 'var(--ink)' }}>
          <span style={{ display: 'inline-grid', placeItems: 'center', width: 32, height: 32, background: 'var(--ink)', color: '#fff', borderRadius: 6, fontFamily: 'var(--f-latin)', fontWeight: 700, fontSize: 16 }}>G</span>
        </a>

        {/* Center brand */}
        <a href="#hero" style={{ fontFamily: 'var(--f-latin)', letterSpacing: '0.04em', fontSize: 17, fontWeight: 700, textDecoration: 'none', color: 'var(--ink)', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <strong style={{ color: 'var(--ink)' }}>GULI</strong>
          <em style={{ fontStyle: 'normal', color: 'var(--accent)', marginInlineStart: 2 }}>STUDIO</em>
        </a>

        {/* Hamburger — left */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="תפריט"
          style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 24, height: 20, justifyContent: 'center', background: 'transparent', border: 0, padding: 0, cursor: 'pointer' }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', height: 1, width: '100%',
              background: 'var(--ink)',
              transition: 'transform 0.25s, opacity 0.2s',
              transform: menuOpen && i === 0 ? 'rotate(45deg) translate(4px,4px)' :
                         menuOpen && i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: 'rgba(246,242,234,0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--line)',
            padding: '24px 24px 32px',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink-2)' }}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} style={{
              marginTop: 8, textAlign: 'center', fontWeight: 600, fontSize: 17,
              padding: '16px', borderRadius: 'var(--r-pill)',
              background: 'var(--accent)', color: '#fff',
            }}>
              נבנה משהו יחד
            </a>
          </div>
        )}
      </header>
    )
  }

  // Desktop — original layout
  return (
    <header style={{
      ...baseHeader,
      padding: '18px 36px',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: 24,
    }}>
      {/* Brand — right (RTL start) */}
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--f-latin)', letterSpacing: '0.04em', fontSize: 18, fontWeight: 700, textDecoration: 'none', color: 'var(--ink)', justifySelf: 'start' }}>
        <span style={{
          display: 'inline-grid', placeItems: 'center',
          width: 34, height: 34,
          background: 'var(--ink)', color: '#fff',
          borderRadius: 7,
          fontFamily: 'var(--f-latin)', fontWeight: 700, fontSize: 17,
        }}>G</span>
        <span>
          <strong style={{ color: 'var(--ink)' }}>GULI</strong>
          <em style={{ fontStyle: 'normal', color: 'var(--accent)', marginInlineStart: 2 }}>STUDIO</em>
        </span>
      </a>

      {/* Desktop nav pill — center */}
      <nav style={{
        display: 'flex',
        alignItems: 'center', gap: 4, padding: 6,
        background: 'rgba(28,25,20,0.04)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderRadius: 'var(--r-pill)',
        border: '1px solid var(--line)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        {navLinks.map(link => (
          <a key={link.href} href={link.href} style={{
            padding: '11px 22px', borderRadius: 'var(--r-pill)',
            fontSize: 17, fontWeight: 500, color: 'var(--ink-2)',
            transition: 'background .2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(28,25,20,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {link.label}
          </a>
        ))}
        <a href="#contact" style={{
          padding: '11px 22px', borderRadius: 'var(--r-pill)',
          fontSize: 17, fontWeight: 600,
          background: 'var(--accent)', color: '#fff',
          transition: 'background .2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = '#FF3A00')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
        >
          צור קשר
        </a>
      </nav>

      {/* Status meta — left (RTL end) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--f-latin)', fontSize: 15, letterSpacing: '0.06em', color: 'var(--mute)', textTransform: 'uppercase', justifySelf: 'end' }}>
        <span className="status-dot" aria-hidden="true" />
        <span>פתוחה לפרויקטים · 2026</span>
      </div>
    </header>
  )
}
