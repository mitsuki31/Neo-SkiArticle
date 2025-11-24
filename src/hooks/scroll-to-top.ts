import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Custom hook that scrolls to the top of the page based on the scroll parameter.
 *
 * This will only trigger the scroll if the navigation action type is `PUSH`.
 *
 * @param scroll - A boolean value to determine whether to scroll to the top.
 */
export function useScrollToTop(scroll: boolean) {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (!scroll) return;

    if (navigationType === 'PUSH') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType, scroll]);
}

/**
 * Custom hook that scrolls to the top of the page on navigation.
 *
 * This will only trigger the scroll if the navigation action type is `PUSH`.
 */
export function useScrollToTopOnNavigation() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'PUSH') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);
}
