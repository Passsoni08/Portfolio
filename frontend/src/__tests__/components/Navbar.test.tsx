import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'

function renderNavbar() {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
}

describe('Navbar', () => {
  it('renders logo', () => {
    renderNavbar()
    expect(screen.getByText('.', { exact: true })).toBeInTheDocument() // The accent dot in R.P
  })

  it('renders hamburger button', () => {
    renderNavbar()
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })

  it('opens overlay on hamburger click', () => {
    renderNavbar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(hamburger)

    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('closes overlay on second hamburger click', () => {
    renderNavbar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(hamburger)
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }))
    // Overlay should have the close animation class removed
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })
})
