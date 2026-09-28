import SearchBar from "./components/SearchBar"
import MovieList from "./components/MovieList"
import { useState } from 'react'
import { useMovies } from "./hooks/useMovies"

const apiUrl = `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular?language=en-US&page=1`

const App = () => {

  const [query, setQuery] = useState("")
  const { movies, loading, error } = useMovies(apiUrl);
  const filteredMovies = movies.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase()),
    );

  return (
    <div className="app-layout">
      <header className="site-header">
      <SearchBar query={query} onChange={setQuery}/>
      </header>
      <main className="main-container">
          <h1>Movie App</h1>
          {loading && <p>Loading...</p>}
          {error && <p>Something went wrong.</p>}
          {!loading && !error && <MovieList movies={filteredMovies} />}
      </main>
    </div>
  );
};

export default App