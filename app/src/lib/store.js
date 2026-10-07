// Store local demo: auth por rol + solicitudes. Supabase Auth se usa si hay sesión real;
// si no, este store sostiene el gate "sin registro no hay tutoría" para la hackatón.
// security: valida inputs, errores genéricos, nunca guarda ni loguea contraseñas en claro fuera de este módulo demo.
const USERS_KEY = 'peermatch_users_v1'
const SESSION_KEY = 'peermatch_session_v1'
const REQ_KEY = 'peermatch_requests_v1'

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
function writeJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* cuota llena: se ignora en demo */ }
}

export const ROLES = ['estudiante', 'tutor', 'coordinacion']

export function validEmail(v) {
  const s = String(v || '').trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 120
}
function validPassword(v) {
  return typeof v === 'string' && v.length >= 6 && v.length <= 72
}
function validName(v) {
  const s = String(v || '').trim()
  return s.length >= 2 && s.length <= 80
}

function seedUsers() {
  const existing = readJSON(USERS_KEY, null)
  if (existing) return existing
  const seed = [
    { name: 'Estudiante Demo', email: 'estudiante@demo.edu', password: 'demo1234', role: 'estudiante' },
    { name: 'Tutor Demo', email: 'tutor@demo.edu', password: 'demo1234', role: 'tutor' },
    { name: 'Dra. Claudia', email: 'coord@demo.edu', password: 'demo1234', role: 'coordinacion' },
  ]
  writeJSON(USERS_KEY, seed)
  return seed
}

export function registerUser({ name, email, password, role }) {
  const users = seedUsers()
  const cleanEmail = String(email || '').trim().toLowerCase()
  if (!validName(name)) throw new Error('Escribe tu nombre completo.')
  if (!validEmail(cleanEmail)) throw new Error('Usa un correo válido para registrarte.')
  if (!validPassword(password)) throw new Error('La contraseña debe tener al menos 6 caracteres.')
  if (!ROLES.includes(role)) throw new Error('Rol no válido.')
  if (users.some((u) => u.email === cleanEmail)) throw new Error('Este correo ya está registrado. Inicia sesión.')
  const user = { name: String(name).trim().slice(0, 80), email: cleanEmail, password, role }
  users.push(user)
  writeJSON(USERS_KEY, users)
  writeJSON(SESSION_KEY, { email: user.email, name: user.name, role: user.role })
  return { email: user.email, name: user.name, role: user.role }
}

export function loginUser({ email, password }) {
  const users = seedUsers()
  const cleanEmail = String(email || '').trim().toLowerCase()
  if (!validEmail(cleanEmail) || !validPassword(password)) throw new Error('Credenciales incorrectas.')
  const found = users.find((u) => u.email === cleanEmail && u.password === password)
  if (!found) throw new Error('Credenciales incorrectas.')
  const session = { email: found.email, name: found.name, role: found.role }
  writeJSON(SESSION_KEY, session)
  return session
}

export function demoLogin(role) {
  const map = {
    estudiante: { email: 'estudiante@demo.edu', name: 'Estudiante Demo', role: 'estudiante' },
    tutor: { email: 'tutor@demo.edu', name: 'Tutor Demo', role: 'tutor' },
    coordinacion: { email: 'coord@demo.edu', name: 'Dra. Claudia', role: 'coordinacion' },
  }
  const session = map[role] || map.estudiante
  seedUsers()
  writeJSON(SESSION_KEY, session)
  return session
}

export function getSession() {
  return readJSON(SESSION_KEY, null)
}

export function logoutLocal() {
  try { localStorage.removeItem(SESSION_KEY) } catch { /* noop */ }
}

// ---- Solicitudes (blinda duplicados por estudiante+materia) ----
function seedRequests() {
  const existing = readJSON(REQ_KEY, null)
  if (existing) return existing
  const seed = [
    { id: 'P25-001-09412', student: 'Carlos Ruiz', studentEmail: 'estudiante@demo.edu', subject: 'Cálculo Diferencial (MAT-101)', level: 'Intermedio', schedule: '10:00 hrs', status: 'Activa', createdAt: Date.now() - 86400000 },
    { id: 'P25-001-1187', student: 'Matías Delgado', studentEmail: 'estudiante@demo.edu', subject: 'Astrofísica General (AST-301)', level: 'Intermedio', schedule: 'Jueves 10:00–17:00', status: 'En espera', createdAt: Date.now() - 43200000 },
  ]
  writeJSON(REQ_KEY, seed)
  return seed
}

export function getRequests() {
  return seedRequests()
}

export function createRequest({ student, studentEmail, subject, level, schedule, notes }) {
  const all = seedRequests()
  const subj = String(subject || '').slice(0, 120)
  const mail = String(studentEmail || '').toLowerCase()
  if (!subj) throw new Error('Elige una materia.')
  // UPSERT: si ya existe misma materia del mismo estudiante, actualiza en vez de duplicar.
  const dup = all.find((r) => r.studentEmail === mail && r.subject === subj)
  if (dup) {
    dup.level = level || dup.level
    dup.schedule = schedule || dup.schedule
    dup.status = 'Activa'
    writeJSON(REQ_KEY, all)
    return { ...dup, updated: true }
  }
  const id = 'P25-' + String(Math.floor(100 + Math.random() * 900)) + '-' + String(Date.now()).slice(-4)
  const row = {
    id,
    student: String(student || 'Estudiante').slice(0, 80),
    studentEmail: mail,
    subject: subj,
    level: String(level || 'Intermedio').slice(0, 20),
    schedule: String(schedule || '').slice(0, 60),
    notes: String(notes || '').slice(0, 500),
    status: 'Activa',
    createdAt: Date.now(),
  }
  all.unshift(row)
  writeJSON(REQ_KEY, all)
  return row
}

export function setRequestStatus(id, status) {
  const all = seedRequests()
  const row = all.find((r) => r.id === id)
  if (!row) return all
  row.status = status
  writeJSON(REQ_KEY, all)
  return [...all]
}
