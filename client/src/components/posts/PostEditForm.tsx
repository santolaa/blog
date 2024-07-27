import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchPost, updatePost } from "../../services/postService"

interface RouteParams extends Record<string, string | undefined> {
  id: string
}

interface Post {
  id: number
  title: string
  body: string
}

function PostEditForm() {
  const [post, setPost] = useState<Post | null>(null)
  const { id } = useParams<RouteParams>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurrentPost = async () => {
      if (!id) return

      try {
        const post = await fetchPost(id)
        setPost(post)
      } catch (error) {
        console.error('Error fetching post: ', error)
      }
    }
    fetchCurrentPost()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    if (!post || !id) return

    e.preventDefault()

    const updatedPost = {
      title: post.title,
      body: post.body,
    }

    try {
      const response = await updatePost(id, updatedPost)
      navigate(`/posts/${response.id}`)
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
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='body'>Body</label>
          <br />
          <textarea
            required
            id='body'
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
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
