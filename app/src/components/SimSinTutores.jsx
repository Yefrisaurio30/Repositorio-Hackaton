import { useState } from 'react'
import { RELATED_SUBJECTS } from '../data/demoTutors.js'

// Mockup 4 · Tab 3 — Ingesta con materia no impartida (tolerancia a fallos).
export default function SimSinTutores() {
  const [enCola, setEnCola] = useState(false)
  const related = RELATED_SUBJECTS['Astrofísica General (AST-301)']

  return (
    <div className="two-col">
      <div className="card">
        <div className="pm-card-head">
          <b className="small">🧪 Simulador de Ingesta con Materia No Impartida</b>
          <span className="status-warn">● FALLA CONTROLADA 206</span>
        </div>
        <div className="grid2">
          <div className="step-card"><div className="tiny muted">ESTUDIANTE SOLICITANTE</div><b className="small">Matías Delgado</b><div className="tiny muted">Reg. 2024-01187 · Ing. Física</div></div>
          <div className="step-card"><div className="tiny muted">FRANJA HORARIA REQUERIDA</div><b className="small">Jueves 10:00 – 17:00 hrs</b><div className="tiny muted">Ventana prioritaria</div></div>
        </div>
        <label style={{ marginTop: 10 }}>MATERIA SOLICITADA POR EL ALUMNO
          <input value="Astrofísica General (AST-301)" readOnly />
        </label>
        <div className="tiny muted">🔍 Reg. de Ingesta en catálogo de tutores acreditados &nbsp; <span className="mini-badge">Catalogo 2025 · Revisión</span></div>
        <div className="tiny" style={{ marginTop: 6 }}>⚙️ Pipeline de Enrutamiento Evaluado &nbsp; <b>Matching Algorítmico Ejecutando</b></div>

        <div className="warn-card" style={{ marginTop: 12 }}>
          <b className="small">⚠ Sin Tutores Acreditados para esta Asignatura</b>
          <p className="small muted">HTTP 206 · Sin contenido coincidente. Ningún tutor activo posee certificación de esta asignatura (AST-301). Ninguno posee certificación de dominio validada por Secretaría Académica para <b>Astrofísica General (AST-301)</b>. La arquitectura previene la degradación del servicio mediante políticas de fallback activo.</p>
        </div>

        <div style={{ marginTop: 12 }}><b className="small">⚙ ACCIONES ALTERNATIVAS AUTOMÁTICAS Y ENRUTAMIENTO ACTIVO</b></div>
        <div className="alt-card">
          <b className="small">1. Derivación a Lista de Espera Departamental</b>
          <p className="tiny muted">Alerta a Coordinación: se notifica al departamento para activar la vacante docente.</p>
          <button className="btn-calc" onClick={() => setEnCola(true)}>{enCola ? '✓ En Cola de Búsqueda (वर्क)' : '＋ Ingresar en Cola de Búsqueda'} &nbsp; {enCola ? '' : 'DERIVADO 503'}</button>
          {enCola && <div className="tiny ok" style={{ marginTop: 6 }}>✓ Folio AST-301-1187 en espera · Aviso enviado a Coordinación.</div>}
        </div>
        <div className="alt-card">
          <b className="small">2. Sugerencia de Asignaturas Conexas / Fundamentales</b>
          <p className="tiny muted">Enfoque estratégico: se recomiendan refuerzos analíticos con tutores activos disponibles.</p>
          <div style={{ display: 'grid', gap: 6, marginTop: 8 }}>
            {related.map((r) => (
              <div key={r.name} className="tiny" style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 8, padding: '7px 10px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{r.name}</span><b>{r.tutores} Tutores</b>
              </div>
            ))}
          </div>
        </div>
        <div className="alt-card">
          <b className="small">3. Notificación Automática a Dirección de Carrera</b>
          <p className="tiny muted">Se genera reporte de demanda emergente para instrumentar docente en AST-301.</p>
          <span className="status-ok">Enviado ✓</span>
        </div>
      </div>

      <aside className="card explain">
        <h4>ⓘ CÓMO EXPLICARLO EN EL PITCH INSTITUCIONAL</h4>
        <blockquote>“Nuestro sistema es <b>tolerante a fallos</b> y garantiza una experiencia de usuario ponderada: si la materia no se cubre como <b>Astrofísica</b>, el motor no colapsa ni arroja pantallas en blanco, sino que <b>activa inmediatamente protocolos de apoyo y sugerencias formativas</b>.”</blockquote>
        <div className="check-li"><i>✓</i><span><b>Cero Errores 500 o Pantallas en Blanco:</b> el flujo siempre entrega una salida útil y trazable.</span></div>
        <div className="check-li"><i>✓</i><span><b>Detección Temprana de Vacíos Curriculares:</b> cada fallback alimenta el mapa de demanda para abrir nuevas vacantes.</span></div>
      </aside>
    </div>
  )
}
