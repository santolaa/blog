import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import * as postService from '../../../services/postService'
import PostDetails from '../../../components/posts/PostDetails'

interface Post {
  id: number
  title: string
  body: string
}

global.console.error = jest.fn()

jest.mock('../../../services/postService', () => ({
  fetchPost: jest.fn(),
  deletePost: jest.fn(),
}))

describe('PostDetails', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Post 1',
    body: 'Body 1',
  }

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={[`/posts/${mockPost.id}`]}>
        <Routes>
          <Route path={'/posts/:id'} element={<PostDetails />} />
          <Route path='/' element={<div>Posts List</div>} />
        </Routes>
      </MemoryRouter>
    )
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays the fetched post data', async () => {
    (postService.fetchPost as jest.Mock).mockResolvedValue(mockPost)

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText(mockPost.title)).toBeInTheDocument()
      expect(screen.getByText(mockPost.body)).toBeInTheDocument()
    })
  })

  it('handles error when fetching post fails', async () => {
    const error = new Error('An error occurred!');
    (postService.fetchPost as jest.Mock).mockRejectedValue(error)
    const consoleSpy = jest.spyOn(console, 'error')
    consoleSpy.mockImplementation(jest.fn())

    renderComponent()

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching post: ', error)
    })

    consoleSpy.mockRestore()
  })

  it('deletes the post and redirects to the posts list', async () => {
    (postService.fetchPost as jest.Mock).mockResolvedValue(mockPost);
    (postService.deletePost as jest.Mock).mockResolvedValue();

    renderComponent()

    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'))
    })

    await waitFor(() => {
      expect(postService.deletePost).toHaveBeenCalledWith(mockPost.id)
      expect(screen.getByText('Posts List')).toBeInTheDocument()
    })
  })

  it( 'handles error when deleting post fails', async () => {
    const error = new Error('An error occurred!');
    (postService.fetchPost as jest.Mock).mockResolvedValue(mockPost);
    (postService.deletePost as jest.Mock).mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, 'error')
    consoleSpy.mockImplementation(jest.fn())

    renderComponent()

    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'))
    })

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error deleting post: ', error)
    })

    consoleSpy.mockRestore()
  })
})
