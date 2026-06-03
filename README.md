# Agentemotor - Gestión de Renovaciones de Pólizas

## Video del SPEC

Enlace: 

---

## Descripción

Aplicación web desarrollada para ayudar a asesores comerciales a identificar pólizas próximas a vencer, gestionar seguimientos y registrar renovaciones.
La solución se enfoca en la ventana crítica de renovación de 30 días posterior al vencimiento de una póliza.

---

## Problema identificado

Actualmente los asesores trabajan con información dispersa y no cuentan con una vista priorizada de los clientes que requieren gestión comercial.

Esto puede generar:
- Pérdida de oportunidades de renovación.
- Seguimientos tardíos.
- Baja productividad operativa.

---

## Decisiones de diseño

### Regla de negocio principal

Se implementó una clasificación automática:

- upcoming → vence en el futuro próximo.
- renewable → vencida hasta 30 días.
- expired → vencida más de 30 días.
- active → vigente sin riesgo inmediato.

Esta clasificación alimenta todo el dashboard.

### Backend

Tecnologías:
- FastAPI
- SQLAlchemy
- SQLite
- Pytest

### Frontend

Tecnologías:
- React
- Vite
- Axios

### Alcance

Se implementó un MVP funcional:
- Dashboard de gestión.
- Registro de interacciones.
- Renovación de pólizas.
- Clasificación automática.

No se implementaron:
- Autenticación.
- Roles.
- Reportes.
- CRUD completo.

Porque no aportaban valor directo al problema principal planteado.

---

## Cómo ejecutar

### Backend

```
cd src/backend
pip install -r requirements.txt
python -m app.seed
uvicorn app.main:app --reload
```

```
Backend:
http://127.0.0.1:8000
```

```
Swagger:
http://127.0.0.1:8000/docs
```
---

### Frontend

```
cd src/frontend
npm install
npm run dev
```

```
Frontend:
http://localhost:5173
```

---

## Tests

Desde la raíz del proyecto:
```
pytest
```
---

## Reflexión

La decisión más importante fue modelar explícitamente la ventana de renovación de 30 días, ya que representa el comportamiento de negocio con mayor impacto para el asesor.

La aplicación fue diseñada para priorizar la acción comercial antes que la administración completa de pólizas, buscando resolver el problema central con el menor nivel de complejidad posible.



# Agentemotor - Gestión de Renovaciones de Pólizas

## 1. Cómo correrlo

### Backend

```bash
cd src/backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend disponible en:

```text
http://127.0.0.1:8000
```

Documentación Swagger:

```text
http://127.0.0.1:8000/docs
```

### Frontend

```bash
cd src/frontend
npm install
npm run dev
```

Frontend disponible en:

```text
http://localhost:5173
```

### Tests

Desde la raíz del proyecto:

```bash
pytest
```

---

## 2. Decisiones de diseño que tomé y por qué

### Clasificación basada en la ventana crítica de renovación

La decisión principal fue modelar explícitamente la regla de negocio más importante del caso: la ventana de renovación de 30 días posterior al vencimiento.

Las pólizas son clasificadas automáticamente en:

* Renovables
* Próximas a vencer
* Fuera de ventana
* Activas

Esta clasificación alimenta el dashboard y permite priorizar el trabajo comercial del asesor.

### Arquitectura Backend

Se utilizó FastAPI por su simplicidad, tipado, documentación automática y rapidez para construir APIs REST.

La persistencia se implementó con SQLite y SQLAlchemy para mantener el alcance del MVP controlado.

### Arquitectura Frontend

Se utilizó React con Vite para construir una interfaz rápida y sencilla.

El frontend consume directamente la API mediante Axios.

### Experiencia de usuario

La interfaz fue diseñada como una única página orientada a la operación diaria del asesor.

Las acciones principales son:

* Visualizar prioridades.
* Registrar gestiones.
* Renovar pólizas.

Se evitó agregar navegación innecesaria para mantener el foco en el proceso principal.

---

## 3. Qué dejaste fuera y por qué

No se implementaron:

* Autenticación.
* Gestión de usuarios.
* Roles y permisos.
* CRUD completo de clientes.
* CRUD completo de pólizas.
* Reportes.
* Exportaciones.

Estas funcionalidades pueden ser importantes en una solución real, pero no aportan valor directo al problema central planteado en la prueba.

La decisión fue concentrar el esfuerzo en el flujo principal de renovación.

---

## 4. Si esto fuera a producción mañana, qué le falta

Antes de una salida a producción agregaría:

* Autenticación y autorización.
* Migraciones de base de datos.
* PostgreSQL en lugar de SQLite.
* Auditoría de acciones.
* Logging estructurado.
* Manejo centralizado de errores.
* Monitoreo y observabilidad.
* Despliegue.

---

## 5. Tiempo aproximado que tomó

Aproximadamente entre 4 y 6 horas distribuidas entre sesiones con el agente. Esto debido a que actualmente trabajo e iba realizando el proyecto por partes dependiendo los tiempos libres que tenía. Pero si lo hubiera realizado de principio a fin, sin intervenciones, aproximadamente 3 a 4 teniendo en cuenta el tiempo de análisis de requerimientos y planificación.

---

## 6. Qué mejorarías de esta prueba técnica

Actualmente la clasificación está basada en reglas fijas de negocio.

Una mejora interesante sería permitir configurar dinámicamente la ventana de renovación y generar prioridades basadas en múltiples factores, por ejemplo:

* Días desde el vencimiento.
* Número de intentos de contacto.
* Valor comercial de la póliza.
* Historial de renovaciones.

Esto permitiría acercar la solución a un escenario más real de gestión comercial.
