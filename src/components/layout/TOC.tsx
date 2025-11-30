import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronRightIcon, ListTree } from 'lucide-react';

import type { Heading } from '@/lib/plugins/remark/remark-slug-from-heading';
import { cn } from '@/lib/utils';
import { useScrollLock } from '@/hooks/scroll-lock';

type TableOfContentsOptions = {
  headings?: Heading[];
  activeId: string;
  toggler?: () => void;
  isClosed?: boolean;
};

function TableOfContentsLoading() {
  return (
    <div className="w-[20vw] pl-6 pr-8">
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 animate-pulse mb-4" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-full animate-pulse mb-4 ml-8" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-full animate-pulse mb-4 ml-8" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 animate-pulse mb-4 ml-16" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-full animate-pulse mb-4" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 animate-pulse mb-4 ml-8" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 animate-pulse mb-4 ml-8" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-full animate-pulse mb-4" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 animate-pulse mb-4" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 animate-pulse mb-4 ml-8" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-5/6 animate-pulse mb-4 ml-8" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-1/2 animate-pulse mb-4 ml-8" />
      <a className="block h-4 bg-gray-300 dark:bg-white/10 rounded w-full animate-pulse mb-4" />
    </div>
  );
}

/**
 * Table of Contents component for desktop/mobile
 */
export function TableOfContents({ headings, activeId, toggler, isClosed }: TableOfContentsOptions) {
  const activeLiRef = useRef<HTMLAnchorElement>(null);

  // Heading auto-scroll effect
  useEffect(() => {
    // Check if the ref is attached to an element
    if (activeLiRef.current) {
      // If it is, scroll that element into view
      activeLiRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeId]);

  console.log('TOC Desktop isClosed:', isClosed);
  return (
    <>
      {isClosed && (
        <button
          tabIndex={0}
          onClick={toggler}
          type="button"
          aria-label='Buka Menu Bagian Artikel'
          className="hidden lg:block bg-gray-300/70 dark:bg-gray-800/70 rounded-tr-full rounded-br-full cursor-pointer fixed lg:top-[15%] left-0"
        >
          <ChevronRightIcon className="lg:w-10 lg:h-40" />
        </button>
      )}
      <nav
        aria-label="Daftar Bagian Artikel"
        tabIndex={isClosed ? -1 : 0}
        className={`hidden lg:block sticky lg:self-start top-[15%] h-[70vh] bg-gray-300/70 dark:bg-gray-800/70 font-inter rounded-tr-xl rounded-br-xl py-8 transform transition-[max-width,padding,color] duration-500 ${isClosed ? 'lg:max-w-0 xl:max-w-0 py-0' : 'lg:max-w-[25vw] py-8'}`}
      >
        <div className="flex mb-2 mx-6 justify-between">
          <h2
            className={`text-xl font-bold text-gray-700 dark:text-gray-300 underline underline-offset-8 decoration-3 ${isClosed ? 'hidden' : 'block'}`}
            aria-hidden={isClosed}
          >
            Bagian Artikel
          </h2>
          <div>
            {!isClosed && (
              <button
                id="toc-close-button"
                type="button"
                tabIndex={0}
                onClick={toggler}
                aria-label='Tutup Menu Bagian Artikel'
                className={`cursor-pointer shadow-none ring-0 border-0 hover:opacity-70`}
              >
                <X className="cursor-pointer w-7 h-7" />
              </button>
            )}
          </div>
        </div>
        <div className="overflow-y-auto custom-scrollbar max-h-[55vh]">
          <div className='list-none pt-4 pl-3 pr-6' id='toc-list'>
            {headings ? headings.map((heading, i) => {
              const pleft = 20;
              const isActive = activeId === (heading.data?.id ?? '');

              if (heading.depth > 3) return null;  // Ignore headings deeper than 3

              return (
                <a
                  href={'#' + (heading.data?.id ?? '')}
                  ref={activeId === (heading.data?.id ?? '') ? activeLiRef : null}
                  tabIndex={isClosed ? -1 : 0}
                  key={`list-heading-${i + 1}`}
                  className={cn(
                    'block py-1 text-gray-700 dark:text-white/80 hover:text-orange-600 dark:hover:text-orange-500',
                    isActive ? 'font-bold bg-gray-300/20 dark:bg-gray-700/20 border-l-4 border-l-orange-600' : ''
                  )}
                  style={{
                    paddingLeft: heading.depth > 1
                      ? `${heading.depth * (pleft - 5)}px`
                      : `${pleft}px`
                  }}
                >
                  {heading.value}
                </a>
              );
            }) : <TableOfContentsLoading />}
          </div>
        </div>
      </nav>
    </>
  );
}

export function MobileTableOfContents({ headings, activeId, toggler, isClosed }: TableOfContentsOptions) {
  const activeLiRef = useRef<HTMLLIElement>(null);
  useScrollLock(!isClosed);  // Lock the body element when the menu is open

  // Heading auto-scroll effect (same as before)
  useEffect(() => {
    if (activeLiRef.current) {
      activeLiRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeId]);

  return (
    <>
      {isClosed && (
        <button
          tabIndex={0}
          type="button"
          aria-label='Buka Menu Bagian Artikel'
          className="block lg:hidden bg-white dark:bg-gray-800 shadow-black/40 shadow-md dark:shadow-none rounded-full cursor-pointer fixed bottom-[3%] left-[6%] p-2"
          onClick={toggler}
        >
          <ListTree className="w-8 h-8 text-orange-600/80 dark:text-orange-400" />
        </button>
      )}
      <div
        tabIndex={isClosed ? -1 : 0}
        className={cn(
          'lg:hidden fixed inset-0 z-50',
          'transition-opacity duration-500',
          isClosed ? 'pointer-events-none opacity-0' : 'opacity-100'
        )}
      >
        {/* Backdrop */}
        <AnimatePresence>
          {!isClosed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
              onClick={toggler}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
        <nav
          aria-label="Daftar Bagian Artikel"
          tabIndex={isClosed ? -1 : 0}
          className={cn(
            'absolute bottom-0 left-0 w-full h-3/4 max-h-[80vh]',
            'bg-white dark:bg-gray-900 rounded-tl-xl rounded-tr-xl',
            'p-6 shadow-2xl overflow-y-hidden',
            'transform transition-transform duration-500 ease-out',
            isClosed ? 'translate-y-full' : 'translate-y-0'
          )}
        >
          <div className="flex justify-between items-center border-b pb-4 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Bagian Artikel</h2>
            <button
              autoFocus
              type="button"
              aria-label="Tutup Menu Bagian Artikel"
              className="cursor-pointer p-1 rounded-full hover:opacity-70"
              onClick={toggler}
            >
              <X className="w-6 h-6 text-gray-900 dark:text-gray-100" />
            </button>
          </div>

          <div className="max-h-[95%] overflow-y-auto custom-scrollbar">
            <ul className='list-none mb-5 pt-4 pl-4 pr-2' id='toc-mobile-list' aria-hidden={isClosed}>
              {headings ? headings.map((heading, i) => {
                const headingId = heading.data?.id ?? '';
                const isActive = activeId === headingId;
                const pleft = 15; // Smaller for mobile

                if (heading.depth > 3) return null; // Ignore deeper headings

                return (
                  <li
                    ref={isActive ? activeLiRef : null}
                    key={`list-heading-${i + 1}`}
                    tabIndex={-1}
                    className={cn(
                      'py-1.25 text-gray-700 dark:text-white/80 transition-colors rounded-r-md focus:outline-none',
                      isActive ? 'font-bold bg-gray-300/20 dark:bg-gray-700/20 border-l-4 border-l-orange-600' : 'hover:font-medium',
                    )}
                    style={{
                      paddingLeft: heading.depth > 1
                        ? `${heading.depth * (pleft)}px`
                        : `${pleft}px`
                    }}
                    onClick={toggler}
                  >
                    <a key={`heading-${i + 1}`} href={'#' + headingId} tabIndex={isClosed ? -1 : 0}>
                      {heading.value}
                    </a>
                  </li>
                );
              }) : <TableOfContentsLoading />}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
