# Integración de Base de Datos - Grand Hotel

## Resumen

Se ha integrado **Supabase** como base de datos para gestionar los usuarios de la aplicación Grand Hotel.

⚠️ **Modo de Desarrollo**: La aplicación funciona en **modo mock** si Supabase no está configurado. Esto permite desarrollo sin necesidad de configurar una base de datos real. Para usar la base de datos real, sigue las instrucciones en `DATABASE_SETUP.md`.

### Modo Mock (Sin Configuración)
- ✅ Login y registro funcionan completamente
- ✅ Usuario admin por defecto: `admin@grandhotel.com` / `admin123`
- ✅ Los datos se almacenan en memoria (se pierden al recargar)
- ✅ Ideal para desarrollo y pruebas

### Modo Supabase (Con Configuración)
- ✅ Persistencia real en base de datos PostgreSQL
- ✅ Los datos se mantienen entre recargas
- ✅ Listo para producción

## Archivos Creados

### 1. Configuración de Base de Datos

- **`src/lib/supabase.ts`**: Cliente de Supabase y tipos TypeScript
  - Configura la conexión a Supabase
  - Define todos los tipos: `Usuario`, `Habitacion`, `Reserva`, `Pago`, `Ticket`, `ImagenHabitacion`
  - Exporta el cliente `supabase` para usar en toda la aplicación

### 2. Servicios de Base de Datos

- **`src/services/userService.ts`**: Gestión de usuarios
  - `createUser()`, `loginUser()`, `getUserById()`, `getUserByEmail()`
  - `updateUser()`, `deleteUser()`, `getAllUsers()`, `getUsersByType()`

- **`src/services/habitacionService.ts`**: Gestión de habitaciones
  - `getAllHabitaciones()`, `searchHabitaciones()`, `getHabitacionById()`
  - `updateHabitacionEstado()`, `getHabitacionesByCiudad()`

- **`src/services/reservaService.ts`**: Gestión de reservas
  - `createReserva()`, `getReservaById()`, `getReservasByUsuario()`
  - `getReservasByHabitacion()`, `updateReservaEstado()`, `cancelReserva()`
  - `checkHabitacionDisponibilidad()`, `getAllReservas()`

- **`src/services/pagoService.ts`**: Gestión de pagos
  - `createPago()`, `getPagoById()`, `getPagosByReserva()`
  - `updatePagoEstado()`, `getAllPagos()`, `getPagosPendientes()`

- **`src/services/ticketService.ts`**: Gestión de tickets
  - `createTicket()`, `getTicketById()`, `getTicketByReserva()`
  - `getTicketByCodigoQR()`, `getAllTickets()`, `deleteTicket()`

- **`src/services/imagenService.ts`**: Gestión de imágenes de habitaciones
  - `createImagen()`, `getImagenesByHabitacion()`, `getImagenById()`
  - `updateImagenOrden()`, `deleteImagen()`, `getAllImagenes()`

### 3. Migraciones SQL

- **`supabase/migrations/001_create_users_table.sql`**: Tabla de usuarios
  - Crea la tabla `usuarios` con todos los campos requeridos
  - Agrega índices para optimizar búsquedas
  - Incluye triggers para actualizar `updated_at` automáticamente
  - Inserta un usuario admin por defecto

- **`supabase/migrations/002_create_hotel_tables.sql`**: Tablas del sistema hotelero
  - Crea tablas: `habitaciones`, `reservas`, `pagos`, `tickets`, `imagenes_habitacion`
  - Define relaciones con Foreign Keys y ON DELETE CASCADE
  - Crea índices para optimizar consultas
  - Incluye triggers para `updated_at` en todas las tablas
  - Inserta datos de ejemplo: 10 habitaciones y 4 imágenes

### 4. Configuración de Entorno

- **`.env.example`**: Plantilla de variables de entorno
- **`.gitignore`**: Asegura que `.env` no se suba al repositorio

### 5. Documentación

- **`DATABASE_SETUP.md`**: Guía completa de configuración paso a paso

## Archivos Modificados

### 1. Context de Autenticación

- **`src/app/context/AuthContext.tsx`**:
  - Actualizado para usar Supabase en lugar de simulación
  - Login y registro ahora son **asíncronos**
  - Agrega persistencia en `localStorage`
  - Agrega estado de `loading`
  - Manejo de errores desde la base de datos
  - Nueva interfaz `User` con campos: `id_usuario`, `nombre`, `correo`, `tipo_usuario`

### 2. Páginas

- **`src/app/pages/Login.tsx`**:
  - Cambiado de `username` a `correo` (email)
  - Login ahora es asíncrono con manejo de errores
  - Muestra estado de carga en el botón
  - Muestra mensajes de error de la base de datos

- **`src/app/pages/Register.tsx`**:
  - Simplificado a solo 4 campos: nombre, correo, password, confirmPassword
  - Eliminados campos: firstName, lastName, phone, username
  - Registro ahora es asíncrono con manejo de errores
  - Muestra estado de carga en el botón
  - Muestra mensajes de error de la base de datos

### 3. Traducciones

- **`src/app/context/LanguageContext.tsx`**:
  - Agregadas nuevas claves de traducción:
    - `login.email`, `login.emailPlaceholder`
    - `login.loading`
    - `register.name`, `register.namePlaceholder`
    - `validation.loginError`, `validation.registerError`

### 4. Dependencias

- **`package.json`**:
  - Agregado: `@supabase/supabase-js@2.105.1`

## Modelo de Datos

### Tablas Principales

1. **`usuarios`** - Usuarios del sistema (clientes y admins)
2. **`habitaciones`** - Catálogo de habitaciones disponibles
3. **`reservas`** - Reservas realizadas por usuarios
4. **`pagos`** - Pagos asociados a reservas
5. **`tickets`** - Tickets de confirmación con código QR
6. **`imagenes_habitacion`** - Imágenes de las habitaciones

### Diagrama de Relaciones

```
USUARIOS (1) ──── (N) RESERVAS (N) ──── (1) HABITACIONES
                      │
                      ├──── (N) PAGOS
                      │
                      └──── (1) TICKETS

HABITACIONES (1) ──── (N) IMAGENES_HABITACION
```

Para más detalles sobre el esquema completo, consulta **`DATABASE_SCHEMA.md`**.

### Datos de Ejemplo (Mock Mode)

- **Usuarios**: 1 admin (`admin@grandhotel.com` / `admin123`)
- **Habitaciones**: 6 habitaciones en Madrid, Barcelona
- **Imágenes**: 6 imágenes de habitaciones
- **Reservas**: Array vacío (se crean dinámicamente)
- **Pagos**: Array vacío (se crean dinámicamente)
- **Tickets**: Array vacío (se crean dinámicamente)

## Flujo de Autenticación

### Registro

1. Usuario completa formulario: nombre, correo, password
2. `AuthContext.register()` llama a `userService.createUser()`
3. Se valida que el correo no exista
4. Se crea el usuario con `tipo_usuario: 'cliente'`
5. Usuario es redirigido a `/search`

### Login

1. Usuario ingresa correo y password
2. `AuthContext.login()` llama a `userService.loginUser()`
3. Se busca el usuario por correo y password
4. Si es válido, se guarda en estado y localStorage
5. Usuario es redirigido a `/search`

### Persistencia

- Los datos del usuario se guardan en `localStorage`:
  - `grandhotel_user`: Datos del usuario autenticado
  - `grandhotel_isGuest`: Bandera de modo invitado
- Al recargar la página, se restaura la sesión automáticamente

## Próximos Pasos

### Seguridad (Producción)

1. **Implementar hash de contraseñas** con bcrypt:
   ```bash
   pnpm add bcryptjs @types/bcryptjs
   ```

2. **Configurar Row Level Security (RLS)** en Supabase

3. **Agregar validación de email**

4. **Implementar recuperación de contraseña**

5. **Rate limiting** para prevenir ataques de fuerza bruta

### Funcionalidades Adicionales

1. ✅ **Tablas de reservas, habitaciones, pagos, tickets e imágenes** - Completado

2. **Integrar servicios con la UI**:
   - Conectar búsqueda de habitaciones con `habitacionService`
   - Implementar flujo completo de reserva
   - Mostrar imágenes de habitaciones desde `imagenService`
   - Generar tickets con códigos QR

3. **Perfil de usuario**: Página para editar información personal

4. **Historial de reservas**: Ver reservas pasadas y futuras del usuario

5. **Admin panel**: Panel para administradores con estadísticas

6. **Sistema de calificaciones**: Permitir a usuarios calificar habitaciones

7. **Notificaciones**: Emails de confirmación de reserva y recordatorios

## Comandos Útiles

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm run dev

# Ejecutar tests
pnpm test

# Ver cobertura de tests
pnpm coverage
```

## Soporte

Para problemas con la configuración de la base de datos, consulta `DATABASE_SETUP.md`.

Para problemas con los tests, consulta `TESTING.md`.
