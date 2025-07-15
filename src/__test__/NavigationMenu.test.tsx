import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { NavigationMenu } from '../components/NavigationMenu'
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

describe('NavigationMenu Component', () => {
  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      renderWithRouter(<NavigationMenu items={mockNavigationItems} />)      
      const homeLink = screen.getByRole('link', { name: 'Home' })
      expect(homeLink).toBeInTheDocument()
    })

    it('should render all navigation items', () => {
      renderWithRouter(<NavigationMenu items={mockNavigationItems} />)
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', item.to)
      })
    })

    it('should render correct number of links', () => {
      renderWithRouter(<NavigationMenu items={mockNavigationItems} />)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(mockNavigationItems.length)
    })
  })

  describe('Desktop Mode (Default)', () => {
    it('should apply desktop classes by default', () => {
      renderWithRouter(<NavigationMenu items={mockNavigationItems} />)
      const homeLink = screen.getByRole('link', { name: 'Home' })
      expect(homeLink).toHaveClass('text-gray-700', 'hover:text-primary-600', 'transition-colors')
      expect(homeLink).not.toHaveClass('py-2')
    })

    it('should not apply mobile classes in desktop mode', () => {
      renderWithRouter(<NavigationMenu items={mockNavigationItems} />)
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).not.toHaveClass('py-2')
      })
    })
  })

  describe('Mobile Mode', () => {
    it('should apply mobile classes when isMobile is true', () => {
      renderWithRouter(<NavigationMenu items={mockNavigationItems} isMobile={true} />)
      const homeLink = screen.getByRole('link', { name: 'Home' })
      expect(homeLink).toHaveClass('text-gray-700', 'hover:text-primary-600', 'transition-colors', 'py-2')
    })

    it('should apply mobile classes to all links', () => {
      renderWithRouter(<NavigationMenu items={mockNavigationItems} isMobile={true} />)
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toHaveClass('py-2')
      })
    })
  })

  describe('Click Handling', () => {
    it('should call onLinkClick when a link is clicked', () => {
      const mockOnLinkClick = vi.fn()
      renderWithRouter(
        <NavigationMenu 
          items={mockNavigationItems} 
          onLinkClick={mockOnLinkClick} 
        />
      )
      const homeLink = screen.getByRole('link', { name: 'Home' })
      fireEvent.click(homeLink)
      expect(mockOnLinkClick).toHaveBeenCalledTimes(1)
    })

    it('should call onLinkClick for each link clicked', () => {
      const mockOnLinkClick = vi.fn()
      renderWithRouter(
        <NavigationMenu 
          items={mockNavigationItems} 
          onLinkClick={mockOnLinkClick} 
        />
      )
      fireEvent.click(screen.getByRole('link', { name: 'Home' }))
      fireEvent.click(screen.getByRole('link', { name: 'About' }))
      fireEvent.click(screen.getByRole('link', { name: 'Courses' }))
      expect(mockOnLinkClick).toHaveBeenCalledTimes(3)
    })

    it('should not throw error when onLinkClick is not provided', () => {
      expect(() => {
        renderWithRouter(<NavigationMenu items={mockNavigationItems} />)
        const homeLink = screen.getByRole('link', { name: 'Home' })
        fireEvent.click(homeLink)
      }).not.toThrow()
    })
  })

  describe('Props Handling', () => {
    it('should handle empty items array', () => {
      renderWithRouter(<NavigationMenu items={[]} />)
      const links = screen.queryAllByRole('link')
      expect(links).toHaveLength(0)
    })

    it('should handle single item', () => {
      const singleItem = [{ to: '/single', label: 'Single Page' }]
      renderWithRouter(<NavigationMenu items={singleItem} />)
      const link = screen.getByRole('link', { name: 'Single Page' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/single')
    })

    it('should handle items with special characters', () => {
      const specialItems = [
        { to: '/special-page', label: 'Special & Page' },
        { to: '/another', label: 'Página com Acentos' },
      ]
      renderWithRouter(<NavigationMenu items={specialItems} />)
      expect(screen.getByRole('link', { name: 'Special & Page' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Página com Acentos' })).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper link semantics', () => {
      renderWithRouter(<NavigationMenu items={mockNavigationItems} />)
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link.tagName).toBe('A')
        expect(link).toHaveAttribute('href', item.to)
      })
    })

    it('should be keyboard navigable', () => {
      renderWithRouter(<NavigationMenu items={mockNavigationItems} />)
      const homeLink = screen.getByRole('link', { name: 'Home' })
      homeLink.focus()
      expect(homeLink).toHaveFocus()
    })

    it('should have proper link text', () => {
      renderWithRouter(<NavigationMenu items={mockNavigationItems} />)
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        expect(link).toHaveTextContent(item.label)
      })
    })
  })

  describe('CSS Classes Consistency', () => {
    it('should apply base classes to all links', () => {
      renderWithRouter(<NavigationMenu items={mockNavigationItems} />)
      const baseClasses = ['text-gray-700', 'hover:text-primary-600', 'transition-colors']
      mockNavigationItems.forEach(item => {
        const link = screen.getByRole('link', { name: item.label })
        baseClasses.forEach(className => {
          expect(link).toHaveClass(className)
        })
      })
    })

    it('should maintain class consistency between desktop and mobile', () => {
      const { unmount } = renderWithRouter(<NavigationMenu items={mockNavigationItems} />)
      const desktopLink = screen.getByRole('link', { name: 'Home' })
      const desktopClasses = Array.from(desktopLink.classList)
      unmount()
      renderWithRouter(<NavigationMenu items={mockNavigationItems} isMobile={true} />)
      const mobileLink = screen.getByRole('link', { name: 'Home' })
      const mobileClasses = Array.from(mobileLink.classList)
      const baseClasses = ['text-gray-700', 'hover:text-primary-600', 'transition-colors']
      baseClasses.forEach(className => {
        expect(desktopClasses).toContain(className)
        expect(mobileClasses).toContain(className)
      })
      expect(mobileClasses).toContain('py-2')
      expect(desktopClasses).not.toContain('py-2')
    })
  })
})
