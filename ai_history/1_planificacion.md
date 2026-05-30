#### HOLA. ACTÚA COMO UN TEACH LEAD CON EXPERIENCIA

#### EN PLANIFICACIÓN DE PROYECTOS, LÓGICA,

#### PLANEACIÓN, PROGRAMADOR FULL STACK. REVISA ESTE

#### DOCUMENTO Y HAGAMOS UNA RUTA PARA SU

#### ELABORACIÓN. ANTES DE ELLO, DAME UN FEEDBACK.

#### HAY QUE CUMPLIR A CABALIDAD ESTAS INSTRUCCIONES

#### AL PIE DE LA LETRA.

Sí. Lo primero que te diría como Tech Lead es que **esta prueba no está evaluando
solamente programación**. Está evaluando, en este orden:

**1.** Capacidad de análisis.
**2.** Toma de decisiones.
**3.** Priorización de producto.
**4.** Comunicación técnica.
**5.** Uso inteligente de IA.
**6.** Calidad del código.

De hecho, leyendo el documento, el mensaje más importante es este:

Eso significa que si construyes una aplicación técnicamente brillante pero tu razonamiento
es pobre, probablemente pierdas puntos.

```
"Tu spec se lee antes que tu código". PRUEBA_TECNICA_AGENTEMOTOR_2026...
```
```
PRUEBA_TECNICA_AGENTEMOTOR_20...
PDF
```

# Feedback general de la prueba

## Lo que realmente quieren medir

No quieren un CRM completo.

No quieren un ERP de seguros.

No quieren un sistema enterprise.

Quieren ver si eres capaz de:

```
Entender el problema de María.
Identificar el flujo crítico del negocio.
Construir una solución simple.
Defender tus decisiones.
```
# Lo que veo como núcleo del problema

La mayoría de candidatos se equivocarán aquí.

Pensarán:

No.

El problema real es:

```
"Tengo que gestionar pólizas."
```

Eso aparece varias veces en el enunciado.

Por tanto el dominio principal no es:

```
Clientes
Pólizas
Aseguradoras
```
Sino:

```
Seguimiento de renovaciones.
```
# Lo que yo construiría

## MVP muy enfocado

### Dashboard único

Una sola pantalla.

Columnas:

**Cliente Póliza**

```
Fecha
vencimiento
```
```
Días
vencida Estado
```
```
Última
gestión Acción
```
## Estados visuales

### Próxima a vencer

```
"Evitar perder clientes durante la ventana crítica de renovación de 30 días."
```
```
PRUEBA_TECNICA_AGENTEMOTOR_2026...
```

0 a 30 días antes.

Color amarillo.

### Ventana de renovación

0 a 30 días después.

Color naranja.

### Cliente en riesgo

Más de 30 días.

Color rojo.

Esto conecta directamente con la regla de negocio más importante del ejercicio.

## Registro de gestiones

Cuando María llama:

```
Contactado
No contestó
Interesado
Renovó
```
```
PRUEBA_TECNICA_AGENTEMOTOR_2026...
```

```
No renovó
```
Guardar:

```
fecha
comentario
```
Esto reemplaza la columna "gestionado" del Excel.

# Lo que NO construiría

Y lo explicaría explícitamente.

## No autenticación

Porque:

```
Hay un único usuario.
No aporta valor al objetivo.
```
## No roles

No hay requerimiento.

## No notificaciones automáticas

Interesante para producción.

Fuera de alcance.

```
PRUEBA_TECNICA_AGENTEMOTOR_2026...
```

## No integración con aseguradoras

Fuera del problema planteado.

# Stack recomendado

Para una prueba de este tipo:

## Backend

FastAPI

Ventajas:

```
Rápido.
Swagger automático.
Muy fácil de demostrar.
```
## Frontend

React + Vite

o

Next.js si ya lo dominas.

## Base de datos

SQLite


La piden explícitamente como opción preferida.

# Modelo de datos sugerido

## advisors

## clients

## policies

```
PRUEBA_TECNICA_AGENTEMOTOR_2026...
```
```
id
name
```
```
id
advisor_id
name
phone
email
```
```
id
client_id
type
insurer
expiration_date
status
```

## interactions

# API mínima

## Clientes con renovaciones pendientes

Devuelve:

```
próximas a vencer
vencidas < 30 días
vencidas > 30 días
```
## Detalle

```
id
policy_id
interaction_date
result
notes
```
```
GET /policies/worklist
```
```
GET /policies/{id}
```
```
http
```
```
http
```

## Registrar gestión

## Renovar

Actualiza fecha de vencimiento.

# Caso crítico de negocio

Aquí está la clave de los tests.

Muchos candidatos probarán CRUD.

Error.

El caso crítico es:

```
POST /policies/{id}/interactions
```
```
POST /policies/{id}/renew
```
```
Clasificación correcta según la ventana de renovación de 30 días.
```
```
http
```
```
http
```

Porque es la regla que genera dinero o pérdida de clientes.

# Los 3 tests que haría

## Test 1

Póliza vencida hace 5 días.

Resultado esperado:

## Test 2

Póliza vencida hace 30 días.

Resultado esperado:

## Test 3

Póliza vencida hace 31 días.

Resultado esperado:

```
PRUEBA_TECNICA_AGENTEMOTOR_2026...
```
```
renewable
```
```
renewable
```

# Sobre el code review

Aquí también hay una trampa.

No buscan encontrar 20 detalles.

Buscan encontrar:

### Problemas de negocio

Ejemplo:

La prioridad se define:

Pero el negocio habla de:

Entonces la lógica principal está mal alineada con la regla de negocio.

Ese tipo de observaciones valen mucho más que decir:

```
lost_opportunity
```
```
days_overdue > 7
```
```
30 días
```
```
"faltan type hints".
```
```
Python Ejecutar
```

# Ruta de trabajo recomendada

## Fase 1 (30-45 min)

Spec.md

No programes nada todavía.

Define:

```
Problema
MVP
Flujos
Modelo de datos
Endpoints
Tradeoffs
```
## Fase 2 (30 min)

Diseño técnico

```
Estructura carpetas
Base de datos
Contratos API
```
## Fase 3 (90 min)

Backend

```
SQLite
```

```
FastAPI
Seed inicial
```
## Fase 4 (60 min)

Frontend

```
Dashboard
Tabla
Gestión de acciones
```
## Fase 5 (20 min)

Tests

3 casos críticos.

## Fase 6 (30 min)

Code Review

Documento profundo.

## Fase 7 (20 min)

#### README

Muy importante.


## Fase 8 (10 min)

Video

Leer spec y explicar la decisión más difícil.

# Mi evaluación inicial

La prueba está muy bien diseñada porque obliga a demostrar pensamiento de producto,
ingeniería y uso de IA al mismo tiempo. Si la ejecutamos correctamente, podemos
construir una solución que se vea profesional sin sobreingeniería.

Mi recomendación es que **empecemos por redactar un** spec.md **sobresaliente** , porque

ese documento va a dirigir todo lo demás y probablemente represente más del 50% de la
evaluación real. Luego derivamos modelo de datos, endpoints, arquitectura y plan de
implementación.

```
FuentFuenteses
```
```
Qué hace el modelo advisors especificamente?
```
Buena pregunta. De hecho, en esta prueba técnica **el modelo** advisors **podría ni siquiera**

**ser necesario** dependiendo de cómo decidas simplificar el alcance.

## ¿Por qué lo propuse?


Porque el enunciado menciona:

Y el endpoint de ejemplo también usa:

Lo que sugiere que una póliza pertenece a un asesor.

Por eso una estructura normalizada sería:

## ¿Qué representa advisors?

Sería la entidad que representa a María o cualquier otro asesor.

Ejemplo:

**id name**

1 María González

2 Carlos Pérez

```
"Un asesor de seguros administra una cartera de clientes."
PRUEBA_TECNICA_AGENTEMOTOR_2026...
```
```
/advisors/<advisor_id>/expired-policies
```
```
Advisor
└── Clients
└── Policies
```
```
Python Ejecutar
```

Luego:

### clients

**id advisor_id name**

1 1 Juan

2 1 Pedro

3 2 Ana

Así sabes qué clientes pertenecen a cada asesor.

## Pero aquí viene el análisis importante

Para esta prueba yo probablemente **NO implementaría múltiples asesores**.

¿Por qué?

Porque el problema está planteado desde la perspectiva de una única usuaria:

No hay requerimientos de:

```
Multiusuario
Login
Roles
Permisos
Separación de carteras
```
```
María. PRUEBA_TECNICA_AGENTEMOTOR_2026...
```

Entonces podrías documentar en el spec.md algo como:

Eso es una decisión perfectamente defendible.

## Opción A (más simple, la que yo haría)

Sin tabla advisors.

```
"Asumí un único asesor (María) para mantener el foco en el problema principal: la
gestión de renovaciones. Por esta razón omití la entidad Advisor y asocié directamente
clientes y pólizas."
```
```
clients
---------
id
name
phone
```
```
policies
---------
id
client_id
insurer
expiration_date
```
```
interactions
---------
id
policy_id
notes
date
```

## Opción B (más escalable)

Preparada para múltiples asesores.

## ¿Qué escogería para maximizar puntos?

Como Tech Lead, escogería **Opción A** y lo justificaría explícitamente.

La prueba premia:

```
advisors
---------
id
name
```
```
clients
---------
id
advisor_id
name
phone
```
```
policies
---------
id
client_id
expiration_date
```
```
interactions
---------
id
policy_id
notes
```

```
foco,
priorización,
reducción de complejidad innecesaria,
```
más que diseñar algo enterprise.

De hecho, una frase que suele gustar mucho en reviews técnicas es:

Eso demuestra criterio arquitectónico sin construir cosas que nadie pidió.

```
"No modelé asesores porque el caso de uso actual tiene un único actor (María). Si el
producto evolucionara a múltiples asesores, la primera extensión sería introducir la
entidad Advisor y asociar clientes a dicha entidad."
```
```
FuentFuenteses
```
```
Exacto, de hecho en el spec.md que estaba haciedo no lo
incluí. Ya realicé el spec y me quedó así. Qué opinas de
ello:
```
Pensado durante un par de segundos

Está **bien encaminado**. Tiene foco, justifica bien lo que dejas fuera y entiende el punto

crítico: la ventana de renovación de 30 días. Eso es lo más importante.

Le haría estos ajustes:

```
Markdown.md pegado
```
```
Markdown.md pegado
Archivo
```

## Lo bueno

El spec comunica claramente que el sistema no es un CRM completo, sino una
herramienta para priorizar renovaciones. También está muy bien defendida la decisión de

no incluir advisors, autenticación, roles ni notificaciones.

## Lo que mejoraría sí o sí

### 1. Corregir numeración

Saltas de “Funcionalidades no implementadas” a “## 5. Supuestos realizados”. Eso se ve
descuidado. Déjalo todo numerado o todo sin numeración.

### 2. Cambiar “Perdidas” por “Fuera de ventana”

No usaría “Perdidas” como estado técnico. Suena definitivo y puede ser ambiguo. Mejor:

Porque todavía pueden gestionarse comercialmente, solo que ya no conservan la ventaja
de renovación.

### 3. Precisar los límites de días

Tu clasificación dice:

```
próximas a vencer: próximos 30 días
renovables: vencidas entre 0 y 30 días
perdidas: más de 30 días
```
Muy bien, pero aclara bordes:

```
Markdown.md pegado
```
```
Fuera de ventana de renovación
```
```
Si vence hoy: próxima a vencer o vence hoy.
Si venció hace 30 días: renovable.
```

Esto te ayuda muchísimo para los tests.

### 4. El modelo interactions está muy básico

Yo agregaría un campo type o result.

Ahora solo tienes:

Pero para María no basta guardar una nota. Necesita saber qué pasó:

Eso reemplaza mejor el Excel.

### 5. El endpoint /dashboard está bien, pero suena genérico

Podrías usar algo más expresivo:

O mantener /dashboard, pero explicar que devuelve la lista operativa diaria clasificada.

### 6. Falta mencionar el stack

El spec debería decir qué stack usarás:

```
Si venció hace 31 días: fuera de ventana.
```
```
note
created_at
```
```
result: contacted | no_answer | interested | renewed | not_interested
```
```
GET /policies/worklist http
```

Eso conecta planeación con implementación.

## Mi veredicto

Está en un **75-80% muy sólido**. Con pequeños ajustes puede quedar mucho más
profesional.

La mejora más importante: **hacer más explícita la regla de clasificación con los bordes de
30 días** y enriquecer interactions con un resultado estructurado.

```
Backend: FastAPI
Frontend: React + Vite
DB: SQLite
Tests: pytest
```
```
FuentFuenteses
```
```
Es que agregar un campo type o result sería lo mismo que
una nota, no? Porque existen muchas posibilidades de
estados que puede tener una persona ¿no?
```
No exactamente. note **y** result **no cumplen el mismo propósito**.

```
note es texto libre:
```
```
result es una categoría operativa:
```
```
Cliente dice que lo llame el viernes, está cotizando con otra aseguradora.
```

La diferencia importante es que result te permite **filtrar, priorizar y medir**. La nota no.

Por ejemplo, con solo notas no puedes saber fácilmente:

Pero tienes razón en algo: **no conviene modelar demasiados estados** , porque el mundo
real tiene infinitas posibilidades.

Yo haría esto:

Y result tendría pocos valores:

```
no_answer
interested
renewed
not_interested
```
```
Muéstrame todas las pólizas donde el cliente no contestó.
Muéstrame las que están interesadas.
Cuántas gestiones terminaron en renovación.
Cuál fue la última acción útil sobre esta póliza.
```
```
interactions
------------
id
policy_id
result
note
created_at
```
```
contacted
no_answer
interested
```

La nota queda para el detalle humano.

Ejemplo:

Eso es mucho más útil que solo:

Mi recomendación: **sí agregaría** result **, pero con una lista corta y flexible**. No intentes

modelar todos los posibles estados del cliente. Solo los necesarios para que María
organice su trabajo.

```
renewed
not_interested
```
```
result: interested
note: Cliente pide comparar Liberty vs Sura. Llamar el jueves después de las 3pm.
```
```
note: Cliente pide comparar Liberty vs Sura. Llamar el jueves después de las 3pm.
```
```
Ok. Listo. Entonces ya quedó mi spec completo. Siguiente
fase?
```
Pensado durante un par de segundos

Siguiente fase: **diseño técnico antes de codear**.

Ahora toca definir 4 cosas:


**1. Stack definitivo**
    Backend: FastAPI
    DB: SQLite
    Frontend: React + Vite
    Tests: pytest
**2. Estructura del proyecto
3. Contratos API**
    GET /dashboard
    GET /policies
    GET /policies/{id}
    POST /policies/{id}/interactions
    PUT /policies/{id}/renew
**4. Regla crítica como función pura**
    Antes de hacer frontend, crea una función tipo:

```
apellido_nombre/
├── spec.md
├── README.md
├── code_review.md
├── ai_history/
├── src/
│ ├── backend/
│ └── frontend/
└── tests/
```
```
def classify_policy(expiration_date, today):
... Python Ejecutar
```

```
Esa función será la base de tus tests.
```
Mi recomendación: ahora hagamos el **diseño técnico detallado del backend** , incluyendo
carpetas, modelos, endpoints y lógica de clasificación. Ahí ya dejamos listo el mapa para
implementar rápido.

```
Hasta el momento tengo esta estructura. Ya en
requeriments tengo esto: fastapi
uvicorn
sqlalchemy
pydantic
pytest
```

