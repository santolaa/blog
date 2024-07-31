import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as postServices from '../../../services/postService'
import PostsList from '../../../components/posts/PostsList'

interface Post {
  id: number
  title: string
  body: string
}

global.console.error = jest.fn()

jest.mock('../../../constants', () => ({
  API_URL: 'https://jsonplaceholder.typicode.com/posts'
}))

jest.mock('../../../services/postService', () => ({
  fetchPosts: jest.fn(),
  deletePost: jest.fn(),
}))

describe('PostsList', () => {
  const mockPosts: Post[] = [
    { id: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, title: 'Post 2', body: 'Body 2' }
  ]

  beforeEach(() => {
    (postServices.fetchPosts as jest.Mock).mockResolvedValue(mockPosts);
    (postServices.deletePost as jest.Mock).mockResolvedValue(mockPosts);
  })

  test('renders a list of posts', async () => {
    render(<PostsList />, { wrapper: MemoryRouter })

    await waitFor(() => screen.getByText('Post 1'))

    expect(screen.getByText('Post 1')).toBeInTheDocument()
    expect(screen.getByText('Post 2')).toBeInTheDocument()
  })

  test('deletes a post when delete button is clicked', async () => {
    render(<PostsList />, { wrapper: MemoryRouter })

    const postText = 'Post 1'
    await waitFor(() => screen.getByText(postText))

    fireEvent.click(screen.getAllByText('Delete')[0])

    await waitFor(() => expect(postServices.deletePost).toHaveBeenCalled())

    expect(screen.queryByText(postText)).not.toBeInTheDocument()
  })

  test('handles error when fetching posts fails', async () => {
    const error = new Error('An error occurred!');
    (postServices.fetchPosts as jest.Mock).mockRejectedValue(error)

    render(<PostsList />, { wrapper: MemoryRouter })

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching posts: ', error)
    })
  })

  test('handles error when deleting a post fails', async () => {
    const error = new Error('An error occurred!');
    (postServices.deletePost as jest.Mock).mockRejectedValue(error)

    render(<PostsList />, { wrapper: MemoryRouter })

    await waitFor(() => screen.getByText('Post 1'))

    fireEvent.click(screen.getAllByText('Delete')[0])

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error deleting post: ', error)
    })
  })
})
