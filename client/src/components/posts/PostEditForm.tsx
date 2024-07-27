import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_URL } from "../../constants"

interface Post {
  id: number
  title: string
  body: string
}

function PostEditForm() {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: post?.title, body: post?.body }),
      })

      if (response.ok) {
        navigate(`/posts/${id}`)
      } else {
        throw response
      }
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
