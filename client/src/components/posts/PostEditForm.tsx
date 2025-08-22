import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPost, updatePost } from '../../services/postService'
import { Post, PostFormFields } from './Post.model'
import PostForm from './PostForm'

interface RouteParams extends Record<string, string> {
  id: string
}

const PostEditForm: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null)
  const { id } = useParams<RouteParams>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurrentPost = async (): Promise<void> => {
      try {
        const fetchedPost = await fetchPost(id as string)
        setPost(fetchedPost)
      } catch (error) {
        console.error('Error fetching post: ', error)
      }
    }
    fetchCurrentPost()
  }, [id])

  const handleSubmit = async (updatedPost: PostFormFields): Promise<void> => {
    try {
      await updatePost(id as string, updatedPost)
      navigate(`/posts/${id}`)
    } catch (error) {
      console.error('Failed to update post: ', error)
    }
  }

  if (!post) return <h2>Loading...</h2>

  return (
    <PostForm
      headerText="Edit Post"
      onSubmit={handleSubmit}
      submitButtonText="Save"
      post={{ title: post.title, body: post.body }}
    />
  )
}

export default PostEditForm
