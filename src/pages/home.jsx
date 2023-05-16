import { Link } from '../Link'

export default function Home() {
  return (
    <>
      <h1>HOME</h1>
      <h2>Esto es la Home</h2>
      <div>
        <Link to='/about'>Irr al about</Link>
      </div>

      <div>
        <Link to='/search/javascript'>Irr al search</Link>
      </div>
    </>
  )
}
