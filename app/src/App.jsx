import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase.js'
import { getSession, logoutLocal, demoLogin } from './lib/store.js'
import { DEMO_TUTORS } from './data/demoTutors.js'
import Public from './pages/Public.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AuthDialog from './components/AuthDialog.jsx'

// Gate central: sin sesión no se puede pedir tutoría.
// Pública → visible para todos. Paneles → solo con rol.
export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authOpen, setAuthOpen] = useState(false)
  const [authReason, setAuthReason] = useState('')
  const [tutors, setTutors] = useState(DEMO_TUTORS)

  useEffect(() => {
    let mounted = true
    async function init() {
      try {
        const { data } = await supabase.auth.getSession()
        if (mounted && data.session?.user) {
          const local = getSession()
          setSession(local || { email: data.session.user.email, name: 'Estudiante', role: 'estudiante' })
        } else if (mounted) {
          setSession(getSession())
        }
      } catch {
        if (mounted) setSession(getSession())
      } finally {
        if (mounted) setLoading(false)
      }
      try {
        const { data: t } = await supabase.from('tutors').select('*').eq('active', true)
        if (mounted && t?.length) {
          setTutors(t.map((x) => ({
            id: x.id, name: x.name, short: x.name, initials: x.name.split(' ').map((w) => w[0]).slice(0, 2).join(''),
            subject: x.subject, mastery_level: x.mastery_level,
            experience_years: x.experience_years, description: x.description, active: x.active,
          })))
        }
      } catch { /* demo local */ }
    }
    init()
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s?.user) {
        const local = getSession()
        setSession(local || { email: s.user.email, name: 'Estudiante', role: 'estudiante' })
      }
    })
    return () => { mounted = false; listener.subscription.unsubscribe() }
  }, [])

  function requireAuth(reason) {
    setAuthReason(typeof reason === 'string' ? reason : 'Regístrate o inicia sesión para pedir una tutoría.')
    setAuthOpen(true)
  }

  function handleAuth(next) {
    setSession(next)
    setAuthOpen(false)
    setAuthReason('')
  }

  async function handleLogout() {
    logoutLocal()
    try { await supabase.auth.signOut() } catch { /* noop */ }
    setSession(null)
  }

  function handleSwitchRole(role) {
    setSession(demoLogin(role))
  }

  if (loading) return <p>Cargando…</p>

  // Sin sesión → vista PÚBLICA (no puede pedir tutoría, todo CTA abre registro).
  if (!session) {
    return (
      <>
        <Public tutors={tutors} onRequireAuth={requireAuth} onLogin={() => requireAuth('Inicia sesión para entrar a tu panel.')} onDemo={handleSwitchRole} />
        <AuthDialog open={authOpen} reason={authReason} onClose={() => setAuthOpen(false)} onAuth={handleAuth} />
      </>
    )
  }

  return (
    <Dashboard
      user={session}
      role={session.role}
      onLogout={handleLogout}
      onSwitchRole={handleSwitchRole}
      onPublic={handleLogout}
    />
  )
}
