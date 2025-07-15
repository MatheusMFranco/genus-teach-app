import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useTheme } from '../hooks/useTheme'

const mockLocalStorage = () => {
  const store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    })
  }
}

const mockMatchMedia = (matches: boolean) => {
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

describe('useTheme Hook', () => {
  let localStorage: ReturnType<typeof mockLocalStorage>
  let originalLocalStorage: Storage
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    localStorage = mockLocalStorage()
    originalLocalStorage = window.localStorage
    originalMatchMedia = window.matchMedia
    Object.defineProperty(window, 'localStorage', {
      value: localStorage,
      writable: true
    })
    document.documentElement.className = ''
  })

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    })
    window.matchMedia = originalMatchMedia
    document.documentElement.className = ''
    vi.clearAllMocks()
  })

  describe('Initial Theme State', () => {
    it('should initialize with saved theme from localStorage', () => {
      localStorage.getItem.mockReturnValue('dark') 
      const { result } = renderHook(() => useTheme())
      expect(result.current.theme).toBe('dark')
      expect(localStorage.getItem).toHaveBeenCalledWith('theme')
    })

    it('should initialize with light theme when no saved theme and system prefers light', () => {
      localStorage.getItem.mockReturnValue(null)
      window.matchMedia = mockMatchMedia(false)
      const { result } = renderHook(() => useTheme())
      expect(result.current.theme).toBe('light')
    })

    it('should initialize with dark theme when no saved theme and system prefers dark', () => {
      localStorage.getItem.mockReturnValue(null)
      window.matchMedia = mockMatchMedia(true)
      const { result } = renderHook(() => useTheme())
      expect(result.current.theme).toBe('dark')
    })

    it('should check for prefers-color-scheme: dark media query', () => {
      localStorage.getItem.mockReturnValue(null)
      const matchMediaSpy = mockMatchMedia(false)
      window.matchMedia = matchMediaSpy
      renderHook(() => useTheme())
      expect(matchMediaSpy).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
    })
  })

  describe('Theme Toggle Functionality', () => {
    it('should toggle from light to dark', () => {
      localStorage.getItem.mockReturnValue('light')
      const { result } = renderHook(() => useTheme())
      expect(result.current.theme).toBe('light')
      act(() => result.current.toggleTheme())
      expect(result.current.theme).toBe('dark')
    })

    it('should toggle from dark to light', () => {
      localStorage.getItem.mockReturnValue('dark')
      const { result } = renderHook(() => useTheme())
      expect(result.current.theme).toBe('dark')
      act(() => result.current.toggleTheme())
      expect(result.current.theme).toBe('light')
    })

    it('should toggle multiple times correctly', () => {
      localStorage.getItem.mockReturnValue('light')
      const { result } = renderHook(() => useTheme())
      expect(result.current.theme).toBe('light')
      act(() => result.current.toggleTheme())
      expect(result.current.theme).toBe('dark')
      act(() => result.current.toggleTheme())
      expect(result.current.theme).toBe('light')
      act(() => result.current.toggleTheme())
      expect(result.current.theme).toBe('dark')
    })
  })

  describe('DOM Manipulation', () => {
    it('should add theme class to document element on initial render', () => {
      localStorage.getItem.mockReturnValue('dark')
      renderHook(() => useTheme())
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(document.documentElement.classList.contains('light')).toBe(false)
    })

    it('should remove previous theme class and add new one when toggling', () => {
      localStorage.getItem.mockReturnValue('light')
      const { result } = renderHook(() => useTheme())
      expect(document.documentElement.classList.contains('light')).toBe(true)
      expect(document.documentElement.classList.contains('dark')).toBe(false) 
      act(() => result.current.toggleTheme())
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(document.documentElement.classList.contains('light')).toBe(false)
    })

    it('should clean up existing theme classes before applying new one', () => {
      document.documentElement.classList.add('light', 'dark', 'some-other-class')
      localStorage.getItem.mockReturnValue('dark')
      renderHook(() => useTheme())
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(document.documentElement.classList.contains('light')).toBe(false)
      expect(document.documentElement.classList.contains('some-other-class')).toBe(true)
    })
  })

  describe('LocalStorage Persistence', () => {
    it('should save theme to localStorage on initial render', () => {
      localStorage.getItem.mockReturnValue('dark')
      renderHook(() => useTheme())
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
    })

    it('should save new theme to localStorage when toggling', () => {
      localStorage.getItem.mockReturnValue('light')
      const { result } = renderHook(() => useTheme())
      act(() => result.current.toggleTheme())
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
    })

    it('should save correct theme on multiple toggles', () => {
      localStorage.getItem.mockReturnValue('light')
      const { result } = renderHook(() => useTheme())
      act(() => result.current.toggleTheme())
      expect(localStorage.setItem).toHaveBeenLastCalledWith('theme', 'dark')
      act(() => result.current.toggleTheme())
      expect(localStorage.setItem).toHaveBeenLastCalledWith('theme', 'light')
    })
  })

  describe('Hook Return Value', () => {
    it('should return theme and toggleTheme function', () => {
      localStorage.getItem.mockReturnValue('light')
      const { result } = renderHook(() => useTheme())
      expect(result.current).toHaveProperty('theme')
      expect(result.current).toHaveProperty('toggleTheme')
      expect(typeof result.current.theme).toBe('string')
      expect(typeof result.current.toggleTheme).toBe('function')
    })

    it('should provide toggleTheme function that works correctly', () => {
      localStorage.getItem.mockReturnValue('light')
      const { result } = renderHook(() => useTheme())
      expect(typeof result.current.toggleTheme).toBe('function')
      act(() => result.current.toggleTheme())
      expect(result.current.theme).toBe('dark')
    })
  })

  describe('Edge Cases', () => {
    it('should use invalid localStorage value as is (no validation)', () => {
      localStorage.getItem.mockReturnValue('invalid-theme' as any)
      window.matchMedia = mockMatchMedia(false)
      const { result } = renderHook(() => useTheme())
      expect(result.current.theme).toBe('invalid-theme')
    })

    it('should throw error when localStorage getItem fails', () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })
      window.matchMedia = mockMatchMedia(true)
      expect(() => renderHook(() => useTheme())).toThrow('localStorage error')
    })

    it('should throw error when matchMedia API is missing', () => {
      localStorage.getItem.mockReturnValue(null)
      delete (window as any).matchMedia
      expect(() => renderHook(() => useTheme())).toThrow()
    })

    it('should throw error when localStorage setItem fails', () => {
      localStorage.getItem.mockReturnValue('light')
      localStorage.setItem.mockImplementation(() => {
        throw new Error('setItem error')
      })
      expect(() => renderHook(() => useTheme())).toThrow('setItem error')
    })
  })

  describe('System Theme Detection', () => {
    it('should respect system dark mode preference when no saved theme', () => {
      localStorage.getItem.mockReturnValue(null)
      window.matchMedia = mockMatchMedia(true)
      const { result } = renderHook(() => useTheme())
      expect(result.current.theme).toBe('dark')
    })

    it('should respect system light mode preference when no saved theme', () => {
      localStorage.getItem.mockReturnValue(null)
      window.matchMedia = mockMatchMedia(false)
      const { result } = renderHook(() => useTheme())    
      expect(result.current.theme).toBe('light')
    })

    it('should prioritize saved theme over system preference', () => {
      localStorage.getItem.mockReturnValue('light')
      window.matchMedia = mockMatchMedia(true)
      const { result } = renderHook(() => useTheme())
      expect(result.current.theme).toBe('light')
    })
  })

  describe('Theme State Consistency', () => {
    it('should maintain consistent state across multiple hook instances', () => {
      localStorage.getItem.mockReturnValue('dark')
      const { result: result1 } = renderHook(() => useTheme())
      const { result: result2 } = renderHook(() => useTheme())
      expect(result1.current.theme).toBe('dark')
      expect(result2.current.theme).toBe('dark')
    })

    it('should apply theme to DOM immediately on initialization', () => {
      localStorage.getItem.mockReturnValue('dark')
      renderHook(() => useTheme())
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })
})
