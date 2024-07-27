import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../../constants'

interface Post {
  id: number
  title: string
  body: string
}

function PostDetails() {
  const [post, setPost] = useState<Post | null>(null)
  const { id } = useParams()

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

  if (!post) return <h2>Loading...</h2>

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to='/'>Back to Posts List</Link>
    </div>
  )
}

export default PostDetails
