import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { deletePost, fetchPost } from '../../services/postService'

interface RouteParams extends Record<string, string | undefined> {
  id: string
}

interface Post {
  id: number
  title: string
  body: string
}

const PostDetails: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null)
  const { id } = useParams<RouteParams>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurrentPost = async (): Promise<void> => {
      if (!id) return

      try {
        const fetchedPost = await fetchPost(id)
        setPost(fetchedPost)
      } catch (error) {
        console.error('Error fetching post: ', error)
      }
    }
    fetchCurrentPost()
  }, [id])

  const handleDeletePost = async (): Promise<void> => {
    if (!post) return

    try {
      await deletePost(post.id)
      navigate('/')
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
      <button onClick={handleDeletePost}>Delete</button>
    </div>
  )
}

export default PostDetails
