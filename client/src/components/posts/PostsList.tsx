import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deletePost, fetchPosts } from '../../services/postService'
import { Post } from './Post.model'

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const getPosts = async (): Promise<void> => {
      try {
        const response = await fetchPosts()
        setPosts(response)
      } catch (error) {
        console.error('Error fetching posts: ', error)
      }
    }
    getPosts()
  }, [])

  const handleDeletePost = async (id: number): Promise<void> => {
    try {
      await deletePost(id)
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
    } catch (error) {
      console.error('Error deleting post: ', error)
    }
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className='post-container'>
          <h2>
            <Link to={`/posts/${post.id}`} className='post-title'>
              {post.title}
            </Link>
          </h2>
          <div className='post-links'>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {' | '}
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostsList
