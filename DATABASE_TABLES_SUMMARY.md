# Resumen de Tablas - Grand Hotel

## ✅ Tablas Creadas

### 1. 👤 USUARIOS
```typescript
interface Usuario {
  id_usuario: string;
  nombre: string;
  correo: string;
  password: string;
  tipo_usuario: 'cliente' | 'admin';
  created_at: string;
  updated_at: string;
}
```
**Servicio:** `userService.ts` (8 funciones)

---

### 2. 🏨 HABITACIONES
```typescript
interface Habitacion {
  id_habitacion: string;
  numero: string;
  categoria: string;          // 'Standard', 'Deluxe', 'Suite'
  precio_diario: number;
  estado: 'disponible' | 'ocupada';
  ciudad: string;
  descripcion?: string;
  capacidad: number;
  created_at: string;
  updated_at: string;
}
```
**Servicio:** `habitacionService.ts` (5 funciones)
**Mock Data:** 6 habitaciones en Madrid y Barcelona

---

### 3. 📅 RESERVAS
```typescript
interface Reserva {
  id_reserva: string;
  id_usuario: string;         // FK → usuarios
  id_habitacion: string;      // FK → habitaciones
  fecha_reserva: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: 'confirmada' | 'cancelada';
  total: number;
  created_at: string;
  updated_at: string;
}
```
**Servicio:** `reservaService.ts` (8 funciones)
**Incluye:** Validación de disponibilidad

---

### 4. 💳 PAGOS
```typescript
interface Pago {
  id_pago: string;
  id_reserva: string;         // FK → reservas
  monto: number;
  fecha_pago: string;
  metodo: 'tarjeta' | 'efectivo' | 'transferencia';
  estado: 'pagado' | 'pendiente';
  created_at: string;
  updated_at: string;
}
```
**Servicio:** `pagoService.ts` (6 funciones)

---

### 5. 🎫 TICKETS
```typescript
interface Ticket {
  id_ticket: string;
  id_reserva: string;         // FK → reservas
  codigo_qr: string;          // Formato: GH-{id_reserva}-{timestamp}
  fecha_emision: string;
  created_at: string;
  updated_at: string;
}
```
**Servicio:** `ticketService.ts` (6 funciones)
**Genera:** Códigos QR únicos automáticamente

---

### 6. 🖼️ IMAGENES_HABITACION
```typescript
interface ImagenHabitacion {
  id_imagen: string;
  id_habitacion: string;      // FK → habitaciones
  url: string;
  orden: number;
  created_at: string;
  updated_at: string;
}
```
**Servicio:** `imagenService.ts` (6 funciones)
**Mock Data:** 6 imágenes de Unsplash

---

## 📊 Relaciones

```
USUARIOS
    │
    └─── (1:N) ──── RESERVAS ──── (N:1) ──── HABITACIONES
                       │                          │
                       │                          │
                  (1:N)│(1:1)                (1:N)│
                       │                          │
                    PAGOS                    IMAGENES
                    TICKETS
```

---

## 🛠️ Servicios Disponibles

### userService.ts
- `createUser(userData)`
- `loginUser(credentials)`
- `getUserById(id)`
- `getUserByEmail(email)`
- `updateUser(id, updates)`
- `deleteUser(id)`
- `getAllUsers()`
- `getUsersByType(tipo)`

### habitacionService.ts
- `getAllHabitaciones()`
- `searchHabitaciones(params)` - Buscar por ciudad, categoría, fechas
- `getHabitacionById(id)`
- `updateHabitacionEstado(id, estado)`
- `getHabitacionesByCiudad(ciudad)`

### reservaService.ts
- `createReserva(data)`
- `getReservaById(id)`
- `getReservasByUsuario(id_usuario)`
- `getReservasByHabitacion(id_habitacion)`
- `updateReservaEstado(id, estado)`
- `cancelReserva(id)`
- `checkHabitacionDisponibilidad(id, fechaInicio, fechaFin)`
- `getAllReservas()`

### pagoService.ts
- `createPago(data)`
- `getPagoById(id)`
- `getPagosByReserva(id_reserva)`
- `updatePagoEstado(id, estado)`
- `getAllPagos()`
- `getPagosPendientes()`

### ticketService.ts
- `createTicket(id_reserva)`
- `getTicketById(id)`
- `getTicketByReserva(id_reserva)`
- `getTicketByCodigoQR(codigo)`
- `getAllTickets()`
- `deleteTicket(id)`

### imagenService.ts
- `createImagen(data)`
- `getImagenesByHabitacion(id_habitacion)`
- `getImagenById(id)`
- `updateImagenOrden(id, orden)`
- `deleteImagen(id)`
- `getAllImagenes()`

---

## 🔧 Modo Mock vs Supabase

### Modo Mock (Actual)
✅ Funciona sin configuración  
✅ Datos en memoria  
✅ 1 admin + 6 habitaciones + 6 imágenes  
⚠️ Los datos se pierden al recargar  

### Modo Supabase
✅ Base de datos PostgreSQL real  
✅ Persistencia completa  
✅ Datos de ejemplo: 10 habitaciones  
📖 Ver `DATABASE_SETUP.md`  

---

## 📝 Ejemplo de Uso

```typescript
import { searchHabitaciones } from './services/habitacionService';
import { createReserva, checkHabitacionDisponibilidad } from './services/reservaService';
import { createPago } from './services/pagoService';
import { createTicket } from './services/ticketService';

// 1. Buscar habitaciones
const { habitaciones } = await searchHabitaciones({
  ciudad: 'Madrid',
  fecha_inicio: '2026-06-01',
  fecha_fin: '2026-06-05'
});

// 2. Verificar disponibilidad
const { disponible } = await checkHabitacionDisponibilidad(
  habitaciones[0].id_habitacion,
  '2026-06-01',
  '2026-06-05'
);

// 3. Crear reserva
const { reserva } = await createReserva({
  id_usuario: 'user-id',
  id_habitacion: habitaciones[0].id_habitacion,
  fecha_inicio: '2026-06-01',
  fecha_fin: '2026-06-05',
  total: habitaciones[0].precio_diario * 4
});

// 4. Procesar pago
const { pago } = await createPago({
  id_reserva: reserva.id_reserva,
  monto: reserva.total,
  metodo: 'tarjeta'
});

// 5. Generar ticket
const { ticket } = await createTicket(reserva.id_reserva);

console.log('Código QR:', ticket.codigo_qr);
```

---

## 📚 Documentación

- **`DATABASE_SCHEMA.md`** - Esquema completo con detalles de cada tabla
- **`DATABASE_README.md`** - Resumen de la integración
- **`DATABASE_SETUP.md`** - Guía de configuración de Supabase
- **`DATABASE_MODE.md`** - Explicación de modos Mock vs Supabase
