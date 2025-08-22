import { useState } from 'react'
import { PostFormFields } from './Post.model'

interface PostFormProps {
  post?: PostFormFields
  headerText: string
  onSubmit: (post: PostFormFields) => void
  submitButtonText: string
}

function PostForm({
  post,
  headerText,
  onSubmit,
  submitButtonText,
}: PostFormProps) {
  const [formData, setFormData] = useState<PostFormFields>(post || { title: '', body: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value })
  }

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, body: e.target.value })
  }

  return (
    <div>
      <h2>{headerText}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            value={formData.title}
            id="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            required
            value={formData.body}
            id="body"
            onChange={handleBodyChange}
          />
        </div>
        <div>
          <button type="submit">{submitButtonText}</button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
