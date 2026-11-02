import type { Movie } from "../types"
import { getGenreNames } from '../data/genres'
import { TMDB_IMAGE_BASE } from '../data/sampleMovies'
import { useAppContext } from "../context/AppContext"
import { Heart, Star } from "lucide-react"

type MovieCardProps = {
  movie: Movie
  onOpen?: (movie: Movie) => void
}

const MovieCard = ({ movie, onOpen }: MovieCardProps) => {
  const genreNames = getGenreNames(movie.genre_ids)
  const imagePath = TMDB_IMAGE_BASE + movie.poster_path
  const { isFavorite, toggleFavorite } = useAppContext()
  const isFav = isFavorite(movie.id)
  return (
    <article className="movie-card" tabIndex={0} onClick={() => onOpen?.(movie)} aria-label={`View details for ${movie.title}`}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onOpen?.(movie)
        }
      }}>
      <div className="poster-wrapper">
        <img src={imagePath} alt={`${movie.title} Poster`} className="poster-img" loading="lazy" />
        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              <Star aria-hidden="true" fill="currentColor" />
            </span>
            <button className={isFav ? "favorite-btn is-favorite" : "favorite-btn"} aria-label={isFav ? "Remove from favourites" : "Add to favourites"} onClick={(event) => { event.stopPropagation(); toggleFavorite(movie) }}>
              <Heart aria-hidden="true" size={16} />
            </button>
          </div>
          <span className="quick-view-hint">View Details</span>
        </div>
      </div>
      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title ?? 'No movie title available.'}</h2>
        <div className="movie-card-meta">
          <span>{movie.release_date ?? "----"}</span>
          <span>{movie.vote_count ?? '---'}</span>
        </div>
        <div className="movie-genres-tags">
          {genreNames.map((name) => (
            <span key={name} className="genre-tag">{name}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default MovieCard
