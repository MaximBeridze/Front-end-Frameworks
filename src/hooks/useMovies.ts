import { useEffect, useState } from "react"
import type { Movie } from "../types"

const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
/*const controller = new AbortController()

movieService.fetchMovies({
  signal: controller.signal,
})
*/
export const useMovies = (url: string) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          `Bearer ${VITE_TMDB_API_KEY}`,
      },
    };

    fetch(url, options)
    .then((res) => res.json())
    .then((data) => setMovies(data.results))
    .catch((err) => setError(String(err)))
    .finally(() => setLoading(false))
})

  return { movies, loading, error }
}