import { useLayoutEffect } from 'react';

/**
 * `useScrollLock(true)`  -> lock scroll  
 * `useScrollLock(false)` -> unlock scroll
 *
 * - Handles iOS Safari quirks (uses position:fixed there).
 * - Compensates for desktop scrollbar width to avoid layout shift.
 * - Supports multiple locks (stacked callers) safely.
 * - Restores exact scroll position on unlock / unmount.
 */
let lockCount = 0; // module-scoped: number of active locks

/**
 * Locks or unlocks the scroll position of the page.
 *
 * This hook is useful for preventing the user from scrolling away while
 * a modal or other overlay is visible. It works by setting `overflow: hidden`
 * on the `<body>` element, and also sets `position: fixed` and `top/left/right` styles
 * on iOS devices to ensure the page doesn't shift when the scrollbar disappears.
 *
 * It also compensates for the scrollbar width on desktop devices to prevent a layout shift.
 * The hook is designed to be safe for multiple callers to use simultaneously,
 * and will restore the exact scroll position when the last caller unlocks the scroll position.
 *
 * @param locked - If `true`, locks the scroll position. Otherwise, unlocks it.
 */
export function useScrollLock(locked: boolean): void {
  useLayoutEffect(() => {
    const body = document.body;
    const doc = document.documentElement;

    // Robust-ish iOS detection (covers iPadOS as well)
    const isIos =
      typeof window !== "undefined" &&
      (/(iP(ad|hone|od))/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

    const getScrollY = () =>
      window.scrollY ?? window.pageYOffset ?? doc.scrollTop ?? 0;

    const cleanup = () => {
      // Decrement and when zero, remove styles and restore scroll
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        const scrollY = parseInt(body.dataset.__scrollLock || "0", 10);

        // Restore styles
        body.style.overflow = "";
        body.style.paddingRight = "";
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";

        delete body.dataset.__scrollLock;

        // Restore scroll position exactly
        window.scrollTo({ top: scrollY, behavior: "instant" });
      }
    }

    // Enter lock
    if (locked) {
      // If nobody else has locked yet, apply the locking styles and store scroll
      if (lockCount === 0) {
        const scrollY = getScrollY();
        body.dataset.__scrollLock = String(scrollY);

        // Desktop: compensate for scrollbar disappearance to avoid layout shift
        const scrollbarWidth = window.innerWidth - doc.clientWidth;
        if (scrollbarWidth > 0) {
          body.style.paddingRight = `${scrollbarWidth}px`;
        }

        if (isIos) {
          // iOS: position fixed is more reliable than overflow:hidden
          // Keep left/right so width doesn't change
          body.style.position = "fixed";
          body.style.top = `-${scrollY}px`;
          body.style.left = "0";
          body.style.right = "0";
        } else {
          // Non-iOS: hiding overflow is simple and stable
          body.style.overflow = "hidden";
        }
      }

      lockCount++;
      return;
    }

    // Exit/unlock
    if (!locked) {
      cleanup();
      return;
    }

    // Cleanup if the component unmounts while locked (defensive)
    return cleanup;
  }, [locked]);
}
