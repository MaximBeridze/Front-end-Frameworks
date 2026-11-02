import { NavLink } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import { Sun, Moon, Settings, Heart, Search, X } from "lucide-react"


type HeaderProps = {
    query: string
    onQueryChange: (value: string) => void
    onlyFavorites: boolean
    onToggleFavorites: () => void
    onOpenApiConfig: () => void
}

const Header = ({ query, onQueryChange, onlyFavorites, onToggleFavorites, onOpenApiConfig }: HeaderProps) => {
    const { favorites, theme, toggleTheme } = useAppContext()

    return (
        <header className="site-header">
            <div className="header-inner">
                <NavLink to="/" className="brand-logo">
                    <h1>Movie App</h1>
                </NavLink>
                <nav aria-label="Main navigation">
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
                <div className="header-search">
                    <div className="search-input-wrapper">
                        <Search className="search-icon" aria-hidden="true" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search movies, plot keywords, titles..."
                            aria-label="Search movies"
                            autoComplete="off"
                            onChange={(e) => onQueryChange(e.target.value)}
                            value={query}
                        />
                        {query !== "" && (
                            <button
                                type="button"
                                className="search-clear-btn"
                                aria-label="Clear search"
                                title="Clear search"
                                onClick={() => onQueryChange("")}
                            >
                                <X />
                            </button>
                        )}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onToggleFavorites}
                    aria-pressed={onlyFavorites}
                >
                    <Heart />
                    Favorites: {favorites.length}
                </button>
                <button
                    type="button"
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                    title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                >
                    {theme === "dark"
                        ? <Sun />
                        : <Moon />}
                </button>
                <button
                    type="button"
                    onClick={onOpenApiConfig}
                    title="API settings"
                >
                    <Settings />
                    API Key
                </button>
            </div>
        </header>
    )
}

export default Header
