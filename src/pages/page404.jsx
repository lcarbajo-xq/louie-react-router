import { Link } from '../Link'

export default function NotFoundPage() {
  return (
    <>
      <h2>Oh Sorry! There is nothing here for you</h2>
      <div>
        <img
          src='https://media.tenor.com/lxqihLckfJcAAAAM/this-is-fine.gif'
          alt='This is fine gif'
        />
      </div>
      <Link to='/'>Volver a la Home</Link>
    </>
  )
}
