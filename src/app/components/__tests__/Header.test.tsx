import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import Header from '../Header';

// Mock useNavigate and useLocation
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/' }),
  };
});

describe('Header Component', () => {
  it('should render the logo', () => {
    render(<Header />);

    const logo = screen.getByRole('button', { name: /ir a inicio/i });
    expect(logo).toBeTruthy();
  });

  it('should render all navigation items in Spanish', () => {
    render(<Header />);

    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Hoteles')).toBeTruthy();
    expect(screen.getByText('Ofertas de Viaje')).toBeTruthy();
    expect(screen.getByText('Galería del Hotel')).toBeTruthy();
  });

  it('should have correct number of navigation items', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation');
    const buttons = nav.querySelectorAll('button');
    expect(buttons.length).toBe(4);
  });

  it('should apply active styling to current page', () => {
    render(<Header />);

    const homeButton = screen.getByText('Inicio');
    expect(homeButton.className).toContain('text-gold');
    expect(homeButton.className).toContain('font-semibold');
  });
});
