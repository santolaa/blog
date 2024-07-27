import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deletePost, fetchPosts } from '../../services/postService'

interface Post {
  id: number
  title: string
  body: string
}

function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetchPosts()
        setPosts(response)
      } catch (error) {
        console.error('Error fetching posts: ', error)
      }
    }
    getPosts()
  }, [])

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id)
      setPosts(posts.filter((post) => post.id !== id))
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
