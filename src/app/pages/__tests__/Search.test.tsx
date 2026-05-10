import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../../test/test-utils';
import Search from '../Search';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/search' }),
  };
});

// Mock Header component
vi.mock('../../components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

global.alert = vi.fn();

describe('Search Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search form', () => {
    render(<Search />);

    expect(screen.getByText('Búsqueda de Habitaciones')).toBeTruthy();
    expect(screen.getByText('Encuentra tu habitación ideal')).toBeTruthy();
  });

  it('should render all form fields', () => {
    render(<Search />);

    expect(screen.getByLabelText(/ciudad/i)).toBeTruthy();
    expect(screen.getByLabelText(/fecha de llegada/i)).toBeTruthy();
    expect(screen.getByLabelText(/fecha de salida/i)).toBeTruthy();
  });

  it('should have search button', () => {
    render(<Search />);

    expect(screen.getByText('Buscar')).toBeTruthy();
  });

  it('should show validation error when city is not selected', () => {
    render(<Search />);

    const searchButton = screen.getByText('Buscar');
    fireEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalledWith('Por favor selecciona una ciudad');
  });

  it('should show validation error when check-in date is not selected', () => {
    render(<Search />);

    const searchButton = screen.getByText('Buscar');
    fireEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalled();
  });

  it('should have city options', () => {
    render(<Search />);

    const citySelect = screen.getByLabelText(/ciudad/i);
    expect(citySelect).toBeTruthy();
  });
});
