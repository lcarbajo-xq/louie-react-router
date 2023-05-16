import Page404 from './pages/page404'
import SearchPage from './pages/search'

import { Router } from './Router'
import { Route } from './Route'

import { Suspense, lazy } from 'react'

const AboutPage = lazy(() => import('./pages/about.jsx'))
const HomePage = lazy(() => import('./pages/home.jsx'))

const routes = [
  {
    path: '/',
    Component: HomePage
  },
  { path: '/about', Component: AboutPage },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App() {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path='/' Component={HomePage} />
          <Route path='/about' Component={AboutPage} />
          <Route path='/search/:query' Component={SearchPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
