// MVP: Materia 40% + Nivel 40% + Experiencia 20%
// Materia es filtro obligatorio: si no domina, queda excluido.
// + parser de lenguaje natural para el acceso inmediato del mockup 1.

const LEVEL_MATRIX = {
  'Básico': { 'Básico': 85, 'Intermedio': 100, 'Avanzado': 90, 'Experto': 80 },
  'Intermedio': { 'Básico': 70, 'Intermedio': 90, 'Avanzado': 100, 'Experto': 95 },
  'Avanzado': { 'Básico': 60, 'Intermedio': 75, 'Avanzado': 95, 'Experto': 100 },
}

export function getLevelScore(studentLevel, tutorMastery) {
  const row = LEVEL_MATRIX[studentLevel]
  if (!row) return 60
  return row[tutorMastery] ?? 60
}

export function getExperienceScore(years) {
  const y = Number(years) || 0
  if (y <= 1) return 60
  if (y <= 3) return 75
  if (y <= 5) return 90
  return 100
}

export function buildJustification(tutor, studentLevel, subjectName, scores) {
  const tName = tutor.short || tutor.name
  return `Recomendamos a ${tName} porque domina ${subjectName} (nivel ${tutor.mastery_level}), tiene un nivel adecuado para un estudiante de nivel ${String(studentLevel).toLowerCase()} y cuenta con ${tutor.experience_years} años de experiencia. Compatibilidad ${scores.final}% (Materia ${scores.subject}% · Nivel ${scores.level}% · Experiencia ${scores.experience}%).`
}

function normalize(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

// Heurística mínima para autocompletar la solicitud desde texto libre.
// Devuelve { subject, level, schedule } o null si no hay pista.
export function parseNaturalRequest(text, subjects = []) {
  const t = normalize(text)
  let subject = null
  // 1) match directo contra catálogo
  for (const s of subjects) {
    const ns = normalize(s)
    const core = ns.split('(')[0].trim()
    if (core && t.includes(core.slice(0, 8))) { subject = s; break }
    if (t.includes(ns.slice(0, 10))) { subject = s; break }
  }
  // 2) alias comunes
  if (!subject) {
    if (t.includes('diferencial') || t.includes('calculo')) subject = subjects.find((s) => normalize(s).includes('diferencial')) || subjects[0]
    else if (t.includes('vectorial')) subject = subjects.find((s) => normalize(s).includes('vectorial')) || subjects[0]
    else if (t.includes('algebra')) subject = subjects.find((s) => normalize(s).includes('algebra')) || subjects[0]
    else if (t.includes('program')) subject = subjects.find((s) => normalize(s).includes('program')) || subjects[0]
    else if (t.includes('base') || t.includes('sql')) subject = subjects.find((s) => normalize(s).includes('base')) || subjects[0]
    else if (t.includes('astrofisica')) subject = 'Astrofísica General (AST-301)'
    else if (t.includes('fisica')) subject = subjects.find((s) => normalize(s).includes('fisica')) || subjects[0]
  }
  let level = 'Intermedio'
  if (t.includes('basico') || t.includes('principiante') || t.includes('desde cero')) level = 'Básico'
  if (t.includes('avanzad') || t.includes('examen') || t.includes('urgente')) level = 'Intermedio'
  let schedule = ''
  const hm = text.match(/(\d{1,2})(:\d{2})?\s*(am|pm|hrs|h)?/i)
  if (hm) schedule = hm[0]
  if (t.includes('manana')) schedule = (schedule ? schedule + ' · ' : '') + 'mañana'
  return { subject, level, schedule, raw: text }
}

export function findBestTutor(studentLevel, subjectName, tutors) {
  const candidates = (tutors || []).filter((t) => t.active !== false && t.subject === subjectName)

  if (candidates.length === 0) {
    return { error: `No encontramos tutores disponibles para ${subjectName}.`, subject: subjectName }
  }

  const scored = candidates.map((tutor) => {
    const score_subject = 100
    const score_level = getLevelScore(studentLevel, tutor.mastery_level)
    const score_experience = getExperienceScore(tutor.experience_years)
    const score_final = Math.round(score_subject * 0.4 + score_level * 0.4 + score_experience * 0.2)
    const scores = { subject: score_subject, level: score_level, experience: score_experience, final: score_final }
    return { tutor, scores, justification: buildJustification(tutor, studentLevel, subjectName, scores) }
  })

  scored.sort((a, b) => {
    if (b.scores.final !== a.scores.final) return b.scores.final - a.scores.final
    if ((b.tutor.experience_years || 0) !== (a.tutor.experience_years || 0)) {
      return (b.tutor.experience_years || 0) - (a.tutor.experience_years || 0)
    }
    return a.tutor.name.localeCompare(b.tutor.name)
  })

  return { best: scored[0], ranking: scored }
}
