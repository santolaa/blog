import { useEffect, useState } from 'react'
import { API_URL } from '../../constants'
import { Link } from 'react-router-dom'

interface Post {
  id: number
  title: string
  body: string
}

function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(API_URL)
        if (response.ok) {
          const posts = await response.json()
          setPosts(posts)
        } else {
          throw response
        }
      } catch (error) {
        console.error('Error fetching posts: ', error)
      }
    }
    fetchPosts()
  }, [])

  const deletePost = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id))
      } else {
        throw response
      }
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
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostsList
