import { Route, Routes } from 'react-router-dom'
import PostsList from './posts/PostsList'
import PostDetails from './posts/PostDetails'
import NewPostForm from './posts/NewPostForm'
import PostEditForm from './posts/PostEditForm'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<PostsList />} />
      <Route path='posts/:id' element={<PostDetails />} />
      <Route path='posts/:id/edit' element={<PostEditForm />} />
      <Route path='/new' element={<NewPostForm />} />
    </Routes>
  )
}

export default AppRoutes
