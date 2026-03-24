import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock axios before importing api module
const mockGet = vi.fn()
const mockPost = vi.fn()

vi.mock('axios', () => ({
  default: {
    create: () => ({
      get: mockGet,
      post: mockPost,
    }),
  },
}))

// Import after mock setup
const { fetchPortfolioData, submitContact } = await import('../../services/api')

describe('API service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchPortfolioData makes GET request to /portfolio/', async () => {
    const mockData = { profile: null, skill_categories: [] }
    mockGet.mockResolvedValue({ data: mockData })

    const response = await fetchPortfolioData()
    expect(mockGet).toHaveBeenCalledWith('/portfolio/')
    expect(response.data).toEqual(mockData)
  })

  it('submitContact makes POST request with data', async () => {
    const contactData = {
      name: 'John',
      email: 'john@test.com',
      subject: 'Hi',
      message: 'Hello',
    }
    mockPost.mockResolvedValue({ data: { detail: 'ok' } })

    await submitContact(contactData)
    expect(mockPost).toHaveBeenCalledWith('/contact/', contactData)
  })

  it('handles network error', async () => {
    mockGet.mockRejectedValue(new Error('Network Error'))
    await expect(fetchPortfolioData()).rejects.toThrow('Network Error')
  })
})
