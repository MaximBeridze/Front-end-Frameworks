import MovieCard from "./components/movieCard"
import { SAMPLE_MOVIES } from "./data/sampleMovies"

const App = () => {
  return (
    <div className="app-layout">
      <main className="main-container">
          <h1>Movie App</h1>
          <section>
            <div className="movies-grid">
              {SAMPLE_MOVIES.map((movie) => (
                <MovieCard id={movie.id} title={movie.title} poster_path={movie.poster_path}/>
              ))}
            </div>
          </section>
      </main>
    </div>
  );
};

export default App
