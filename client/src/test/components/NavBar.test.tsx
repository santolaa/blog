import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from '../../components/NavBar'

describe('NavBar', () => {
  const renderNavBar = () => {
    render(<NavBar />, { wrapper: MemoryRouter })
  }

  test('renders both links', () => {
    renderNavBar()
    expect(screen.getByText('Posts List')).toBeInTheDocument()
    expect(screen.getByText('Create New Post')).toBeInTheDocument()
  })
})
