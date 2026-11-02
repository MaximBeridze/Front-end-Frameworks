import { movieService } from "../services/movieService"
import { useEffect, useState } from "react"
import type { Movie } from "../types"


type UseMoviesOptions = {
  query?: string
  genre?: string
  sort?: string
  refreshKey?: number
}

export const useMovies = ({
  query = "",
  genre = "",
  sort = "popularity",
  refreshKey = 0
}: UseMoviesOptions = {}) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLiveApi, setIsLiveApi] = useState(false)
  

  useEffect(() => {
    const controller = new AbortController()
    const loadMovies = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await movieService.fetchMovies({
          query,
          genre,
          sort,
          signal: controller.signal,
        })

        setMovies(data.results)
        setIsLiveApi(data.isLiveApi)
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return
        }

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load movies"
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadMovies()

    return () => controller.abort()
  }, [query, genre, sort, refreshKey])

  return { movies, isLoading, error, isLiveApi }
}
