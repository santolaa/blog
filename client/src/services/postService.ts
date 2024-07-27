import { API_URL } from '../constants'

interface Post {
  id: number
  title: string
  body: string
}

async function fetchPosts(): Promise<Post[]> {
  const response: Response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

async function fetchPost(id: string): Promise<Post> {
  const response: Response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

async function deletePost(id: number): Promise<Post | null> {
  const response: Response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export { deletePost, fetchPost, fetchPosts }
