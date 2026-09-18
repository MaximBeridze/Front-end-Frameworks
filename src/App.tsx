import MovieCard from "./components/MovieCard"
import SearchBar from "./components/SearchBar"
import MovieList from "./components/MovieList";
import { SAMPLE_MOVIES } from "./data/sampleMovies"
import { useState } from 'react';


const App = () => {

  const [query, setQuery] = useState("")
  const filteredMovies = SAMPLE_MOVIES.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))

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
