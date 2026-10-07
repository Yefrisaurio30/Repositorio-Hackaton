import { useState } from 'react'

// Mockup 3 · Tab 2 — Lógica UPSERT en Solicitudes.
// Re-envío idempotente: no duplica filas, actualiza UPDATED_AT.
export default function SimUpsert() {
  const [sends, setSends] = useState(1)
  const [updatedAt, setUpdatedAt] = useState('14:32:05 hrs')

  function reenviar() {
    setSends((s) => s + 1)
    setUpdatedAt(new Date().toLocaleTimeString() + ' hrs')
  }

  return (
    <div>
      <div className="two-col">
        <div className="card">
          <div className="pm-card-head">
            <b className="small">👤 Simulador de Persistencia y Solicitud Inteligente (UPSERT)</b>
            <span className="status-ok">● DB CONSISTENT · {sends} SEND{sends > 1 ? 'S' : ''}</span>
          </div>
          <div className="grid2">
            <div className="step-card">
              <div className="tiny muted">ESTUDIANTE</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
                <div className="avatar navy">CR</div>
                <div><b className="small">Carlos Ruiz</b><div className="tiny muted">Ing. Civil Informática · Reg. 2023-04512</div></div>
              </div>
              <div className="tiny" style={{ marginTop: 8 }}><b>PASO 1 · ACREDITADO</b><br />Materia validada (MAT-101)</div>
            </div>
            <div className="step-card">
              <div className="tiny muted">CLASE OBJETIVO</div>
              <div className="small" style={{ marginTop: 6 }}><b>Cálculo I (MAT-101)</b></div>
              <div className="tiny muted">Horario preferido</div>
              <div className="small"><b>10:00 hrs (Actualización Req.)</b></div>
              <div className="tiny" style={{ marginTop: 8 }}><b>PASO 2 · EN VIVO</b><br />UPSERT en solicitudes · <span className="ok">● SIN CONFLICTO DE DB</span></div>
            </div>
          </div>
          <div className="grid2" style={{ marginTop: 10 }}>
            <div>
              <label>Materia Solicitada<input value="Cálculo I (MAT-101)" readOnly /></label>
            </div>
            <div>
              <label>Horario<input value="10:00 hrs" readOnly /></label>
            </div>
          </div>
          <button className="btn-calc" style={{ width: '100%', marginTop: 10 }} onClick={reenviar}>⚡ Ejecutar Ingesta / Re-envío de Solicitud (UPSERT)</button>
          <div className="tiny muted" style={{ marginTop: 8 }}>ESTADO EN TIEMPO REAL: Total Filas en DB: <b>1</b> (Sin Duplicación) · Envíos simulados: {sends} · Updated_at: {updatedAt}</div>
        </div>

        <aside className="card explain">
          <h4>ⓘ CÓMO EXPLICARLO EN EL PITCH INSTITUCIONAL</h4>
          <blockquote>“Optimizamos el flujo para que un estudiante <b>no genere múltiples solicitudes idénticas</b>: el sistema actualiza su requerimiento automáticamente.”</blockquote>
          <div className="check-li"><i>✓</i><span>Idempotencia: N re-envíos → 1 sola fila viva.</span></div>
          <div className="check-li"><i>✓</i><span>Trazabilidad total: cada UPSERT refresca UPDATED_AT sin perder el folio.</span></div>
        </aside>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <b className="small">📄 Registro vivo — tabla solicitudes (folio único por estudiante + materia)</b>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead><tr><th>FOLIO</th><th>ESTUDIANTE</th><th>MATERIA</th><th>HORARIO_PREFERIDO</th><th>UPDATED_AT</th><th>ESTADO</th></tr></thead>
            <tbody>
              <tr><td>P25-001-09412</td><td>Carlos Ruiz</td><td>Cálculo I (MAT-101)</td><td>10:00 hrs</td><td>{updatedAt}</td><td><span className="status-ok">Justo ahora · Act</span></td></tr>
            </tbody>
          </table>
        </div>
        <p className="tiny muted">✓ Integridad P25-001-09412 conservada sin duplicación ante {sends} envío(s). &nbsp; Auditoría: 10.00 → 14.35.</p>
      </div>
    </div>
  )
}
