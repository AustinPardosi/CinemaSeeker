/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import axios from "axios";
import { Movie, MoviesCarouselProps, MovieDetailProps } from "@/types/Movie";
import {
  likeMovie,
  unlikeMovie,
  isMovieLiked,
  getLikedMovies,
} from "@/lib/storage";
import { useRouter } from "next/navigation";

const MoviesCarousel: React.FC<MoviesCarouselProps> = ({ page, search }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [likedMovies, setLikedMovies] = useState<Set<string>>(getLikedMovies());
  const router = useRouter();
  const [loadingMovieId, setLoadingMovieId] = useState<string | null>(null);

  const navigateToMovieDetail = (movieId: string) => {
    router.push(`/movie/${movieId}`);
  };

  const fetchMovies = async () => {
    try {
      const apiKey = "da17a8a1";
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${search}&apikey=${apiKey}&type=movie&page=${page}`
      );
      if (response.data.Search) {
        setMovies(response.data.Search.slice(0, 15));
      } else {
        console.error("Failed to fetch movies: ", response.data.Error);
      }
    } catch (error) {
      console.error("An error occurred while fetching the movies: ", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, page]);

  const handleLikeToggle = (movieId: string) => {
    const currentlyLiked = likedMovies.has(movieId);
    if (currentlyLiked) {
      unlikeMovie(movieId);
    } else {
      likeMovie(movieId);
    }
    setLikedMovies(new Set(getLikedMovies()));
    window.location.reload();
  };

  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full"
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem
            key={movie.imdbID}
            className="md:basis-1/3 lg:basis-1/5 p-4"
          >
            <Card className="flex text-[#eeeeee] flex-col justify-center bg-[#393E46] items-center md:w-52 md:h-96 ">
              <CardHeader>
                {movie.Poster !== "N/A" ? (
                  <Image
                    src={movie.Poster}
                    alt={movie.Title}
                    width={160}
                    height={240}
                    priority={true}
                  />
                ) : (
                  <div
                    className="image-placeholder bg-gray-600 flex justify-center items-center text-white text-sm"
                    style={{ width: "160px", height: "240px" }}
                  >
                    <p>No image available</p>
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex flex-col justify-center items-center">
                <CardTitle className="text-xl ">
                  {movie.Title.length > 15
                    ? movie.Title.slice(0, 10) + "..."
                    : movie.Title}
                </CardTitle>
                <CardDescription className="font-bold text-gray-400 ">
                  {movie.Year}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex w-full justify-center gap-1">
                <Button
                  variant="outline"
                  className="flex items-center bg-transparant"
                  onClick={() => navigateToMovieDetail(movie.imdbID)}
                >
                  Details
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-1 bg-transparant"
                  onClick={() => handleLikeToggle(movie.imdbID)}
                >
                  {likedMovies.has(movie.imdbID) ? (
                    <ThumbsDown className="h-5 w-5" />
                  ) : (
                    <ThumbsUp className="h-5 w-5" />
                  )}
                  {likedMovies.has(movie.imdbID) ? "Unlike" : "Like"}
                </Button>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MoviesCarousel;
