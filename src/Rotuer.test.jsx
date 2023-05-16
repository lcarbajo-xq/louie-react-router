import { beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Router } from './Router'
import { getCurrentPath } from './utils'
import { Route } from './Route'
import { Link } from './Link'

vi.mock('./utils.js', () => ({
  getCurrentPath: vi.fn()
}))

describe('Tests are running', () => {
  beforeEach(() => {
    cleanup()
  })
  it('should trender without problems', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText('404')).toBeTruthy()
  })
  it('should render the component of the first route that matches', () => {
    getCurrentPath.mockReturnValue('/about')
    const routes = [
      {
        path: '/',
        Component: () => <h1>Home</h1>
      },
      { path: '/about', Component: () => <h1>About</h1> }
    ]
    render(<Router routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })
  it('should navigate using Link component', async () => {
    getCurrentPath.mockReturnValueOnce('/')

    render(
      <Router>
        <Route
          path='/'
          Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to='/about'>Ir a About</Link>
              </>
            )
          }}
        />
        <Route path='/about' Component={() => <h1>About</h1>} />
      </Router>
    )

    const button = screen.getByText(/Ir a About/)
    fireEvent.click(button)

    console.log(screen.debug())
    const aboutTitle = await screen.findByText('About')
    expect(aboutTitle).toBeTruthy()
  })
})
