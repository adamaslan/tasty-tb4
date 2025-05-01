// import styled from "styled-components"; // Remove styled-components import
import React, { useState } from "react";
import { Link } from "@remix-run/react"; // Use Remix Link for navigation

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    // Replace Navbare styled component with nav tag and Tailwind classes
    <nav className="px-8 py-0 flex justify-between items-center flex-wrap">
      {/* Replace Logo styled component with Link tag and Tailwind classes */}
      <Link to="/" className="py-4 text-[#001022] no-underline font-extrabold text-[1.7rem] font-['Palette_Mosaic',_cursive]">
        Tasty
        {/* Apply styles to the span using Tailwind */}
        <span className="font-light text-[2.3rem] text-[#001022] no-underline font-['Palette_Mosaic',_cursive]"> Tech Bytes</span>
      </Link>
      {/* Replace Hamburger styled component with button tag and Tailwind classes */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-around w-8 h-8 bg-transparent border-none cursor-pointer p-0 z-10 focus:outline-none"
      >
        {/* Apply styles to spans using Tailwind */}
        <span className={`block h-[3px] w-[30px] bg-[#001022] mb-1 rounded-[5px] transition-all duration-300 ease-linear relative origin-[1px] ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
        <span className={`block h-[3px] w-[30px] bg-[#001022] mb-1 rounded-[5px] transition-all duration-300 ease-linear relative origin-[1px] ${isOpen ? 'opacity-0 translate-x-5' : 'opacity-100 translate-x-0'}`} />
        <span className={`block h-[3px] w-[30px] bg-[#001022] rounded-[5px] transition-all duration-300 ease-linear relative origin-[1px] ${isOpen ? '-rotate-45' : 'rotate-0'}`} />
      </button>
      {/* Replace Menu styled component with div tag and Tailwind classes */}
      {/* Use template literals for conditional classes based on isOpen */}
      <div className={`flex justify-between items-center relative md:flex ${isOpen ? 'max-h-[250px]' : 'max-h-0'} overflow-hidden flex-col md:flex-row md:max-h-full md:overflow-visible w-full md:w-auto transition-max-height duration-300 ease-in`}>
        {/* Replace MenuLink styled component with Link tag and Tailwind classes */}
        <Link to="/subscribe" className="px-8 py-4 cursor-crosshair text-center no-underline text-[#001022] transition-all duration-300 ease-in text-[1.4rem] hover:text-yellow-400">
          Subscribe
        </Link>
        <Link to="/about" className="px-8 py-4 cursor-crosshair text-center no-underline text-[#001022] transition-all duration-300 ease-in text-[1.4rem] hover:text-yellow-400">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

// Remove all styled-components definitions below
// const MenuLink = styled.a` ... `;
// const Navbare = styled.div` ... `;
// const Logo = styled.a` ... `;
// const Menu = styled.div` ... `;
// const Hamburger = styled.div` ... `;

// Remove commented out code
// import { slide as Menu } from "react-burger-menu";

// export default (props) => {
//   return (
//     <Menu {...props}>
//       <a className="menu-item" href="/">
//         Home
//       </a>

//       <a className="menu-item" href="/about">
//         About
//       </a>

//       <a className="menu-item" href="/services">
//         Services
//       </a>

//       <a className="menu-item" href="/contact">
//         Contact us
//       </a>
//     </Menu>
//   );
// };

// const Nav = () => {
//   return (
//     <nav className={navStyles.nav}>
//       <ul>
//         <li>
//           <Link href="/">Home</Link>
//         </li>
//         <li>
//           <Link href="/about">About</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Nav;
