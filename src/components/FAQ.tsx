import { useEffect, useRef, useState } from 'react'

const faqs = [
  { q: 'כמה זמן לוקח לבנות לי את האתר?', a: 'תלוי בהתקדמות מסירת החומרים ושיתוף פעולה של בעל העסק, אך במידה ויש שיתוף פעולה מלא תוך חודש כבר אמור להיות לכם אתר חדש בידיים שלכם.' },
  { q: 'כמה יעלה לי לבנות אתר כזה?', a: 'ממש תלוי באיזה סוג אתר אתם רוצים, אם זה רק דף נחיתה, אתר תדמיתי, או בכלל חנות קטנה — עם שיחה קצרה איתך נוכל להבין מה הכי מתאים לך לעסק ותקבל ממני הצעת מחיר עבור הפרויקט.' },
  { q: 'האתר נבנה בקוד?', a: 'לחלוטין! בונה בקוד כלומר כל מה שעולה על רוחכם אפשר לנסות להכניס לאתר ולשנות כל מה שתרצו — רק תגידו לי מה :)' },
  { q: 'מה קורה אחרי שהאתר עולה?', a: 'האתר לרשותכם, תתחילו להביא לקוחות ולהגדיל את העסק שלכם — מפה התהליך הוא שלכם, אבל אני פה לכל מקרה אם אי פעם תצטרכו עזרה בקשר לאתר.' },
  { q: 'אפשר לשנות את האתר אחרי?', a: 'בהחלט! אך לאחר סגירת הפרויקט ומסירתו ללקוח, אם יהיו עוד שינויים כלשהם בהמשך ניתן לחזור לסבבי תיקונים ושינויים בתיאום איתי ובתמחור נוסף — רק צרו איתי קשר ואעזור לכם במה שצריך.' },
  { q: 'מה סוגי הפרויקטים שאת עושה?', a: 'החל מדפי נחיתה, אתרי תדמית, אתרי חנות (קטנים). פשוט צרו איתי קשר ובואו נראה אם אוכל לעזור לכם!' },
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
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '80px 20px', maxWidth: 1320, margin: '0 auto' }}>

      <div data-reveal style={{ marginBottom: 24 }}>
        <span className="eyebrow">✦ FAQ · 06</span>
      </div>

      <h2 data-reveal className="h-display" style={{ marginBottom: 36 }}>שאלות שכולם שואלים בדרך כלל.</h2>

      <ul data-reveal style={{ borderTop: '1px solid var(--line-2)', listStyle: 'none', padding: 0, margin: 0 }}>
        {faqs.map((faq, i) => (
          <li key={i} style={{ borderBottom: '1px solid var(--line-2)' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{
                display: 'flex', width: '100%', alignItems: 'flex-start',
                justifyContent: 'space-between', gap: 16,
                padding: '22px 4px', fontSize: 'clamp(18px,3.5vw,22px)', fontWeight: 600,
                textAlign: 'start', background: 'transparent', border: 0, cursor: 'pointer',
                color: open === i ? 'var(--accent)' : 'var(--ink)',
                transition: 'color .25s', lineHeight: 1.4,
              }}
            >
              <span style={{ flex: 1 }}>{faq.q}</span>
              <span style={{ position: 'relative', display: 'inline-block', width: 16, height: 16, flexShrink: 0, marginTop: 4 }}>
                <span style={{ position: 'absolute', inset: 0, margin: 'auto', width: 16, height: 2, background: 'currentColor', display: 'block' }} />
                <span style={{ position: 'absolute', inset: 0, margin: 'auto', width: 2, height: 16, background: 'currentColor', display: 'block', transition: 'transform .3s', transform: open === i ? 'scaleY(0)' : 'scaleY(1)' }} />
              </span>
            </button>
            <div style={{
              display: 'grid',
              gridTemplateRows: open === i ? '1fr' : '0fr',
              transition: 'grid-template-rows .4s cubic-bezier(.2,.8,.2,1)',
            }}>
              <p style={{ overflow: 'hidden', margin: 0, paddingBottom: open === i ? 20 : 0, paddingInlineEnd: 24, fontSize: 'clamp(16px,3vw,18px)', color: 'var(--mute)', lineHeight: 1.75 }}>
                {faq.a}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
