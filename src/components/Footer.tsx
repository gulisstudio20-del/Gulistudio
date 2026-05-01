import { useState } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzzbnwqr' // החלף בקישור שלך מ-formspree.io

const navLinks = [
  { label: 'אודות', href: '#about' },
  { label: 'עבודות', href: '#portfolio' },
  { label: 'תהליך', href: '#process' },
  { label: 'צור קשר', href: '#contact' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer style={{ background: 'var(--orange)', color: '#fff', position: 'relative', overflow: 'hidden' }}>

      {/* Giant watermark number */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-2%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(180px, 28vw, 380px)',
          fontWeight: 900,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '-0.06em',
          lineHeight: 1,
          color: 'rgba(0,0,0,0.07)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        GS
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>

        {/* Top section */}
        <div style={{
          padding: '80px 0 60px',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'end',
        }}>
          {/* Left — headline */}
          <div>
            <p style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 20,
              fontWeight: 500,
            }}>
              מוכן להתחיל?
            </p>
            <h2 style={{
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              fontWeight: 900,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: '#fff',
              margin: 0,
            }}>
              נהפוך יחד
              <br />
              <em style={{
                fontStyle: 'italic',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: 'rgba(255,255,255,0.85)',
              }}>
                רעיון
              </em>
              {' '}לאתר
            </h2>
          </div>

          {/* Right — CTA block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: 320,
            }}>
              כל פרויקט מתחיל בשיחה אחת. שלח/י פרטים ואחזור אליך תוך 24 שעות.
            </p>

            {/* Mini email form */}
            <div style={{ display: 'flex', gap: 0, maxWidth: 380 }}>
              {!sent ? (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="האימייל שלך"
                    style={{
                      flex: 1,
                      background: 'rgba(0,0,0,0.15)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRight: 'none',
                      color: '#fff',
                      padding: '14px 18px',
                      fontSize: '0.85rem',
                      outline: 'none',
                      borderRadius: '2px 0 0 2px',
                    }}
                    onFocus={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.25)')}
                    onBlur={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.15)')}
                  />
                  <button
                    onClick={() => {
                      if (!email) return
                      fetch(FORMSPREE_ENDPOINT, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                        body: JSON.stringify({ email }),
                      }).finally(() => setSent(true))
                    }}
                    style={{
                      background: '#fff',
                      color: 'var(--orange)',
                      border: 'none',
                      padding: '14px 22px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      borderRadius: '0 2px 2px 0',
                      transition: 'opacity 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    שלח ←
                  </button>
                </>
              ) : (
                <p style={{
                  fontSize: '0.85rem',
                  color: '#fff',
                  fontWeight: 600,
                  padding: '14px 0',
                }}>
                  ✓ קיבלתי! אחזור אליך בקרוב.
                </p>
              )}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {[
                { label: 'Instagram', href: 'https://instagram.com/gulistudio' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: '28px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          <div>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 900,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#fff',
            }}>
              GULISTUDIO
            </span>
            <span style={{
              marginLeft: 10,
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
            }}>
              Web Architecture
            </span>
          </div>

          <nav style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} GULISTUDIO
          </p>
        </div>
      </div>
    </footer>
  )
}
