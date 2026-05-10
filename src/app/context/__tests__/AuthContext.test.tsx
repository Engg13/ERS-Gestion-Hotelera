import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

describe('AuthContext', () => {
  it('should provide initial state with no user and not guest', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isGuest).toBe(false);
  });

  it('should login a user correctly', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login('testuser', 'password123');
    });

    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.username).toBe('testuser');
    expect(result.current.isGuest).toBe(false);
  });

  it('should login as guest correctly', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.loginAsGuest();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isGuest).toBe(true);
  });

  it('should register a new user correctly', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const userData = {
      username: 'newuser',
      email: 'new@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
    };

    act(() => {
      result.current.register(userData);
    });

    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.username).toBe('newuser');
    expect(result.current.user?.email).toBe('new@example.com');
    expect(result.current.user?.firstName).toBe('John');
    expect(result.current.user?.lastName).toBe('Doe');
    expect(result.current.isGuest).toBe(false);
  });

  it('should logout user correctly', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login('testuser', 'password123');
    });

    expect(result.current.user).not.toBeNull();

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isGuest).toBe(false);
  });

  it('should logout guest correctly', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.loginAsGuest();
    });

    expect(result.current.isGuest).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isGuest).toBe(false);
  });
});
