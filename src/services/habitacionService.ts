import { supabase, isSupabaseConfigured, Habitacion, EstadoHabitacion } from '../lib/supabase';

// Mock database for development
const mockHabitaciones: Habitacion[] = [
  {
    id_habitacion: '1',
    numero: '101',
    categoria: 'Standard',
    precio_diario: 85.00,
    estado: 'disponible',
    ciudad: 'Madrid',
    descripcion: 'Habitación estándar con vista a la ciudad',
    capacidad: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id_habitacion: '2',
    numero: '102',
    categoria: 'Deluxe',
    precio_diario: 120.00,
    estado: 'disponible',
    ciudad: 'Madrid',
    descripcion: 'Habitación deluxe con cama king size',
    capacidad: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id_habitacion: '3',
    numero: '103',
    categoria: 'Suite',
    precio_diario: 200.00,
    estado: 'disponible',
    ciudad: 'Madrid',
    descripcion: 'Suite de lujo con sala de estar',
    capacidad: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id_habitacion: '4',
    numero: '201',
    categoria: 'Standard',
    precio_diario: 80.00,
    estado: 'disponible',
    ciudad: 'Barcelona',
    descripcion: 'Habitación estándar moderna',
    capacidad: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id_habitacion: '5',
    numero: '202',
    categoria: 'Deluxe',
    precio_diario: 115.00,
    estado: 'disponible',
    ciudad: 'Barcelona',
    descripcion: 'Habitación deluxe con balcón',
    capacidad: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id_habitacion: '6',
    numero: '203',
    categoria: 'Suite',
    precio_diario: 190.00,
    estado: 'ocupada',
    ciudad: 'Barcelona',
    descripcion: 'Suite ejecutiva',
    capacidad: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export interface SearchHabitacionParams {
  ciudad?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  categoria?: string;
}

/**
 * Get all habitaciones
 */
export async function getAllHabitaciones(): Promise<{ success: boolean; habitaciones?: Habitacion[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: true, habitaciones: [...mockHabitaciones] };
  }

  try {
    const { data, error } = await supabase
      .from('habitaciones')
      .select('*')
      .order('numero', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, habitaciones: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener habitaciones' };
  }
}

/**
 * Search habitaciones by criteria
 */
export async function searchHabitaciones(params: SearchHabitacionParams): Promise<{ success: boolean; habitaciones?: Habitacion[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    let filtered = [...mockHabitaciones];

    if (params.ciudad) {
      filtered = filtered.filter(h => h.ciudad === params.ciudad);
    }

    if (params.categoria) {
      filtered = filtered.filter(h => h.categoria === params.categoria);
    }

    // Filter only available rooms
    filtered = filtered.filter(h => h.estado === 'disponible');

    return { success: true, habitaciones: filtered };
  }

  try {
    let query = supabase
      .from('habitaciones')
      .select('*')
      .eq('estado', 'disponible');

    if (params.ciudad) {
      query = query.eq('ciudad', params.ciudad);
    }

    if (params.categoria) {
      query = query.eq('categoria', params.categoria);
    }

    const { data, error } = await query.order('precio_diario', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, habitaciones: data };
  } catch (error) {
    return { success: false, error: 'Error al buscar habitaciones' };
  }
}

/**
 * Get habitacion by ID
 */
export async function getHabitacionById(id_habitacion: string): Promise<{ success: boolean; habitacion?: Habitacion; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const habitacion = mockHabitaciones.find(h => h.id_habitacion === id_habitacion);
    if (!habitacion) {
      return { success: false, error: 'Habitación no encontrada' };
    }
    return { success: true, habitacion };
  }

  try {
    const { data, error } = await supabase
      .from('habitaciones')
      .select('*')
      .eq('id_habitacion', id_habitacion)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, habitacion: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener habitación' };
  }
}

/**
 * Update habitacion estado
 */
export async function updateHabitacionEstado(id_habitacion: string, estado: EstadoHabitacion): Promise<{ success: boolean; habitacion?: Habitacion; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const index = mockHabitaciones.findIndex(h => h.id_habitacion === id_habitacion);
    if (index === -1) {
      return { success: false, error: 'Habitación no encontrada' };
    }
    mockHabitaciones[index] = {
      ...mockHabitaciones[index],
      estado,
      updated_at: new Date().toISOString(),
    };
    return { success: true, habitacion: mockHabitaciones[index] };
  }

  try {
    const { data, error } = await supabase
      .from('habitaciones')
      .update({ estado })
      .eq('id_habitacion', id_habitacion)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, habitacion: data };
  } catch (error) {
    return { success: false, error: 'Error al actualizar habitación' };
  }
}

/**
 * Get habitaciones by ciudad
 */
export async function getHabitacionesByCiudad(ciudad: string): Promise<{ success: boolean; habitaciones?: Habitacion[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const filtered = mockHabitaciones.filter(h => h.ciudad === ciudad);
    return { success: true, habitaciones: filtered };
  }

  try {
    const { data, error } = await supabase
      .from('habitaciones')
      .select('*')
      .eq('ciudad', ciudad)
      .order('numero', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, habitaciones: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener habitaciones' };
  }
}
