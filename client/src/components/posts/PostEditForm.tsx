import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchPost, updatePost } from "../../services/postService"
import { Post } from "./Post.model"

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const updatedPost = {
      title: post!.title,
      body: post!.body,
    }

    try {
      await updatePost(id as string, updatedPost)
      navigate(`/posts/${id}`)
    } catch (error) {
      console.error('Failed to update post: ', error)
    }
  }

  if (!post) return <h2>Loading...</h2>

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <br />
          <input
            required
            id='title'
            type='text'
            value={post.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='body'>Body</label>
          <br />
          <textarea
            required
            id='body'
            value={post.body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPost({ ...post, body: e.target.value })}
          />
        </div>
        <div>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default PostEditForm
