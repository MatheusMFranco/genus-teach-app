import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { MobileNavigation } from '../components/MobileNavigation'
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

describe('MobileNavigation Component', () => {
  describe('Conditional Rendering', () => {
    it('should not render when isOpen is false', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={false} 
          onLinkClick={() => {}} 
        />
      )
      const nav = screen.queryByRole('navigation')
      expect(nav).not.toBeInTheDocument()
      const links = screen.queryAllByRole('link')
      expect(links).toHaveLength(0)
    })

    it('should render when isOpen is true', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('should return null when isOpen is false', () => {
      const { container } = renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={false} 
          onLinkClick={() => {}} 
        />
      )
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Structure and Styling', () => {
    it('should have correct navigation element with proper classes', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('md:hidden', 'py-4', 'border-t', 'border-gray-200')
    })

    it('should have proper container structure', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      
      const nav = screen.getByRole('navigation')
      const container = nav.querySelector('div')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('flex', 'flex-col', 'space-y-2')
    })

    it('should be hidden on medium and larger screens', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('md:hidden')
    })
  })

  describe('Navigation Items Rendering', () => {
    it('should render all navigation items when open', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', item.to)
      })
    })

    it('should render correct number of links', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(mockNavigationItems.length)
    })

    it('should apply mobile styling to navigation items', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toHaveClass('py-2') // Mobile-specific class
      })
    })
  })

  describe('Click Handling', () => {
    it('should call onLinkClick when a link is clicked', () => {
      const mockOnLinkClick = vi.fn()
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={mockOnLinkClick} 
        />
      )
      const homeLink = screen.getByRole('link', { name: 'Home' })
      fireEvent.click(homeLink)
      expect(mockOnLinkClick).toHaveBeenCalledTimes(1)
    })

    it('should call onLinkClick for multiple link clicks', () => {
      const mockOnLinkClick = vi.fn()
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={mockOnLinkClick} 
        />
      )
      fireEvent.click(screen.getByRole('link', { name: 'Home' }))
      fireEvent.click(screen.getByRole('link', { name: 'About' }))
      fireEvent.click(screen.getByRole('link', { name: 'Courses' }))
      expect(mockOnLinkClick).toHaveBeenCalledTimes(3)
    })

    it('should pass onLinkClick to NavigationMenu component', () => {
      const mockOnLinkClick = vi.fn()
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={mockOnLinkClick} 
        />
      )
      const links = screen.getAllByRole('link')
      links.forEach(link => fireEvent.click(link))
      expect(mockOnLinkClick).toHaveBeenCalledTimes(mockNavigationItems.length)
    })
  })

  describe('Props Handling', () => {
    it('should handle empty items array when open', () => {
      renderWithRouter(
        <MobileNavigation 
          items={[]} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
      const links = screen.queryAllByRole('link')
      expect(links).toHaveLength(0)
    })

    it('should handle single navigation item', () => {
      const singleItem = [{ to: '/single', label: 'Single Page' }]
      renderWithRouter(
        <MobileNavigation 
          items={singleItem} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      const link = screen.getByRole('link', { name: 'Single Page' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/single')
    })

    it('should handle items with special characters', () => {
      const specialItems = [
        { to: '/special', label: 'Special & Page' },
        { to: '/accents', label: 'Página com Acentos' },
      ]
      renderWithRouter(
        <MobileNavigation 
          items={specialItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      expect(screen.getByRole('link', { name: 'Special & Page' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Página com Acentos' })).toBeInTheDocument()
    })
  })

  describe('State Transitions', () => {
    it('should show/hide content when isOpen changes', () => {
      const { rerender } = renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={false} 
          onLinkClick={() => {}} 
        />
      )
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
      rerender(
        <BrowserRouter>
          <MobileNavigation 
            items={mockNavigationItems} 
            isOpen={true} 
            onLinkClick={() => {}} 
          />
        </BrowserRouter>
      )
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      rerender(
        <BrowserRouter>
          <MobileNavigation 
            items={mockNavigationItems} 
            isOpen={false} 
            onLinkClick={() => {}} 
          />
        </BrowserRouter>
      )
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper navigation semantics when open', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      const nav = screen.getByRole('navigation')
      expect(nav.tagName).toBe('NAV')
    })

    it('should maintain link accessibility', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link.tagName).toBe('A')
        expect(link).toHaveAttribute('href', item.to)
        link.focus()
        expect(link).toHaveFocus()
      })
    })

    it('should not interfere with screen readers when closed', () => {
      const { container } = renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={false} 
          onLinkClick={() => {}} 
        />
      )
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Integration with NavigationMenu', () => {
    it('should pass correct props to NavigationMenu', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toHaveClass('py-2')
        expect(link).toHaveClass('text-gray-700', 'hover:text-primary-600', 'transition-colors')
      })
    })

    it('should ensure NavigationMenu is rendered in mobile mode', () => {
      renderWithRouter(
        <MobileNavigation 
          items={mockNavigationItems} 
          isOpen={true} 
          onLinkClick={() => {}} 
        />
      )
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveClass('py-2')
      })
    })
  })
})
