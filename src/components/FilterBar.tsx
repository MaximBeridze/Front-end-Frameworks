import { GENRES } from "../data/genres"
import { Grid2X2, List } from "lucide-react"

type FilterBarProps = {
    genre: string
    onGenreChange: (value: string) => void
    sort: string
    onSortChange: (value: string) => void
    view: "grid" | "list"
    onViewChange: (value: "grid" | "list") => void}

const FilterBar = ({genre, onGenreChange, sort, onSortChange, view, onViewChange}: FilterBarProps) => {
  return (
    <div className="filter-bar">
        <div className="genre-pills-scroll">
            <button
                type="button"
                className={genre === "" ? "genre-pill active" : "genre-pill"}
                aria-pressed={genre === ""}
                onClick={() => onGenreChange("")}
            >
                All Genres
            </button>
            {Object.entries(GENRES).map(([id, name]) => (
                <button
                    key={id}
                    type="button"
                    className={id === genre ? "genre-pill active" : "genre-pill"}
                    aria-pressed={id === genre}
                    onClick={() => onGenreChange(id)}
                >
                    {name}
                </button>
            ))}
        </div>
        <div className="filter-actions-right">
            <label htmlFor="movie-sort">Sort by</label>
            <select
                id="movie-sort"
                className="sort-select"
                value={sort}
                onChange={(event) =>
                onSortChange(event.target.value)
                }
            >
                <option value="popularity">Popularity</option>
                <option value="vote_average">Rating</option>
                <option value="release_date">Release Date</option>
                <option value="title">Title</option>
            </select>
            <div className="view-toggle-group">
                <button
                    type="button"
                    className={view === "grid" ? "view-btn active" : "view-btn"}
                    aria-label="Grid view"
                    title="Grid view"
                    aria-pressed={view === "grid"}
                    onClick={() => onViewChange("grid")}
                >
                    <Grid2X2/>
                </button>
                <button
                    type="button"
                    className={view === "list" ? "view-btn active" : "view-btn"}
                    aria-label="List view"
                    title="List view"
                    aria-pressed={view === "list"}
                    onClick={() => onViewChange("list")}
                >
                    <List/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default FilterBar