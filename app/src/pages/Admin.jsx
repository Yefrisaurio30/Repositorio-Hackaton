import { useState } from 'react'
import SimAltaTutor from '../components/SimAltaTutor.jsx'
import SimUpsert from '../components/SimUpsert.jsx'
import SimSinTutores from '../components/SimSinTutores.jsx'

// Panel COORDINACIÓN / ADMIN simplificado: solo lo esencial.
// La validación algorítmica avanzada queda colapsada (no estorba el día a día).
export default function Admin({ user, requests, tutors, onStatus }) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const pendientes = requests.filter((r) => r.status === 'Activa' || r.status === 'En espera')

  return (
    <div>
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="pm-card-head">
          <span className="mini-badge">🛡️ Coordinación · Vista simple</span>
          <span className="mini-code">{user.email}</span>
        </div>
        <h2 style={{ margin: '6px 0' }}>Resumen de hoy</h2>
        <p className="small muted" style={{ marginTop: 0 }}>Solo 4 números y 2 tablas. Sin configuraciones técnicas a la vista.</p>
        <div className="pm-metrics" style={{ marginTop: 8 }}>
          <div className="card metric"><div className="metric-ico">📝</div><div><b>{requests.length}</b><span>Solicitudes totales</span></div></div>
          <div className="card metric"><div className="metric-ico">⏳</div><div><b>{pendientes.length}</b><span>Pendientes</span></div></div>
          <div className="card metric"><div className="metric-ico">👥</div><div><b>{tutors.length}</b><span>Tutores activos</span></div></div>
          <div className="card metric"><div className="metric-ico">◎</div><div><b>94.2%</b><span>Aceptación</span></div></div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <b>Solicitudes pendientes ({pendientes.length})</b>
        <table className="table">
          <thead><tr><th>FOLIO</th><th>ESTUDIANTE</th><th>MATERIA</th><th>ESTADO</th><th>ACCIÓN</th></tr></thead>
          <tbody>
            {pendientes.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.student}</td><td>{r.subject}</td><td>{r.status}</td>
                <td style={{ display: 'flex', gap: 6 }}>
                  <button className="small btn-calc" onClick={() => onStatus(r.id, 'Aceptada')}>Aprobar</button>
                  <button className="small" onClick={() => onStatus(r.id, 'Rechazada')}>Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <b>Tutores acreditados ({tutors.length})</b>
        <table className="table">
          <thead><tr><th>NOMBRE</th><th>MATERIA</th><th>NIVEL</th></tr></thead>
          <tbody>{tutors.map((t) => <tr key={t.id}><td>{t.short || t.name}</td><td>{t.subject}</td><td>{t.mastery_level}</td></tr>)}</tbody>
        </table>
      </div>

      <div className="card">
        <div className="pm-card-head">
          <b className="small">Validación avanzada (solo para auditoría)</b>
          <button className="small" onClick={() => setShowAdvanced((v) => !v)}>{showAdvanced ? 'Ocultar ▲' : 'Mostrar ▼'}</button>
        </div>
        {!showAdvanced && <p className="small muted">Casos de integridad anti-duplicados, UPSERT y materias sin cobertura. Oculto para no complicar la gestión diaria.</p>}
        {showAdvanced && (
          <div style={{ display: 'grid', gap: 14 }}>
            <SimAltaTutor />
            <SimUpsert />
            <SimSinTutores />
          </div>
        )}
      </div>
    </div>
  )
}
