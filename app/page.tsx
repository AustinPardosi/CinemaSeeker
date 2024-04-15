"use client";

import Layout from "@/components/layout";
import MoviesCarousel from "@/components/movieCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchTerm);
  };

  const renderContent = () => {
    if (searchQuery) {
      return (
        <>
          <div className="flex w-full">
            <MoviesCarousel page={1} search={searchQuery} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className="text-3xl text-[#FD7014] font-extrabold ">
            Featured today
          </p>
          <div className="flex w-ful">
            <MoviesCarousel page={1} search={"avengers"} />
          </div>
          <p className="text-3xl text-[#FD7014] font-extrabold ">
            Top 10 on IMDb this week
          </p>
          <div className="flex w-ful">
            <MoviesCarousel page={1} search={"star"} />
          </div>
          <p className="text-3xl text-[#FD7014] font-extrabold ">
            What to watch
          </p>
          <div className="flex w-ful">
            <MoviesCarousel page={1} search={"harry"} />
          </div>
        </>
      );
    }
  };

  return (
    <Layout>
      <div className="w-full ">
        <div className="flex py-4 w-full max-w-sm items-center space-x-2">
          <Input
            className="w-96"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search title..."
          />
          <Button type="submit" onClick={handleSearchSubmit}>
            Search
          </Button>
        </div>
        {renderContent()}
      </div>
    </Layout>
  );
}
