import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import * as postService from '../../../services/postService'
import PostEditForm from '../../../components/posts/PostEditForm'
import { Post, PostForm } from '../../../components/posts/Post.model'
import { act } from 'react'

jest.mock('../../../constants', () => ({
  API_URL: 'https://jsonplaceholder.typicode.com/posts'
}))

jest.mock('../../../services/postService', () => ({
  fetchPost: jest.fn(),
  updatePost: jest.fn(),
}))

describe('PostEditForm', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Post 1',
    body: 'Body 1',
  }

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={[`/posts/${mockPost.id}/edit`]}>
        <Routes>
          <Route path={'/posts/:id/edit'} element={<PostEditForm />} />
          <Route path={'/posts/:id'} element={<div>Post Detail</div>} />
        </Routes>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    (postService.fetchPost as jest.Mock).mockResolvedValue(mockPost);
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the PostEditForm component', async () => {
    renderComponent()

    await waitFor(() => {
      expect(postService.fetchPost).toHaveBeenCalledTimes(1)
    })

    expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockPost.body)).toBeInTheDocument()
  })

  it('successfully updates the post and redirects', async () => {
    renderComponent()

    await waitFor(() => {
      expect(postService.fetchPost).toHaveBeenCalledTimes(1)
    })

    const newPost: PostForm = {
      title: 'New Post Title',
      body: 'New Post Body',
    }

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: newPost.title },
    })

    fireEvent.change(screen.getByLabelText(/body/i), {
      target: { value: newPost.body },
    })

    await act(async () => {
      fireEvent.click(screen.getByText(/save/i))
    })

    await waitFor(() => {
      expect(postService.updatePost).toHaveBeenCalledTimes(1)
      expect(postService.updatePost).toHaveBeenCalledWith('1', newPost)
    })

    expect(screen.getByText('Post Detail')).toBeInTheDocument()
  })

  it('shows a console error when update fails', async () => {
    const error = new Error('Update failed');
    (postService.updatePost as jest.Mock).mockRejectedValue(error)

    const consoleSpy = jest.spyOn(console, 'error')
    consoleSpy.mockImplementation(jest.fn())

    renderComponent()

    await waitFor(() => {
      fireEvent.click(screen.getByText(/save/i))
    })

    await waitFor(() => {
      expect(postService.updatePost).toHaveBeenCalledTimes(1)
    })

    expect(consoleSpy).toHaveBeenCalledWith('Failed to update post: ', error)
  })

  it('shows a console error when fetching post fails', async () => {
    const error = new Error('Fetch failed');
    (postService.fetchPost as jest.Mock).mockRejectedValue(error)

    const consoleSpy = jest.spyOn(console, 'error')
    consoleSpy.mockImplementation(jest.fn())

    renderComponent()

    await waitFor(() => {
      expect(postService.fetchPost).toHaveBeenCalledTimes(1)
    })

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching post: ', error)
  })
})
