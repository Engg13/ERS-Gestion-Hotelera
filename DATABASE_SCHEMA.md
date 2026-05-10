# Esquema de Base de Datos - Grand Hotel

## Tablas Implementadas

### 1. 👤 USUARIOS

Almacena información de usuarios del sistema (clientes y administradores).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_usuario` | UUID | Primary Key |
| `nombre` | VARCHAR(255) | Nombre completo del usuario |
| `correo` | VARCHAR(255) | Email único |
| `password` | VARCHAR(255) | Contraseña |
| `tipo_usuario` | VARCHAR(20) | 'cliente' o 'admin' |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |

**Índices:**
- `correo` (unique)
- `tipo_usuario`

---

### 2. 🏨 HABITACIONES

Catálogo de habitaciones disponibles en los hoteles.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_habitacion` | UUID | Primary Key |
| `numero` | VARCHAR(10) | Número de habitación (único) |
| `categoria` | VARCHAR(50) | 'Standard', 'Deluxe', 'Suite' |
| `precio_diario` | DECIMAL(10,2) | Precio por noche |
| `estado` | VARCHAR(20) | 'disponible' u 'ocupada' |
| `ciudad` | VARCHAR(255) | Ciudad donde está ubicada |
| `descripcion` | TEXT | Descripción de la habitación |
| `capacidad` | INT | Número de personas |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |

**Índices:**
- `numero` (unique)
- `estado`
- `ciudad`
- `categoria`

**Datos de ejemplo:** 10 habitaciones en Madrid, Barcelona, Valencia y Sevilla

---

### 3. 📅 RESERVAS

Reservas realizadas por los usuarios.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_reserva` | UUID | Primary Key |
| `id_usuario` | UUID | Foreign Key → usuarios |
| `id_habitacion` | UUID | Foreign Key → habitaciones |
| `fecha_reserva` | TIMESTAMP | Fecha en que se hizo la reserva |
| `fecha_inicio` | DATE | Check-in |
| `fecha_fin` | DATE | Check-out |
| `estado` | VARCHAR(20) | 'confirmada' o 'cancelada' |
| `total` | DECIMAL(10,2) | Monto total de la reserva |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |

**Índices:**
- `id_usuario`
- `id_habitacion`
- `estado`
- `(fecha_inicio, fecha_fin)` (composite)

**Restricciones:**
- `fecha_fin` > `fecha_inicio`
- ON DELETE CASCADE para usuario y habitación

---

### 4. 💳 PAGOS

Pagos asociados a las reservas.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_pago` | UUID | Primary Key |
| `id_reserva` | UUID | Foreign Key → reservas |
| `monto` | DECIMAL(10,2) | Monto del pago |
| `fecha_pago` | TIMESTAMP | Fecha del pago |
| `metodo` | VARCHAR(50) | 'tarjeta', 'efectivo', 'transferencia' |
| `estado` | VARCHAR(20) | 'pagado' o 'pendiente' |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |

**Índices:**
- `id_reserva`
- `estado`

**Restricciones:**
- ON DELETE CASCADE para reserva

---

### 5. 🎫 TICKETS

Tickets de confirmación con código QR para las reservas.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_ticket` | UUID | Primary Key |
| `id_reserva` | UUID | Foreign Key → reservas |
| `codigo_qr` | TEXT | Código QR único |
| `fecha_emision` | TIMESTAMP | Fecha de emisión |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |

**Índices:**
- `id_reserva`
- `codigo_qr` (unique)

**Restricciones:**
- ON DELETE CASCADE para reserva

**Formato del código QR:** `GH-{id_reserva}-{timestamp}`

---

### 6. 🖼️ IMAGENES_HABITACION

Imágenes asociadas a cada habitación.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_imagen` | UUID | Primary Key |
| `id_habitacion` | UUID | Foreign Key → habitaciones |
| `url` | TEXT | URL de la imagen |
| `orden` | INT | Orden de visualización |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |

**Índices:**
- `id_habitacion`

**Restricciones:**
- ON DELETE CASCADE para habitación

---

## Diagrama de Relaciones

```
USUARIOS (1) ──── (N) RESERVAS (N) ──── (1) HABITACIONES
                      │
                      ├──── (N) PAGOS
                      │
                      └──── (1) TICKETS

HABITACIONES (1) ──── (N) IMAGENES_HABITACION
```

### Relaciones Detalladas

1. **Usuario → Reserva** (1:N)
   - Un usuario puede tener múltiples reservas
   - Cada reserva pertenece a un usuario

2. **Habitación → Reserva** (1:N)
   - Una habitación puede tener múltiples reservas
   - Cada reserva es para una habitación específica

3. **Reserva → Pago** (1:N)
   - Una reserva puede tener múltiples pagos
   - Cada pago está asociado a una reserva

4. **Reserva → Ticket** (1:1)
   - Cada reserva tiene un ticket único
   - Cada ticket pertenece a una reserva

5. **Habitación → ImagenHabitacion** (1:N)
   - Una habitación puede tener múltiples imágenes
   - Cada imagen pertenece a una habitación

---

## Servicios Implementados

### 📂 `userService.ts`
- ✅ createUser
- ✅ loginUser
- ✅ getUserById
- ✅ getUserByEmail
- ✅ updateUser
- ✅ deleteUser
- ✅ getAllUsers
- ✅ getUsersByType

### 📂 `habitacionService.ts`
- ✅ getAllHabitaciones
- ✅ searchHabitaciones (por ciudad, categoría, fechas)
- ✅ getHabitacionById
- ✅ updateHabitacionEstado
- ✅ getHabitacionesByCiudad

### 📂 `reservaService.ts`
- ✅ createReserva
- ✅ getReservaById
- ✅ getReservasByUsuario
- ✅ getReservasByHabitacion
- ✅ updateReservaEstado
- ✅ cancelReserva
- ✅ checkHabitacionDisponibilidad
- ✅ getAllReservas

### 📂 `pagoService.ts`
- ✅ createPago
- ✅ getPagoById
- ✅ getPagosByReserva
- ✅ updatePagoEstado
- ✅ getAllPagos
- ✅ getPagosPendientes

### 📂 `ticketService.ts`
- ✅ createTicket
- ✅ getTicketById
- ✅ getTicketByReserva
- ✅ getTicketByCodigoQR
- ✅ getAllTickets
- ✅ deleteTicket

### 📂 `imagenService.ts`
- ✅ createImagen
- ✅ getImagenesByHabitacion
- ✅ getImagenById
- ✅ updateImagenOrden
- ✅ deleteImagen
- ✅ getAllImagenes

---

## Migraciones SQL

### 📄 `001_create_users_table.sql`
- Crea tabla `usuarios`
- Inserta usuario admin por defecto

### 📄 `002_create_hotel_tables.sql`
- Crea tablas: `habitaciones`, `reservas`, `pagos`, `tickets`, `imagenes_habitacion`
- Crea todos los índices
- Crea triggers para `updated_at`
- Inserta datos de ejemplo (10 habitaciones, 4 imágenes)

---

## Modo de Operación

### 🔧 Modo Mock (Sin Supabase)
Todos los servicios funcionan con datos en memoria:
- ✅ 1 usuario admin
- ✅ 6 habitaciones de ejemplo
- ✅ 6 imágenes de habitaciones
- ✅ Arrays vacíos para reservas, pagos, tickets

### 🚀 Modo Supabase (Con Configuración)
Conecta a base de datos PostgreSQL real:
- ✅ Persistencia completa
- ✅ Datos de ejemplo precargados
- ✅ Integridad referencial

---

## Flujo de Reserva Completo

1. **Usuario busca habitación**
   ```typescript
   searchHabitaciones({ ciudad: 'Madrid', fecha_inicio, fecha_fin })
   ```

2. **Verifica disponibilidad**
   ```typescript
   checkHabitacionDisponibilidad(id_habitacion, fecha_inicio, fecha_fin)
   ```

3. **Crea reserva**
   ```typescript
   createReserva({ id_usuario, id_habitacion, fecha_inicio, fecha_fin, total })
   ```

4. **Procesa pago**
   ```typescript
   createPago({ id_reserva, monto, metodo: 'tarjeta' })
   ```

5. **Genera ticket**
   ```typescript
   createTicket(id_reserva)
   ```

6. **Actualiza estado de habitación**
   ```typescript
   updateHabitacionEstado(id_habitacion, 'ocupada')
   ```

---

## Próximos Pasos Sugeridos

### Seguridad
- [ ] Implementar hash de contraseñas (bcrypt)
- [ ] Configurar Row Level Security (RLS)
- [ ] Agregar validación de email
- [ ] Implementar recuperación de contraseña

### Funcionalidades
- [ ] Sistema de calificaciones de habitaciones
- [ ] Historial de reservas del usuario
- [ ] Panel de administración
- [ ] Reportes y estadísticas
- [ ] Notificaciones por email

### Optimizaciones
- [ ] Caché de búsquedas frecuentes
- [ ] Paginación de resultados
- [ ] Búsqueda por rangos de precio
- [ ] Filtros avanzados (comodidades, calificación)
