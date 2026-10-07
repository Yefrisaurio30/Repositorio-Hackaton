import { useState } from 'react'
import TutorCard from '../components/TutorCard.jsx'

const QUICK = ['Cálculo Integral', 'Álgebra Lineal', 'Introducción al Cálculo', 'Física']

// Vista PÚBLICA: informa y muestra tutores, pero NO permite pedir tutoría sin registro.
// Cualquier CTA de solicitud llama a onRequireAuth() que abre el registro.
export default function Public({ tutors, onRequireAuth, onLogin, onDemo }) {
  const [query, setQuery] = useState('Necesito preparar el examen de Cálculo Diferencial mañana a las 4:00 PM…')
  const [quickSel, setQuickSel] = useState(['Cálculo Integral'])

  function toggleQuick(q) {
    setQuickSel((p) => (p.includes(q) ? p.filter((x) => x !== q) : [...p, q]))
  }

  return (
    <div>
      <header className="pm-topbar">
        <div className="pm-brand">
          <div className="pm-logo">P</div>
          <div><b>PeerMatch</b><small>Coordinación Académica · Sistema Institucional de Tutorías</small></div>
        </div>
        <div className="pm-top-right">
          <span className="pill-live"><span className="dot" /> PERIODO LECTIVO 2025-1 ACTIVO</span>
          <button className="small" onClick={onLogin}>Iniciar sesión</button>
          <button className="small btn-calc" onClick={() => onRequireAuth('Crea tu cuenta de estudiante para pedir una tutoría.')}>Registrarse</button>
        </div>
      </header>

      <section className="pm-hero">
        <span className="pm-platform">◎ PLATAFORMA ALGORÍTMICA DE EMPAREJAMIENTO ACADÉMICO</span>
        <h1>Conexión académica de alto rendimiento entre pares</h1>
        <p>Explora tutores acreditados. Para pedir una tutoría debes registrarte como estudiante — sin registro no se genera ninguna solicitud.</p>
        <div className="btn-row" style={{ maxWidth: 560, margin: '12px auto 0' }}>
          <button className="btn-calc grow" onClick={() => onRequireAuth('Regístrate como estudiante para pedir tu primera tutoría.')}>Quiero pedir una tutoría</button>
          <button className="grow" onClick={onLogin}>Ya tengo cuenta</button>
        </div>
      </section>

      <section className="pm-split">
        <div className="card">
          <div className="pm-card-head">
            <span className="mini-badge">◇ Vista pública · Solo lectura</span>
            <span className="mini-code">ESTUDIANTE</span>
          </div>
          <h2>¿Necesitas apoyo académico inmediato?</h2>
          <p className="desc">Escríbenos qué necesitas. Al continuar te pediremos tu cuenta para asociar la solicitud a tu nombre — <b>los visitantes no pueden enviar solicitudes</b>.</p>
          <label>¿QUÉ MATERIA NECESITAS HOY?
            <textarea value={query} onChange={(e) => setQuery(e.target.value)} maxLength={500} />
          </label>
          <div className="quick-row">
            {QUICK.map((q) => (
              <label key={q} className="quick-chip"><input type="checkbox" checked={quickSel.includes(q)} onChange={() => toggleQuick(q)} /> {q}</label>
            ))}
          </div>
          <div className="warn-card small">🔒 Para ver tu tutor compatible y enviar la solicitud, inicia sesión o crea tu cuenta.</div>
          <button className="btn-primary" onClick={() => onRequireAuth(query, 'Inicia sesión para calcular tu compatibilidad y enviar la solicitud.', query)}>🔍 Buscar Tutor — requiere registro →</button>
        </div>

        <div className="card">
          <div className="pm-card-head">
            <span className="mini-badge green">✔ Programa de Tutores Pares</span>
            <span className="mini-code">PROFESOR / TUTOR</span>
          </div>
          <h2>Portal Oficial de Tutores</h2>
          <p className="desc">Si eres profesor o tutor par, accede a tu panel para ver solicitudes asignadas, marcar disponibilidad y registrar tus horas.</p>
          <div className="grid2" style={{ margin: '10px 0' }}>
            {['Créditos de Formación', 'Bonificación de Horas', 'Mentoría y Mérito'].map((b) => (
              <div key={b} className="tiny muted" style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '6px 8px', textAlign: 'center' }}>{b}</div>
            ))}
          </div>
          <button className="btn-dark" onClick={onLogin}>🔓 Acceder al Panel del Profesor / Tutor</button>
          <button className="btn-ghost small" style={{ width: '100%', marginTop: 10 }} onClick={() => onDemo('tutor')}>Ver panel de profesor (demo)</button>
          <div className="link-row"><span className="muted">¿Eres estudiante?</span><button className="tiny" style={{ border: 0, background: 'none', color: 'var(--primary)', fontWeight: 700 }} onClick={() => onDemo('estudiante')}>Ver panel de estudiante (demo) →</button></div>
        </div>
      </section>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="pm-card-head"><b>Directorio público de tutores ({tutors.length})</b><span className="mini-code">SOLO LECTURA</span></div>
        <p className="small muted" style={{ marginTop: 0 }}>Muestra de tutores acreditados. El contacto y la solicitud requieren registro.</p>
        <div className="grid">
          {tutors.slice(0, 4).map((t) => <TutorCard key={t.id} tutor={t} />)}
        </div>
      </div>

      <section className="pm-metrics">
        <div className="card metric"><div className="metric-ico">👥</div><div><b>1,248</b><span>Emparejamientos Exitosos</span></div></div>
        <div className="card metric"><div className="metric-ico">◎</div><div><b>94.2%</b><span>Tasa de Aceptación Algorítmica</span></div></div>
        <div className="card metric"><div className="metric-ico">🛡️</div><div><b>100%</b><span>Validación por Secretaría Académica</span></div></div>
      </section>

      <footer className="pm-foot">
        <span>🛡️ PeerMatch · Entorno Seguro de Tutorías</span>
        <span>© 2025 Dirección de Bienestar y Coordinación Académica · Mesa de Ayuda</span>
      </footer>
    </div>
  )
}
