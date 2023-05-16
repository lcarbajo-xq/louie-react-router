import { useEffect } from 'react'

export default function SearchPage({ routeParams }) {
  useEffect(() => {
    document.title = `Search: ${routeParams.query}`
  }, [routeParams.query])

  return <p>Search was: {routeParams.query}</p>
}
