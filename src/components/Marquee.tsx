const words = ['Web Architecture', 'עיצוב אתרים', 'Branding', 'מיתוג', 'UI / UX', 'Visual Identity', 'Design Systems', 'חוויית משתמש']

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  // 4x duplication guarantees seamless loop at any screen width
  const items = [...words, ...words, ...words, ...words]
  return (
    <div
      style={{
        display: 'flex',
        width: 'max-content',
        animation: `marquee${reverse ? 'Reverse' : ''} 32s linear infinite`,
        willChange: 'transform',
      }}
    >
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <span
            className="font-heading font-bold uppercase whitespace-nowrap"
            style={{
              fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)',
              letterSpacing: '0.06em',
              padding: '0 2rem',
              color: i % 3 === 0
                ? 'var(--orange)'
                : i % 3 === 1
                ? 'transparent'
                : 'rgba(0,0,0,0.08)',
              WebkitTextStroke: i % 3 === 1 ? '1px rgba(0,0,0,0.18)' : 'none',
            }}
          >
            {item}
          </span>
          <span style={{ color: 'var(--orange)', opacity: i % 3 === 0 ? 0.8 : 0.3, fontSize: '0.4rem' }}>✦</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div
      className="overflow-hidden relative"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '18px 0',
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,92,26,0.018) 100%)',
      }}
    >
      {/* Left fade mask */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
        style={{ width: 100, background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      {/* Right fade mask */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
        style={{ width: 100, background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />

      <MarqueeTrack />
    </div>
  )
}
