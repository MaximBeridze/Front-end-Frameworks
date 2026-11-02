import type { Movie } from "../types"

export function pickRandomMovie(movies: Movie[]): Movie | null {
  if (movies.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * movies.length)

  return movies[randomIndex]
}