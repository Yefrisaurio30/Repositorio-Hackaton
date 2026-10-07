# PeerMatch — Conexión académica de alto rendimiento entre pares

Plataforma institucional de tutorías que empareja estudiantes con tutores acreditados
mediante un motor heurístico de compatibilidad (Materia 40% / Nivel 40% / Experiencia 20%).
Incluye solicitud en lenguaje natural, paneles por rol y suite de validación algorítmica
para coordinación académica.

## Regla principal

**Sin registro no hay tutoría.** La vista pública es de solo lectura: explorar tutores,
ver métricas y simular la búsqueda. Cualquier solicitud real exige cuenta de estudiante,
y cada solicitud queda asociada a esa cuenta (una fila activa por estudiante + materia:
si se repite, se actualiza en vez de duplicarse — lógica UPSERT).

## Acceso rápido (demo, sin Supabase)

| Rol | Correo | Clave | Ve |
|---|---|---|---|
| Estudiante | `estudiante@demo.edu` | `demo1234` | Pedir tutorías, mis solicitudes, directorio |
| Profesor / Tutor | `tutor@demo.edu` | `demo1234` | Bolsa de solicitudes, aceptar/rechazar, disponibilidad |
| Coordinación | `coord@demo.edu` | `demo1234` | Resumen, aprobar solicitudes, tutores, validación avanzada (colapsada) |

Desde la vista pública también hay botones “Ver panel (demo)” para saltar directo a cada rol.

## Stack

- **Frontend:** React 19 + Vite 8 (`app/`)
- **Backend / Auth:** Supabase (PostgreSQL + Auth). Sin conexión, la app cae a modo demo local
  (`localStorage`: usuarios, sesión y solicitudes seed) para que la presentación nunca se caiga.
- **Lint:** oxlint (`npm run lint`)

## Estructura

```
HACKATON/
├── README.MD
└── app/
    ├── src/
    │   ├── App.jsx                  # Gate central: pública si no hay sesión, panel si la hay
    │   ├── pages/
    │   │   ├── Public.jsx           # Vista pública (solo lectura + CTAs a registro)
    │   │   ├── Student.jsx          # Panel estudiante (pide tutorías)
    │   │   ├── Tutor.jsx            # Panel profesor (atiende solicitudes)
    │   │   ├── Admin.jsx            # Panel coordinación (simple; validación colapsada)
    │   │   ├── Dashboard.jsx        # Shell + router por rol
    │   │   └── Login.jsx            # Re-export legado hacia Public
    │   ├── components/
    │   │   ├── AuthDialog.jsx       # Login / registro / accesos demo
    │   │   ├── MatchResult.jsx      # Resultado con desglose 40/40/20
    │   │   ├── TutorCard.jsx
    │   │   └── SimAltaTutor.jsx / SimUpsert.jsx / SimSinTutores.jsx  # Suite avanzada
    │   ├── data/demoTutors.js       # Catálogo demo (MAT-101, MAT-210, …)
    │   ├── utils/matching.js        # Scoring + parser de lenguaje natural
    │   └── lib/
    │       ├── supabase.js          # Cliente (lee .env)
    │       └── store.js             # Auth local + solicitudes (RBAC demo)
    ├── supabase.sql                 # Esquema: subjects, tutors + RLS lectura pública
    └── .env                         # VITE_SUPABASE_URL + ANON_KEY (no se commitea)
```

## Puesta en marcha

```bash
cd app
npm install
```

Crear `app/.env` (ver claves en el mensaje del equipo — nunca se commitea):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

En Supabase Dashboard → SQL Editor, ejecutar `app/supabase.sql` (crea `subjects` y
`tutors` con lectura pública y datos semilla). El usuario demo de Auth se crea en
Authentication → Users, o usa el modo demo local.

```bash
npm run dev      # desarrollo
npm run build    # producción (verificado)
npm run lint     # oxlint
npm run preview  # previsualizar build
```

## Ramas (GitHub Flow)

Trabajo organizado en `feature/*` apiladas sobre `main`:

- `feature/base-diseno` — sistema visual, datos y motor de matching
- `feature/auth-gate` — registro obligatorio y vista pública
- `feature/panel-estudiante` — solicitud con compatibilidad
- `feature/panel-profesor` — bolsa de solicitudes del tutor
- `feature/panel-admin` — coordinación simplificada
- `feature/setup-proyecto` — andamiaje Vite + SQL base

`main` se mantiene desplegable; integrar vía PR en ese orden.

## Notas

- Las credenciales `demo1234` son solo para la demo de la hackatón, visibles en la UI.
- `Repositorio-Hackaton/` (clon anidado) y `app/.env` están excluidos en `.gitignore`.
