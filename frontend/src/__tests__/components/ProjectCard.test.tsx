import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectCard from '../../components/projects/ProjectCard'
import type { Project } from '../../types'

const mockProject: Project = {
  id: 1,
  title: 'Test Project',
  slug: 'test-project',
  description: 'A test project description',
  short_description: 'Short desc',
  thumbnail: null,
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
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders short description', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Short desc')).toBeInTheDocument()
  })

  it('renders github link', () => {
    render(<ProjectCard project={mockProject} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://github.com/test/project')
  })

  it('renders technology tags', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders first letter as placeholder when no thumbnail', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('T')).toBeInTheDocument()
  })
})
