'use client';

import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react'; // or use any SVG icon
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/lib/ThemeToggle';
import {
  youtube as youtubeUrl,
  instagram as instagramUrl,
} from '@/assets/global-urls.json';

const navLinks = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang', href: '/#about' },
  // { name: 'Artikel', href: '/artikel' },
  {
    name: 'Sosial',
    submenu: [
      { name: 'YouTube', href: youtubeUrl },
      { name: 'Instagram', href: instagramUrl },
    ],
  },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="sm:hidden z-50">
      {/* Top Navbar */}
      <div className="flex items-center justify-between p-4 bg-none">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Menu"
          className="cursor-pointer shadow-none ring-0 border-0 focus:outline-none hover:brightness-110 transition"
        >
          <Menu className="w-6 h-6 text-zinc dark:text-white" />
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
            className="fixed top-0 right-0 w-64 h-screen bg-white dark:bg-zinc-700 dark:text-white/80 shadow-lg z-50 rounded-l-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
              <div className="text-lg font-major-mono font-bold dark:text-white">NeoSKI</div>
              <button onClick={() => setOpen(false)} aria-label="Close Menu">
                <X className="cursor-pointer w-6 h-6 animate-spin-once" />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-3 flex-grow">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="w-full"
                  onMouseEnter={() => setHoveredItem(link.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {link.href ? (
                    <a
                      href={link.href}
                      className="block text-base font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </a>
                  ) : link.submenu ? (
                    <div className="space-y-2">
                      <div className="text-base font-medium flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 cursor-pointer transition-all">
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${hoveredItem === link.name ? "rotate-180" : ""}`}
                        />
                      </div>
                      <AnimatePresence>
                        {hoveredItem === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            {link.submenu.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="block text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
                                onClick={() => setOpen(false)}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
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
              <ThemeToggle />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black dark:bg-white/10 z-40"
          />
        )}
      </AnimatePresence>
    </div>
  )
}