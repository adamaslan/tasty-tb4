

import { Link } from "@remix-run/react"; // Import Link from Remix
import React, { useState } from "react";
// Removed: import { Palette_Mosaic } from "next/font/google";
// Removed: Font configuration

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between p-4 flex-wrap bg-skin-base text-skin-base">
      <Link
        prefetch="intent" // Optional: Add Remix prefetching strategy
        to="/" // Use 'to' prop instead of 'href' for Remix Link
        className="text-2xl font-extrabold font-palette-mosaic" // Keep the font class
      >
        Drinks Food<span className="font-light text-3xl"> Life</span>
      </Link>
      {/* Burger Menu */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col cursor-pointer w-8 h-8 justify-around items-center md:hidden"
      >
        <span
          className={`block w-8 h-[3px] bg-current transition-transform ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-[3px] bg-current transition-opacity ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-[3px] bg-current transition-transform ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </div>
      {/* Navigation Links */}
      <div
        className={`flex flex-col items-center justify-between w-full mt-4 transition-all duration-300 ease-in-out md:flex-row md:mt-0 ${
          isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        } md:max-h-full md:w-auto`}
      >
        <Link
          prefetch="intent" // Optional: Add Remix prefetching strategy
          to="./subscribe" // Use 'to' prop
          className="py-2 px-4 text-center text-current text-lg hover:text-yellow-500 transition-colors"
        >
          Subscribe
        </Link>
        <Link
          prefetch="intent" // Optional: Add Remix prefetching strategy
          to="./about" // Use 'to' prop
          className="py-2 px-4 text-center text-current text-lg hover:text-yellow-500 transition-colors"
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default Nav;
