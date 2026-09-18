import { article } from 'motion/react-client'
import React from 'react'
import type {Movie} from "../types"
import { getGenreNames } from '../data/genres'
import { TMDB_BACKDROP_BASE, TMDB_IMAGE_BASE } from '../data/sampleMovies'
import { useState } from 'react'


const MovieCard = ({ movie }: { movie: Movie }) => {  
  const genreNames = getGenreNames(movie.genre_ids)
  const imagePath = TMDB_IMAGE_BASE + movie.poster_path
  const backdropPath = TMDB_BACKDROP_BASE + movie.backdrop_path
  const [isFav, setIsFav] = useState(false)
  return(
  <article className="movie-card" tabIndex={0} aria-label="title here ...">
      <div className="poster-wrapper">
        <img src={imagePath} alt={`${movie.title} Poster`} className="poster-img" loading="lazy"/>
        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              {movie.vote_average?.toFixed(1) ?? "--"}
            </span>
            <button className={isFav ? "favorite-btn is-favorite" : "favorite-btn"} aria-label={isFav ? "Remove from favourites" : "Add to favourites"} onClick= {() => setIsFav(previous => !previous)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
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
