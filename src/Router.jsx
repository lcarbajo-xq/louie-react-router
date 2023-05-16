import { useEffect, useState } from 'react'
import { EVENTS } from './consts'
import { match } from 'path-to-regexp'
import { Children } from 'react'
import { getCurrentPath } from './utils'

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h2>Error 404</h2>
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath)
    }
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = []

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type

    const isRoute = name === 'Route'
    if (!isRoute) return null

    return props
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    // Path-To-Regexp to match the route path with query params
    const URLMatcher = match(path, { decode: decodeURIComponent })
    const matched = URLMatcher(currentPath)
    if (!matched) return false

    // In routeParams we store all query params we found
    routeParams = matched.params
    return true
  })?.Component

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  )
}
