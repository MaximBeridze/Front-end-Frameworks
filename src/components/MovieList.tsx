import { div } from "motion/react-client"
import type { Movie } from "../types"
import MovieCard from "./MovieCard"

type MovieListProps = { movies: Movie[] }

const MovieList = ({ movies }: MovieListProps) => {  
    if (movies.length === 0) {
        return (
            <div className="empty-state">
                <p className="empty-title">No movies found.</p>
            </div>
    )
}
    return (
        <div className="movies-grid">
            {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )   
}
export default MovieList