import { Post } from '../components/posts/Post.model'
import { API_URL } from '../constants'

async function fetchPosts(): Promise<Post[]> {
  const response: Response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json() as Promise<Post[]>
}

async function fetchPost(id: string): Promise<Post> {
  const response: Response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json() as Promise<Post>
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

  return response.json() as Promise<Post>
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

  return response.json() as Promise<Post>
}

async function deletePost(id: number): Promise<void> {
  const response: Response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }
}

export { createPost, deletePost, fetchPost, fetchPosts, updatePost }
