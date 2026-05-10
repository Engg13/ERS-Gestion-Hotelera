# Guía Rápida - Base de Datos Grand Hotel

## ✅ Ya Está Funcionando

La aplicación ya funciona en **modo mock** con todas las tablas implementadas. No necesitas hacer nada para empezar a probar.

---

## 🚀 Inicio Rápido

### 1. Probar en Modo Mock (Actual)

La aplicación ya tiene datos de prueba cargados:

```bash
# Ejecutar la aplicación
pnpm run dev
```

**Credenciales de prueba:**
- Email: `admin@grandhotel.com`
- Password: `admin123`

**Datos disponibles:**
- ✅ 1 usuario admin
- ✅ 6 habitaciones (Madrid, Barcelona)
- ✅ 6 imágenes de habitaciones
- ✅ Todos los servicios funcionando

---

### 2. Usar los Servicios

```typescript
// Ejemplo: Buscar habitaciones en Madrid
import { searchHabitaciones } from './services/habitacionService';

const result = await searchHabitaciones({
  ciudad: 'Madrid',
  fecha_inicio: '2026-06-01',
  fecha_fin: '2026-06-05'
});

console.log(result.habitaciones);
// [
//   { id_habitacion: '1', numero: '101', categoria: 'Standard', precio_diario: 85, ... },
//   { id_habitacion: '2', numero: '102', categoria: 'Deluxe', precio_diario: 120, ... },
//   { id_habitacion: '3', numero: '103', categoria: 'Suite', precio_diario: 200, ... }
// ]
```

---

### 3. Flujo Completo de Reserva

```typescript
import { checkHabitacionDisponibilidad, createReserva } from './services/reservaService';
import { createPago } from './services/pagoService';
import { createTicket } from './services/ticketService';
import { updateHabitacionEstado } from './services/habitacionService';

// Paso 1: Verificar disponibilidad
const { disponible } = await checkHabitacionDisponibilidad(
  'habitacion-id',
  '2026-06-01',
  '2026-06-05'
);

if (!disponible) {
  alert('Habitación no disponible');
  return;
}

// Paso 2: Crear reserva
const { reserva } = await createReserva({
  id_usuario: 'user-id',
  id_habitacion: 'habitacion-id',
  fecha_inicio: '2026-06-01',
  fecha_fin: '2026-06-05',
  total: 340.00 // 85 x 4 noches
});

// Paso 3: Procesar pago
const { pago } = await createPago({
  id_reserva: reserva.id_reserva,
  monto: 340.00,
  metodo: 'tarjeta'
});

// Paso 4: Generar ticket
const { ticket } = await createTicket(reserva.id_reserva);

// Paso 5: Actualizar estado de habitación
await updateHabitacionEstado('habitacion-id', 'ocupada');

console.log('✅ Reserva completada!');
console.log('Código QR:', ticket.codigo_qr);
```

---

## 📊 Servicios Disponibles

### 🏨 Habitaciones
```typescript
import * as habitacionService from './services/habitacionService';

// Buscar habitaciones
const { habitaciones } = await habitacionService.searchHabitaciones({
  ciudad: 'Barcelona',
  categoria: 'Deluxe'
});

// Obtener por ID
const { habitacion } = await habitacionService.getHabitacionById('1');

// Actualizar estado
await habitacionService.updateHabitacionEstado('1', 'ocupada');
```

### 📅 Reservas
```typescript
import * as reservaService from './services/reservaService';

// Crear reserva
const { reserva } = await reservaService.createReserva({
  id_usuario: 'user-id',
  id_habitacion: 'room-id',
  fecha_inicio: '2026-06-01',
  fecha_fin: '2026-06-05',
  total: 400
});

// Ver reservas de usuario
const { reservas } = await reservaService.getReservasByUsuario('user-id');

// Cancelar reserva
await reservaService.cancelReserva('reserva-id');
```

### 💳 Pagos
```typescript
import * as pagoService from './services/pagoService';

// Crear pago
const { pago } = await pagoService.createPago({
  id_reserva: 'reserva-id',
  monto: 400,
  metodo: 'tarjeta'
});

// Ver pagos de una reserva
const { pagos } = await pagoService.getPagosByReserva('reserva-id');
```

### 🎫 Tickets
```typescript
import * as ticketService from './services/ticketService';

// Generar ticket
const { ticket } = await ticketService.createTicket('reserva-id');

// Buscar por código QR
const { ticket } = await ticketService.getTicketByCodigoQR('GH-xxx-123456');
```

### 🖼️ Imágenes
```typescript
import * as imagenService from './services/imagenService';

// Obtener imágenes de una habitación
const { imagenes } = await imagenService.getImagenesByHabitacion('habitacion-id');

// Agregar nueva imagen
const { imagen } = await imagenService.createImagen({
  id_habitacion: 'habitacion-id',
  url: 'https://example.com/image.jpg',
  orden: 1
});
```

---

## 🔄 Cambiar a Modo Supabase (Opcional)

Si quieres persistencia real en base de datos PostgreSQL:

### 1. Crear proyecto en Supabase
```
https://supabase.com → Crear cuenta → Nuevo proyecto
```

### 2. Configurar .env
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

### 3. Ejecutar migraciones
```sql
-- En Supabase SQL Editor, ejecutar en orden:
-- 1. supabase/migrations/001_create_users_table.sql
-- 2. supabase/migrations/002_create_hotel_tables.sql
```

### 4. Reiniciar app
```bash
pnpm run dev
```

La app detectará automáticamente las credenciales y usará Supabase.

---

## 📁 Estructura de Archivos

```
src/
├── lib/
│   └── supabase.ts              # Cliente y tipos
├── services/
│   ├── userService.ts           # Gestión de usuarios
│   ├── habitacionService.ts     # Gestión de habitaciones
│   ├── reservaService.ts        # Gestión de reservas
│   ├── pagoService.ts           # Gestión de pagos
│   ├── ticketService.ts         # Gestión de tickets
│   └── imagenService.ts         # Gestión de imágenes

supabase/
└── migrations/
    ├── 001_create_users_table.sql
    └── 002_create_hotel_tables.sql
```

---

## 📚 Documentación Completa

- **`DATABASE_TABLES_SUMMARY.md`** - Resumen de todas las tablas ⭐ Empieza aquí
- **`DATABASE_SCHEMA.md`** - Esquema detallado de cada tabla
- **`DATABASE_README.md`** - Resumen de la integración
- **`DATABASE_SETUP.md`** - Configurar Supabase paso a paso
- **`DATABASE_MODE.md`** - Modo Mock vs Supabase

---

## ✨ Próximos Pasos

1. ✅ **Las bases de datos están listas**
2. 🔄 Conectar la UI con los servicios:
   - Actualizar página de búsqueda para usar `searchHabitaciones()`
   - Implementar flujo de reserva completo
   - Mostrar imágenes de habitaciones
   - Generar y mostrar tickets

3. 📊 Crear página de historial de reservas del usuario

4. 🎨 Implementar página de detalle de habitación con galería de imágenes

5. 🔐 Agregar hash de contraseñas (bcrypt) para producción

---

## 🆘 Ayuda

**¿Los servicios funcionan?**
```typescript
import { getAllHabitaciones } from './services/habitacionService';

const result = await getAllHabitaciones();
console.log(result); // { success: true, habitaciones: [...] }
```

**¿Qué modo estoy usando?**
- Abre la consola del navegador (F12)
- Busca el mensaje: `🔧 MOCK mode` o `✅ Connected to Supabase`

**¿Necesito Supabase para desarrollar?**
- No, el modo mock funciona perfectamente para desarrollo
- Solo necesitas Supabase si quieres persistencia real

---

¡Todo está listo para empezar a usar las bases de datos! 🎉
