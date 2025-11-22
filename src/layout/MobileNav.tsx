import { useEffect, useState } from 'react';
import { Link, type Path } from 'react-router-dom';
import { BookOpenText, ChevronDown, Home, Menu, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from '@/components/ui/ExternalLink';
import ThemeToggle from '@/lib/ThemeToggle';
import { cn } from '@/lib/utils';
import {
  youtube as youtubeUrl,
  instagram as instagramUrl,
  tiktok as tiktokUrl,
} from '@/assets/global-urls.json';

type NavMenu = {
  name: string;
  icon?: React.ReactElement;
  logoClass?: string;
  to?: string | Partial<Path>;
  submenu?: (Omit<NavMenu, "to" | "submenu"> & {
    href: string;
    hoveredClass: string;
  })[];
};

const navMenus: NavMenu[] = [
  { name: 'Beranda', to: '/', icon: <Home className="w-4 h-4" /> },
  {
    name: 'Sosial',
    icon: <Users className="w-4 h-4" />,
    submenu: [
      {
        name: 'YouTube',
        href: youtubeUrl,
        logoClass: 'bx bxl-youtube',
        hoveredClass: cn(
          'hover:text-white hover:bg-gradient-to-r hover:from-[#000000] hover:via-[#FF0000] hover:to-[#EE0000]',
          'focus-visible:text-white focus-visible:bg-gradient-to-r focus-visible:from-[#000000] focus-visible:via-[#FF0000] focus-visible:to-[#EE0000]',
          'active:text-white active:bg-gradient-to-r active:from-[#000000] active:via-[#FF0000] active:to-[#EE0000]',
        )
      },
      {
        name: 'Instagram',
        href: instagramUrl,
        logoClass: 'bx bxl-instagram',
        hoveredClass: cn(
          'hover:text-white hover:bg-gradient-to-r hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]',
          'focus-visible:text-white focus-visible:bg-gradient-to-r focus-visible:from-[#F58529] focus-visible:via-[#DD2A7B] focus-visible:to-[#8134AF]',
          'active:text-white active:bg-gradient-to-r active:from-[#F58529] active:via-[#DD2A7B] active:to-[#8134AF]',
        )
      },
      {
        name: 'TikTok',
        href: tiktokUrl,
        logoClass: 'bx bxl-tiktok',
        hoveredClass: cn(
          'hover:text-white hover:bg-gradient-to-r hover:from-[#69C9D0] hover:via-[#000000] hover:to-[#EE1D52]',
          'focus-visible:text-white focus-visible:bg-gradient-to-r focus-visible:from-[#69C9D0] focus-visible:via-[#000000] focus-visible:to-[#EE1D52]',
          'active:text-white active:bg-gradient-to-r active:from-[#69C9D0] active:via-[#000000] active:to-[#EE1D52]',
        )
      },
    ],
  },
  { name: 'Histori', to: '/a/sejarah-sekolah', icon: <BookOpenText className="w-4 h-4" /> },
];


export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [openedSubmenu, setOpenedSubmenu] = useState<string | null>(null);

  const hoveredItemClass = cn(
    'hover:bg-gray-200 hover:text-orange-600 focus-visible:bg-gray-200 focus-visible:text-orange-600 active:bg-gray-200 active:text-orange-600',
    'dark:hover:bg-gray-700 dark:hover:text-orange-400 dark:focus-visible:bg-gray-700 dark:focus-visible:text-orange-400 dark:active:bg-gray-700 dark:active:text-orange-400'
  );
  
  useEffect(() => {
    // Close the mobile nav when user press Escape key
    const closeMobileNavWhenEsc = (e: KeyboardEvent) => {
      if (open && e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener('keydown', closeMobileNavWhenEsc);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', closeMobileNavWhenEsc);
    }
  });

  // Close submenu whenever `open` becomes false
  useEffect(() => {
    if (!open) setOpenedSubmenu(null);
  }, [open]);

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
            tabIndex={0}
            onClick={() => setOpen(true)}
            aria-label="Buka Menu Navigasi"
            className="cursor-pointer shadow-none ring-0 border-0 focus-visible:outline-none"
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
              className="fixed top-0 right-0 w-70 h-fit bg-white dark:bg-gray-900 dark:text-white/80 shadow-lg z-50 rounded-l-xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
                <div className="text-[1.3rem] font-major-mono font-bold dark:text-white mt-1">NeoSKI</div>
                <button onClick={() => setOpen(false)} aria-label="Tutup Menu Navigasi" type="button" className="mr-1 mt-1">
                  <X className="cursor-pointer w-7 h-7 animate-spin-once" />
                </button>
              </div>
              <nav className="flex flex-col p-4 space-y-2" id='mobile-nav'>
                {navMenus.map((navEntry) => (
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
                    {navEntry.to ? (
                        <Link
                          to={navEntry.to}
                          className={`flex items-center font-medium gap-x-4 px-3 py-[0.65rem] rounded-lg transition-all ${hoveredItemClass}`}
                          onClick={() => setOpen(false)}
                        >
                          {navEntry.icon
                            ? navEntry.icon
                            : navEntry.logoClass ? <i className={`${navEntry.logoClass} text-[1.3rem]`} /> : null}
                          {navEntry.name}
                        </Link>
                    ) : navEntry.submenu ? (
                      <div className="space-y-2">
                        <div
                          role="button"
                          tabIndex={0}
                          className={cn(
                            "flex font-medium items-center justify-between px-3 py-[0.65rem] mb-0 rounded-lg cursor-pointer transition-all",
                            hoveredItemClass
                          )}
                        >
                          <span className="flex gap-x-4 items-center justify-center">
                            {navEntry.icon
                              ? navEntry.icon
                              : navEntry.logoClass ? <i className={`${navEntry.logoClass} text-[1.3rem]`}></i> : null}
                            {navEntry.name}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${openedSubmenu === navEntry.name ? "rotate-180" : ""}`}
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
                                <ExternalLink
                                  newTab
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={cn(
                                    "flex items-center gap-x-4 text-sm font-medium px-3 pr-2 py-[0.7rem] my-3 rounded-lg transition-all",
                                    subItem.hoveredClass
                                  )}
                                  onClick={() => setOpen(false)}
                                >
                                  {subItem.icon
                                    ? subItem.icon
                                    : subItem.logoClass ? <i className={`${subItem.logoClass} text-[1.3rem]`} /> : null}
                                  {subItem.name}
                                </ExternalLink>
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
                <ThemeToggle id="mobile-nav-theme-toggler" className='mr-5 mt-[0.3rem] cursor-pointer border-none hover:bg-black hover:text-background dark:hover:bg-white dark:hover:text-background' />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
