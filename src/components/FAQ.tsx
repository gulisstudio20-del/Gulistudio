import { useEffect, useRef, useState } from 'react'

const faqs = [
  { q: 'כמה זמן לוקח לבנות לי את האתר?', a: 'בממוצע 5–7 שבועות מהשיחה הראשונה ועד העלאה לאוויר. תלוי בהיקף ובמהירות שתעבירו תוכן.' },
  { q: 'כמה זה עולה?', a: 'אתר תדמית מתחיל ב-9,000₪. אתר בסיסי מ-18,000₪. כל פרויקט — אני שולחת הצעת מחיר תוך 48 שעות.' },
  { q: 'האם תוכלו לפתח עם קוד מותאם אישית?', a: 'כן — משתפת קופרדייטרים שלי שעובדת ביחד. תוספת במחיר נפרד בראש, והאתר יוצא בדיוק כמו שדמיינתם לפני שהצגנו הצעה.' },
  { q: 'מה קורה אחרי שהאתר עולה?', a: 'אחרי מסירה — שלושה חודשים שמיירות תחזוקה כלולות, כולל עדכונים, אבטחה, ושמעמיס. אחרי כן אפשר להמשיך בתוכנית חודשית.' },
  { q: 'האפשרות לשנות את האתר אחרי?', a: 'תמיד אפשר. ב-Webflow וב-Wix כן, בנוחות. בקוד מותאם — אני נשאר בשיחה ומסבירה את כל הדברים שיצטרכו לשנות.' },
  { q: 'מה סוגי הפרויקטים שלך?', a: 'אני עובדת עם עסקים של 10 שנים שרק עכשיו הגיעו לאינטרנט ועם ראשות שמקשיבות. את/ה מביאה את העסק, אני מביאה את העיצוב, אני מביאה את הקוד, אני מביאה את הניסיון. נקודה.' },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '120px 36px', maxWidth: 1320, margin: '0 auto' }}>

      <div data-reveal style={{ marginBottom: 32 }}>
        <span className="eyebrow">✦ FAQ · 06</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
        <h2 data-reveal className="h-display">שאלות שכולם שואלות בדרך כלל.</h2>

        <ul data-reveal style={{ borderTop: '1px solid var(--line-2)', listStyle: 'none', padding: 0, margin: 0 }}>
          {faqs.map((faq, i) => (
            <li key={i} style={{ borderBottom: '1px solid var(--line-2)' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  display: 'flex', width: '100%', alignItems: 'center',
                  justifyContent: 'space-between', gap: 24,
                  padding: '24px 4px', fontSize: 18, fontWeight: 600,
                  textAlign: 'start', background: 'transparent', border: 0, cursor: 'pointer',
                  color: open === i ? 'var(--accent)' : 'var(--ink)',
                  transition: 'color .25s',
                }}
              >
                <span>{faq.q}</span>
                <span style={{ position: 'relative', display: 'inline-block', width: 16, height: 16, flexShrink: 0 }}>
                  <span style={{ position: 'absolute', inset: 0, margin: 'auto', width: 16, height: 2, background: 'currentColor', display: 'block' }} />
                  <span style={{ position: 'absolute', inset: 0, margin: 'auto', width: 2, height: 16, background: 'currentColor', display: 'block', transition: 'transform .3s', transform: open === i ? 'scaleY(0)' : 'scaleY(1)' }} />
                </span>
              </button>
              <div style={{
                display: 'grid',
                gridTemplateRows: open === i ? '1fr' : '0fr',
                transition: 'grid-template-rows .4s cubic-bezier(.2,.8,.2,1)',
              }}>
                <p style={{ overflow: 'hidden', margin: 0, paddingBottom: open === i ? 24 : 0, paddingInlineEnd: 40, fontSize: 15, color: 'var(--mute)', lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
