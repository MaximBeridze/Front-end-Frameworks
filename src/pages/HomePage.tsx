import { useState } from "react"
import MovieCard from "../components/MovieCard"
import { useMovies } from "../hooks/useMovies"
import Header from "../components/Header"
import { useAppContext } from "../context/AppContext"
import FilterBar from "../components/FilterBar"
import { sortMovies } from "../services/movieService"
import { GENRES } from "../data/genres"
import StatsBanner from "../components/StatsBanner"
import type { Movie } from "../types"
import MovieModal from "../components/MovieModal"
import ApiConfigModal from "../components/ApiConfigModal"
import { pickRandomMovie } from "../utils/pickRandomMovie"
import { Shuffle } from "lucide-react"

const HomePage = () => {
    const [query, setQuery] = useState("")
    const [onlyFavorites, setOnlyFavorites] = useState(false)
    const [genre, setGenre] = useState("")
    const [sort, setSort] = useState("popularity")
    const { favorites } = useAppContext()
    const [refreshKey, setRefreshKey] = useState(0)
    const { movies, isLoading, error, isLiveApi } = useMovies({ query, genre, sort, refreshKey })
    const visibleMovies = onlyFavorites
        ? favorites
        : movies
    const filteredMovies = visibleMovies.filter((movie) => {
        const matchesQuery =
            movie.title.toLowerCase().includes(query.toLowerCase())

        const matchesGenre =
            !genre || movie.genre_ids?.includes(Number(genre))

        return matchesQuery && matchesGenre
    })
    const sortedMovies = sortMovies(
        filteredMovies,
        sort
    )

    const movieCount = sortedMovies.length

    const totalRating = sortedMovies.reduce(
        (total, movie) => total + (movie.vote_average ?? 0),
        0
    )

    const averageRating = movieCount > 0
        ? totalRating / movieCount
        : 0

    const genreName = genre
        ? GENRES[Number(genre)] ?? "Unknown Genre"
        : "All Genres"

    const [view, setView] = useState<"grid" | "list">(
        "grid"
    )

    const showLoading = isLoading && !onlyFavorites
    const showError = error && !onlyFavorites

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(
        null
    )

    const [isApiConfigOpen, setIsApiConfigOpen] = useState(
        false
    )

    function handleRandomPick() {
        const movie = pickRandomMovie(sortedMovies)

        if (movie) {
            setSelectedMovie(movie)
        }
    }

    return (
        <div className="app-layout">
            <Header
                query={query}
                onQueryChange={setQuery}
                onlyFavorites={onlyFavorites}
                onToggleFavorites={() => setOnlyFavorites(onlyFavorites => !onlyFavorites)}
                onOpenApiConfig={() => setIsApiConfigOpen(true)} />
            <main className="main-container">
                <FilterBar genre={genre} onGenreChange={setGenre} sort={sort} onSortChange={setSort} view={view} onViewChange={setView} />
                <button
                    type="button"
                    className="btn-primary"
                    onClick={handleRandomPick}
                    disabled={sortedMovies.length === 0 || showLoading || Boolean(showError)}
                >
                    <Shuffle aria-hidden="true" />
                    Pick for me
                </button>
                <StatsBanner
                    count={movieCount}
                    averageRating={averageRating}
                    genreName={genreName}
                    isLiveApi={onlyFavorites ? false : isLiveApi}
                />
                {showLoading && <p>Loading...</p>}
                {showError && <p>Something went wrong.</p>}
                {!showLoading && !showError && (
                    sortedMovies.length === 0
                        ? (
                            <div className="empty-state">
                                <p className="empty-title">No matching movies.</p>
                            </div>
                        )
                        : (
                            <div
                                className={view === "list"
                                    ? "movies-grid compact-view"
                                    : "movies-grid"}
                            >
                                {sortedMovies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        onOpen={setSelectedMovie}
                                    />
                                ))}
                            </div>
                        )
                )}
            </main>
            {selectedMovie && (<MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />)}
            {isApiConfigOpen && (
                <ApiConfigModal
                    onClose={() => setIsApiConfigOpen(false)}
                    onSave={() => setRefreshKey(previous => previous + 1)}
                />
            )}
        </div>
    )
}

export default HomePage