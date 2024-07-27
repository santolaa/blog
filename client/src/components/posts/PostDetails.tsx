import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../../constants'

interface Post {
  id: number
  title: string
  body: string
}

function PostDetails() {
  const [post, setPost] = useState<Post | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`)
        if (response.ok) {
          const post = await response.json()
          setPost(post)
        } else {
          throw response
        }
      } catch (error) {
        console.error('Error fetching post: ', error)
      }
    }
    fetchPost()
  }, [id])

  const deletePost = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        navigate('/')
      } else {
        throw response
      }
    } catch (error) {
      console.error('Error deleting post: ', error)
    }
  }

  if (!post) return <h2>Loading...</h2>

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      {' | '}
      <Link to='/'>Back to Posts List</Link>
      {' | '}
      <button onClick={deletePost}>Delete</button>
    </div>
  )
}

export default PostDetails
