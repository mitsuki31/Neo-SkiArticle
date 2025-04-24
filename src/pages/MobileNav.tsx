'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // or use any SVG icon
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import ThemeToggle from '@/lib/ThemeToggle';

const navLinks = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang', href: '/tentang' },
  { name: 'Artikel', href: '/artikel' },
  { name: 'Kontak', href: '/kontak' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden z-50">
      {/* Top Navbar */}
      <div className="flex items-center justify-between p-4 bg-none">
        <button onClick={() => setOpen(true)} aria-label="Open Menu" className='shadow-none ring-0 border-0 focus:outline-none hover:brightness-110 transition'>
          <Menu className="w-6 h-6 text-zinc dark:text-white" />
        </button>
      </div>

      {/* Slide-in Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-64 h-6/10 bg-white dark:bg-zinc-700 dark:text-white/80 shadow-lg z-50 rounded-l-xl"
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
              <div className="text-lg font-major-mono font-bold dark:text-white">NeoSKI</div>
              <button onClick={() => setOpen(false)} aria-label="Close Menu">
                <X className="w-6 h-6 animate-spin-once" />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  // href={link.href}
                  className={clsx(
                    'text-base font-medium line-through hover:text-orange-600 dark:hover:text-orange-400 transition-colors'
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              {/* FIXME: Set the toggler to the bottom of the menu */}
              <div className='absolute bottom-0 mb-5'>
                <ThemeToggle />
              </div>
            </nav>
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
  );
}