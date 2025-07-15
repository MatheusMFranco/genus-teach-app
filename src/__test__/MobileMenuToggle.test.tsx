import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { MobileMenuToggle } from '../components/MobileMenuToggle'

describe('MobileMenuToggle Component', () => {
  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should render as a button element', () => {
      render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('should have mobile-only visibility class', () => {
      render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('md:hidden')
    })
  })

  describe('Icon Rendering', () => {
    it('should show Menu icon when isOpen is false', () => {
      render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      const icon = button.querySelector('svg')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('h-6', 'w-6')
      expect(button).toContainElement(icon)
    })

    it('should show X icon when isOpen is true', () => {
      render(<MobileMenuToggle isOpen={true} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      const icon = button.querySelector('svg')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('h-6', 'w-6')
      expect(button).toContainElement(icon)
    })

    it('should have correct icon dimensions', () => {
      const { rerender } = render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      let icon = screen.getByRole('button').querySelector('svg')
      expect(icon).toHaveClass('h-6', 'w-6')
      rerender(<MobileMenuToggle isOpen={true} onToggle={() => {}} />)
      icon = screen.getByRole('button').querySelector('svg')
      expect(icon).toHaveClass('h-6', 'w-6')
    })

    it('should only show one icon at a time', () => {
      render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      const icons = button.querySelectorAll('svg')
      expect(icons).toHaveLength(1)
    })
  })

  describe('Icon State Changes', () => {
    it('should change icon when isOpen state changes', () => {
      const { rerender } = render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      expect(button.querySelector('svg')).toBeInTheDocument()
      rerender(<MobileMenuToggle isOpen={true} onToggle={() => {}} />)
      expect(button.querySelector('svg')).toBeInTheDocument()
      rerender(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      expect(button.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Click Handling', () => {
    it('should call onToggle when clicked', () => {
      const mockOnToggle = vi.fn()
      render(<MobileMenuToggle isOpen={false} onToggle={mockOnToggle} />)
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(mockOnToggle).toHaveBeenCalledTimes(1)
    })

    it('should call onToggle multiple times for multiple clicks', () => {
      const mockOnToggle = vi.fn()
      render(<MobileMenuToggle isOpen={false} onToggle={mockOnToggle} />)
      const button = screen.getByRole('button')
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)
      expect(mockOnToggle).toHaveBeenCalledTimes(3)
    })

    it('should call onToggle regardless of isOpen state', () => {
      const mockOnToggle = vi.fn()
      const { rerender } = render(<MobileMenuToggle isOpen={false} onToggle={mockOnToggle} />)
      let button = screen.getByRole('button')
      fireEvent.click(button)
      expect(mockOnToggle).toHaveBeenCalledTimes(1)
      rerender(<MobileMenuToggle isOpen={true} onToggle={mockOnToggle} />)
      button = screen.getByRole('button')
      fireEvent.click(button)
      expect(mockOnToggle).toHaveBeenCalledTimes(2)
    })
  })

  describe('Accessibility', () => {
    it('should have correct aria-label when menu is closed', () => {
      render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Open menu')
    })

    it('should have correct aria-label when menu is open', () => {
      render(<MobileMenuToggle isOpen={true} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Close menu')
    })

    it('should have correct aria-expanded when menu is closed', () => {
      render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('should have correct aria-expanded when menu is open', () => {
      render(<MobileMenuToggle isOpen={true} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('should update accessibility attributes when state changes', () => {
      const { rerender } = render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Open menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')
      rerender(<MobileMenuToggle isOpen={true} onToggle={() => {}} />)
      expect(button).toHaveAttribute('aria-label', 'Close menu')
      expect(button).toHaveAttribute('aria-expanded', 'true')
      rerender(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      expect(button).toHaveAttribute('aria-label', 'Open menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('should be keyboard accessible', () => {
      const mockOnToggle = vi.fn()
      render(<MobileMenuToggle isOpen={false} onToggle={mockOnToggle} />)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
      fireEvent.keyDown(button, { key: 'Enter' })
      fireEvent.click(button)
      expect(mockOnToggle).toHaveBeenCalledTimes(1)
    })

    it('should have proper button role', () => {
      render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('should only be visible on mobile screens', () => {
      render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('md:hidden')
    })

    it('should maintain mobile visibility class regardless of state', () => {
      const { rerender } = render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      let button = screen.getByRole('button')
      expect(button).toHaveClass('md:hidden')
      rerender(<MobileMenuToggle isOpen={true} onToggle={() => {}} />)
      button = screen.getByRole('button')
      expect(button).toHaveClass('md:hidden')
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid state changes', () => {
      const mockOnToggle = vi.fn()
      const { rerender } = render(<MobileMenuToggle isOpen={false} onToggle={mockOnToggle} />)
      const button = screen.getByRole('button')
      rerender(<MobileMenuToggle isOpen={true} onToggle={mockOnToggle} />)
      rerender(<MobileMenuToggle isOpen={false} onToggle={mockOnToggle} />)
      rerender(<MobileMenuToggle isOpen={true} onToggle={mockOnToggle} />)
      fireEvent.click(button)
      expect(mockOnToggle).toHaveBeenCalledTimes(1)
      expect(button).toHaveAttribute('aria-expanded', 'true')
      expect(button).toHaveAttribute('aria-label', 'Close menu')
    })

    it('should not throw error with undefined onToggle', () => {
      expect(() => {
        render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      }).not.toThrow()
    })

    it('should handle boolean conversion for isOpen prop', () => {
      const { rerender } = render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      let button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')
      rerender(<MobileMenuToggle isOpen={true} onToggle={() => {}} />)
      button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Visual Consistency', () => {
    it('should maintain consistent button styling across states', () => {
      const { rerender } = render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      const button = screen.getByRole('button')
      const closedClasses = Array.from(button.classList)
      rerender(<MobileMenuToggle isOpen={true} onToggle={() => {}} />)
      const openClasses = Array.from(button.classList)
      expect(closedClasses).toEqual(openClasses)
    })

    it('should maintain consistent icon sizing across states', () => {
      const { rerender } = render(<MobileMenuToggle isOpen={false} onToggle={() => {}} />)
      let icon = screen.getByRole('button').querySelector('svg')
      expect(icon).toHaveClass('h-6', 'w-6')
      rerender(<MobileMenuToggle isOpen={true} onToggle={() => {}} />)
      icon = screen.getByRole('button').querySelector('svg')
      expect(icon).toHaveClass('h-6', 'w-6')
    })
  })
})
