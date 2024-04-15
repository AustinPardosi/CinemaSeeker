"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Movie } from "@/types/Movie";
import Layout from "@/components/layout";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { unlikeMovie } from "@/lib/storage";

const LikedMoviesPage = () => {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);

  const fetchLikedMovies = async () => {
    if (typeof window !== "undefined") {
      const likedMovieIds = JSON.parse(
        
        sessionStorage.getItem("likedMovies") || "[]"
      );
      console.log(likedMovieIds);
      const movies = [];
      for (const id of likedMovieIds) {
        try {
          const apiKey = "da17a8a1";
          const response = await axios.get(
            `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
          );
          movies.push(response.data);
        } catch (error) {
          console.error("Failed to fetch movie:", error);
        }
      }
      setLikedMovies(movies);
    }
  };
  useEffect(() => {
    fetchLikedMovies();
  }, []);

  const router = useRouter();

  const navigateToMovieDetail = (movieId: string) => {
    router.push(`/movie/${movieId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Liked Movies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {likedMovies.map((movie) => (
            <Card
              key={movie.imdbID}
              className="flex text-[#eeeeee] flex-col justify-center bg-[#393E46] items-center md:w-52 md:h-96 "
            >
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
                  className="flex items-center gap-1 bg-red-500 text-white"
                  onClick={() => {
                    unlikeMovie(movie.imdbID);
                    window.location.reload(); 
                  }}
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LikedMoviesPage;
