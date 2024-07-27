import { Link } from 'react-router-dom'

const NavBar: React.FC = () => {
  return (
    <nav>
      <Link to='/'>Posts List</Link>
      {' | '}
      <Link to='/new'>New Post</Link>
    </nav>
  )
}

export default NavBar
