// המספר שמור בקידוד base64 והלינק נבנה רק בלחיצה —
// כדי שבוטים שסורקים את ה-HTML/JS לא יקצרו את המספר לרשימות ספאם.
const ENCODED_PHONE = 'OTcyNTg0NTE2ODc0'

export function openWhatsApp() {
  const phone = atob(ENCODED_PHONE)
  window.open(`https://wa.me/${phone}`, '_blank', 'noopener,noreferrer')
}
