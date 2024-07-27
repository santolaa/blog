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

async function createPost(postData: Partial<Post>): Promise<Post> {
  const response: Response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

async function updatePost(id: string, postData: Partial<Post>): Promise<Post> {
  const response: Response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  })

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

export { createPost, deletePost, fetchPost, fetchPosts, updatePost }
