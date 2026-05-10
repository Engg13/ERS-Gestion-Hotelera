import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../../test/test-utils';
import Register from '../Register';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/register' }),
  };
});

// Mock Header component
vi.mock('../../components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

global.alert = vi.fn();

describe('Register Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render registration form', () => {
    render(<Register />);

    expect(screen.getByText('Crear Cuenta')).toBeTruthy();
    expect(screen.getByText('Únete a Grand Hotel')).toBeTruthy();
  });

  it('should render all form fields', () => {
    render(<Register />);

    expect(screen.getByLabelText(/nombre/i)).toBeTruthy();
    expect(screen.getByLabelText(/apellido/i)).toBeTruthy();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeTruthy();
    expect(screen.getByLabelText(/teléfono/i)).toBeTruthy();
    expect(screen.getByLabelText(/^usuario$/i)).toBeTruthy();
    expect(screen.getAllByLabelText(/contraseña/i).length).toBeGreaterThan(0);
  });

  it('should show validation error when required fields are empty', () => {
    render(<Register />);

    const registerButton = screen.getByText('Registrarse');
    fireEvent.click(registerButton);

    expect(global.alert).toHaveBeenCalledWith('Este campo es obligatorio');
  });

  it('should show error when passwords do not match', () => {
    render(<Register />);

    const firstNameInput = screen.getByLabelText(/nombre/i);
    const lastNameInput = screen.getByLabelText(/apellido/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const usernameInput = screen.getByLabelText(/^usuario$/i);
    const passwordInputs = screen.getAllByLabelText(/contraseña/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'password456' } });

    const registerButton = screen.getByText('Registrarse');
    fireEvent.click(registerButton);

    expect(global.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');
  });

  it('should have link to login page', () => {
    render(<Register />);

    expect(screen.getByText('¿Ya tienes cuenta?')).toBeTruthy();
    expect(screen.getByText('Inicia sesión aquí')).toBeTruthy();
  });

  it('should navigate to login when login link is clicked', () => {
    render(<Register />);

    const loginLink = screen.getByText('Inicia sesión aquí');
    fireEvent.click(loginLink);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
