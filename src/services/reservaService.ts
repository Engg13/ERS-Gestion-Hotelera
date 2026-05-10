import { supabase, isSupabaseConfigured, Reserva, EstadoReserva } from '../lib/supabase';

// Mock database for development
const mockReservas: Reserva[] = [];

export interface CreateReservaData {
  id_usuario: string;
  id_habitacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  total: number;
}

/**
 * Create a new reserva
 */
export async function createReserva(data: CreateReservaData): Promise<{ success: boolean; reserva?: Reserva; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const newReserva: Reserva = {
      id_reserva: String(mockReservas.length + 1),
      ...data,
      fecha_reserva: new Date().toISOString(),
      estado: 'confirmada',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockReservas.push(newReserva);
    return { success: true, reserva: newReserva };
  }

  try {
    const { data: reserva, error } = await supabase
      .from('reservas')
      .insert([{
        ...data,
        estado: 'confirmada',
      }])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, reserva };
  } catch (error) {
    return { success: false, error: 'Error al crear reserva' };
  }
}

/**
 * Get reserva by ID
 */
export async function getReservaById(id_reserva: string): Promise<{ success: boolean; reserva?: Reserva; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const reserva = mockReservas.find(r => r.id_reserva === id_reserva);
    if (!reserva) {
      return { success: false, error: 'Reserva no encontrada' };
    }
    return { success: true, reserva };
  }

  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('id_reserva', id_reserva)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, reserva: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener reserva' };
  }
}

/**
 * Get reservas by user
 */
export async function getReservasByUsuario(id_usuario: string): Promise<{ success: boolean; reservas?: Reserva[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const reservas = mockReservas.filter(r => r.id_usuario === id_usuario);
    return { success: true, reservas };
  }

  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('id_usuario', id_usuario)
      .order('fecha_reserva', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, reservas: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener reservas' };
  }
}

/**
 * Get reservas by habitacion
 */
export async function getReservasByHabitacion(id_habitacion: string): Promise<{ success: boolean; reservas?: Reserva[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const reservas = mockReservas.filter(r => r.id_habitacion === id_habitacion);
    return { success: true, reservas };
  }

  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('id_habitacion', id_habitacion)
      .order('fecha_inicio', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, reservas: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener reservas' };
  }
}

/**
 * Update reserva estado
 */
export async function updateReservaEstado(id_reserva: string, estado: EstadoReserva): Promise<{ success: boolean; reserva?: Reserva; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const index = mockReservas.findIndex(r => r.id_reserva === id_reserva);
    if (index === -1) {
      return { success: false, error: 'Reserva no encontrada' };
    }
    mockReservas[index] = {
      ...mockReservas[index],
      estado,
      updated_at: new Date().toISOString(),
    };
    return { success: true, reserva: mockReservas[index] };
  }

  try {
    const { data, error } = await supabase
      .from('reservas')
      .update({ estado })
      .eq('id_reserva', id_reserva)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, reserva: data };
  } catch (error) {
    return { success: false, error: 'Error al actualizar reserva' };
  }
}

/**
 * Cancel reserva
 */
export async function cancelReserva(id_reserva: string): Promise<{ success: boolean; reserva?: Reserva; error?: string }> {
  return updateReservaEstado(id_reserva, 'cancelada');
}

/**
 * Check if habitacion is available for dates
 */
export async function checkHabitacionDisponibilidad(
  id_habitacion: string,
  fecha_inicio: string,
  fecha_fin: string
): Promise<{ success: boolean; disponible?: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const reservasConflict = mockReservas.filter(
      r =>
        r.id_habitacion === id_habitacion &&
        r.estado === 'confirmada' &&
        ((fecha_inicio >= r.fecha_inicio && fecha_inicio < r.fecha_fin) ||
          (fecha_fin > r.fecha_inicio && fecha_fin <= r.fecha_fin) ||
          (fecha_inicio <= r.fecha_inicio && fecha_fin >= r.fecha_fin))
    );

    return { success: true, disponible: reservasConflict.length === 0 };
  }

  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('id_habitacion', id_habitacion)
      .eq('estado', 'confirmada')
      .or(`and(fecha_inicio.lte.${fecha_fin},fecha_fin.gte.${fecha_inicio})`);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, disponible: data.length === 0 };
  } catch (error) {
    return { success: false, error: 'Error al verificar disponibilidad' };
  }
}

/**
 * Get all reservas (admin)
 */
export async function getAllReservas(): Promise<{ success: boolean; reservas?: Reserva[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: true, reservas: [...mockReservas] };
  }

  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .order('fecha_reserva', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, reservas: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener reservas' };
  }
}
