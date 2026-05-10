# Database Mode - Grand Hotel

## 🔧 Mock Mode (Actual)

La aplicación está corriendo en **modo mock** porque Supabase no está configurado.

### ¿Qué significa esto?

- ✅ La aplicación funciona completamente
- ✅ Puedes hacer login, registro y todas las funciones
- ⚠️ Los datos se guardan en memoria (se pierden al recargar la página)
- ⚠️ No hay persistencia real de datos

### Usuario de Prueba

Puedes usar este usuario para hacer login:

- **Email**: `admin@grandhotel.com`
- **Password**: `admin123`
- **Tipo**: Administrador

O puedes crear una nueva cuenta usando el formulario de registro.

### Ventajas del Modo Mock

1. **No requiere configuración**: La app funciona inmediatamente
2. **Ideal para desarrollo**: Prueba todas las funcionalidades
3. **Sin costos**: No necesitas crear cuenta en Supabase
4. **Rápido**: No hay latencia de red

### Desventajas del Modo Mock

1. **Datos no persistentes**: Se pierden al recargar
2. **Solo para desarrollo**: No usar en producción
3. **Limitado a un solo navegador**: Los datos no se comparten

---

## 🚀 Cambiar a Modo Producción (Supabase)

Si quieres que los datos persistan en una base de datos real:

### Paso 1: Crear cuenta en Supabase

1. Ve a https://supabase.com
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

### Paso 2: Configurar variables de entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` con tus credenciales de Supabase:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-aqui
   ```

### Paso 3: Crear la tabla de usuarios

1. En Supabase, ve a **SQL Editor**
2. Ejecuta el script en `supabase/migrations/001_create_users_table.sql`

### Paso 4: Reiniciar la aplicación

```bash
pnpm run dev
```

La aplicación detectará automáticamente las variables de entorno y cambiará a modo Supabase.

---

## 🔍 Verificar el Modo Actual

Abre la consola del navegador (F12) y busca uno de estos mensajes:

### Mock Mode
```
🔧 Grand Hotel - Running in MOCK mode
Supabase not configured. Using in-memory mock database.
```

### Supabase Mode
```
✅ Grand Hotel - Connected to Supabase
Database mode: PRODUCTION
```

---

## 📚 Documentación Adicional

- **`DATABASE_SETUP.md`**: Guía completa de configuración de Supabase
- **`DATABASE_README.md`**: Resumen de la integración de base de datos
- **`.env.example`**: Plantilla de variables de entorno
