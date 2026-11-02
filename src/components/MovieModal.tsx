import { useEffect } from "react"
import type { Movie } from "../types"
import { X, Heart, Youtube } from "lucide-react"
import {
    TMDB_IMAGE_BASE,
    TMDB_BACKDROP_BASE,
} from "../data/sampleMovies"
import { getGenreNames } from "../data/genres"
import { useAppContext } from "../context/AppContext"

type MovieModalProps = {
    movie: Movie
    onClose: () => void
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    const genreNames = getGenreNames(movie.genre_ids)
    const { isFavorite, toggleFavorite } = useAppContext()
    const isFav = isFavorite(movie.id)
    const trailerQuery = movie.title + " Official Trailer"

    const posterUrl = movie.poster_path
        ? TMDB_IMAGE_BASE + movie.poster_path
        : null

    const backdropUrl = movie.backdrop_path
        ? TMDB_BACKDROP_BASE + movie.backdrop_path
        : null
    useEffect(() => {
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        const previousRootOverflow = document.documentElement.style.overflow
        document.documentElement.style.overflow = "hidden"

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = previousOverflow
            document.documentElement.style.overflow = previousRootOverflow
        }
    }, [onClose])

    return (
        <div className="modal-overlay active"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >
            <div
                className="modal-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="movie-modal-title"
            >
                <button
                    type="button"
                    className="modal-close-btn"
                    aria-label="Close movie details"
                    title="Close movie details"
                    onClick={onClose}
                >
                    <X />
                </button>
                <div
                    className="modal-backdrop-hero"
                    style={{
                        backgroundImage: backdropUrl
                            ? `url(${backdropUrl})`
                            : "none",
                    }}
                />

                <div className="modal-body">
                    {posterUrl && (
                        <img
                            className="modal-poster"
                            src={posterUrl}
                            alt={movie.title + " Poster"}
                        />
                    )}

                    <div className="modal-content-details">
                        <h2 id="movie-modal-title" className="modal-title">
                            {movie.title}
                        </h2>
                        <p className="modal-overview">
                            {movie.overview ?? "No overview available."}
                        </p>
                        <div className="modal-meta-row">
                            <span className="modal-meta-item">
                                Rating: {movie.vote_average?.toFixed(1) ?? "--"}
                            </span>

                            <span className="modal-meta-item">
                                Released: {movie.release_date ?? "Unknown"}
                            </span>
                        </div>
                        <div className="movie-genres-tags">
                        {genreNames.map((name) => (
                            <span className="genre-tag" key={name}>
                            {name}
                            </span>
                        ))}
                        </div>
                        <div className="modal-footer-actions">
                        <button
                            type="button"
                            aria-pressed={isFav}
                            onClick={() => toggleFavorite(movie)}
                        >
                            <Heart/>
                            {isFav
                            ? "Remove from favorites"
                            : "Add to favorites"}
                        </button>
                        </div>
                        <a
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(trailerQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            <Youtube />
                            Find trailer
                            </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal