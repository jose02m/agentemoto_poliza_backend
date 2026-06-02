# Code Review - Endpoint de pólizas vencidas

## Problema 1: La lógica de prioridad no respeta la ventana crítica de 30 días

Función `list_expired_policies`, línea donde se calcula:

```python
priority = 'urgent' if days_overdue > 7 else 'normal'
```

El código define como urgente una póliza vencida hace más de 7 días, pero el negocio establece que la ventana crítica real es de 30 días posteriores al vencimiento.

Una póliza vencida hace 8 días y una vencida hace 29 días no deberían tratarse igual que una vencida hace 40 días. La primera todavía está dentro de una oportunidad comercial recuperable; la segunda ya está fuera de la ventana de renovación.

La prioridad que recibe María sería incorrecta. El sistema podría mostrar como simplemente "urgent" pólizas que todavía pueden renovarse y pólizas que ya están fuera de ventana, sin distinguir el impacto comercial real.

Esto afecta directamente la toma de decisiones diaria del asesor.

### ¿Qué comportamiento de negocio se rompe?

María necesita saber qué clientes todavía puede renovar conservando la ventaja comercial. Si el sistema no diferencia entre:

* vencida hace 5 días,
* vencida hace 29 días,
* vencida hace 35 días,

María puede gastar tiempo en casos menos recuperables y descuidar clientes que aún están dentro de la ventana crítica.

### Cómo lo arreglaría

Crearía una función de clasificación de negocio separada:

```python
def classify_policy(expiration_date, today):
    days_overdue = (today - expiration_date).days

    if days_overdue <= 30:
        return "renewable"

    return "outside_renewal_window"
```

Y devolvería explícitamente el estado de negocio:

```python
{
    "days_overdue": days_overdue,
    "renewal_status": "renewable",
    "recommended_action": "Contactar antes de perder ventana de renovación"
}
```

---

## Problema 2: Consultas N+1 para clientes e intentos de contacto

Dentro del ciclo `for policy in expired`, especialmente en:

```python
cursor.execute(
    "SELECT name, phone FROM clients WHERE id = ?",
    (client_id,)
)
```

y:

```python
cursor.execute(
    "SELECT COUNT(*) FROM contact_attempts WHERE policy_id = ?",
    (policy_id,)
)
```

### Qué está mal

El endpoint primero consulta todas las pólizas vencidas y luego, por cada póliza, ejecuta consultas adicionales para obtener el cliente y contar los intentos de contacto.

Esto genera un problema N+1: si hay 200 pólizas vencidas, el endpoint podría ejecutar más de 400 consultas adicionales.

### Por qué importa en producción

Agentemotor procesa un volumen alto de cotizaciones y asesores. Aunque María tenga 280 clientes, otros asesores pueden tener carteras mayores. Este endpoint se volvería lento, consumiría recursos innecesarios y podría afectar la experiencia de uso.

### Qué comportamiento de negocio se rompe

María necesita abrir su lista de trabajo rápidamente cada lunes. Si el dashboard tarda demasiado en cargar, vuelve al Excel o pierde tiempo operativo. El sistema deja de cumplir su función principal: ayudarle a priorizar rápido.

### Cómo lo arreglaría

Usaría una sola consulta con `JOIN` y agregación:

```sql
SELECT 
    p.id,
    p.client_id,
    c.name,
    c.phone,
    p.insurer,
    p.expiration_date,
    p.status,
    COUNT(ca.id) AS contact_attempts
FROM policies p
JOIN clients c ON c.id = p.client_id
LEFT JOIN contact_attempts ca ON ca.policy_id = p.id
WHERE p.advisor_id = ?
  AND p.expiration_date < ?
GROUP BY p.id, c.id
ORDER BY p.expiration_date ASC;
```

Así se obtendría toda la información necesaria en una sola operación.

---

## Problema 3: No hay manejo de errores ni cierre seguro de conexión

### Ubicación

Toda la función `list_expired_policies`.

```python
conn = sqlite3.connect(DB)
cursor = conn.cursor()
```

El código nunca cierra explícitamente la conexión.
Si ocurre un error al parsear una fecha, consultar un cliente o acceder a la base de datos, la conexión puede quedar abierta.

### Qué comportamiento de negocio se rompe

Si una póliza tiene un `client_id` inválido o una fecha mal formada, María podría no ver ninguna póliza vencida, aunque existan muchas válidas. Un solo dato malo rompería toda su lista de trabajo.

### Cómo lo arreglaría

Usaría context manager y validaciones:

```python
with sqlite3.connect(DB) as conn:
    cursor = conn.cursor()
    ...
```

También validaría casos nulos:

```python
if client is None:
    continue
```

Y retornaría errores controlados cuando corresponda:

```python
return jsonify({"error": "Unexpected error loading expired policies"}), 500
```

En una aplicación real sería pertinente usar logging.

---

## Problema 4: Uso de `datetime.now()` sin control de zona horaria ni fecha inyectable

```python
today = datetime.now().date()
```

La fecha actual se toma directamente desde el servidor. Esto dificulta las pruebas automatizadas y puede generar inconsistencias si el servidor corre en una zona horaria diferente a la operación del negocio.

### Por qué importa en producción

La clasificación de vencimientos depende completamente de la fecha. Una zona horaria puede hacer que una póliza aparezca como vencida antes o después de tiempo.

### Qué comportamiento de negocio se rompe

Una póliza que vence hoy podría aparecer incorrectamente como vencida o no vencida. María podría contactar tarde a un cliente o priorizar mal su jornada.

### Cómo lo arreglaría

Separaría la lógica de fecha en una función testeable:

```python
def get_today():
    return date.today()
```

Y la lógica de clasificación recibiría `today` como parámetro:

```python
def calculate_days_overdue(expiration_date, today):
    return (today - expiration_date).days
```

Esto permite pruebas confiables para casos borde como 30 y 31 días.

---

## Problema 5: `debug=True` en código de producción

```python
if __name__ == '__main__':
    app.run(debug=True)
```

### Qué está mal

`debug=True` no debe usarse en producción. Puede exponer información sensible y detalles del entorno.

Un error en producción podría revelar estructura del código, rutas, variables internas o información útil para un externo. Lo anterior compromete la seguridad y confiabilidad de la plataforma. En un contexto B2B con información de clientes y pólizas, esto es crítico.

## CONCLUSIONES DEL AN´ÁLISIS

El principal problema del snippet es de alineación con LAS REGLAS DEL negocio. El endpoint lista pólizas vencidas, pero no representa correctamente la regla más importante: la ventana de renovación de 30 días.

Además, tiene problemas de rendimiento, manejo de errores y configuración de producción. Para llevarlo a producción, separaría la lógica de negocio, optimizaría las consultas y agregaría manejo de errores.
