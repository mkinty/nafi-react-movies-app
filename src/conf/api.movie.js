import * as axios from "axios";

export const apiMovie = axios.create({
  baseURL: "https://api.themoviedb.org/4",
});

apiMovie.interceptors.request.use((req) => {
  req.headers["Authorization"] =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzA5YjQ1MWEyODYzZDllOWZlNmE3ZmE4M2UxYTU1ZiIsInN1YiI6IjVmOTE0MWY2ODRmMjQ5MDAzNmY1ZjAyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.azqTDuk_1-XCfp8jVb_vuoQLGwaAhWf41k_1ppQfktk";
  return req;
});

export const apiMovieMap = (m) => ({
  img: "https://image.tmdb.org/t/p/w500" + m.poster_path,
  title: m.title,
  details:
    m.release_date + " | " + m.vote_average + "/10 (" + m.vote_count + ")",
  description: m.overview,
});

export default {
  searchMovies: (filter) => {
    const query =
      "?" +
      Object.keys(filter)
        .map((k) => `${k}=${filter[k]}&`)
        .join("");
    return apiMovie
      .get("/search/movie" + query)
      .then((response) => response.data.results)
      .then((moviesApi) => moviesApi.map(apiMovieMap));
  },
};
