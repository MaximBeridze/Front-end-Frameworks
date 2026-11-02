import { SAMPLE_MOVIES } from "../data/sampleMovies"
import { getApiKey, getFavorites } from "../utils/storage"

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

export function sortMovies(movies, sort) {
  const sortedMovies = [...movies]

  switch (sort) {
    case "popularity":
      return sortedMovies.sort((a, b) =>
        (b.popularity ?? 0) - (a.popularity ?? 0)
      )

    case "vote_average":
    return sortedMovies.sort((a, b) =>
      (b.vote_average ?? 0) - (a.vote_average ?? 0)
    )

    case "title":
      return sortedMovies.sort((a, b) =>
      (a.title).localeCompare(b.title)
    )

    case "release_date":
    return sortedMovies.sort((a, b) =>
      (b.release_date ?? "").localeCompare(a.release_date ?? "")
    )

    default:
      return sortedMovies
  }
}

export const movieService = {
  async fetchMovies({
    query = "",
    genre = "",
    sort = "popularity",
    onlyFavorites = false,
    page = 1,
    signal = /** @type {AbortSignal | undefined} */ (undefined), //Temp solution - should change later
  } = {}) {
    if (onlyFavorites) {
      const favorites = getFavorites()

      const results = query
        ? favorites.filter((movie) =>
           movie.title.toLowerCase().includes(query.toLowerCase())
          )
        : favorites

      return {
          results: sortMovies(
          results,
          sort
          ),
        total_pages: 1,
        total_results: results.length,
        isLiveApi: false,
      }
    }

    const API_KEY = getApiKey()

    if (!API_KEY) {
      let results = query
        ? SAMPLE_MOVIES.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
          )
        : SAMPLE_MOVIES

      if (genre) {
        results = results.filter((movie) =>
          movie.genre_ids?.includes(Number(genre))
        )
      }

      return {
        results: sortMovies(
          results,
          sort
        ),
        total_pages: 1,
        total_results: results.length,
        isLiveApi: false,
      }
    }

    let endpoint

    if (query) {
      endpoint = "/search/movie"
    } else if (genre) {
      endpoint = "/discover/movie"
    } else {
      endpoint = "/movie/popular"
    }

    const params = new URLSearchParams({
      language: "en-US",
      page: String(page),
      api_key: API_KEY
    })

    if (genre && !query) {
      params.set("with_genres", genre)
    }

    if (query) {
      params.set("query", query)
    }

    const url = `${BASE_URL}${endpoint}?${params.toString()}`

    const response = await fetch(url, {
      method: "GET",
      signal,
      headers: {
        accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`TMDB request failed: ${response.status}`)
    }

    const data = await response.json()

    return {
      results: sortMovies(
        data.results,
        sort
      ),
      total_pages: data.total_pages,
      total_results: data.total_results,
      isLiveApi: true,
    }
  },
}
