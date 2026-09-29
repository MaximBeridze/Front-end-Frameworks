import { movieService } from "../services/movieService"
import { useEffect, useState } from "react"
import type { Movie } from "../types"


export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 1. Create the controller for this effect.
    const controller = new AbortController()

    // An effect itself cannot be async, so define an async function inside it.
    const loadMovies = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // 2. Ask movieService for movies and supply the signal.
        const data = await movieService.fetchMovies({
          signal: controller.signal,
        })

        // 3. Put the returned movie array into state.
        setMovies(data.results)
      } catch (err) {
        // 4. Cancellation is intentional, so don't display it as an error.
        if (err instanceof DOMException && err.name === "AbortError") {
          return
        }

        // 5. Store a readable error message.
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load movies"
        )
      } finally {
        // Avoid updating state after cancellation.
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    // 6. Run the async function.
    loadMovies()

    // 7. Abort the request when the component/effect is cleaned up.
    return () => controller.abort()
  }, [])

  return { movies, isLoading, error }
}