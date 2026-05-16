import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import WorkProcess from './components/WorkProcess'
import Voices from './components/Voices'
import FAQ from './components/FAQ'
import Marquee from './components/Marquee'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'

function ScrollProgress() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setWidth(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div id="scroll-progress" style={{ width: `${width}%` }} />
}

function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return
    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return <div ref={dotRef} className="cursor-dot" aria-hidden />
}

const railSections = [
  { id: 'hero', label: 'בית' },
  { id: 'about', label: 'אודות' },
  { id: 'work', label: 'עבודות' },
  { id: 'process', label: 'תהליך' },
  { id: 'voices', label: 'צור קשר' },
]

function ProgressRail() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    railSections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <aside className="progress-rail" aria-label="Section navigation">
      {railSections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`rail-item${active === id ? ' is-active' : ''}`}
          aria-label={label}
        >
          <span className="rail-label">{label}</span>
        </a>
      ))}
    </aside>
  )
}

function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setTimeout(onDone, 250); return 100 }
        return p + 5
      })
    }, 35)
    return () => clearInterval(t)
  }, [onDone])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <p style={{ fontFamily: 'var(--f-latin)', fontWeight: 700, letterSpacing: '0.2em', fontSize: 14, color: 'var(--ink)', marginBottom: 28 }}>
        <span style={{ color: 'var(--accent)' }}>GULI</span>STUDIO
      </p>
      <div style={{ width: 160, height: 1, background: 'var(--line-2)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'var(--accent)', transition: 'width 75ms', width: `${progress}%` }} />
      </div>
      <p style={{ marginTop: 16, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--mute)', fontFamily: 'var(--f-latin)' }}>
        Web Architecture
      </p>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      {!loading && (
        <>
          <div className="blueprint" aria-hidden />
          <CursorDot />
          <ScrollProgress />
          <ProgressRail />
          <Header />
          <main>
            <Hero />
            <Marquee />
            <About />
            <Portfolio />
            <WorkProcess />
            <Voices />
            <FAQ />
          </main>
          <Footer />
          <WhatsApp />
        </>
      )}
    </>
  )
}
