import { useState } from 'react'

// Mockup 2 · Tab 1 — Integridad de Tutores (Anti-Duplicados).
// Simula POST /tutors con restricción UNIQUE (email/RUT) → PG 23505.
export default function SimAltaTutor() {
  const [form, setForm] = useState({
    nombre: 'Ana Pérez',
    rut: '28.***.***-k',
    email: 'ana.perez@alumnos.edu',
    asignatura: 'Cálculo Vectorial (MAT-210)',
    certificado: 'Certificado Nivel B2 (Válida)',
    asignacion: 'Cálculo Vectorial (MAT-210)',
  })
  const [result, setResult] = useState(null)

  function procesar() {
    // Regla institucional: el correo ya existe → violación UNIQUE.
    setResult({
      duplicate: true,
      at: new Date().toLocaleTimeString(),
    })
  }

  return (
    <div className="two-col">
      <div className="card">
        <div className="pm-card-head">
          <b className="small">🏠 Simulador de Alta de Tutor</b>
          <span className="status-ok">● CONSTRAINT ACTIVE</span>
        </div>
        <p className="small muted">Demuestre la integridad de los datos de la aplicación en el alta de tutores duplicados.</p>
        <div className="form-grid">
          <label>Nombre Completo<input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} /></label>
          <label>RUT / Cédula Institucional<input value={form.rut} onChange={(e) => setForm({ ...form, rut: e.target.value })} /></label>
          <label className="full">Correo Institucional<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>Asignatura Principal
            <select value={form.asignatura} onChange={(e) => setForm({ ...form, asignatura: e.target.value })}>
              <option>Cálculo Vectorial (MAT-210)</option>
              <option>Cálculo Diferencial (MAT-101)</option>
              <option>Álgebra Lineal (MAT-122)</option>
            </select>
          </label>
          <label>Certificado Nivel
            <select value={form.certificado} onChange={(e) => setForm({ ...form, certificado: e.target.value })}>
              <option>Certificado Nivel B2 (Válida)</option>
              <option>Certificado Nivel C1 (Válida)</option>
              <option>Pendiente de validación</option>
            </select>
          </label>
        </div>
        <div className="btn-row">
          <button className="btn-light" onClick={() => setResult(null)}>Restablecer Datos</button>
          <button className="btn-calc grow" onClick={procesar}>⛔ Procesar Alta de Tutor</button>
        </div>

        {result?.duplicate && (
          <div className="err-box">
            <h4>⛔ Certificado de Integridad Relacional: Violación de Restricción UNIQUE</h4>
            <p><b>HTTP 409 · Restricción UNIQUE</b></p>
            <p>Inferir que el expediente registrado en el sistema. Conflicto de unicidad detectado en <b>{form.email}</b>. La transacción fue revertida (rollback) para preservar la consistencia.</p>
            <div className="code">PG_ERROR_23505: duplicate key value violates unique constraint{'\n'}"tutors_email_key"{'\n'}DETAIL: Key (email)=({form.email}) already exists.{'\n'}HINT: Un tutor con este correo ya está acreditado y activo.</div>
          </div>
        )}
      </div>

      <aside className="card explain">
        <h4>ⓘ CÓMO EXPLICARLO EN EL PITCH INSTITUCIONAL</h4>
        <blockquote>“Nuestra base de datos es <b>Segura</b> y la validación en el <b>backend evita restricciones únicas</b> para evitar colisiones de datos.”</blockquote>
        <div className="check-li"><i>✓</i><span>Variable para el jurado: No hay riesgo de duplicar tutores ni de corromper la nómina oficial.</span></div>
        <div className="check-li"><i>✓</i><span>Garantía de unicidad a nivel de esquema, no solo de formulario.</span></div>
      </aside>
    </div>
  )
}
