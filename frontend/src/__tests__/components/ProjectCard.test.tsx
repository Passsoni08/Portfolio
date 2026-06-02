import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import ProjectCard from '../../components/projects/ProjectCard'
import type { Project } from '../../types'
import { renderWithProviders } from '../test-utils'

const mockProject: Project = {
  id: 1,
  title: 'Test Project',
  slug: 'test-project',
  description: 'A test project description',
  short_description: 'Short desc',
  thumbnail: null,
  thumbnail_url: '',
  live_url: '',
  github_url: 'https://github.com/test/project',
  technologies: [
    { id: 1, name: 'React', icon: null, icon_url: '', proficiency: 90 },
  ],
  featured: false,
  order: 0,
  created_at: '2024-01-01T00:00:00Z',
}

describe('ProjectCard', () => {
  it('renders project title', () => {
    renderWithProviders(<ProjectCard project={mockProject} onSelect={vi.fn()} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders short description', () => {
    renderWithProviders(<ProjectCard project={mockProject} onSelect={vi.fn()} />)
    expect(screen.getByText('Short desc')).toBeInTheDocument()
  })

  it('calls onSelect with the project when clicked', () => {
    const onSelect = vi.fn()
    renderWithProviders(<ProjectCard project={mockProject} onSelect={onSelect} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledWith(mockProject)
  })

  it('calls onSelect when activated via keyboard', () => {
    const onSelect = vi.fn()
    renderWithProviders(<ProjectCard project={mockProject} onSelect={onSelect} />)
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledWith(mockProject)
  })

  it('renders technology tags', () => {
    renderWithProviders(<ProjectCard project={mockProject} onSelect={vi.fn()} />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders first letter as placeholder when no thumbnail', () => {
    renderWithProviders(<ProjectCard project={mockProject} onSelect={vi.fn()} />)
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  it('renders image from thumbnail_url when thumbnail is null', () => {
    const project = {
      ...mockProject,
      thumbnail: null,
      thumbnail_url: 'https://example.com/image.png',
    }
    renderWithProviders(<ProjectCard project={project} onSelect={vi.fn()} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://example.com/image.png')
  })
})
