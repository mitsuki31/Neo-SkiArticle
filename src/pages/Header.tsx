import './Header.css';
import { useState, useRef } from "react";
import logoSki from "@/assets/logo_ski.png";
import {
  youtube as youtubeUrl,
  instagram as instagramUrl,
} from '@/assets/global-urls.json';
import ThemeToggle from '@/lib/ThemeToggle';
import MobileNav from './MobileNav';

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setDropdownOpen(true);
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300);  // 200 ms
  }

  return (
    // NOTE: For now I have no idea, so the header I kept it gradient with one color (sky)
    <header className="bg-gradient-to-b from-sky-200 to-sky-100 dark:from-background dark:to-background p-2 border-none" id="header">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 sm:space-x-10 mt-1 ml-3 2xl:ml-0">
          <img src={logoSki} alt="SMK Sukamandi Logo" className="w-10 h-10" />
          <span className="text-xl lg:text-2xl font-gugi font-bold tracking-[0.3rem] sm:tracking-[0.6rem] text-gray-800 dark:text-white">NeoSKI</span>
        </div>
        <nav id="navbar">
          <ul className="space-x-6 text-black dark:text-white hidden sm:flex">
            <li className='mt-1'><a href="/" className="hover:text-gray-500 font-bold"><i className="bx bxs-home mr-2 text-md"></i>Home</a></li>
            <li className='mt-1'><a href="#about" className="hover:text-gray-500 font-bold"><i className="bx bx-info-circle mr-2 text-md"></i>About</a></li>
            <li
              className="relative mt-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="inline-block">
                <button className="hover:text-gray-500 focus:outline-none cursor-pointer font-bold">
                  <i className="bx bxs-group mr-2 text-md"></i>
                  Contact
                </button>
                {isDropdownOpen && (
                  <ul className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg w-48">
                    <li><a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:font-semibold hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-800 hover:rounded-sm"><i className="bx bxl-instagram-alt mr-2"></i>Instagram</a></li>
                    <li><a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:font-semibold hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-800 hover:rounded-sm"><i className="bx bxl-youtube mr-2"></i>YouTube</a></li>
                  </ul>
                )}
              </div>
            </li>
            <ThemeToggle className='mr-3 bg-inherit dark:bg-background border-none hover:bg-black hover:text-background dark:hover:bg-white dark:hover:text-background keep' />
          </ul>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
};
