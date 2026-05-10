import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../../test/test-utils';
import Login from '../Login';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/' }),
  };
});

// Mock Header component
vi.mock('../../components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

// Mock window.alert
global.alert = vi.fn();

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form', () => {
    render(<Login />);

    expect(screen.getByText('GRAND HOTEL')).toBeTruthy();
    expect(screen.getByText('Bienvenido')).toBeTruthy();
  });

  it('should render all form fields', () => {
    render(<Login />);

    expect(screen.getByLabelText(/idioma/i)).toBeTruthy();
    expect(screen.getByLabelText(/usuario/i)).toBeTruthy();
    expect(screen.getByLabelText(/contraseña/i)).toBeTruthy();
  });

  it('should render all action buttons', () => {
    render(<Login />);

    expect(screen.getByText('Ingresar')).toBeTruthy();
    expect(screen.getByText('Crear Cuenta')).toBeTruthy();
    expect(screen.getByText('Ingresar como Invitado')).toBeTruthy();
  });

  it('should show validation error when trying to login without credentials', () => {
    render(<Login />);

    const loginButton = screen.getByText('Ingresar');
    fireEvent.click(loginButton);

    expect(global.alert).toHaveBeenCalledWith('Este campo es obligatorio');
  });

  it('should navigate to search when guest login is clicked', () => {
    render(<Login />);

    const guestButton = screen.getByText('Ingresar como Invitado');
    fireEvent.click(guestButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });

  it('should navigate to register when create account is clicked', () => {
    render(<Login />);

    const registerButton = screen.getByText('Crear Cuenta');
    fireEvent.click(registerButton);

    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  it('should allow changing language', () => {
    render(<Login />);

    const languageSelect = screen.getByLabelText(/idioma/i);
    expect(languageSelect).toBeTruthy();
  });
});
