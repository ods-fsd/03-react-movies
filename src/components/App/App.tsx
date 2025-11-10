import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import  SearchBar  from "../SearchBar/SearchBar";
import  MovieGrid  from "../MovieGrid/MovieGrid";
import  Loader  from "../Loader/Loader";
import  ErrorMessage  from "../ErrorMessage/ErrorMessage";
import  MovieModal  from "../MovieModal/MovieModal";
import  fetchMovies  from "../../services/movieService";
import type { Movie }  from "../../types/movie";
import styles from "./App.module.css";

export function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setLoading(true);
    setError(false);

    try {
      const { movies, totalResults } = await fetchMovies(query);

      if (totalResults === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(movies);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
}