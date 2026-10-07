-- MVP emergencia hackatón: modelo aplanado para demo rápida (evita joins).
-- Pegar en Supabase Dashboard > SQL Editor > Run.

create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table if not exists tutors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subject text not null,
  mastery_level text not null check (mastery_level in ('Básico','Intermedio','Avanzado','Experto')),
  experience_years int not null default 0,
  description text,
  active boolean not null default true
);

alter table subjects enable row level security;
alter table tutors enable row level security;

drop policy if exists "public read subjects" on subjects;
create policy "public read subjects" on subjects for select using (true);

drop policy if exists "public read tutors" on tutors;
create policy "public read tutors" on tutors for select using (true);

insert into subjects (name) values
  ('Programación'), ('Bases de Datos'), ('Matemáticas')
on conflict (name) do nothing;

insert into tutors (name, subject, mastery_level, experience_years, description, active) values
  ('Carlos Rodríguez', 'Programación', 'Intermedio', 4, 'Paciente con principiantes.', true),
  ('Laura Gómez', 'Programación', 'Experto', 7, 'Especialista en algoritmos.', true),
  ('Andrés Martínez', 'Programación', 'Avanzado', 3, 'Equilibrio teoría y práctica.', true),
  ('María Torres', 'Bases de Datos', 'Experto', 5, 'Experta en SQL.', true),
  ('Juan Pérez', 'Matemáticas', 'Avanzado', 4, 'Cálculo y álgebra.', true);
