import { useState } from 'react'
import { registerUser, loginUser, demoLogin } from '../lib/store.js'

// Modal que BLOQUEA pedir tutoría sin registro.
// Incluye login, registro por rol y accesos demo para ver cada panel.
export default function AuthDialog({ open, reason, onClose, onAuth }) {
  const [mode, setMode] = useState('login') // login | register
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('estudiante')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!open) return null

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const session = mode === 'login'
        ? loginUser({ email, password })
        : registerUser({ name, email, password, role })
      onAuth(session)
    } catch (err) {
      setError(err.message || 'No se pudo continuar.')
    } finally {
      setLoading(false)
    }
  }

  function demo(roleName) {
    const session = demoLogin(roleName)
    onAuth(session)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(20,22,45,.45)', display: 'grid', placeItems: 'center', zIndex: 50, padding: 16 }} onClick={onClose}>
      <div className="card" style={{ width: 'min(460px,100%)' }} onClick={(e) => e.stopPropagation()}>
        <div className="pm-card-head">
          <span className="mini-badge">🔒 Registro requerido</span>
          <button className="tiny" onClick={onClose}>Cerrar ✕</button>
        </div>
        <h2 style={{ margin: '6px 0' }}>{mode === 'login' ? 'Inicia sesión para continuar' : 'Crea tu cuenta institucional'}</h2>
        {reason && <p className="small muted" style={{ marginTop: 0 }}>{reason}</p>}
        <div className="warn-card small">⚠ Sin registro no se puede pedir una tutoría. Tu solicitud queda asociada a tu cuenta.</div>

        <div className="login-tabs">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Iniciar sesión</button>
          <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Registrarse</button>
        </div>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <>
              <label>Nombre completo<input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required placeholder="Ej: Ana Pérez" /></label>
              <label>Quiero ingresar como
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="estudiante">Estudiante (pedir tutorías)</option>
                  <option value="tutor">Profesor / Tutor (ofrecer tutorías)</option>
                  <option value="coordinacion">Coordinación (gestionar)</option>
                </select>
              </label>
            </>
          )}
          <label>Correo<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="usuario@universidad.edu" autoComplete="username" /></label>
          <label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mínimo 6 caracteres" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>
          {error && <p className="error small">{error}</p>}
          <button className="btn-dark" style={{ marginTop: 6 }} type="submit" disabled={loading}>{loading ? 'Verificando…' : mode === 'login' ? 'Entrar' : 'Crear cuenta y continuar'}</button>
        </form>

        <div className="side-section">VER PANELES · ACCESO DEMO SIN CONTRASEÑA</div>
        <div className="btn-row">
          <button className="small grow" onClick={() => demo('estudiante')}>👩‍🎓 Estudiante</button>
          <button className="small grow" onClick={() => demo('tutor')}>👨‍🏫 Profesor</button>
          <button className="small grow" onClick={() => demo('coordinacion')}>🛡️ Admin</button>
        </div>
        <p className="tiny muted">Demo: estudiante@demo.edu · tutor@demo.edu · coord@demo.edu (clave demo1234).</p>
      </div>
    </div>
  )
}
