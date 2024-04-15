"use client";

import Layout from "@/components/layout";
import MoviesCarousel from "@/components/movieCarousel";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <Layout>
      <div className="w-full ">
        <p className="pt-4 text-3xl text-[#FD7014] font-extrabold ">
          Featured today
        </p>
        <div className="flex w-ful">
          <MoviesCarousel page={1} search={"avengers"} />
        </div>
      </div>
      <div className="w-full ">
        <p className="text-3xl text-[#FD7014] font-extrabold ">
          Top 10 on IMDb this week
        </p>
        <div className="flex w-ful">
          <MoviesCarousel page={1} search={"star"} />
        </div>
      </div>
      <div className="w-full ">
        <p className="text-3xl text-[#FD7014] font-extrabold ">What to watch</p>
        <div className="flex w-ful">
          <MoviesCarousel page={1} search={"harry"} />
        </div>
      </div>
    </Layout>
  );
}
