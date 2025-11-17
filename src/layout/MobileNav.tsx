'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react'; // or use any SVG icon
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/lib/ThemeToggle';
import {
  youtube as youtubeUrl,
  instagram as instagramUrl,
} from '@/assets/global-urls.json';

const navLinks = [
  { name: 'Beranda', href: '/', logoClass: 'bx bxs-home' },
  { name: 'Tentang', href: '/#about', logoClass: 'bx bx-info-circle' },
  // { name: 'Artikel', href: '/artikel' },
  {
    name: 'Sosial',
    logoClass: 'bx bxs-group',
    submenu: [
      { name: 'YouTube', href: youtubeUrl, logoClass: 'bx bxl-youtube', hoveredClass: 'hover:text-red-600 hover:bg-gray-300 focus-visible:text-red-600 focus-visible:bg-gray-300 active:text-red-600 active:bg-gray-300' },
      { name: 'Instagram', href: instagramUrl, logoClass: 'bx bxl-instagram-alt', hoveredClass: 'hover:text-pink-600 hover:bg-gray-300 focus-visible:text-pink-600 focus-visible:bg-gray-300 active:text-pink-600 active:bg-gray-300' },
    ],
  },
];


export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [openedSubmenu, setOpenedSubmenu] = useState<string | null>(null);

  const hoveredItemClass =
    'hover:bg-gray-100 hover:text-orange-600 focus-visible:bg-gray-100 focus-visible:text-orange-600 active:bg-gray-100 active:text-orange-600 '
    + 'dark:hover:bg-zinc-600 dark:hover:text-orange-400 dark:focus-visible:bg-zinc-600 dark:focus-visible:text-orange-400 dark:active:bg-zinc-600 dark:active:text-orange-400';
  
  useEffect(() => {
    // Close the mobile nav when user press Escape key
    const closeMobileNavWhenEsc = (e: KeyboardEvent) => {
      if (open && e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener('keydown', closeMobileNavWhenEsc);

    // Close the mobile nav when user clicks outside of it
    const closeMobileNavWhenClickOutside = (e: MouseEvent) => {
      const mobileNav = document.getElementById('mobile-nav');
      const mobileNavButton = document.getElementById('mobile-nav-button');
      const mobileNavThemeToggler = document.getElementById('mobile-nav-theme-toggler');

      if (
        open &&
        [mobileNav, mobileNavButton, mobileNavThemeToggler].every((el) =>
          el && !el.contains(e.target as Node))
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', closeMobileNavWhenClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', closeMobileNavWhenEsc);
      document.removeEventListener('click', closeMobileNavWhenClickOutside);
    }
  });

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-[100vh] bg-black z-40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <div className="md:hidden z-50">
        {/* Top Navbar */}
        <div className="flex items-center justify-between p-4 mr-2 bg-none">
          <button
            id="mobile-nav-button"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open Menu"
            className="cursor-pointer shadow-none ring-0 border-0 focus:outline-none hover:brightness-110 transition"
          >
            <Menu className="w-8 h-8 text-zinc dark:text-white" />
          </button>
        </div>

        {/* Slide-in Drawer Menu */}
        <AnimatePresence>
          {open && (
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-70 h-fit bg-white dark:bg-zinc-700 dark:text-white/80 shadow-lg z-50 rounded-l-xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
                <div className="text-[1.3rem] font-major-mono font-bold dark:text-white mt-1">NeoSKI</div>
                <button onClick={() => setOpen(false)} aria-label="Close Menu" type="button" className="mr-1 mt-1">
                  <X className="cursor-pointer w-7 h-7 animate-spin-once" />
                </button>
              </div>
              <nav className="flex flex-col p-4 space-y-2" id='mobile-nav'>
                {navLinks.map((navEntry) => (
                  <div
                    key={navEntry.name}
                    className="w-full inline-block"
                    onKeyDown={(e) => {
                      if ([' ', 'Enter'].includes(e.key)) {
                        if (e.key === ' ') e.preventDefault();  // Prevent page scroll on Space
                        setOpenedSubmenu((prev) => (prev === navEntry.name ? null : navEntry.name));
                      }
                    }}
                    onClick={() => setOpenedSubmenu(prev => prev !== navEntry.name ? navEntry.name : null)}
                  >
                    {navEntry.href ? (
                        <a
                          href={navEntry.href}
                          className={`flex items-center text-base font-medium px-3 py-[0.65rem] rounded-lg transition-all ${hoveredItemClass}`}
                          onClick={() => setOpen(false)}
                        >
                          <i className={`${navEntry.logoClass} mr-4 text-[1.25rem]`}></i>
                          {navEntry.name}
                        </a>
                    ) : navEntry.submenu ? (
                      <div className="space-y-2">
                        <div
                          role="button"
                          tabIndex={0}
                          className={`text-base font-medium flex items-center justify-between px-3 py-[0.65rem] mb-0 rounded-lg cursor-pointer transition-all ${hoveredItemClass}`}
                        >
                          <span><i className={`${navEntry.logoClass} mr-4 text-[1.3rem]`}></i>{navEntry.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${openedSubmenu === navEntry.name ? "-rotate-180" : ""}`}
                          />
                        </div>
                        <AnimatePresence>
                          {openedSubmenu === navEntry.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 mb-0 space-y-1 overflow-hidden"
                            >
                              {navEntry.submenu.map((subItem) => (
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={`flex items-center text-sm font-medium px-3 pr-2 py-[0.7rem] my-3 rounded-lg transition-all ${hoveredItemClass} ${subItem.hoveredClass}`}
                                  onClick={() => setOpen(false)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className={`${subItem.logoClass} mr-4 text-[1.3rem]`}></i>
                                  {subItem.name}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : null}
                  </div>
                ))}
              </nav>
              <div className="p-4 border-t dark:border-neutral-700">
                <ThemeToggle id="mobile-nav-theme-toggler" className='mr-5 mt-[0.3rem] cursor-pointer bg-inherit dark:bg-background border-none hover:bg-black hover:text-background dark:hover:bg-white dark:hover:text-background' />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
