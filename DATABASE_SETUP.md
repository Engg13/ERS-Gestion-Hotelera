# Database Setup - Grand Hotel

Este documento describe cómo configurar la base de datos Supabase para la aplicación Grand Hotel.

> **💡 Nota**: La aplicación funciona sin configuración adicional en **modo mock** para desarrollo. Solo necesitas seguir esta guía si quieres conectar una base de datos real de Supabase.

## Requisitos

- Una cuenta de Supabase (gratuita en https://supabase.com)
- Node.js y pnpm instalados

## Paso 1: Crear Proyecto en Supabase

1. Ve a https://app.supabase.com y crea una cuenta o inicia sesión
2. Haz clic en "New Project"
3. Completa la información:
   - **Name**: Grand Hotel
   - **Database Password**: Guarda esta contraseña de forma segura
   - **Region**: Selecciona la región más cercana a tus usuarios
4. Espera a que el proyecto se cree (toma 1-2 minutos)

## Paso 2: Obtener Credenciales

1. En el dashboard de tu proyecto, ve a **Settings** > **API**
2. Copia los siguientes valores:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon/public key** (es una clave larga que empieza con `eyJ...`)

## Paso 3: Configurar Variables de Entorno

1. En la raíz del proyecto, copia el archivo `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y reemplaza los valores:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto-id.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-anon-aqui
   ```

## Paso 4: Crear Tabla de Usuarios

En Supabase, tienes dos opciones para crear la tabla:

### Opción A: Usar el SQL Editor (Recomendado)

1. En el dashboard de Supabase, ve a **SQL Editor**

2. **Primera migración** - Crear tabla de usuarios:
   - Haz clic en **New Query**
   - Copia y pega el contenido del archivo `supabase/migrations/001_create_users_table.sql`
   - Haz clic en **Run** para ejecutar la migración

3. **Segunda migración** - Crear tablas del hotel:
   - Haz clic en **New Query** nuevamente
   - Copia y pega el contenido del archivo `supabase/migrations/002_create_hotel_tables.sql`
   - Haz clic en **Run** para ejecutar la migración

Esto creará todas las tablas necesarias: usuarios, habitaciones, reservas, pagos, tickets e imágenes.

### Opción B: Usar el Table Editor

1. Ve a **Table Editor** > **New Table**
2. Crea una tabla llamada `usuarios` con las siguientes columnas:
   - `id_usuario` - uuid - Primary Key - Default: `gen_random_uuid()`
   - `nombre` - varchar(255) - Required
   - `correo` - varchar(255) - Required, Unique
   - `password` - varchar(255) - Required
   - `tipo_usuario` - varchar(20) - Required
   - `created_at` - timestamp with time zone - Default: `now()`
   - `updated_at` - timestamp with time zone - Default: `now()`

## Paso 5: Configurar Políticas de Seguridad (RLS)

⚠️ **IMPORTANTE**: Por defecto, Supabase tiene Row Level Security (RLS) habilitado.

Para desarrollo, puedes deshabilitarlo temporalmente:

1. Ve a **Authentication** > **Policies**
2. Busca la tabla `usuarios`
3. Haz clic en **Disable RLS** (solo para desarrollo)

**Para producción**, deberías crear políticas apropiadas:

```sql
-- Permitir a los usuarios leer su propia información
CREATE POLICY "Users can read own data"
ON usuarios FOR SELECT
USING (auth.uid() = id_usuario);

-- Permitir crear nuevos usuarios (registro)
CREATE POLICY "Anyone can insert users"
ON usuarios FOR INSERT
WITH CHECK (true);

-- Permitir a los usuarios actualizar su propia información
CREATE POLICY "Users can update own data"
ON usuarios FOR UPDATE
USING (auth.uid() = id_usuario);
```

## Estructura de la Tabla `usuarios`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_usuario` | UUID | Identificador único del usuario |
| `nombre` | VARCHAR(255) | Nombre completo del usuario |
| `correo` | VARCHAR(255) | Correo electrónico (único) |
| `password` | VARCHAR(255) | Contraseña (nota: en producción usar hashing) |
| `tipo_usuario` | VARCHAR(20) | Tipo: 'cliente' o 'admin' |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Fecha de última actualización |

## Servicios Disponibles

La aplicación incluye los siguientes servicios en `src/services/userService.ts`:

- `createUser(userData)` - Crear nuevo usuario
- `loginUser(credentials)` - Iniciar sesión
- `getUserById(id_usuario)` - Obtener usuario por ID
- `getUserByEmail(correo)` - Obtener usuario por correo
- `updateUser(id_usuario, updates)` - Actualizar información del usuario
- `deleteUser(id_usuario)` - Eliminar usuario
- `getAllUsers()` - Obtener todos los usuarios (admin)
- `getUsersByType(tipo_usuario)` - Filtrar por tipo de usuario

## Datos de Prueba

La migración incluye un usuario admin por defecto:

- **Correo**: `admin@grandhotel.com`
- **Contraseña**: `admin123`
- **Tipo**: `admin`

Puedes usar estas credenciales para probar el login.

## Probar la Conexión

1. Asegúrate de que el archivo `.env` esté configurado correctamente
2. Inicia la aplicación:
   ```bash
   pnpm install
   pnpm run dev
   ```
3. Ve a la página de login
4. Intenta iniciar sesión con las credenciales del admin
5. O crea una nueva cuenta usando el formulario de registro

## Seguridad en Producción

⚠️ **ADVERTENCIAS IMPORTANTES**:

1. **Hashing de Contraseñas**: Esta implementación guarda las contraseñas en texto plano. En producción, debes usar bcrypt o similar:
   ```bash
   pnpm add bcryptjs
   pnpm add -D @types/bcryptjs
   ```

2. **Row Level Security**: Habilita RLS y crea políticas apropiadas

3. **Validación de Email**: Implementa verificación de email

4. **Rate Limiting**: Implementa límites de intentos de login

5. **Variables de Entorno**: Nunca subas el archivo `.env` al repositorio
   - El archivo `.env` ya está en `.gitignore`
   - Usa variables de entorno en tu servicio de hosting

## Troubleshooting

### Error: "Cannot connect to database"
- Verifica que las credenciales en `.env` sean correctas
- Verifica que el proyecto Supabase esté activo
- Verifica tu conexión a internet

### Error: "RLS policy violation"
- Deshabilita RLS para desarrollo
- O crea las políticas de seguridad apropiadas

### Error: "Email already exists"
- El correo ya está registrado en la base de datos
- Usa un correo diferente o elimina el registro existente

## Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
