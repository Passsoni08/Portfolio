import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
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
    renderWithProviders(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders short description', () => {
    renderWithProviders(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Short desc')).toBeInTheDocument()
  })

  it('renders github link', () => {
    renderWithProviders(<ProjectCard project={mockProject} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/projects/test-project')
  })

  it('renders technology tags', () => {
    renderWithProviders(<ProjectCard project={mockProject} />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders first letter as placeholder when no thumbnail', () => {
    renderWithProviders(<ProjectCard project={mockProject} />)
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  it('renders image from thumbnail_url when thumbnail is null', () => {
    const project = {
      ...mockProject,
      thumbnail: null,
      thumbnail_url: 'https://example.com/image.png',
    }
    renderWithProviders(<ProjectCard project={project} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://example.com/image.png')
  })
})
