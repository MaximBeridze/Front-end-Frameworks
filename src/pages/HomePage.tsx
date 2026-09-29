import { useState } from "react"
import SearchBar from "../components/SearchBar"
import MovieList from "../components/MovieList"
import { useMovies } from "../hooks/useMovies"
import { NavLink } from "react-router-dom"

const HomePage = () => {
    const [query, setQuery] = useState("")
    const { movies, isLoading, error } = useMovies();
    const filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase()),
    );

    return (
    <div className="app-layout">
        <header className="site-header">
            <nav aria-label="Main navigation">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
            <SearchBar query={query} onChange={setQuery} />
        </header>

        <main className="main-container">
        <h1>Movie App</h1>

        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong.</p>}

        {!isLoading && !error && (
            <MovieList movies={filteredMovies} />
        )}
        </main>
    </div>
  )
}

export default HomePage