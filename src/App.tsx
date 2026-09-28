import SearchBar from "./components/SearchBar"
import MovieList from "./components/MovieList";
import { SAMPLE_MOVIES } from "./data/sampleMovies"
import { useState, useEffect } from 'react';

const VITE_TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          `Bearer ${VITE_TMDB_API_TOKEN}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options,
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);

const App = () => {

  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState(SAMPLE_MOVIES);
  const filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="app-layout">
      <header className="site-header">
      <SearchBar query={query} onChange={setQuery}/>
      </header>
      <main className="main-container">
          <h1 className="page-title">Movie App</h1>
          <section>
            <MovieList movies={filteredMovies} />
          </section>
      </main>
    </div>
  );
};

export default App
