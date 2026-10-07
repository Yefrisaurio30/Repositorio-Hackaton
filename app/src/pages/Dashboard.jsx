import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { DEMO_SUBJECTS, DEMO_TUTORS } from '../data/demoTutors.js'
import { getRequests, createRequest, setRequestStatus } from '../lib/store.js'
import TutorCard from '../components/TutorCard.jsx'
import Student from './Student.jsx'
import Tutor from './Tutor.jsx'
import Admin from './Admin.jsx'

const NAVS = {
  estudiante: [
    { id: 'nueva', label: 'Nueva tutoría', icon: '＋' },
    { id: 'mis', label: 'Mis solicitudes', icon: '📝' },
    { id: 'directorio', label: 'Directorio', icon: '👥' },
  ],
  tutor: [
    { id: 'solicitudes', label: 'Solicitudes', icon: '📥' },
    { id: 'mias', label: 'Mis tutorías', icon: '📚' },
  ],
  coordinacion: [
    { id: 'resumen', label: 'Resumen', icon: '▦' },
    { id: 'solicitudes', label: 'Solicitudes', icon: '📝' },
    { id: 'tutores', label: 'Tutores', icon: '👥' },
  ],
}

const ROLE_LABEL = { estudiante: 'ESTUDIANTE', tutor: 'PROFESOR / TUTOR', coordinacion: 'COORDINACIÓN' }

// Shell por rol: cada rol ve solo su panel. Sin suite técnica a la vista
// (admin la tiene colapsada dentro de su panel simple).
export default function Dashboard({ user, role, onLogout, onSwitchRole, onPublic }) {
  const [section, setSection] = useState('main')
  const [tutors, setTutors] = useState(DEMO_TUTORS)
  const [subjects] = useState(DEMO_SUBJECTS)
  const [requests, setRequests] = useState(() => getRequests())
  const [source, setSource] = useState('demo local')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [{ data: _s }, { data: t }] = await Promise.all([
          supabase.from('subjects').select('name'),
          supabase.from('tutors').select('*').eq('active', true),
        ])
        if (t?.length) {
          setTutors(t.map((x) => ({
            id: x.id, name: x.name, short: x.name, initials: x.name.split(' ').map((w) => w[0]).slice(0, 2).join(''),
            subject: x.subject, mastery_level: x.mastery_level,
            experience_years: x.experience_years, description: x.description, active: x.active,
          })))
          setSource('Supabase')
        }
      } catch { setSource('demo local') }
    }
    load()
  }, [])

  const filteredTutors = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return tutors
    return tutors.filter((t) => `${t.name} ${t.subject}`.toLowerCase().includes(q))
  }, [tutors, search])

  function handleCreate({ subject, level, schedule, notes }) {
    const row = createRequest({ student: user.name, studentEmail: user.email, subject, level, schedule, notes })
    setRequests(getRequests())
    return row
  }
  function handleStatus(id, status) {
    setRequests(setRequestStatus(id, status))
  }

  const nav = NAVS[role] || NAVS.estudiante
  const mine = requests.filter((r) => r.studentEmail === user.email)

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="side-brand">
          <div className="pm-logo">P</div>
          <div><b className="small">PeerMatch</b><div className="tiny muted">Panel · {ROLE_LABEL[role] || role}</div></div>
        </div>
        <nav className="side-nav">
          {nav.map((n) => (
            <button key={n.id} className="side-btn" onClick={() => setSection(n.id)}>
              <span>{n.icon}</span> {n.label}
            </button>
          ))}
        </nav>
        <div className="side-section">VER OTRO PANEL (DEMO)</div>
        <div className="side-nav">
          <button className="side-btn" onClick={() => onSwitchRole('estudiante')}>👩‍🎓 Estudiante</button>
          <button className="side-btn" onClick={() => onSwitchRole('tutor')}>👨‍🏫 Profesor</button>
          <button className="side-btn" onClick={() => onSwitchRole('coordinacion')}>🛡️ Coordinación</button>
          <button className="side-btn" onClick={onPublic}>🌐 Vista pública</button>
        </div>
        <div className="side-status">
          <span className="dot" /> <b className="tiny">{user.name}</b>
          <div className="tiny muted">{user.email} · {source}</div>
          <button className="tiny" style={{ marginTop: 8, width: '100%' }} onClick={onLogout}>Salir</button>
        </div>
      </aside>

      <div className="main">
        <div className="topbar-app">
          <div className="search">⌕ <input placeholder="Buscar tutor o materia…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <span className="pill-live"><span className="dot" /> EN VIVO · {ROLE_LABEL[role] || role}</span>
          <div className="user-chip"><div className="avatar" style={{ width: 32, height: 32, fontSize: 12 }}>{user.name.slice(0, 2).toUpperCase()}</div><div>{user.name}</div></div>
        </div>

        {role === 'estudiante' && (section === 'directorio' ? (
          <><div className="card" style={{ marginBottom: 12 }}><b>Directorio de tutores ({filteredTutors.length})</b></div>
          <div className="grid">{filteredTutors.map((t) => <TutorCard key={t.id} tutor={t} />)}</div></>
        ) : section === 'mis' ? (
          <div className="card"><b>Mis solicitudes ({mine.length})</b>
            <table className="table"><thead><tr><th>FOLIO</th><th>MATERIA</th><th>ESTADO</th></tr></thead>
            <tbody>{mine.map((r) => <tr key={r.id}><td>{r.id}</td><td>{r.subject}</td><td>{r.status}</td></tr>)}</tbody></table>
            <button className="small" style={{ marginTop: 8 }} onClick={() => setSection('nueva')}>＋ Nueva tutoría</button>
          </div>
        ) : (
          <Student user={user} tutors={filteredTutors} subjects={subjects} requests={requests} onCreateRequest={handleCreate} source={source} />
        ))}

        {role === 'tutor' && <Tutor user={user} requests={requests} onStatus={handleStatus} />}

        {role === 'coordinacion' && (section === 'tutores' ? (
          <div className="card"><b>Tutores acreditados ({filteredTutors.length})</b>
            <div className="grid" style={{ marginTop: 10 }}>{filteredTutors.map((t) => <TutorCard key={t.id} tutor={t} />)}</div>
          </div>
        ) : section === 'solicitudes' ? (
          <div className="card"><b>Todas las solicitudes ({requests.length})</b>
            <table className="table"><thead><tr><th>FOLIO</th><th>ESTUDIANTE</th><th>MATERIA</th><th>ESTADO</th><th>ACCIÓN</th></tr></thead>
            <tbody>{requests.map((r) => <tr key={r.id}><td>{r.id}</td><td>{r.student}</td><td>{r.subject}</td><td>{r.status}</td>
              <td style={{ display: 'flex', gap: 6 }}><button className="small btn-calc" onClick={() => handleStatus(r.id, 'Aceptada')}>Aprobar</button><button className="small" onClick={() => handleStatus(r.id, 'Rechazada')}>Rechazar</button></td></tr>)}
            </tbody></table>
          </div>
        ) : (
          <Admin user={user} requests={requests} tutors={tutors} onStatus={handleStatus} />
        ))}
      </div>
    </div>
  )
}
