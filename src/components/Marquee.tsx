const items = [
  { text: 'ARCHITECTURE', type: 'latin' },
  { text: '·', type: 'dot' },
  { text: 'עיצוב אתרים', type: 'muted' },
  { text: '·', type: 'dot' },
  { text: 'BRANDING', type: 'latin' },
  { text: '·', type: 'dot' },
  { text: 'מיתוג', type: 'accent' },
  { text: '·', type: 'dot' },
  { text: 'UI / UX', type: 'muted' },
  { text: '·', type: 'dot' },
  { text: 'VISUAL IDENTITY', type: 'latin' },
  { text: '·', type: 'dot' },
  { text: 'DESIGN SYSTEMS', type: 'accent' },
  { text: '·', type: 'dot' },
  { text: 'חוויית משתמש', type: 'muted' },
  { text: '·', type: 'dot' },
]

function Track() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 40, whiteSpace: 'nowrap', flexShrink: 0, paddingInlineEnd: 40 }}>
      {items.map((item, i) => (
        <span key={i} style={{
          fontFamily: item.type === 'muted' || item.type === 'accent' ? 'var(--f-hebrew)' : 'var(--f-latin)',
          fontSize: item.type === 'dot' ? 16 : 'clamp(24px,3vw,44px)',
          fontWeight: item.type === 'dot' ? 400 : 600,
          letterSpacing: '-0.01em',
          color: item.type === 'dot' ? 'var(--accent)'
               : item.type === 'accent' ? 'var(--accent)'
               : item.type === 'muted' ? 'var(--mute-2)'
               : 'var(--ink)',
        }}>
          {item.text}
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <>
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marquee-scroll 36s linear infinite;
          display: inline-flex;
        }
        .marquee-wrap:hover .marquee-inner {
          animation-play-state: paused;
        }
      `}</style>
      <div
        aria-hidden="true"
        className="marquee-wrap"
        style={{
          position: 'relative', zIndex: 1,
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          padding: '26px 0', marginTop: 40,
          overflow: 'hidden',
          background: 'var(--paper)',
          direction: 'ltr',
        }}
      >
        <div className="marquee-inner">
          <Track />
          <Track />
          <Track />
          <Track />
        </div>
      </div>
    </>
  )
}
