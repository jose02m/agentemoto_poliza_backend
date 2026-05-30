# Prueba Técnica Agentemotor - spec.md

## Entendimiento del problema

El problema planteado consiste en reemplazar el uso de hojas de cálculo para la gestión de renovaciones de pólizas de seguros.

Actualmente, un asesor administra manualmente sus clientes y pólizas mediante Excel, lo que genera riesgos de pérdida de información, falta de seguimiento comercial y vencimientos no gestionados oportunamente.La necesidad principal identificada es permitir que el asesor visualice rápidamente qué pólizas requieren gestión, registrar acciones realizadas y controlar las renovaciones antes de perder oportunidades comerciales.

Además, existe una regla de negocio crítica: una póliza puede renovarse dentro de los 30 días posteriores a su vencimiento manteniendo las condiciones comerciales existentes. Después de ese período, la renovación se considera una nueva contratación.

Por esta razón, la aplicación se enfoca en ayudar al asesor a identificar y priorizar pólizas según su proximidad o tiempo de vencimiento.

---

## Alcance implementado

Para esta prueba se implementará una aplicación compuesta por:

### Backend

* API REST.
* Gestión de clientes.
* Gestión de pólizas.
* Registro de actividades de seguimiento.
* Clasificación automática de pólizas según su estado.

### Frontend

Una única pantalla principal que permitirá:

* Visualizar pólizas próximas a vencer.
* Visualizar pólizas vencidas dentro de la ventana de renovación.
* Visualizar pólizas vencidas fuera de la ventana de renovación.
* Registrar actividades de gestión.
* Renovar pólizas actualizando la fecha de vencimiento.

---

## Funcionalidades no implementadas

Por limitaciones de tiempo y porque aportan poco valor al problema principal, se decidió no implementar:

* Autenticación y autorización: El problema planteado se enfoca en la gestión de renovaciones y no en la seguridad o administración de usuarios.
* Roles y permisos: No fueron implementados debido a que el escenario describe un único asesor utilizando el sistema.
* Gestión de múltiples asesores: No modelé asesores porque el caso de uso actual tiene un único actor (María). Si el producto evolucionara a múltiples asesores, la primera extensión sería introducir la entidad 'Advisor' y asociar clientes a dicha entidad.
* Notificaciones por correo o SMS: Aunque podrían ser valiosos en un producto real, no son necesarios para validar el flujo principal del negocio.
* Carga masiva de información: La prueba no requiere importación de datos externos. Se utilizarán datos precargados para simplificar la puesta en marcha del sistema.
* Reportes y métricas: No se consideran parte del flujo principal identificado en el enunciado.

La justificación es que estas funcionalidades serían consideradas en una versión productiva.

---

## Supuestos realizados

Dado que algunos aspectos no están especificados en el enunciado, se asumen las siguientes condiciones:

* Existe un único asesor utilizando la aplicación.
* Cada póliza pertenece a un único cliente.
* La información inicial puede estar precargada en la base de datos.
* No se requiere autenticación para el alcance de la prueba.

---

## Flujos principales de mi solución

### Flujo 1: Consultar trabajo pendiente

1. El asesor ingresa a la aplicación.
2. Visualiza las pólizas agrupadas según prioridad.
3. Identifica rápidamente qué clientes requieren contacto.

### Flujo 2: Registrar gestión

1. El asesor selecciona una póliza.
2. Registra una nota o actividad.
3. La actividad queda almacenada como historial para futuras consultas o seguimiento a clientes. 

### Flujo 3: Renovar póliza

1. El cliente acepta la renovación.
2. El asesor registra una nueva fecha de vencimiento.
3. La póliza deja de aparecer como pendiente.

---

## Clasificación de pólizas

La aplicación clasificará automáticamente las pólizas en tres grupos:

### Próximas a vencer
Pólizas cuya fecha de vencimiento ocurre dentro de los próximos 30 días.

### Renovables
Pólizas vencidas entre 0 y 30 días atrás. Estas representan la máxima prioridad comercial.

### Perdidas
Pólizas vencidas hace más de 30 días. Aunque permanecen visibles para seguimiento, se consideran fuera de la ventana de renovación.

---

## Modelo de datos

### client

| Campo | Tipo    |
| ----- | ------- |
| id    | Integer |
| name  | String  |
| phone | String  |
| email | String  |

### policies

| Campo           | Tipo    |
| --------------- | ------- |
| id              | Integer |
| client_id       | Integer |
| policy_type     | String  |
| insurer         | String  |
| expiration_date | Date    |
| status          | String  |

### interactions

| Campo      | Tipo     |
| ---------- | -------- |
| id         | Integer  |
| policy_id  | Integer  |
| note       | Text     |
| result     | Text     |
| created_at | DateTime |

### Relaciones
* Un cliente puede tener múltiples pólizas.
* Una póliza puede tener múltiples actividades.
* Cada actividad pertenece a una única póliza.

---

## API REST

### GET /dashboard
Obtiene las pólizas clasificadas por estado.

### GET /policies
Lista todas las pólizas.

### GET /policies/{id}
Obtiene el detalle de una póliza.

### POST /policies/{id}/interactions
Registra una actividad asociada a una póliza.

### PUT /policies/{id}/renew
Actualiza la fecha de vencimiento de una póliza.

---

## Caso crítico identificado

El comportamiento más importante del sistema es la correcta clasificación de pólizas según la ventana de renovación de 30 días.

Una clasificación incorrecta puede provocar que el asesor pierda oportunidades comerciales o dedique tiempo a clientes que ya no se encuentran dentro de la ventana de renovación.

Por este motivo, los tests se enfocarán en validar esta regla de negocio. Los escenarios a probar son:

* Póliza vencida hace menos de 30 días.
* Póliza vencida hace más de 30 días.
* Póliza próxima a vencer.

---

## Trade-offs considerados

*Se priorizó simplicidad y claridad sobre funcionalidades avanzadas.
*SQLite fue elegido por facilidad de instalación y cumplimiento de los requisitos de la prueba.
*Se decidió construir una única pantalla principal porque el problema planteado gira alrededor de la gestión diaria de renovaciones y no requiere una navegación compleja.
*También se prefirió una interfaz sencilla antes que funcionalidades adicionales que podrían aumentar la complejidad sin aportar valor significativo para el objetivo principal.