import { describe, it, expect } from 'vitest';
import { render } from '../../../test/test-utils';
import Logo from '../Logo';

describe('Logo Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Logo />);
    expect(container).toBeTruthy();
  });

  it('should render SVG element', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should contain GH text', () => {
    const { container } = render(<Logo />);
    const texts = container.querySelectorAll('text');
    const ghText = Array.from(texts).find((text) => text.textContent === 'GH');
    expect(ghText).toBeTruthy();
  });

  it('should contain GRAND text', () => {
    const { container } = render(<Logo />);
    const texts = container.querySelectorAll('text');
    const grandText = Array.from(texts).find((text) => text.textContent === 'GRAND');
    expect(grandText).toBeTruthy();
  });

  it('should contain HOTEL text', () => {
    const { container } = render(<Logo />);
    const texts = container.querySelectorAll('text');
    const hotelText = Array.from(texts).find((text) => text.textContent === 'HOTEL');
    expect(hotelText).toBeTruthy();
  });

  it('should apply custom className', () => {
    const { container } = render(<Logo className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg?.classList.contains('custom-class')).toBe(true);
  });

  it('should have gold gradient definition', () => {
    const { container } = render(<Logo />);
    const gradient = container.querySelector('#goldGradient');
    expect(gradient).toBeTruthy();
  });
});
