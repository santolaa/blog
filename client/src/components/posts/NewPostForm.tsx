import { useNavigate } from 'react-router-dom'
import { createPost } from '../../services/postService'
import { PostFormFields } from './Post.model'
import PostForm from './PostForm'

const NewPostForm: React.FC = () => {
  const navigate = useNavigate()

  const handleSubmit = async (post: PostFormFields): Promise<void> => {
    try {
      const response = await createPost(post)
      navigate(`/posts/${response.id}`)
    } catch (error) {
      console.error('Failed to create post: ', error)
    }
  }

  return (
    <PostForm
      headerText="Create a New Post"
      onSubmit={handleSubmit}
      submitButtonText="Save"
    />
  )
}

export default NewPostForm
