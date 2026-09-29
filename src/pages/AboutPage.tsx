import { Link } from "react-router-dom"

const AboutPage = () => {
  return (
    <main className="main-container">
      <h1>About Page</h1>
      <p>Movie App</p>
      <Link to="/">Home</Link>
    </main>
  )
}

export default AboutPage