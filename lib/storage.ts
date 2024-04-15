export const getLikedMovies = (): Set<string> => {
  if (typeof window !== "undefined") {
    const likedMovies = sessionStorage.getItem("likedMovies");
    return new Set(likedMovies ? JSON.parse(likedMovies) : []);
  }
  return new Set();
};

export const likeMovie = (movieId: string): void => {
  if (typeof window !== "undefined") {
    const likedMovies = getLikedMovies();
    likedMovies.add(movieId);
    sessionStorage.setItem(
      "likedMovies",
      JSON.stringify(Array.from(likedMovies))
    );
  }
};

export const unlikeMovie = (movieId: string): void => {
  if (typeof window !== "undefined") {
    let likedMovies = getLikedMovies();
    likedMovies.delete(movieId);
    sessionStorage.setItem(
      "likedMovies",
      JSON.stringify(Array.from(likedMovies))
    );
  }
};

export const isMovieLiked = (movieId: string): boolean => {
  if (typeof window !== "undefined") {
    const likedMovies = getLikedMovies();
    return likedMovies.has(movieId);
  }
  return false;
};
