
# 🎓 TutorMatch

> **No buscamos simplemente un tutor disponible. Buscamos el tutor más compatible.**

TutorMatch es una solución orientada a la **asignación inteligente de tutorías académicas** en educación superior. El sistema busca recomendar al tutor más adecuado para un estudiante considerando diferentes variables como **materia, disponibilidad, experiencia y preferencias**.

---

## 📌 Problema

La asignación de tutorías puede convertirse en un proceso complejo cuando es necesario comparar simultáneamente diferentes características de estudiantes y tutores.

Un coordinador puede necesitar considerar:

* 📚 Materia que requiere el estudiante.
* 🕐 Disponibilidad horaria.
* 👨‍🏫 Experiencia y conocimientos del tutor.
* ⭐ Preferencias del estudiante.
* 👥 Capacidad y disponibilidad del tutor.

Cuando estas variables se gestionan manualmente, encontrar una combinación adecuada puede requerir tiempo y dificultar la toma de decisiones.

Por esta razón, TutorMatch propone automatizar el proceso mediante un **sistema de puntuación ponderada**, capaz de calcular la compatibilidad entre estudiantes y tutores.

---

# 🔎 Investigación y contexto

## 🇨🇴 Educación superior en Colombia

Según información del **Ministerio de Educación Nacional de Colombia**, durante 2024 se registraron **2.553.560 estudiantes matriculados en educación superior**, de los cuales **1.637.436 correspondían al nivel universitario**.

Esto evidencia que existe una población estudiantil considerable que puede requerir diferentes mecanismos de acompañamiento y apoyo académico.

> **+2,55 millones de estudiantes** estuvieron matriculados en educación superior en Colombia durante 2024.

---

## 📚 ¿Las tutorías pueden mejorar el rendimiento académico?

La investigación académica ha encontrado resultados favorables asociados a diferentes modalidades de tutoría.

Un estudio experimental sobre tutoría en educación superior encontró que los estudiantes que recibieron tutoría remota obtuvieron aproximadamente **30 % más créditos** y mejores resultados académicos en comparación con el grupo de control.

Además, una revisión sistemática sobre tutorías en Ciencias de la Salud identificó evidencia de beneficios sobre el rendimiento académico, señalando también la importancia de factores como la calidad del tutor, la relación tutor-estudiante y la carga de los tutores.

Una revisión publicada en 2025 sobre **peer tutoring en STEM** analizó **24 estudios y 3.311 participantes**, encontrando un efecto significativo sobre el rendimiento académico.

Estos antecedentes respaldan la importancia de las tutorías como mecanismo de acompañamiento académico.

---

# 👥 Usuarios involucrados

TutorMatch contempla tres actores principales:

### 👨‍🎓 Estudiante

Busca apoyo académico y necesita encontrar un tutor que se adapte a sus necesidades y disponibilidad.

### 👨‍🏫 Tutor

Ofrece acompañamiento académico y debe recibir estudiantes compatibles con sus conocimientos, horarios y capacidad disponible.

### 👨‍💼 Coordinador

Administra el proceso de asignación y necesita tomar decisiones considerando múltiples variables simultáneamente.

---

# 🏫 Antecedentes y soluciones existentes

Actualmente existen universidades y plataformas que utilizan herramientas digitales para gestionar servicios de tutoría.

### Vanderbilt University — Tutor Match

Vanderbilt University cuenta con un programa denominado **Tutor Match**, mediante el cual los estudiantes pueden solicitar asignaciones con tutores de pares considerando aspectos como los cursos y la disponibilidad.

Esto demuestra que el concepto de emparejar estudiantes y tutores ya se utiliza en contextos universitarios reales.

### Tutor.com

Tutor.com ofrece soluciones institucionales para gestionar servicios de tutoría, programación, sesiones y analítica académica.

### Wyzant

Wyzant funciona como un marketplace de tutores en el que los estudiantes pueden buscar y filtrar opciones según diferentes características como materia, experiencia, precio y modalidad.

### UCF

La University of Central Florida utiliza herramientas digitales para gestionar y programar sesiones de tutoría individual.

Estas soluciones demuestran que la digitalización del proceso de tutorías ya es una práctica existente. **TutorMatch se enfoca específicamente en el problema de recomendar automáticamente una combinación adecuada entre estudiante y tutor.**

---

# 💡 Propuesta de solución

TutorMatch utiliza un sistema de **compatibilidad ponderada**.

El proceso conceptual es:

```text
              ESTUDIANTE
                  │
                  ▼
        ┌───────────────────┐
        │ Necesidad académica│
        └─────────┬─────────┘
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
    Materia   Horario   Preferencias
       │          │          │
       └──────────┼──────────┘
                  ▼
        ┌───────────────────┐
        │ Matching de tutores│
        └─────────┬─────────┘
                  ▼
        ┌───────────────────┐
        │ Score de compat.  │
        └─────────┬─────────┘
                  ▼
             🏆 Ranking
                  │
                  ▼
        Recomendación explicable
```

El sistema no busca únicamente determinar si un tutor está disponible.

Busca **calcular qué tan compatible es cada tutor con las necesidades específicas del estudiante**.

---

# ⚙️ Características principales

* 🔎 Registro y gestión de estudiantes.
* 👨‍🏫 Registro y gestión de tutores.
* 📚 Gestión de materias.
* 🕐 Gestión de disponibilidad.
* ⭐ Registro de preferencias.
* 🧮 Cálculo de compatibilidad.
* 📊 Ranking de tutores.
* 💡 Recomendaciones basadas en criterios ponderados.
* 📝 Justificación de la recomendación.
* 👥 Gestión del proceso de asignación.

---

# 🧠 Sistema de recomendación

El núcleo de TutorMatch se basa en un **score ponderado de compatibilidad**.

De manera conceptual:

```text
Score =
    Materia × W1
  + Disponibilidad × W2
  + Experiencia × W3
  + Preferencias × W4
```

Donde cada criterio posee un peso determinado según la importancia que tenga dentro del proceso de asignación.

El resultado permite ordenar los tutores candidatos y presentar las opciones con mayor compatibilidad.

### Ejemplo

```text
Estudiante
    │
    ├── Materia: Programación
    ├── Horario: 14:00 - 16:00
    └── Preferencia: Tutor con experiencia
             │
             ▼
        Tutor A → 92 %
        Tutor B → 84 %
        Tutor C → 71 %
        Tutor D → 63 %
             │
             ▼
       🏆 Tutor A
```

Además del resultado, el sistema puede proporcionar una explicación de los criterios que contribuyeron a la puntuación.

---

# 🎯 Diferenciación

TutorMatch no pretende reemplazar plataformas completas de gestión educativa ni competir directamente con marketplaces de tutores.

El enfoque del proyecto es más específico:

> **Automatizar y hacer explicable la decisión de asignación entre estudiantes y tutores.**

| Solución                | Gestión digital | Materia | Disponibilidad | Matching | Recomendación explicable |
| ----------------------- | :-------------: | :-----: | :------------: | :------: | :----------------------: |
| Proceso manual          |        ❌        |    ✅    |        ✅       |     ❌    |             ❌            |
| Marketplace de tutores  |        ✅        |    ✅    |        ✅       |    🟡    |            🟡            |
| Sistemas universitarios |        ✅        |    ✅    |        ✅       |    🟡    |            🟡            |
| **TutorMatch**          |        ✅        |    ✅    |        ✅       |   **✅**  |           **✅**          |

> 🟡 Indica que existen funcionalidades relacionadas, pero no necesariamente equivalentes al algoritmo propuesto por TutorMatch.

---

# 📊 Datos relevantes

| Indicador                                                        |          Dato |
| ---------------------------------------------------------------- | ------------: |
| Estudiantes en educación superior en Colombia (2024)             | **2.553.560** |
| Estudiantes universitarios (2024)                                | **1.637.436** |
| Participantes en meta-análisis de peer tutoring STEM             |     **3.311** |
| Estudios incluidos en dicho meta-análisis                        |        **24** |
| Estudiantes encuestados sobre recursos universitarios            |     **1.600** |
| Estudiantes que identificaban la tutoría como recurso disponible |      **34 %** |

Estos datos ayudan a contextualizar tanto el tamaño potencial del problema como la importancia del acompañamiento académico y el acceso a los servicios de tutoría.

---

# 🏗️ Arquitectura

> Esta sección puede actualizarse conforme avance el desarrollo del proyecto.

```text
┌─────────────────────┐
│      Frontend       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│        API          │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
┌─────────┐ ┌─────────────┐
│ Usuarios│ │ Matching    │
└─────────┘ └──────┬──────┘
                   │
                   ▼
             ┌───────────┐
             │ Base datos│
             └───────────┘
```

---

# 🛠️ Tecnologías

> Completar con las tecnologías definitivas utilizadas en el proyecto.

* **Frontend:** ...
* **Backend:** ...
* **Base de datos:** ...
* **Lenguaje:** ...
* **Control de versiones:** Git / GitHub
* **Metodología:** ...

---

# 🚀 Objetivo del proyecto

Desarrollar un sistema capaz de **automatizar la asignación de tutorías académicas**, reduciendo el trabajo manual de comparación y proporcionando recomendaciones basadas en múltiples criterios.

El objetivo no es simplemente encontrar un tutor disponible, sino identificar la **combinación con mayor compatibilidad** entre las necesidades del estudiante y las características del tutor.

---

# 📚 Referencias

* Ministerio de Educación Nacional de Colombia — SNIES.
* ScienceDirect — *Tutoring in (online) higher education: Experimental evidence*.
* ScienceDirect — Revisión sistemática sobre tutoría y rendimiento académico.
* ScienceDirect — Meta-análisis sobre peer tutoring en STEM.
* Vanderbilt University — Tutor Match.
* Tutor.com — LEO.
* Wyzant — Find a Tutor.
* University of Central Florida — Student Academic Resource Center.

---

## 👨‍💻 Proyecto

**TutorMatch**

Sistema de recomendación y asignación inteligente de tutorías académicas.

> **Encontrar disponibilidad es fácil. Encontrar compatibilidad es el verdadero problema.**
