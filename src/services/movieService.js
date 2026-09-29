import { SAMPLE_MOVIES } from "../data/sampleMovies"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL


export const movieService = {
  async fetchMovies({
    search = "",
    genre = "",
    sort = "popularity",
    onlyFavorites = false,
    page = 1,
    signal
  } = {}) {
    void genre
    void sort
    void onlyFavorites

    if (!API_KEY) {
      const results = search
        ? SAMPLE_MOVIES.filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
          )
        : SAMPLE_MOVIES

      return {
        results,
        total_pages: 1,
        total_results: results.length,
        isLiveApi: false,
      }
    }

    const endpoint = search
      ? '/search/movie'
      : '/movie/popular'

    const params = new URLSearchParams({
      language: "en-US",
      page: String(page),
    })

    if (search) {
      params.set("query", search)
    }

    const url = `${BASE_URL}${endpoint}?${params.toString()}`

    const response = await fetch(url, {
      method: "GET",
      signal,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`TMDB request failed: ${response.status}`)
    }

    const data = await response.json()

    return {
      results: data.results,
      total_pages: data.total_pages,
      total_results: data.total_results,
      isLiveApi: true,
    }
  },
}
