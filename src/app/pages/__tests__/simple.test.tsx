import { describe, it, expect } from 'vitest';

describe('Simple Sanity Tests', () => {
  it('should pass basic math', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    expect('Grand Hotel'.toLowerCase()).toBe('grand hotel');
  });

  it('should handle array operations', () => {
    const cities = ['Madrid', 'Barcelona', 'Sevilla'];
    expect(cities.length).toBe(3);
    expect(cities).toContain('Madrid');
  });
});
