const FAVORITES_KEY = "movie-app-favorites"
const THEME_KEY = "movie-app-theme"
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
  // 1. Store the theme using THEME_KEY.
  localStorage.setItem(THEME_KEY, theme)

  // 2. Select the root <html> element.
  const root = document.documentElement

  // 3. Set its data-theme attribute to the supplied theme.
  root.setAttribute("data-theme", theme)
}

export function getApiKey() {
  try {
    const savedKey = localStorage.getItem(API_KEY)

    // 2. Return the saved key, or an empty string if it is null.
    return savedKey ?? ""
  } catch {
    return ""
  }
}

export function setApiKey(key) {

    const trimmedKey = key.trim()

    localStorage.setItem(API_KEY, trimmedKey)
}