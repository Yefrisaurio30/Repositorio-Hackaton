export default function MatchResult({ result, subject, level, onBack, onRequest }) {
  if (!result) return null
  if (result.error) {
    return (
      <div className="card result">
        <p className="eyebrow">SIN COINCIDENCIA EXACTA — FALLBACK ACTIVO</p>
        <h2>Sin tutores acreditados para esta asignatura</h2>
        <p className="muted small">{result.error}</p>
        <div className="warn-card">
          <b className="small">El motor no deja la solicitud en blanco:</b>
          <p className="tiny muted">Te derivamos a lista de espera + asignaturas conexas con tutores activos.</p>
        </div>
        <div className="btn-row">
          <button className="secondary" onClick={onBack}>Volver al panel</button>
          {onRequest && <button className="btn-calc grow" onClick={onRequest}>Ingresar en Cola de Búsqueda</button>}
        </div>
      </div>
    )
  }
  const { best, ranking } = result
  const name = best.tutor.short || best.tutor.name
  return (
    <div className="card result">
      <p className="eyebrow">⭐ TU TUTOR RECOMENDADO</p>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div className="score-circle">{best.scores.final}%</div>
        <div><b>COMPATIBLE · {subject}</b><div className="muted small">Nivel {level} · Motor 40/40/20</div></div>
      </div>
      <div className="winner">
        <div className="avatar big">{best.tutor.initials || name.slice(0, 2)}</div>
        <div>
          <h2 style={{ margin: '4px 0' }}>{name}</h2>
          <p className="muted small" style={{ margin: 0 }}>{best.tutor.subject} · Nivel {best.tutor.mastery_level} · {best.tutor.experience_years} años</p>
        </div>
      </div>
      <h3>¿Por qué recomendamos este tutor?</h3>
      <ul className="checks">
        <li>✓ Domina la materia solicitada.</li>
        <li>✓ Su nivel es adecuado para tu nivel de aprendizaje.</li>
        <li>✓ Tiene experiencia como tutor.</li>
      </ul>
      <p className="just">{best.justification}</p>
      <h3 className="small">Desglose · Materia 40% / Nivel 40% / Experiencia 20%</h3>
      <div className="bars">
        <div><span>Materia</span><div className="bar"><i style={{ width: best.scores.subject + '%' }} /></div><b>{best.scores.subject}%</b></div>
        <div><span>Nivel</span><div className="bar"><i style={{ width: best.scores.level + '%' }} /></div><b>{best.scores.level}%</b></div>
        <div><span>Experiencia</span><div className="bar"><i style={{ width: best.scores.experience + '%' }} /></div><b>{best.scores.experience}%</b></div>
      </div>
      {ranking.length > 1 && (
        <details>
          <summary className="small">Ver otros {ranking.length - 1} candidatos</summary>
          <ul className="small">
            {ranking.slice(1).map((r) => (
              <li key={r.tutor.id}>{r.tutor.short || r.tutor.name} — {r.scores.final}% (Nivel {r.scores.level}%, Exp {r.scores.experience}%)</li>
            ))}
          </ul>
        </details>
      )}
      <div className="btn-row">
        <button className="secondary" onClick={onBack}>Volver al panel</button>
        {onRequest && <button className="btn-calc grow" onClick={onRequest}>Confirmar solicitud</button>}
      </div>
    </div>
  )
}
