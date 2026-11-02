const FAVORITES_KEY = "cinegrid_favorites"
const THEME_KEY = "cinegrid_theme"
const API_KEY = "movie-app-api-key"

export function getFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function toggleFavorite(movie) {
  const favorites = getFavorites()
  const alreadyFavorite = favorites.some((favorite) => favorite.id === movie.id)
  let updatedFavorites

  if (alreadyFavorite) {
    updatedFavorites = favorites.filter((favorite) => favorite.id !== movie.id)
  } else {
    updatedFavorites = [...favorites, movie]
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
  return updatedFavorites
}

export function getTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_KEY)

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme
    }

    return 'dark'
  } catch {
    return "dark"
  }
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
  const root = document.documentElement
  root.setAttribute("data-theme", theme)
}

export function getApiKey() {
  try {
    const savedKey = localStorage.getItem(API_KEY)
    return savedKey ?? ""
  } catch {
    return ""
  }
}

export function setApiKey(key) {

    const trimmedKey = key.trim()

    localStorage.setItem(API_KEY, trimmedKey)
}

export function setFavorites(favorites) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  )
}