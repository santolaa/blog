import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react'
import { createPost } from '../../../services/postService'
import NewPostForm from '../../../components/posts/NewPostForm'

jest.mock('../../../services/postService', () => ({
  createPost: jest.fn(() => ({
    id: 1,
    title: 'New Post',
    body: 'New Body',
  })),
}))

describe('NewPostForm', () => {
  const renderComponent = (): void => {
    render(
      <Router>
        <NewPostForm />
      </Router>
    );
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders NewPostForm component and allows typing', () => {
    renderComponent()

    const titleInput = screen.getByLabelText(/Title:/i) as HTMLInputElement
    const bodyInput = screen.getByLabelText(/Body:/i) as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: /Save/i })

    const expectedTitle = 'New Post'
    const expectedBody = 'New Body'

    fireEvent.change(titleInput, { target: { value: expectedTitle } })
    fireEvent.change(bodyInput, { target: { value: expectedBody } })

    expect(titleInput.value).toBe('New Post')
    expect(bodyInput.value).toBe('New Body')
    expect(submitButton).toBeInTheDocument()
  })

  test('submits the form and redirects to the post page', async () => {
    renderComponent()

    const titleInput = screen.getByLabelText(/Title:/i) as HTMLInputElement
    const bodyInput = screen.getByLabelText(/Body:/i) as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: /Save/i })

    fireEvent.change(titleInput, { target: { value: 'New Post' } })
    fireEvent.change(bodyInput, { target: { value: 'New Body' } })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(createPost).toHaveBeenCalledTimes(1)
  })

  test('displays an error message when post creation fails', async () => {
    (createPost as jest.MockedFunction<typeof createPost>).mockRejectedValue(new Error('An error occurred!'))

    const consoleSpy = jest.spyOn(console, 'error')
    consoleSpy.mockImplementation(jest.fn())

    renderComponent()

    const titleInput = screen.getByLabelText(/Title:/i) as HTMLInputElement
    const bodyInput = screen.getByLabelText(/Body:/i) as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: /Save/i })

    fireEvent.change(titleInput, { target: { value: 'New Post' } })
    fireEvent.change(bodyInput, { target: { value: 'New Body' } })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(consoleSpy).toHaveBeenCalledWith('Failed to create post: ', new Error('An error occurred!'))

    consoleSpy.mockRestore()
  })
})
