import { render, RenderResult, screen } from '@testing-library/react'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'
import AppRoutes from '../../components/AppRoutes'

jest.mock('../../constants', () => ({
  API_URL: 'https://jsonplaceholder.typicode.com/posts'
}))

jest.mock('../../components/posts/PostsList', () => {
  const MockPostsList = (): JSX.Element => (
    <div>Your matcher for Posts Lists component here</div>
  )
  return MockPostsList
})

jest.mock('../../components/posts/PostDetails', () => {
  const MockPostDetails = (): JSX.Element => (
    <div>Your matcher for Post Details component here</div>
  )
  return MockPostDetails
})

jest.mock('../../components/posts/NewPostForm', () => {
  const MockNewPostForm = (): JSX.Element => (
    <div>Your matcher for New Post Form component here</div>
  )
  return MockNewPostForm
})

jest.mock('../../components/posts/PostEditForm', () => {
  const MockPostEditForm = (): JSX.Element => (
    <div>Your matcher for Post Edit Form component here</div>
  )
  return MockPostEditForm
})

describe('AppRoutes', () => {
  const renderWithRouter = (
    ui: React.ReactElement,
    { initialEntries = ['/'] }: MemoryRouterProps = {}
  ): RenderResult => {
    return render(ui, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      )
    })
  }

  test('/ renders PostsList component', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/'] })
    const expectedText = 'Your matcher for Posts Lists component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })

  test('posts/:id renders PostDetails component', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/posts/1'] })
    const expectedText = 'Your matcher for Post Details component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })

  test('/new renders NewPostForm component', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/new'] })
    const expectedText = 'Your matcher for New Post Form component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })

  test('posts/:id/edit renders PostEditForm component', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/posts/1/edit'] })
    const expectedText = 'Your matcher for Post Edit Form component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
})
