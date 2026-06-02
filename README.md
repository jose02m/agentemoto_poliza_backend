# Agentemotor - Gestión de Renovaciones de Pólizas

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

```cd src/backend
pip install -r requirements.txt
python -m app.seed
uvicorn app.main:app --reload```

```Backend:
http://127.0.0.1:8000```

```Swagger:
http://127.0.0.1:8000/docs```

---

### Frontend

```cd src/frontend
npm install
npm run dev```

```Frontend:
http://localhost:5173```

---

## Tests

Desde la raíz del proyecto:
```pytest```

---

## Reflexión

La decisión más importante fue modelar explícitamente la ventana de renovación de 30 días, ya que representa el comportamiento de negocio con mayor impacto para el asesor.

La aplicación fue diseñada para priorizar la acción comercial antes que la administración completa de pólizas, buscando resolver el problema central con el menor nivel de complejidad posible.