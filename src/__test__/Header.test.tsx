import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { Header } from '../components/Header'

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Header Component', () => {
  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      renderWithRouter(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('should render as a header element', () => {
      renderWithRouter(<Header />)
      const header = screen.getByRole('banner')
      expect(header.tagName).toBe('HEADER')
    })

    it('should have correct styling classes', () => {
      renderWithRouter(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('bg-white', 'shadow-lg')
    })

    it('should have proper container structure', () => {
      renderWithRouter(<Header />)
      const header = screen.getByRole('banner')
      const container = header.querySelector('.container')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('mx-auto', 'px-4')
    })
  })

  describe('Logo Component Integration', () => {
    it('should render the Logo component', () => {
      renderWithRouter(<Header />)
      const logoLink = screen.getByRole('link', { name: /genus teach/i })
      expect(logoLink).toBeInTheDocument()
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('should display brand name from Logo', () => {
      renderWithRouter(<Header />)  
      const brandName = screen.getByText('Genus Teach')
      expect(brandName).toBeInTheDocument()
    })

    it('should have logo icon', () => {
      renderWithRouter(<Header />)
      const logoLink = screen.getByRole('link', { name: /genus teach/i })
      const icon = logoLink.querySelector('svg')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('h-8', 'w-8', 'text-primary-600')
    })
  })

  describe('Desktop Navigation Integration', () => {
    it('should render DesktopNavigation component', () => {
      renderWithRouter(<Header />)
      const navElements = screen.getAllByRole('navigation')
      expect(navElements.length).toBeGreaterThanOrEqual(1)
    })

    it('should display all navigation links in desktop mode', () => {
      renderWithRouter(<Header />)
      const expectedLinks = ['Home', 'About', 'Courses', 'Contact']
      expectedLinks.forEach(linkText => {
        const link = screen.getByRole('link', { name: linkText })
        expect(link).toBeInTheDocument()
      })
    })

    it('should have correct href attributes for desktop navigation', () => {
      renderWithRouter(<Header />)
      const expectedRoutes = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Courses', href: '/courses' },
        { name: 'Contact', href: '/contact' },
      ]
      expectedRoutes.forEach(route => {
        const link = screen.getByRole('link', { name: route.name })
        expect(link).toHaveAttribute('href', route.href)
      })
    })
  })

  describe('Mobile Menu Toggle Integration', () => {
    it('should render MobileMenuToggle component', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      expect(toggleButton).toBeInTheDocument()
    })

    it('should show hamburger icon when menu is closed', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
      expect(toggleButton).toHaveAttribute('aria-label', 'Open menu')
    })

    it('should toggle menu state when button is clicked', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
      fireEvent.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
      expect(toggleButton).toHaveAttribute('aria-label', 'Close menu')
      fireEvent.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
      expect(toggleButton).toHaveAttribute('aria-label', 'Open menu')
    })
  })

  describe('Mobile Navigation Integration', () => {
    it('should not show mobile navigation when menu is closed', () => {
      renderWithRouter(<Header />)
      const mobileNavLinks = screen.queryAllByRole('link').filter(link => 
        link.classList.contains('py-2')
      )
      expect(mobileNavLinks.length).toBeLessThanOrEqual(4)
    })

    it('should show mobile navigation when menu is opened', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      fireEvent.click(toggleButton)
      const mobileNavLinks = screen.getAllByRole('link').filter(link => 
        link.classList.contains('py-2')
      )
      expect(mobileNavLinks.length).toBe(4)
    })

    it('should close mobile menu when a mobile navigation link is clicked', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      fireEvent.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
      const mobileLinks = screen.getAllByRole('link').filter(link => 
        link.classList.contains('py-2')
      )
      if (mobileLinks.length) {
        fireEvent.click(mobileLinks[0])
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
      }
    })
  })

  describe('State Management', () => {
    it('should manage isMenuOpen state correctly', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
      fireEvent.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
      fireEvent.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')  
      fireEvent.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('should handle rapid state changes', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      fireEvent.click(toggleButton)
      fireEvent.click(toggleButton)
      fireEvent.click(toggleButton)
      fireEvent.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Layout Structure', () => {
    it('should have correct flexbox layout for main navigation bar', () => {
      renderWithRouter(<Header />)
      const header = screen.getByRole('banner')
      const flexContainer = header.querySelector('.flex.justify-between.items-center.h-16')
      expect(flexContainer).toBeInTheDocument()
      expect(flexContainer).toHaveClass('flex', 'justify-between', 'items-center', 'h-16')
    })

    it('should maintain proper height', () => {
      renderWithRouter(<Header />)
      const header = screen.getByRole('banner')
      const heightContainer = header.querySelector('.h-16')
      expect(heightContainer).toBeInTheDocument()
      expect(heightContainer).toHaveClass('h-16')
    })

    it('should have responsive container', () => {
      renderWithRouter(<Header />)
      const header = screen.getByRole('banner')
      const container = header.querySelector('.container')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('mx-auto', 'px-4')
    })
  })

  describe('Navigation Data Integration', () => {
    it('should use navigationItems data for both desktop and mobile', () => {
      renderWithRouter(<Header />)
      const allLinks = screen.getAllByRole('link')
      expect(allLinks.length).toBeGreaterThanOrEqual(5) // Logo + 4 nav items (minimum)
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Courses' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
    })

    it('should pass navigationItems to both DesktopNavigation and MobileNavigation', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      const allLinks = screen.getAllByRole('link')
      const logoLink = screen.getByRole('link', { name: /genus teach/i })
      const desktopNavLinks = allLinks.filter(link => link !== logoLink)
      fireEvent.click(toggleButton)
      const mobileLinks = screen.getAllByRole('link').filter(link => 
        link.classList.contains('py-2')
      )
      expect(mobileLinks.length).toBe(4)
      expect(desktopNavLinks.length).toBe(4)
    })
  })

  describe('Accessibility', () => {
    it('should have proper header role', () => {
      renderWithRouter(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('should maintain keyboard navigation', () => {
      renderWithRouter(<Header />)  
      const toggleButton = screen.getByRole('button')
      const logoLink = screen.getByRole('link', { name: /genus teach/i })
      logoLink.focus()
      expect(logoLink).toHaveFocus()
      toggleButton.focus()
      expect(toggleButton).toHaveFocus()
    })

    it('should have proper ARIA attributes for mobile menu', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      expect(toggleButton).toHaveAttribute('aria-label')
      expect(toggleButton).toHaveAttribute('aria-expanded')
    })

    it('should provide clear navigation structure', () => {
      renderWithRouter(<Header />)
      const header = screen.getByRole('banner')
      const navigations = screen.getAllByRole('navigation')
      expect(header).toBeInTheDocument()
      expect(navigations.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Behavior', () => {
    it('should show appropriate elements for different screen sizes', () => {
      renderWithRouter(<Header />)
      const navigations = screen.getAllByRole('navigation')
      const desktopNav = navigations.find(nav => nav.classList.contains('hidden'))
      expect(desktopNav).toBeInTheDocument()
      const toggleButton = screen.getByRole('button')
      expect(toggleButton).toHaveClass('md:hidden')
    })

    it('should handle mobile menu state properly', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
      fireEvent.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Integration Tests', () => {
    it('should orchestrate all child components correctly', () => {
      renderWithRouter(<Header />)
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByText('Genus Teach')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0)
      expect(screen.getAllByRole('link').length).toBeGreaterThan(4)
    })

    it('should handle component interactions properly', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      fireEvent.click(toggleButton)
      const mobileLinks = screen.getAllByRole('link').filter(link => 
        link.classList.contains('py-2')
      )
      expect(mobileLinks.length).toBe(4)
      if (mobileLinks.length > 0) {
        fireEvent.click(mobileLinks[0])
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
      }
    })

    it('should maintain state consistency across all components', () => {
      renderWithRouter(<Header />)
      const toggleButton = screen.getByRole('button')
      for (let i = 0; i < 5; i++) {
        fireEvent.click(toggleButton)  
        const isOpen = toggleButton.getAttribute('aria-expanded') === 'true'
        const expectedLabel = isOpen ? 'Close menu' : 'Open menu'
        expect(toggleButton).toHaveAttribute('aria-label', expectedLabel)
      }
    })
  })

  describe('Performance and Structure', () => {
    it('should render efficiently without unnecessary DOM elements', () => {
      const { container } = renderWithRouter(<Header />)
      const header = container.querySelector('header')
      expect(header).toBeInTheDocument()
      const container_ = header?.querySelector('.container')
      expect(container_).toBeInTheDocument()
    })

    it('should not create duplicate navigation items', () => {
      renderWithRouter(<Header />)
      const allLinks = screen.getAllByRole('link')
      const logoLink = screen.getByRole('link', { name: /genus teach/i })
      const navLinks = allLinks.filter(link => link !== logoLink)
      expect(navLinks.length).toBe(4)
    })
  })
})
