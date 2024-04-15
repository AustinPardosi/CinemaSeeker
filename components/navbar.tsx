import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation"; // Corrected import statement
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  const navigateToMovieLiked = () => {
    router.push(`/likedMovies`);
  };

  return (
    <nav className="flex w-full text-white justify-around md:justify-between items-center bg-[#222831] px-4 md:px-10 lg:px-40 py-2 shadow-xl ">
      <Link href="/">
        <div className=" text-black h-8 rounded-md flex font-bold text-xl justify-center items-center bg-yellow-400 w-16 cursor-pointer">
          IMDb
        </div>
      </Link>
      <Button
        variant="outline"
        className="bg-transparent hover:bg-gray-700 px-3 py-1 rounded-md text-sm"
        onClick={navigateToMovieLiked}
      >
        Liked Movies
      </Button>
    </nav>
  );
};

export default Navbar;
