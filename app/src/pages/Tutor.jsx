import { useState } from 'react'

// Panel PROFESOR / TUTOR: solicitudes para atender, disponibilidad y perfil.
export default function Tutor({ user, requests, onStatus }) {
  const [available, setAvailable] = useState(true)
  const activas = requests.filter((r) => r.status === 'Activa')
  const mias = requests.filter((r) => r.status === 'Aceptada')

  return (
    <div>
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="pm-card-head">
          <span className="mini-badge green">👨‍🏫 Panel del Profesor / Tutor</span>
          <span className="mini-code">{user.email}</span>
        </div>
        <h2 style={{ margin: '6px 0' }}>Hola, {user.name}</h2>
        <p className="small muted" style={{ marginTop: 0 }}>Acepta solicitudes de estudiantes, marca tu disponibilidad y sigue tus horas.</p>
        <div className="pm-metrics" style={{ marginTop: 8 }}>
          <div className="card metric"><div className="metric-ico">📚</div><div><b>{mias.length}</b><span>Tutorías aceptadas</span></div></div>
          <div className="card metric"><div className="metric-ico">⏰</div><div><b>{available ? 'Disponible' : 'Pausado'}</b><span>Estado hoy</span></div></div>
          <div className="card metric"><div className="metric-ico">★</div><div><b>4.8</b><span>Valoración media</span></div></div>
        </div>
        <div className="btn-row">
          <button className={available ? 'btn-calc grow' : 'grow'} onClick={() => setAvailable((v) => !v)}>
            {available ? '● Estoy disponible' : '○ Pausar solicitudes'}
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <b>Solicitudes de estudiantes para atender ({activas.length})</b>
        <p className="small muted">Solo ves solicitudes activas. Al aceptar, pasan a tu lista y desaparecen de la bolsa común.</p>
        <table className="table">
          <thead><tr><th>FOLIO</th><th>ESTUDIANTE</th><th>MATERIA</th><th>ACCIÓN</th></tr></thead>
          <tbody>
            {activas.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.student}</td><td>{r.subject}</td>
                <td style={{ display: 'flex', gap: 6 }}>
                  <button className="small btn-calc" disabled={!available} onClick={() => onStatus(r.id, 'Aceptada')}>Aceptar</button>
                  <button className="small" onClick={() => onStatus(r.id, 'Rechazada')}>Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {activas.length === 0 && <p className="small muted">No hay solicitudes pendientes. Buen momento para actualizar tu perfil.</p>}
      </div>

      <div className="card">
        <b>Mis tutorías aceptadas ({mias.length})</b>
        <table className="table">
          <thead><tr><th>FOLIO</th><th>ESTUDIANTE</th><th>MATERIA</th><th>ESTADO</th></tr></thead>
          <tbody>{mias.map((r) => <tr key={r.id}><td>{r.id}</td><td>{r.student}</td><td>{r.subject}</td><td><span className="status-ok">{r.status}</span></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}
