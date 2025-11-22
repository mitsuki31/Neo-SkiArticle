import { useState, useEffect } from "react";
import logoSki from "@/assets/logo_ski.png";
import MobileNav from './MobileNav';
import Navbar from "./Navbar";

const SCROLL_THRESHOLD = 680; // px

interface HeaderProps {
  className?: string;
  sticky?: boolean;
  scrollThreshold?: number;
}

export default function Header({ className = '', sticky = true, scrollThreshold = SCROLL_THRESHOLD }: HeaderProps) {
  const [scrollState, setScrollState] = useState<'top' | 'between' | 'scrolled'>();

  const stickyHeaderClass = `
    fixed top-0 left-0 right-0 h-16 w-full z-50 transition-all duration-300 ease-in-out
    backdrop-blur-[4px] bg-transparent
    ${
      scrollState === 'scrolled'
        ? 'translate-y-0 shadow-xl'
        : scrollState === 'top'
          ? 'translate-y-0 shadow-none'
          : '-translate-y-full'
    }
  `.replace(/[\n\s]+/g, ' ').trim();

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
    <header className={`bg-gradient-to-b from-sky-200 to-sky-100 dark:from-background dark:to-background md:p-2 border-none ${sticky ? stickyHeaderClass : ''} ${className}`} id="header">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-5 mt-1 ml-8">
          <a href="/" className="cursor-pointer">
            <img src={logoSki} alt="SMK Sukamandi Logo" className="w-10 h-10" />
          </a>
          <span className="text-xl lg:text-2xl mt-1 font-gugi font-bold tracking-[0.3rem] sm:tracking-[0.6rem] text-gray-800 dark:text-white">NeoSKI</span>
        </div>
        <Navbar />
        <MobileNav />
      </div>
    </header>
  );
};
