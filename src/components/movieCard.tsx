import { article } from 'motion/react-client'
import React from 'react'
import type {Movie} from "../types"

const MovieCard = ({}: Movie) => {  
  return(
  <article class="movie-card" tabindex="0" aria-label="title here ...">
      <div class="poster-wrapper">
        <img src="image.jpeg" alt="Minions &amp; Monsters" class="poster-img" loading="lazy">
        <div class="poster-overlay">
          <div class="card-top-badges">
            <span class="rating-badge">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              7.0
            </span>
            <button class="favorite-btn " title="Add to Watchlist">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          <span class="quick-view-hint">View Details</span>
        </div>
      </div>
      <div class="movie-card-info">
        <h3 class="movie-card-title">Movie Title</h3>
        <div class="movie-card-meta">
          <span>2026</span>
          <span>410 votes</span>
        </div>
        <div class="movie-genres-tags">
          <span class="genre-tag">Adventure</span><span class="genre-tag">Animation</span>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
