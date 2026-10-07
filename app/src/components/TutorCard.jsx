export default function TutorCard({ tutor }) {
  const name = tutor.short || tutor.name
  return (
    <div className="tutor-card">
      <div className="avatar">{tutor.initials || name?.slice(0, 2).toUpperCase()}</div>
      <div style={{ minWidth: 0 }}>
        <strong className="small">{name}</strong>
        <div className="badges">
          <span className="badge">{tutor.subject}</span>
          <span className="badge outline">{tutor.mastery_level}</span>
        </div>
        <p className="muted tiny" style={{ margin: '2px 0' }}>{tutor.experience_years} años experiencia{tutor.rating ? ` · ★ ${tutor.rating}` : ''}</p>
        <p className="status" style={{ margin: 0 }}>● Disponible</p>
        {tutor.description && <p className="muted tiny" style={{ margin: '4px 0 0' }}>{tutor.description}</p>}
      </div>
    </div>
  )
}
