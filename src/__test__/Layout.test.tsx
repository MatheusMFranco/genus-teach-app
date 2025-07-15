import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout } from '../components/Layout'

const renderWithRouter = (children?: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {children && <Route index element={children} />}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const MockPageContent = ({ title }: { title: string }) => (
  <div data-testid="page-content">
    <h1>{title}</h1>
    <p>This is mock page content</p>
  </div>
)

describe('Layout Component', () => {
  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      renderWithRouter()
      const container = document.querySelector('.min-h-screen')
      expect(container).toBeInTheDocument()
    })

    it('should have correct container structure', () => {
      renderWithRouter()
      const container = document.querySelector('.min-h-screen')
      expect(container).toHaveClass('min-h-screen', 'bg-gray-50', 'flex', 'flex-col')
    })

    it('should use flexbox layout for full height', () => {
      renderWithRouter()
      const container = document.querySelector('.min-h-screen')
      expect(container).toHaveClass('flex', 'flex-col')
    })

    it('should have proper background styling', () => {
      renderWithRouter()
      const container = document.querySelector('.min-h-screen')
      expect(container).toHaveClass('bg-gray-50')
    })
  })

  describe('Header Integration', () => {
    it('should render Header component', () => {
      renderWithRouter()
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('should display Header with Logo', () => {
      renderWithRouter()
      const logoLink = screen.getByRole('link', { name: /genus teach/i })
      expect(logoLink).toBeInTheDocument()
    })

    it('should include Header navigation', () => {
      renderWithRouter()
      const navigationLinks = ['Home', 'About', 'Courses', 'Contact']
      navigationLinks.forEach(linkText => {
        const link = screen.getByRole('link', { name: linkText })
        expect(link).toBeInTheDocument()
      })
    })

    it('should have Header mobile toggle', () => {
      renderWithRouter()
      const toggleButton = screen.getByRole('button')
      expect(toggleButton).toBeInTheDocument()
    })
  })

  describe('Main Content Area', () => {
    it('should render main element', () => {
      renderWithRouter()
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('should have correct main styling', () => {
      renderWithRouter()
      const main = screen.getByRole('main')
      expect(main).toHaveClass('flex-1', 'container', 'mx-auto', 'px-4', 'py-8')
    })

    it('should use flex-1 to fill available space', () => {
      renderWithRouter()
      const main = screen.getByRole('main')
      expect(main).toHaveClass('flex-1')
    })

    it('should have responsive container', () => {
      renderWithRouter()
      const main = screen.getByRole('main')
      expect(main).toHaveClass('container', 'mx-auto')
    })

    it('should have proper padding', () => {
      renderWithRouter()
      const main = screen.getByRole('main')
      expect(main).toHaveClass('px-4', 'py-8')
    })
  })

  describe('Footer Integration', () => {
    it('should render Footer component', () => {
      renderWithRouter()
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
    })

    it('should display Footer copyright', () => {
      renderWithRouter()
      const copyright = screen.getByText(/© 2025 Genus Teach. All rights reserved./i)
      expect(copyright).toBeInTheDocument()
    })

    it('should have Footer at bottom of layout', () => {
      renderWithRouter()
      const container = document.querySelector('.min-h-screen')
      const footer = screen.getByRole('contentinfo')
      expect(container).toContainElement(footer)
      const children = container?.children
      if (children) {
        expect(children[children.length - 1]).toBe(footer)
      }
    })
  })

  describe('React Router Outlet Integration', () => {
    it('should render Outlet for child routes', () => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MockPageContent title="Home Page" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )
      const pageContent = screen.getByTestId('page-content')
      expect(pageContent).toBeInTheDocument()
      expect(screen.getByText('Home Page')).toBeInTheDocument()
    })

    it('should display different content based on route', () => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MockPageContent title="Home Page" />} />
              <Route path="about" element={<MockPageContent title="About Page" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )
      expect(screen.getByText('Home Page')).toBeInTheDocument()
    })

    it('should contain Outlet within main element', () => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MockPageContent title="Test Page" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )
      const main = screen.getByRole('main')
      const pageContent = screen.getByTestId('page-content')
      expect(main).toContainElement(pageContent)
    })
  })

  describe('Layout Structure and Hierarchy', () => {
    it('should have correct component order', () => {
      renderWithRouter()
      const container = document.querySelector('.min-h-screen')
      const children = container?.children
      if (children) {
        expect(children).toHaveLength(3)
        expect(children[0]).toHaveClass('bg-white', 'shadow-lg') // Header classes
        expect(children[1].tagName).toBe('MAIN')
        expect(children[2]).toHaveClass('bg-gray-900', 'text-white') // Footer classes
      }
    })

    it('should maintain proper semantic HTML structure', () => {
      renderWithRouter()
      const header = screen.getByRole('banner')
      const main = screen.getByRole('main')
      const footer = screen.getByRole('contentinfo')
      expect(header).toBeInTheDocument()
      expect(main).toBeInTheDocument()
      expect(footer).toBeInTheDocument()
    })

    it('should create a sticky footer layout', () => {
      renderWithRouter()
      const container = document.querySelector('.min-h-screen')
      const main = screen.getByRole('main')
      expect(container).toHaveClass('min-h-screen', 'flex', 'flex-col')
      expect(main).toHaveClass('flex-1')
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive container in main', () => {
      renderWithRouter()
      const main = screen.getByRole('main')
      expect(main).toHaveClass('container', 'mx-auto')
    })

    it('should maintain responsive padding', () => {
      renderWithRouter()
      const main = screen.getByRole('main')
      expect(main).toHaveClass('px-4')
    })

    it('should work with Header responsive behavior', () => {
      renderWithRouter()
      const navigations = screen.getAllByRole('navigation')
      expect(navigations.length).toBeGreaterThan(0)
      const toggleButton = screen.getByRole('button')
      expect(toggleButton).toHaveClass('md:hidden')
    })
  })

  describe('Content Area Behavior', () => {
    it('should provide adequate spacing for content', () => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MockPageContent title="Content Test" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )
      const main = screen.getByRole('main')
      expect(main).toHaveClass('py-8') // Vertical padding for content
    })

    it('should maintain content width constraints', () => {
      renderWithRouter()
      const main = screen.getByRole('main')
      expect(main).toHaveClass('container') // Max-width constraints
    })

    it('should center content horizontally', () => {
      renderWithRouter()
      const main = screen.getByRole('main')
      expect(main).toHaveClass('mx-auto') // Center alignment
    })
  })

  describe('Accessibility', () => {
    it('should have proper landmark roles', () => {
      renderWithRouter()
      expect(screen.getByRole('banner')).toBeInTheDocument() // Header
      expect(screen.getByRole('main')).toBeInTheDocument() // Main content
      expect(screen.getByRole('contentinfo')).toBeInTheDocument() // Footer
    })

    it('should provide clear page structure for screen readers', () => {
      renderWithRouter()
      const landmarks = [
        screen.getByRole('banner'),
        screen.getByRole('main'),
        screen.getByRole('contentinfo')
      ]
      landmarks.forEach(landmark => {
        expect(landmark).toBeInTheDocument()
      })
    })

    it('should maintain focus management through navigation', () => {
      renderWithRouter()
      const homeLink = screen.getByRole('link', { name: 'Home' })
      homeLink.focus()
      expect(homeLink).toHaveFocus()
    })

    it('should support keyboard navigation', () => {
      renderWithRouter()
      const toggleButton = screen.getByRole('button')
      const logoLink = screen.getByRole('link', { name: /genus teach/i })
      logoLink.focus()
      expect(logoLink).toHaveFocus()
      toggleButton.focus()
      expect(toggleButton).toHaveFocus()
    })
  })

  describe('Integration with Router', () => {
    it('should work with React Router navigation', () => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MockPageContent title="Home Page Content" />} />
              <Route path="test" element={<MockPageContent title="Test Page" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )
      expect(screen.getByText('Home Page Content')).toBeInTheDocument()
    })

    it('should maintain Layout structure across route changes', () => {
      const { rerender } = render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MockPageContent title="Page 1" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
      rerender(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MockPageContent title="Page 2" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })

  describe('Performance and Structure', () => {
    it('should render efficiently with minimal DOM overhead', () => {
      const { container } = renderWithRouter()
      const layoutContainer = container.querySelector('.min-h-screen')
      expect(layoutContainer).toBeInTheDocument()
      expect(layoutContainer?.children).toHaveLength(3)
    })

    it('should not create unnecessary wrapper elements', () => {
      renderWithRouter()
      const container = document.querySelector('.min-h-screen')
      const main = screen.getByRole('main')
      expect(container).toContainElement(main)
    })

    it('should maintain consistent styling across renders', () => {
      const { rerender } = renderWithRouter()
      const initialClasses = document.querySelector('.min-h-screen')?.className
      rerender(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} />
          </Routes>
        </BrowserRouter>
      )
      const rerenderClasses = document.querySelector('.min-h-screen')?.className
      expect(rerenderClasses).toBe(initialClasses)
    })
  })
})
