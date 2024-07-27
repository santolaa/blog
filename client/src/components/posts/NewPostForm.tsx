import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../constants'

function NewPostForm() {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const post = { title, body }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })

    if (response.ok) {
      const { id } = await response.json()
      navigate(`/posts/${id}`)
    } else {
      console.error('Failed to create post')
    }
  }

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            required
            type='text'
            value={title}
            id='title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='body'>Body:</label>
          <textarea
            required
            value={body}
            id='body'
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default NewPostForm
