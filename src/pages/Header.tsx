import './Header.css';
import { useState, useRef } from "react";
import logoSki from "@/assets/logo_ski.png";
import {
  youtube as youtubeUrl,
  instagram as instagramUrl,
  'github_repo' as githubRepo
} from '@/assets/global-urls.json';
import ThemeToggle from '@/lib/ThemeToggle';

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
        <div className="flex items-center space-x-4 sm:space-x-10 mt-1">
          <img src={logoSki} alt="SMK Sukamandi Logo" className="w-10 h-10" />
        </div>
        <nav id="navbar" className="desktop-only">
          <ul className="flex space-x-6 text-black dark:text-white">
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
            <li className='mt-1'><a href={githubRepo} target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 font-bold"><i className="bx bx-code-alt mr-2 text-md"></i>Source Code</a></li>
            <ThemeToggle className='mr-3 bg-inherit dark:bg-background border-none hover:bg-black hover:text-background dark:hover:bg-white dark:hover:text-background' />
          </ul>
        </nav>
      </div>
    </header>
  );
};
