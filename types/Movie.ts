export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Actors: string;
  BoxOffice: string;
  Country: string;
  Genre: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Rated: string;
  imdbVotes: string;
  Director: string;
  Writer: string;
  Awards: string;
  Language: string;
  Released: string;
  Production: string;
  DVD: string;
  Website: string;
  Metascore: string;
}

export interface MoviesCarouselProps {
  page: number;
  search: string;
}

export interface MovieDetailProps {
  movie: Movie;
}
