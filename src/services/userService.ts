import { supabase, isSupabaseConfigured, Usuario, TipoUsuario } from '../lib/supabase';

export interface CreateUserData {
  nombre: string;
  correo: string;
  password: string;
  tipo_usuario: TipoUsuario;
}

export interface LoginCredentials {
  correo: string;
  password: string;
}

// Mock database for development when Supabase is not configured
const mockUsers: Usuario[] = [
  {
    id_usuario: '1',
    nombre: 'Admin',
    correo: 'admin@grandhotel.com',
    password: 'admin123',
    tipo_usuario: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

/**
 * Create a new user in the database
 */
export async function createUser(userData: CreateUserData): Promise<{ success: boolean; user?: Usuario; error?: string }> {
  // Mock mode when Supabase is not configured
  if (!isSupabaseConfigured || !supabase) {
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.correo === userData.correo);
    if (existingUser) {
      return { success: false, error: 'El correo ya está registrado' };
    }

    // Create new user
    const newUser: Usuario = {
      id_usuario: String(mockUsers.length + 1),
      ...userData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return { success: true, user: newUser };
  }

  // Real Supabase mode
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', userData.correo)
      .single();

    if (existingUser) {
      return { success: false, error: 'El correo ya está registrado' };
    }

    // Insert new user
    const { data, error } = await supabase
      .from('usuarios')
      .insert([userData])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data };
  } catch (error) {
    return { success: false, error: 'Error al crear usuario' };
  }
}

/**
 * Login user with email and password
 */
export async function loginUser(credentials: LoginCredentials): Promise<{ success: boolean; user?: Usuario; error?: string }> {
  // Mock mode when Supabase is not configured
  if (!isSupabaseConfigured || !supabase) {
    
    const user = mockUsers.find(
      u => u.correo === credentials.correo && u.password === credentials.password
    );

    if (!user) {
      return { success: false, error: 'Credenciales incorrectas' };
    }

    return { success: true, user };
  }

  // Real Supabase mode
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', credentials.correo)
      .eq('password', credentials.password)
      .single();

    if (error || !data) {
      return { success: false, error: 'Credenciales incorrectas' };
    }

    return { success: true, user: data };
  } catch (error) {
    return { success: false, error: 'Error al iniciar sesión' };
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id_usuario: string): Promise<{ success: boolean; user?: Usuario; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const user = mockUsers.find(u => u.id_usuario === id_usuario);
    if (!user) {
      return { success: false, error: 'Usuario no encontrado' };
    }
    return { success: true, user };
  }

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id_usuario', id_usuario)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener usuario' };
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(correo: string): Promise<{ success: boolean; user?: Usuario; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const user = mockUsers.find(u => u.correo === correo);
    if (!user) {
      return { success: false, error: 'Usuario no encontrado' };
    }
    return { success: true, user };
  }

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', correo)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener usuario' };
  }
}

/**
 * Update user information
 */
export async function updateUser(id_usuario: string, updates: Partial<Omit<Usuario, 'id_usuario' | 'created_at' | 'updated_at'>>): Promise<{ success: boolean; user?: Usuario; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const userIndex = mockUsers.findIndex(u => u.id_usuario === id_usuario);
    if (userIndex === -1) {
      return { success: false, error: 'Usuario no encontrado' };
    }
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return { success: true, user: mockUsers[userIndex] };
  }

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .update(updates)
      .eq('id_usuario', id_usuario)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data };
  } catch (error) {
    return { success: false, error: 'Error al actualizar usuario' };
  }
}

/**
 * Delete user
 */
export async function deleteUser(id_usuario: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const userIndex = mockUsers.findIndex(u => u.id_usuario === id_usuario);
    if (userIndex === -1) {
      return { success: false, error: 'Usuario no encontrado' };
    }
    mockUsers.splice(userIndex, 1);
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id_usuario', id_usuario);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al eliminar usuario' };
  }
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<{ success: boolean; users?: Usuario[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: true, users: [...mockUsers] };
  }

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, users: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener usuarios' };
  }
}

/**
 * Get users by type
 */
export async function getUsersByType(tipo_usuario: TipoUsuario): Promise<{ success: boolean; users?: Usuario[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const users = mockUsers.filter(u => u.tipo_usuario === tipo_usuario);
    return { success: true, users };
  }

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('tipo_usuario', tipo_usuario)
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, users: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener usuarios' };
  }
}
