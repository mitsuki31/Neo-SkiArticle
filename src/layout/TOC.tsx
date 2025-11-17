import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronRightIcon, ListTree } from 'lucide-react';

import type { Heading } from '@/lib/plugins/remark/remark-slug-from-heading';

type TableOfContentsOptions = {
  headings?: Heading[];
  activeId: string;
  toggler?: (...args: unknown[]) => void;
  isClosed?: boolean;
};

function TableOfContentsLoading() {
  return (
    <>
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-1/2 animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-full animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-full animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-full animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-full animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-1/4 animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-1/2 animate-pulse mb-4" />
      <li className="list-none block h-4 bg-gray-300 dark:bg-white/10 rounded w-full animate-pulse mb-4" />
    </>
  );
}

/**
 * Table of Contents component for desktop/mobile
 */
export function TableOfContents({ headings, activeId, toggler, isClosed }: TableOfContentsOptions) {
  const activeLiRef = useRef<HTMLLIElement>(null);

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

  return (
    <>
      {isClosed &&
        <ChevronRightIcon className="hidden lg:block bg-gray-300/70 dark:bg-gray-800/70 rounded-tr-full rounded-br-full cursor-pointer lg:w-10 lg:h-40 fixed lg:top-[15%] left-0" onClick={toggler} />
      }
      <nav
        aria-label="Daftar Bagian Artikel"
        className={`hidden lg:block sticky lg:self-start top-[15%] h-[70vh] bg-gray-300/70 dark:bg-gray-800/70 font-inter rounded-tr-xl rounded-br-xl py-8 transform transition-[max-width,padding,color] duration-500 ${isClosed ? 'lg:max-w-0 xl:max-w-0 py-0' : 'lg:max-w-[25vw] py-8'}`}
      >
        <div className="flex mb-2 mx-6 justify-between">
          <h2 className={`text-xl font-bold text-gray-700 dark:text-gray-300 underline underline-offset-8 decoration-3 ${isClosed ? 'hidden' : 'block'}`}>Bagian Artikel</h2>
          <div>
            <button
              id="toc-close-button"
              type="button"
              aria-label={`${isClosed ? 'Buka' : 'Tutup'} Menu Bagian Artikel`}
              className={`cursor-pointer shadow-none ring-0 border-0 focus:outline-none hover:opacity-70 ${isClosed ? '-ml-4' : ''}`}
            >
              {!isClosed &&
                <X className="cursor-pointer w-7 h-7" onClick={toggler} />
              }
            </button>
          </div>
        </div>
        <div className="mx-6 overflow-y-auto custom-scrollbar max-h-[55vh]">
          <ul className='list-disc' id='toc-list'>
            {headings ? headings.map((heading, i) => {
              const mleft = 30;
              if (heading.depth > 3) return null;  // Ignore headings deeper than 3
              return (
                <li
                  ref={activeId === (heading.data?.id ?? '') ? activeLiRef : null}
                  key={`list-heading-${i + 1}`}
                  className={`
                    py-1 text-gray-700 dark:text-white/80 hover:font-bold
                  `.replace(/\n/g, '').replace(/\s+/, ' ')}
                  style={{
                    color: activeId === (heading.data?.id ?? '')
                      ? "var(--color-orange-600)"
                      : "",
                    marginLeft: heading.depth > 1
                      ? `${heading.depth * (mleft - 5)}px`
                      : `${mleft}px`
                  }}
                >
                  <a key={`heading-${i + 1}`} href={'#' + (heading.data?.id ?? '')}>{heading.value}</a>
                </li>
              );
            }) : <TableOfContentsLoading />}
          </ul>
        </div>
      </nav>
    </>
  );
}

export function MobileTableOfContents({ headings, activeId, toggler, isClosed }: TableOfContentsOptions) {
  const activeLiRef = useRef<HTMLLIElement>(null);

  // Heading auto-scroll effect (same as before)
  useEffect(() => {
    if (activeLiRef.current) {
      activeLiRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeId]);

  const useToggler = useCallback(() => {
    if (activeLiRef.current) {
      activeLiRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    toggler?.();
  }, [toggler]);

  return (
    <>
      {isClosed && (
        <div className="block lg:hidden bg-white dark:bg-gray-800 shadow-black/40 shadow-md dark:shadow-none rounded-full cursor-pointer fixed bottom-[3%] left-[6%] p-2">
          <ListTree className="w-8 h-8 text-orange-600/80 dark:text-orange-400" onClick={toggler} />
        </div>
      )}
      <div
        className={`
          lg:hidden fixed inset-0 z-50
          transition-opacity duration-500
          ${isClosed ? 'pointer-events-none opacity-0' : 'opacity-100'}
        `.replace(/[\n\s]+/g, ' ')}
      >
        {/* Backdrop */}
        <AnimatePresence>
          {!isClosed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
              onClick={useToggler}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
        <nav
          aria-label="Daftar Bagian Artikel"
          className={`
            absolute bottom-0 left-0 w-full h-3/4 max-h-[80vh]
            bg-white dark:bg-gray-900 rounded-tl-xl rounded-tr-xl
            p-6 shadow-2xl overflow-y-hidden
            transform transition-transform duration-500 ease-out
            ${isClosed ? 'translate-y-full' : 'translate-y-0'}
          `.replace(/[\n\s]+/g, ' ')}
        >
          <div className="flex justify-between items-center border-b pb-4 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Bagian Artikel</h2>
            <button
              type="button"
              aria-label="Tutup Daftar Isi"
              className="cursor-pointer focus:outline-none hover:opacity-70"
              onClick={toggler}
            >
              <X className="w-6 h-6 text-gray-900 dark:text-gray-100" />
            </button>
          </div>

          <div className="max-h-[calc(80vh-7rem)] overflow-y-auto custom-scrollbar">
            <ul className='list-disc pl-4' id='toc-mobile-list'>
              {headings ? headings.map((heading, i) => {
                const headingId = heading.data?.id ?? '';
                const isActive = activeId === headingId;
                const mleft = 15; // Smaller margin for mobile

                if (heading.depth > 3) return null; // Ignore deeper headings

                return (
                  <li
                    ref={isActive ? activeLiRef : null}
                    key={`list-heading-${i + 1}`}
                    className={`
                      py-1 text-gray-700 dark:text-white/80 transition-colors
                      ${isActive ? 'font-bold' : 'hover:font-medium'}
                    `}
                    style={{
                      color: isActive
                        ? "var(--color-orange-600)"
                        : "",
                      marginLeft: heading.depth > 1
                        ? `${heading.depth * (mleft)}px`
                        : `${mleft}px`
                    }}
                    onClick={toggler}
                  >
                    <a key={`heading-${i + 1}`} href={'#' + headingId}>
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
