import { useEffect, useRef } from 'react'

const words = ['Web Architecture', 'עיצוב אתרים', 'Branding', 'מיתוג', 'UI / UX', 'Visual Identity', 'Design Systems', 'חוויית משתמש']

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} style={{ display: 'flex', flexShrink: 0 }}>
      {words.map((item, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
          <span
            className="font-heading font-bold uppercase whitespace-nowrap"
            style={{
              fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)',
              letterSpacing: '0.06em',
              padding: '0 2rem',
              color: i % 3 === 0 ? 'var(--orange)' : i % 3 === 1 ? 'transparent' : 'rgba(0,0,0,0.08)',
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
  const innerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<Animation | null>(null)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return

    // Measure first track in pixels after layout — 100% reliable
    requestAnimationFrame(() => {
      const firstTrack = inner.firstElementChild as HTMLElement
      if (!firstTrack) return
      const w = firstTrack.offsetWidth

      animRef.current?.cancel()
      animRef.current = inner.animate(
        [
          { transform: 'translateX(0px)' },
          { transform: `translateX(-${w}px)` },
        ],
        { duration: 36000, iterations: Infinity, easing: 'linear' }
      )
    })

    return () => animRef.current?.cancel()
  }, [])

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '18px 0',
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,92,26,0.018) 100%)',
        overflow: 'hidden',
        position: 'relative',
        direction: 'ltr',
      }}
    >
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
        style={{ width: 120, background: 'linear-gradient(to right, var(--bg), transparent)' }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
        style={{ width: 120, background: 'linear-gradient(to left, var(--bg), transparent)' }} />

      {/* Two tracks side by side — animate exactly one track width → seamless */}
      <div ref={innerRef} style={{ display: 'flex', width: 'max-content' }}>
        <Track />
        <Track hidden />
      </div>
    </div>
  )
}
