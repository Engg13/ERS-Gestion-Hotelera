import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../LanguageContext';

describe('LanguageContext', () => {
  it('should provide default language as Spanish', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });

    expect(result.current.language).toBe('es');
  });

  it('should change language when setLanguage is called', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });

    act(() => {
      result.current.setLanguage('en');
    });

    expect(result.current.language).toBe('en');
  });

  it('should translate keys correctly in Spanish', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });

    expect(result.current.t('login.title')).toBe('GRAND HOTEL');
    expect(result.current.t('login.welcome')).toBe('Bienvenido');
    expect(result.current.t('nav.home')).toBe('Inicio');
  });

  it('should translate keys correctly in English', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });

    act(() => {
      result.current.setLanguage('en');
    });

    expect(result.current.t('login.welcome')).toBe('Welcome');
    expect(result.current.t('nav.home')).toBe('Home');
  });

  it('should translate keys correctly in French', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });

    act(() => {
      result.current.setLanguage('fr');
    });

    expect(result.current.t('login.welcome')).toBe('Bienvenue');
    expect(result.current.t('nav.home')).toBe('Accueil');
  });

  it('should translate keys correctly in German', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });

    act(() => {
      result.current.setLanguage('de');
    });

    expect(result.current.t('login.welcome')).toBe('Willkommen');
    expect(result.current.t('nav.home')).toBe('Startseite');
  });

  it('should return the key if translation does not exist', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });

    expect(result.current.t('non.existent.key')).toBe('non.existent.key');
  });
});
