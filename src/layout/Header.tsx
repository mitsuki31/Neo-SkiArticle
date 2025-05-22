import { useState, useRef, useEffect } from "react";
import logoSki from "@/assets/logo_ski.png";
import {
  youtube as youtubeUrl,
  instagram as instagramUrl,
} from '@/assets/global-urls.json';
import ThemeToggle from '@/lib/ThemeToggle';
import MobileNav from './MobileNav';
import { ChevronDown } from 'lucide-react';

const SCROLL_THRESHOLD = 680; // px

interface HeaderProps {
  className?: string;
  sticky?: boolean;
  scrollThreshold?: number;
}

export default function Header({ className = '', sticky = true, scrollThreshold = SCROLL_THRESHOLD }: HeaderProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const [scrollState, setScrollState] = useState<'top' | 'between' | 'scrolled'>();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const stickyHeaderClass = `
    fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out
    ${
      scrollState === 'scrolled'
        ? 'translate-y-0 shadow-xl from-white to-white'
        : scrollState === 'top'
          ? 'translate-y-0 shadow-none'
          : '-translate-y-full'
    }
  `;

  const navMenuItemsHoveredClass = `cursor-pointer focus:outline-none ${scrollState === 'top' ? 'hover:bg-sky-300/30' : 'hover:bg-gray-200'} dark:hover:bg-gradient-to-r dark:hover:from-orange-400 dark:hover:to-gray-800 p-2 px-[0.9rem] hover:rounded-sm`;

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setDropdownOpen(true);
    setHoveredItem('sosial');
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
      setHoveredItem(null);
    }, 300);  // 200 ms
  }

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (y >= 0 && y < 3) {
        setScrollState('top');
      } else if (y > 0 && y < scrollThreshold) {
        setScrollState('between');
      } else {
        setScrollState('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();  // Initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  return (
    // NOTE: For now I have no idea, so the header I kept it gradient with one color (sky)
    <header className={`bg-gradient-to-b from-sky-200 to-sky-100 dark:from-background dark:to-background p-2 border-none ${sticky ? stickyHeaderClass : ''} ${className}`} id="header">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 sm:space-x-10 mt-1 ml-3 2xl:ml-0">
          <img src={logoSki} alt="SMK Sukamandi Logo" className="w-10 h-10" />
          <span className="text-xl lg:text-2xl mt-1 font-gugi font-bold tracking-[0.3rem] sm:tracking-[0.6rem] text-gray-800 dark:text-white">NeoSKI</span>
        </div>
        <nav id="navbar">
          <ul className="space-x-2 text-black dark:text-white hidden sm:flex">
            <li className={`mt-1 ${navMenuItemsHoveredClass}`}><a href="/" className="font-bold"><i className="bx bxs-home mr-2 text-md"></i>Beranda</a></li>
            <li className={`mt-1 ${navMenuItemsHoveredClass}`}><a href="#about" className="font-bold"><i className="bx bx-info-circle mr-2 text-md"></i>Tentang</a></li>
            <li
              className={`relative mt-1 ${navMenuItemsHoveredClass}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="inline-block">
                <button className='font-bold cursor-pointer flex items-center justify-between'>
                  <i className="bx bxs-group mr-2 text-md"></i>
                  <span className='mr-3'>Sosial</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${hoveredItem === 'sosial' ? "rotate-180" : ""}`}
                  />
                </button>
                {isDropdownOpen && (
                  <ul className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded-md shadow-lg w-48">
                    <li><a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:font-semibold hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-800 hover:rounded-sm"><i className="bx bxl-instagram-alt mr-2"></i>Instagram</a></li>
                    <li><a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:font-semibold hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-800 hover:rounded-sm"><i className="bx bxl-youtube mr-2"></i>YouTube</a></li>
                  </ul>
                )}
              </div>
            </li>
            <ThemeToggle className='mr-5 mt-[0.3rem] cursor-pointer bg-inherit dark:bg-background border-none hover:bg-black hover:text-background dark:hover:bg-white dark:hover:text-background keep' />
          </ul>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
};
