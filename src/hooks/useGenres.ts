import { useEffect, useState } from "react"

const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

type Genre = {
  id: number
  name: string
}

export const useGenres = (url: string) => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          `Bearer ${VITE_TMDB_API_KEY}`,
      }
    };

    fetch(url, options)
    .then((res) => res.json())
    .then((data) => setGenres(data.genres))
    .catch((err) => setError(String(err)))
    .finally(() => setLoading(false))
}, [url])

  return { genres, loading, error }
}