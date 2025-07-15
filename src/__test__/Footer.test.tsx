import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '../components/Footer'

describe('Footer Component', () => {
  it('should render without crashing', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('should display the correct copyright text', () => {
    render(<Footer />)
    const copyrightText = screen.getByText(/© 2025 Genus Teach. All rights reserved./i)
    expect(copyrightText).toBeInTheDocument()
  })

  it('should have the correct semantic HTML structure', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-gray-900', 'text-white')
  })

  it('should contain a container with proper spacing', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    const container = footer.querySelector('.container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('mx-auto', 'px-4', 'py-8')
  })

  it('should have copyright text with proper styling', () => {
    render(<Footer />)
    const copyrightElement = screen.getByText(/© 2025 Genus Teach. All rights reserved./i)
    expect(copyrightElement.tagName).toBe('P')
    expect(copyrightElement.parentElement).toHaveClass(
      'mt-8', 
      'pt-8', 
      'border-t', 
      'border-gray-800', 
      'text-center', 
      'text-gray-400'
    )
  })

  it('should have correct year in copyright', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    const copyrightText = screen.getByText(new RegExp(`© ${currentYear} Genus Teach`))
    expect(copyrightText).toBeInTheDocument()
  })

  it('should be accessible with proper ARIA roles', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('should have consistent brand name', () => {
    render(<Footer />)
    const brandName = screen.getByText(/Genus Teach/i)
    expect(brandName).toBeInTheDocument()
  })
})
