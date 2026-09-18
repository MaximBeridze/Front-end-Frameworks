import MovieCard from "./components/MovieCard"
import { SAMPLE_MOVIES } from "./data/sampleMovies"

const App = () => {
  return (
    <div className="app-layout">
      <main className="main-container">
          <h1>Movie App</h1>
          <section>
            <div className="movies-grid">
              {SAMPLE_MOVIES.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
      </main>
    </div>
  );
};

export default App
