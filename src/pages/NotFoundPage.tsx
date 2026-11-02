import { Link, useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <main className="main-container">
      <h1>404 Page not Found</h1>
      <p>How did you even get here?</p>
      <button
        type="button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
      <Link to="/about">About</Link>
    </main>
  )
}

export default NotFoundPage