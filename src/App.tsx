import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import WorkProcess from './components/WorkProcess'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
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
      dot.classList.add('is-on')
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
  { id: 'contact', label: 'צור קשר' },
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

export default function App() {
  return (
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
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}
