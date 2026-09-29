import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <main className="main-container">
      <h1>404 Page not Found</h1>
      <p>How did you even get here?</p>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </main>
  )
}

export default NotFoundPage