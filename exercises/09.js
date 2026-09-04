// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 9 — Optional Chaining and Nullish Coalescing

const movie1 = {
  title: "Inception",
  tagline: "Your mind is the scene of the crime.",
  director: { name: "Christopher Nolan" },
  cast: [{ name: "Leonardo DiCaprio" }, { name: "Elliot Page" }],
};

const movie2 = {
  title: "Unknown Film",
  tagline: "",
  // no director, no cast
};

// 1. Safely access movie2.director.name — should return undefined, not throw.
const directorName = movie2.director?.name


const taglines = movie2.tagline || "No tagline"

// 3. Safely get the name of the first cast member of movie2.
//    Should return undefined, not throw.
const firstCast = movie2.cast?.[0]?.name

// 4. Display the first cast member's name of movie2, or "Unknown cast" as fallback.
//    Combine ?. and ??
const firstMovieCast = movie1.cast?.[0]?.name ?? "Unknown cast"

// 5. Write a function formatPosterUrl(movie) that:
//    - returns the full TMDB poster URL if movie.poster_path exists and is not null
//    - returns a placeholder URL otherwise
//    TMDB poster format : https://image.tmdb.org/t/p/w500{poster_path}
//    Placeholder        : https://placehold.co/500x750?text=No+Image

function formatPosterUrl(movie){
  return movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `https://placehold.co/500x750?text=No+Image`
}

const tmdbMovie        = { title: "Inception", poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" };
const tmdbMovieNoPoster = { title: "Obscure Film", poster_path: null };

console.log(formatPosterUrl(tmdbMovie));         // https://image.tmdb.org/t/p/w500/oYuLEt3...
console.log(formatPosterUrl(tmdbMovieNoPoster)); // https://placehold.co/500x750?text=No+Image
