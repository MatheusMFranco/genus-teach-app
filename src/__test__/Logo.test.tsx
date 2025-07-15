import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { Logo } from '../components/Logo'

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Logo Component', () => {
  it('should render without crashing', () => {
    renderWithRouter(<Logo />)
    const logoLink = screen.getByRole('link')
    expect(logoLink).toBeInTheDocument()
  })

  it('should display the correct brand name', () => {
    renderWithRouter(<Logo />)
    const brandName = screen.getByText('Genus Teach')
    expect(brandName).toBeInTheDocument()
  })

  it('should have a link that points to home page', () => {
    renderWithRouter(<Logo />)
    const logoLink = screen.getByRole('link')
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('should display the BookOpen icon', () => {
    renderWithRouter(<Logo />)
    const logoLink = screen.getByRole('link')
    const icon = logoLink.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('h-8', 'w-8', 'text-primary-600')
  })

  it('should have proper styling classes', () => {
    renderWithRouter(<Logo />)
    const logoLink = screen.getByRole('link')
    expect(logoLink).toHaveClass('flex', 'items-center', 'space-x-2')
  })

  it('should have brand name with correct styling', () => {
    renderWithRouter(<Logo />)
    const brandName = screen.getByText('Genus Teach')
    expect(brandName).toHaveClass('text-xl', 'font-bold', 'text-gray-900')
  })

  it('should be accessible with proper link structure', () => {
    renderWithRouter(<Logo />)
    const logoLink = screen.getByRole('link')
    expect(logoLink.tagName).toBe('A')
    expect(logoLink).toContainHTML('svg')
    expect(logoLink).toHaveTextContent('Genus Teach')
  })

  it('should maintain semantic structure', () => {
    renderWithRouter(<Logo />)
    const logoLink = screen.getByRole('link')
    const brandText = screen.getByText('Genus Teach')
    expect(brandText.tagName).toBe('SPAN')
    expect(logoLink.children).toHaveLength(2)
  })

  it('should have consistent brand identity', () => {
    renderWithRouter(<Logo />)
    const brandName = screen.getByText(/^Genus Teach$/)
    expect(brandName).toBeInTheDocument()
    expect(brandName.textContent).toBe('Genus Teach')
  })

  it('should be keyboard accessible', () => {
    renderWithRouter(<Logo />)
    const logoLink = screen.getByRole('link')
    logoLink.focus()
    expect(logoLink).toHaveFocus()
  })
})
