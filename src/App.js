import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "35abbd0"; // Replace with OMDb API key

  const searchMovies = async () => {
    if (!query) return;
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError("");
      } else {
        setError("No movies found!");
        setMovies([]);
      }
    } catch (err) {
      setError("Error fetching movies.");
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="app">
      <h1>🎬 Movie Search App</h1>

      {/* Search bar */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* Search results */}
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <button onClick={() => addToFavorites(movie)}>⭐ Add to Favorites</button>
          </div>
        ))}
      </div>

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="favorites">
          <h2>⭐ My Favorites</h2>
          <div className="movies-list">
            {favorites.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                  alt={movie.Title}
                />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
