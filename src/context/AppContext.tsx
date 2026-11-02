import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react"
import { getFavorites, getTheme, setTheme, setFavorites } from "../utils/storage"
import type { Movie } from "../types"

type Theme = "dark" | "light"

type State = {
  favorites: Movie[]
  theme: Theme
}

type Action =
  | { type: "TOGGLE_FAVOURITE"; payload: Movie }
  | { type: "SET_THEME"; payload: Theme }

type AppContextValue = {
  favorites: Movie[]
  theme: Theme
  toggleFavorite: (movie: Movie) => void
  isFavorite: (id: number) => boolean
  toggleTheme: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      }
      
    case "TOGGLE_FAVOURITE": {
      const movie = action.payload

      const alreadyFavorite = state.favorites.some(
        (favorite) => 
          movie.id === favorite.id
      )

      const updatedFavorites = alreadyFavorite
        ? state.favorites.filter(favorite => 
          movie.id !== favorite.id)
        : [...state.favorites, movie]

      return {
        ...state,
        favorites: updatedFavorites,
      }
    }

    default:
      return state
  }
}

function getInitialState(): State {
  return {
    favorites: getFavorites(),
    theme: getTheme(),
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    appReducer,
    undefined,
    getInitialState
  )

  useEffect(() => {
    setTheme(state.theme)
  }, [state.theme])

  useEffect(() => {
    setFavorites(state.favorites)
  }, [state.favorites])

  function toggleFavorite(movie: Movie) {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: movie,
    })
  }

  function toggleTheme() {
    const nextTheme = state.theme === "dark"
      ? "light"
      : "dark"

    dispatch({
      type: "SET_THEME",
      payload: nextTheme,
    })
  }

  function isFavorite(id: number): boolean {
    return state.favorites.some(
      (favorite) => 
        favorite.id === id
    )
  }

  return (
    <AppContext.Provider
      value={{
        favorites: state.favorites,
        theme: state.theme,
        toggleFavorite: toggleFavorite,
        toggleTheme: toggleTheme,
        isFavorite: isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider")
  }

  return context
}