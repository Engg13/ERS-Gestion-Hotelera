import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Usuario } from '../../lib/supabase';
import { loginUser, createUser } from '../../services/userService';

interface User {
  id_usuario: string;
  nombre: string;
  correo: string;
  tipo_usuario: 'cliente' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  loading: boolean;
  login: (correo: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: () => void;
  register: (userData: { nombre: string; correo: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('grandhotel_user');
    const savedIsGuest = localStorage.getItem('grandhotel_isGuest');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedIsGuest === 'true') {
      setIsGuest(true);
    }
  }, []);

  const login = async (correo: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const result = await loginUser({ correo, password });

      if (result.success && result.user) {
        const userData: User = {
          id_usuario: result.user.id_usuario,
          nombre: result.user.nombre,
          correo: result.user.correo,
          tipo_usuario: result.user.tipo_usuario,
        };
        setUser(userData);
        setIsGuest(false);
        localStorage.setItem('grandhotel_user', JSON.stringify(userData));
        localStorage.removeItem('grandhotel_isGuest');
        return { success: true };
      }

      return { success: false, error: result.error || 'Error al iniciar sesión' };
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = () => {
    setUser(null);
    setIsGuest(true);
    localStorage.setItem('grandhotel_isGuest', 'true');
    localStorage.removeItem('grandhotel_user');
  };

  const register = async (userData: { nombre: string; correo: string; password: string }): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const result = await createUser({
        ...userData,
        tipo_usuario: 'cliente',
      });

      if (result.success && result.user) {
        const newUser: User = {
          id_usuario: result.user.id_usuario,
          nombre: result.user.nombre,
          correo: result.user.correo,
          tipo_usuario: result.user.tipo_usuario,
        };
        setUser(newUser);
        setIsGuest(false);
        localStorage.setItem('grandhotel_user', JSON.stringify(newUser));
        localStorage.removeItem('grandhotel_isGuest');
        return { success: true };
      }

      return { success: false, error: result.error || 'Error al registrar usuario' };
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('grandhotel_user');
    localStorage.removeItem('grandhotel_isGuest');
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, loading, login, loginAsGuest, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
