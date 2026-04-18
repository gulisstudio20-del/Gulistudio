import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import WorkProcess from './components/WorkProcess'
import Marquee from './components/Marquee'
import Contact from './components/Contact'
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
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ background: '#FAFAFA' }}>
      <p className="font-heading font-bold tracking-[8px] uppercase mb-8" style={{ fontSize: '1.1rem', color: 'var(--text)' }}>
        <span style={{ color: 'var(--orange)' }}>GULI</span>STUDIO
      </p>
      <div className="w-40 h-px relative" style={{ background: 'rgba(0,0,0,0.08)' }}>
        <div className="absolute top-0 left-0 h-full transition-all duration-75" style={{ width: `${progress}%`, background: 'var(--orange)' }} />
      </div>
      <p className="mt-4 text-xs tracking-[4px] uppercase" style={{ color: 'rgba(255,92,26,0.45)' }}>
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
          <ScrollProgress />
          <Header />
          <main id="main-content">
            <Hero />
            <Marquee />
            <About />
            <Portfolio />
            <WorkProcess />
            <Contact />
          </main>
          <Footer />
          <WhatsApp />
        </>
      )}
    </>
  )
}
