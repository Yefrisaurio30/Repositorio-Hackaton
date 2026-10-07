import { useState } from 'react'
import { parseNaturalRequest, findBestTutor } from '../utils/matching.js'
import TutorCard from '../components/TutorCard.jsx'
import MatchResult from '../components/MatchResult.jsx'

const LEVELS = ['Básico', 'Intermedio', 'Avanzado']

// Panel ESTUDIANTE: solo accesible con sesión rol estudiante.
// Aquí SÍ se puede pedir tutoría (gate ya superado en App).
export default function Student({ user, tutors, subjects, requests, onCreateRequest, source }) {
  const [query, setQuery] = useState('Necesito preparar el examen de Cálculo Diferencial mañana a las 4:00 PM…')
  const [subject, setSubject] = useState(subjects[0])
  const [level, setLevel] = useState('Intermedio')
  const [result, setResult] = useState(null)
  const [notice, setNotice] = useState('')

  const mine = requests.filter((r) => r.studentEmail === user.email)

  function buscar() {
    const p = parseNaturalRequest(query, subjects)
    const subj = p.subject || subject
    const lvl = p.level || level
    setSubject(subj); setLevel(lvl)
    setResult(findBestTutor(lvl, subj, tutors))
    setNotice('')
  }

  function confirmar() {
    if (!result || result.error) {
      // Materia sin cobertura: igual se registra en espera (ver SimSinTutores).
      try {
        onCreateRequest({ subject, level, schedule: '', notes: query })
        setNotice('Quedaste en lista de espera. Te avisaremos cuando haya un tutor.')
        setResult(null)
      } catch (err) { setNotice(err.message) }
      return
    }
    try {
      const row = onCreateRequest({ subject, level, schedule: '', notes: query })
      setNotice(row.updated ? 'Ya tenías esta solicitud: la actualizamos en vez de duplicarla.' : `Solicitud ${row.id} enviada. Tu tutor sugerido: ${row.subject}.`)
      setResult(null)
    } catch (err) { setNotice(err.message) }
  }

  return (
    <div>
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="pm-card-head">
          <span className="mini-badge">👩‍🎓 Panel del Estudiante</span>
          <span className="mini-code">{user.email}</span>
        </div>
        <h2 style={{ margin: '6px 0' }}>Hola, {user.name} — pide tu tutoría</h2>
        <p className="small muted" style={{ marginTop: 0 }}>Estás registrado, por eso puedes solicitar. Cada materia genera una sola solicitud activa (si la repites, se actualiza).</p>
        <label>DESCRIBE LO QUE NECESITAS<textarea value={query} onChange={(e) => setQuery(e.target.value)} maxLength={500} /></label>
        <div className="form-grid">
          <label>Materia<select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            <option value="Astrofísica General (AST-301)">Astrofísica General (AST-301) — sin cobertura</option>
          </select></label>
          <label>Nivel<div className="levels">{LEVELS.map((l) => <button key={l} type="button" className={l === level ? 'btn-calc' : ''} onClick={() => setLevel(l)}>{l}</button>)}</div></label>
        </div>
        <button className="btn-primary" onClick={buscar}>🔍 Buscar mi tutor compatible</button>
        {notice && <p className="small ok">{notice}</p>}
      </div>

      {result && (
        <div style={{ marginBottom: 14 }}>
          <MatchResult result={result} subject={subject} level={level} onBack={() => setResult(null)} onRequest={confirmar} />
        </div>
      )}

      <div className="two-col">
        <div className="card">
          <b>Mis solicitudes ({mine.length})</b>
          {mine.length === 0 && <p className="small muted">Aún no pides tutorías. Busca arriba tu primera.</p>}
          <table className="table">
            <thead><tr><th>FOLIO</th><th>MATERIA</th><th>ESTADO</th></tr></thead>
            <tbody>{mine.map((r) => <tr key={r.id}><td>{r.id}</td><td>{r.subject}</td><td>{r.status}</td></tr>)}</tbody>
          </table>
        </div>
        <aside className="card explain">
          <h4>TUTORES DISPONIBLES</h4>
          <div style={{ display: 'grid', gap: 8 }}>
            {tutors.slice(0, 3).map((t) => <TutorCard key={t.id} tutor={t} />)}
          </div>
          <p className="tiny muted">Motor 40/40/20 · Fuente: {source}</p>
        </aside>
      </div>
    </div>
  )
}
