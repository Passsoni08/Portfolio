import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import Navbar from '../../components/layout/Navbar'
import { renderWithProviders } from '../test-utils'

describe('Navbar', () => {
  it('renders logo', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByText('.', { exact: true })).toBeInTheDocument() // The accent dot in R.P
  })

  it('renders hamburger button', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })

  it('opens overlay on hamburger click', () => {
    renderWithProviders(<Navbar />)
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(hamburger)

    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('closes overlay on second hamburger click', () => {
    renderWithProviders(<Navbar />)
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(hamburger)
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }))
    // Overlay should have the close animation class removed
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })
})
