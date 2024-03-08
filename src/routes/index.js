// Layouts
import { HeaderOnly } from '~/components/Layout'

// Pages
import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import Search from '~/pages/Search'
import Friends from '~/pages/Friend'
import Explore from '~/pages/Explore'

// Public routes
const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/following',
    component: Following,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/friends',
    component: Friends,
  },
  {
    path: '/explore',
    component: Explore,
  },
  {
    path: '/upload',
    component: Upload,
    layout: HeaderOnly,
  },
  {
    path: '/search',
    component: Search,
    layout: null,
  },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
