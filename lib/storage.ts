export const getLikedMovies = (): Set<string> => {
  const likedMovies = localStorage.getItem("likedMovies");
  return new Set(likedMovies ? JSON.parse(likedMovies) : []);
};

export const likeMovie = (movieId: string): void => {
  const likedMovies = getLikedMovies();
  likedMovies.add(movieId);
  localStorage.setItem("likedMovies", JSON.stringify(Array.from(likedMovies)));
};

export const unlikeMovie = (movieId: string): void => {
  let likedMovies = getLikedMovies();
  likedMovies.delete(movieId);
  localStorage.setItem("likedMovies", JSON.stringify(Array.from(likedMovies)));
};

export const isMovieLiked = (movieId: string): boolean => {
  const likedMovies = getLikedMovies();
  return likedMovies.has(movieId);
};
