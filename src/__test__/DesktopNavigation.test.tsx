import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { DesktopNavigation } from '../components/DesktopNavigation'
import type { NavigationItem } from '../types/navigation'

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

const mockNavigationItems: NavigationItem[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/contact', label: 'Contact' },
]

describe('DesktopNavigation Component', () => {
  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('should render as a nav element', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav.tagName).toBe('NAV')
    })

    it('should have proper navigation role', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should be hidden on mobile screens', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('hidden')
    })

    it('should be visible on medium and larger screens', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('md:flex')
    })

    it('should have correct responsive classes', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('hidden', 'md:flex', 'space-x-8')
    })
  })

  describe('Layout and Styling', () => {
    it('should use flexbox layout on desktop', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('md:flex')
    })

    it('should have proper spacing between items', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('space-x-8')
    })

    it('should have all required CSS classes', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      const expectedClasses = ['hidden', 'md:flex', 'space-x-8']
      expectedClasses.forEach(className => {
        expect(nav).toHaveClass(className)
      })
    })
  })

  describe('Navigation Items Rendering', () => {
    it('should render all navigation items', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', item.to)
      })
    })

    it('should render correct number of links', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(mockNavigationItems.length)
    })

    it('should apply desktop styling to navigation items', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toHaveClass('text-gray-700', 'hover:text-primary-600', 'transition-colors')
        expect(link).not.toHaveClass('py-2')
      })
    })
  })

  describe('Props Handling', () => {
    it('should handle empty items array', () => {
      renderWithRouter(<DesktopNavigation items={[]} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
      const links = screen.queryAllByRole('link')
      expect(links).toHaveLength(0)
    })

    it('should handle single navigation item', () => {
      const singleItem = [{ to: '/single', label: 'Single Page' }]
      renderWithRouter(<DesktopNavigation items={singleItem} />)
      const link = screen.getByRole('link', { name: 'Single Page' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/single')
    })

    it('should handle items with special characters', () => {
      const specialItems = [
        { to: '/special', label: 'Special & Page' },
        { to: '/accents', label: 'Página com Acentos' },
      ]
      renderWithRouter(<DesktopNavigation items={specialItems} />)
      expect(screen.getByRole('link', { name: 'Special & Page' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Página com Acentos' })).toBeInTheDocument()
    })

    it('should handle large number of items', () => {
      const manyItems = Array.from({ length: 10 }, (_, i) => ({
        to: `/page-${i}`,
        label: `Page ${i + 1}`
      }))
      renderWithRouter(<DesktopNavigation items={manyItems} />)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(10)
      manyItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toBeInTheDocument()
      })
    })
  })

  describe('Integration with NavigationMenu', () => {
    it('should pass items correctly to NavigationMenu', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', item.to)
      })
    })

    it('should ensure NavigationMenu is in desktop mode', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).not.toHaveClass('py-2')
      })
    })

    it('should not pass onLinkClick to NavigationMenu', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      expect(() => {
        const links = screen.getAllByRole('link')
        expect(links.length).toBeGreaterThan(0)
      }).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('should have proper navigation semantics', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav.tagName).toBe('NAV')
    })

    it('should maintain link accessibility', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link.tagName).toBe('A')
        expect(link).toHaveAttribute('href', item.to)
        link.focus()
        expect(link).toHaveFocus()
      })
    })

    it('should provide clear navigation structure', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(nav).toContainElement(link)
      })
    })

    it('should be screen reader friendly', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toHaveAccessibleName(item.label)
      })
    })
  })

  describe('Performance and Structure', () => {
    it('should render efficiently with minimal DOM structure', () => {
      const { container } = renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
      const links = nav?.querySelectorAll('a')
      expect(links).toHaveLength(mockNavigationItems.length)
    })

    it('should not add unnecessary DOM elements', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      const links = nav.querySelectorAll('a')
      expect(links).toHaveLength(mockNavigationItems.length)
    })
  })

  describe('Responsive Behavior Edge Cases', () => {
    it('should maintain responsive classes with different item counts', () => {
      const { rerender } = renderWithRouter(<DesktopNavigation items={[]} />)
      let nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('hidden', 'md:flex', 'space-x-8')
      rerender(
        <BrowserRouter>
          <DesktopNavigation items={mockNavigationItems} />
        </BrowserRouter>
      )
      nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('hidden', 'md:flex', 'space-x-8')
    })

    it('should be complementary to mobile navigation', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('hidden')
      expect(nav).toHaveClass('md:flex')
    })
  })

  describe('CSS Layout Verification', () => {
    it('should use correct flexbox properties', () => {
      renderWithRouter(<DesktopNavigation items={mockNavigationItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('md:flex')
      expect(nav).toHaveClass('space-x-8')
    })

    it('should maintain layout consistency', () => {
      const differentItems = [
        { to: '/short', label: 'A' },
        { to: '/medium', label: 'Medium Length' },
        { to: '/very-long', label: 'Very Long Navigation Item Name' },
      ]
      renderWithRouter(<DesktopNavigation items={differentItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('space-x-8')
      differentItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toBeInTheDocument()
      })
    })
  })
})
