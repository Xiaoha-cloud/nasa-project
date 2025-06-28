import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HomePage from '../app/page'

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    expect(screen.getByText('NASA Explorer')).toBeInTheDocument()
  })

  it('renders all feature cards', () => {
    render(<HomePage />)
    expect(screen.getByText('Astronomy Picture of the Day')).toBeInTheDocument()
    expect(screen.getByText('Mars Rover Photos')).toBeInTheDocument()
    expect(screen.getByText('Near Earth Objects')).toBeInTheDocument()
    expect(screen.getByText('NASA Media Search')).toBeInTheDocument()
  })

  it('displays statistics section', () => {
    render(<HomePage />)
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('1M+')).toBeInTheDocument()
    expect(screen.getByText('24/7')).toBeInTheDocument()
  })
}) 