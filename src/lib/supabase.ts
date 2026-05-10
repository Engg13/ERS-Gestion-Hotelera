import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration
// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const isSupabaseConfigured = isValidUrl(supabaseUrl) && supabaseAnonKey.length > 0;

// Log database mode
if (!isSupabaseConfigured) {
  console.log(
    '%c🔧 Grand Hotel - Running in MOCK mode',
    'background: #f59e0b; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
    '\nSupabase not configured. Using in-memory mock database.',
    '\nTo use real database, configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file.',
    '\nSee DATABASE_SETUP.md for instructions.'
  );
} else {
  console.log(
    '%c✅ Grand Hotel - Connected to Supabase',
    'background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
    '\nDatabase mode: PRODUCTION'
  );
}

// Create Supabase client only if properly configured
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Database types
export interface Usuario {
  id_usuario: string;
  nombre: string;
  correo: string;
  password: string;
  tipo_usuario: 'cliente' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Habitacion {
  id_habitacion: string;
  numero: string;
  categoria: string;
  precio_diario: number;
  estado: 'disponible' | 'ocupada';
  ciudad: string;
  descripcion?: string;
  capacidad: number;
  created_at: string;
  updated_at: string;
}

export interface Reserva {
  id_reserva: string;
  id_usuario: string;
  id_habitacion: string;
  fecha_reserva: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: 'confirmada' | 'cancelada';
  total: number;
  created_at: string;
  updated_at: string;
}

export interface Pago {
  id_pago: string;
  id_reserva: string;
  monto: number;
  fecha_pago: string;
  metodo: 'tarjeta' | 'efectivo' | 'transferencia';
  estado: 'pagado' | 'pendiente';
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id_ticket: string;
  id_reserva: string;
  codigo_qr: string;
  fecha_emision: string;
  created_at: string;
  updated_at: string;
}

export interface ImagenHabitacion {
  id_imagen: string;
  id_habitacion: string;
  url: string;
  orden: number;
  created_at: string;
  updated_at: string;
}

export type TipoUsuario = 'cliente' | 'admin';
export type EstadoHabitacion = 'disponible' | 'ocupada';
export type EstadoReserva = 'confirmada' | 'cancelada';
export type MetodoPago = 'tarjeta' | 'efectivo' | 'transferencia';
export type EstadoPago = 'pagado' | 'pendiente';
