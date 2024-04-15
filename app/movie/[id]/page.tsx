"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Movie } from "@/types/Movie";
import { Button } from "@/components/ui/button";

const DetailMovie = () => {
  const [movie, setMovie] = useState<Movie>();
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const id = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    if (typeof id === "string") {
      const apiKey = "da17a8a1";
      axios
        .get(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((error) => {
          console.error("Error fetching movie:", error);
        });
    }
  }, [id]);

  if (!movie) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const goBack = () => router.back();

  return (
    <div className="flex w-full md:h-screen justify-center items-center bg-gray-900 text-white p-4 md:p-8">
      <div className="container mx-auto">
        <Button
          onClick={goBack}
          variant="outline"
          className="mb-4 text-white bg-transparent hover:bg-gray-800 px-3 py-1 rounded-full"
        >
          ← Back
        </Button>
        <div className="flex flex-col lg:flex-row">
          <div className="flex justify-center lg:justify-start lg:flex-none mb-4 lg:mb-0">
            <Image
              src={movie.Poster}
              alt={movie.Title}
              width={300}
              height={450}
              className="rounded"
              priority={true}
            />
          </div>
          <div className="flex flex-col flex-1 lg:ml-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              {movie.Title} ({movie.Year})
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mt-1">
              {movie.Genre} | {movie.Runtime}
            </p>
            <div className="flex flex-col md:flex-row items-center my-4">
              <span className="text-yellow-400 text-xl md:text-2xl">
                {movie.imdbRating}
              </span>
              <span className="ml-2 text-gray-400">
                ({movie.imdbVotes} votes)
              </span>
              <button className="mt-4 md:mt-0 md:ml-4 py-1 px-3 bg-yellow-600 hover:bg-yellow-500 rounded-full">
                ★ Rate
              </button>
            </div>
            <div className="mt-4">
              <p className="italic">&quot;{movie.Plot}&quot;</p>
              <p className="mt-2">Director: {movie.Director}</p>
              <p>Writers: {movie.Writer}</p>
              <p>Stars: {movie.Actors}</p>
              <p>Awards: {movie.Awards}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-bold">More Details</h2>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                <div>
                  <strong>Country:</strong> {movie.Country}
                </div>
                <div>
                  <strong>Language:</strong> {movie.Language}
                </div>
                <div>
                  <strong>Release Date:</strong> {movie.Released}
                </div>
                <div>
                  <strong>Box Office:</strong> {movie.BoxOffice}
                </div>
                <div>
                  <strong>Production:</strong> {movie.Production}
                </div>
                <div>
                  <strong>Rated:</strong> {movie.Rated}
                </div>
                <div>
                  <strong>DVD:</strong> {movie.DVD}
                </div>
                <div>
                  <strong>Website:</strong>{" "}
                  {movie.Website !== "N/A" ? (
                    <a
                      href={movie.Website}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {movie.Website}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </div>
                <div>
                  <strong>Metascore:</strong> {movie.Metascore}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
