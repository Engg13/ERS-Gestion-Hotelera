import { supabase, isSupabaseConfigured, Pago, MetodoPago, EstadoPago } from '../lib/supabase';

// Mock database for development
const mockPagos: Pago[] = [];

export interface CreatePagoData {
  id_reserva: string;
  monto: number;
  metodo: MetodoPago;
}

/**
 * Create a new pago
 */
export async function createPago(data: CreatePagoData): Promise<{ success: boolean; pago?: Pago; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const newPago: Pago = {
      id_pago: String(mockPagos.length + 1),
      ...data,
      fecha_pago: new Date().toISOString(),
      estado: 'pagado',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockPagos.push(newPago);
    return { success: true, pago: newPago };
  }

  try {
    const { data: pago, error } = await supabase
      .from('pagos')
      .insert([{
        ...data,
        estado: 'pagado',
      }])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, pago };
  } catch (error) {
    return { success: false, error: 'Error al crear pago' };
  }
}

/**
 * Get pago by ID
 */
export async function getPagoById(id_pago: string): Promise<{ success: boolean; pago?: Pago; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const pago = mockPagos.find(p => p.id_pago === id_pago);
    if (!pago) {
      return { success: false, error: 'Pago no encontrado' };
    }
    return { success: true, pago };
  }

  try {
    const { data, error } = await supabase
      .from('pagos')
      .select('*')
      .eq('id_pago', id_pago)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, pago: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener pago' };
  }
}

/**
 * Get pagos by reserva
 */
export async function getPagosByReserva(id_reserva: string): Promise<{ success: boolean; pagos?: Pago[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const pagos = mockPagos.filter(p => p.id_reserva === id_reserva);
    return { success: true, pagos };
  }

  try {
    const { data, error } = await supabase
      .from('pagos')
      .select('*')
      .eq('id_reserva', id_reserva)
      .order('fecha_pago', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, pagos: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener pagos' };
  }
}

/**
 * Update pago estado
 */
export async function updatePagoEstado(id_pago: string, estado: EstadoPago): Promise<{ success: boolean; pago?: Pago; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const index = mockPagos.findIndex(p => p.id_pago === id_pago);
    if (index === -1) {
      return { success: false, error: 'Pago no encontrado' };
    }
    mockPagos[index] = {
      ...mockPagos[index],
      estado,
      updated_at: new Date().toISOString(),
    };
    return { success: true, pago: mockPagos[index] };
  }

  try {
    const { data, error } = await supabase
      .from('pagos')
      .update({ estado })
      .eq('id_pago', id_pago)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, pago: data };
  } catch (error) {
    return { success: false, error: 'Error al actualizar pago' };
  }
}

/**
 * Get all pagos (admin)
 */
export async function getAllPagos(): Promise<{ success: boolean; pagos?: Pago[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: true, pagos: [...mockPagos] };
  }

  try {
    const { data, error } = await supabase
      .from('pagos')
      .select('*')
      .order('fecha_pago', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, pagos: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener pagos' };
  }
}

/**
 * Get pagos pendientes
 */
export async function getPagosPendientes(): Promise<{ success: boolean; pagos?: Pago[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const pagos = mockPagos.filter(p => p.estado === 'pendiente');
    return { success: true, pagos };
  }

  try {
    const { data, error } = await supabase
      .from('pagos')
      .select('*')
      .eq('estado', 'pendiente')
      .order('fecha_pago', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, pagos: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener pagos pendientes' };
  }
}
