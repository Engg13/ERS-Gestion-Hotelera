import { supabase, isSupabaseConfigured, ImagenHabitacion } from '../lib/supabase';

// Mock database for development
const mockImagenes: ImagenHabitacion[] = [
  {
    id_imagen: '1',
    id_habitacion: '1',
    url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
    orden: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id_imagen: '2',
    id_habitacion: '2',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
    orden: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id_imagen: '3',
    id_habitacion: '3',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    orden: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id_imagen: '4',
    id_habitacion: '4',
    url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
    orden: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id_imagen: '5',
    id_habitacion: '5',
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
    orden: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id_imagen: '6',
    id_habitacion: '6',
    url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    orden: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export interface CreateImagenData {
  id_habitacion: string;
  url: string;
  orden?: number;
}

/**
 * Create a new imagen
 */
export async function createImagen(data: CreateImagenData): Promise<{ success: boolean; imagen?: ImagenHabitacion; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const newImagen: ImagenHabitacion = {
      id_imagen: String(mockImagenes.length + 1),
      ...data,
      orden: data.orden || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockImagenes.push(newImagen);
    return { success: true, imagen: newImagen };
  }

  try {
    const { data: imagen, error } = await supabase
      .from('imagenes_habitacion')
      .insert([{
        id_habitacion: data.id_habitacion,
        url: data.url,
        orden: data.orden || 0,
      }])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, imagen };
  } catch (error) {
    return { success: false, error: 'Error al crear imagen' };
  }
}

/**
 * Get imagenes by habitacion
 */
export async function getImagenesByHabitacion(id_habitacion: string): Promise<{ success: boolean; imagenes?: ImagenHabitacion[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const imagenes = mockImagenes
      .filter(i => i.id_habitacion === id_habitacion)
      .sort((a, b) => a.orden - b.orden);
    return { success: true, imagenes };
  }

  try {
    const { data, error } = await supabase
      .from('imagenes_habitacion')
      .select('*')
      .eq('id_habitacion', id_habitacion)
      .order('orden', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, imagenes: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener imágenes' };
  }
}

/**
 * Get imagen by ID
 */
export async function getImagenById(id_imagen: string): Promise<{ success: boolean; imagen?: ImagenHabitacion; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const imagen = mockImagenes.find(i => i.id_imagen === id_imagen);
    if (!imagen) {
      return { success: false, error: 'Imagen no encontrada' };
    }
    return { success: true, imagen };
  }

  try {
    const { data, error } = await supabase
      .from('imagenes_habitacion')
      .select('*')
      .eq('id_imagen', id_imagen)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, imagen: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener imagen' };
  }
}

/**
 * Update imagen orden
 */
export async function updateImagenOrden(id_imagen: string, orden: number): Promise<{ success: boolean; imagen?: ImagenHabitacion; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const index = mockImagenes.findIndex(i => i.id_imagen === id_imagen);
    if (index === -1) {
      return { success: false, error: 'Imagen no encontrada' };
    }
    mockImagenes[index] = {
      ...mockImagenes[index],
      orden,
      updated_at: new Date().toISOString(),
    };
    return { success: true, imagen: mockImagenes[index] };
  }

  try {
    const { data, error } = await supabase
      .from('imagenes_habitacion')
      .update({ orden })
      .eq('id_imagen', id_imagen)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, imagen: data };
  } catch (error) {
    return { success: false, error: 'Error al actualizar imagen' };
  }
}

/**
 * Delete imagen
 */
export async function deleteImagen(id_imagen: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const index = mockImagenes.findIndex(i => i.id_imagen === id_imagen);
    if (index === -1) {
      return { success: false, error: 'Imagen no encontrada' };
    }
    mockImagenes.splice(index, 1);
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('imagenes_habitacion')
      .delete()
      .eq('id_imagen', id_imagen);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al eliminar imagen' };
  }
}

/**
 * Get all imagenes (admin)
 */
export async function getAllImagenes(): Promise<{ success: boolean; imagenes?: ImagenHabitacion[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: true, imagenes: [...mockImagenes] };
  }

  try {
    const { data, error } = await supabase
      .from('imagenes_habitacion')
      .select('*')
      .order('id_habitacion', { ascending: true })
      .order('orden', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, imagenes: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener imágenes' };
  }
}
