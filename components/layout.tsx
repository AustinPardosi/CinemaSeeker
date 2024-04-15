import React from "react";
import Navbar from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black">
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="w-full justify-center flex flex-col gap-8 px-4 md:px-40">
        {children}
      </div>
    </div>
  );
};

export default Layout;
