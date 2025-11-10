import type { Movie } from "../types/movie";
import { api } from "./api";

interface FetchMoviesResponse {
  results: Movie[];
  total_results: number;
}
interface MoviesResult {
  movies: Movie[];
  totalResults: number;
}

const fetchMovies = async (query: string): Promise<MoviesResult> => {
  const { data } = await api.get<FetchMoviesResponse>("/search/movie", {
    params: { query },
  });

  return {
    movies: data.results,
    totalResults: data.total_results,
  };
};

export default  fetchMovies;