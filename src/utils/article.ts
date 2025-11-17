import { useEffect, useRef, useState } from 'react';

/**
 * Calculate the estimated reading time for a given text.
 *
 * @param text - the text to be analyzed
 * @param wpm - the words per minute, defaults to `200`
 *
 * @returns an array with 2 entries containing the estimated minutes and seconds
 */
export function calcReadTime(text: string, wpm: number = 200): [number, number] {
  let [minutes, seconds] = (text.trim().split(/\s+/).length / wpm).toFixed(2).split(/[.,]/).map(Number);
  while (seconds >= 60) {
    minutes += 1;
    seconds -= 60;
  }
  return [minutes, seconds];
}

/**
 * A React hook that tracks the currently visible heading ID using `IntersectionObserver`.
 *
 * @param headingIds - An array of ID strings (e.g., `['intro-heading', 'section-2']`).
 * @param headerHeight - The height of the sticky header in pixels.
 *
 * @returns The ID of the currently active heading, or `null`.
 */
export function useActiveHeading(headingIds: readonly string[], headerHeight: number = 0) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Create refs to hold the current active ID and the ordered list of IDs.
  // This prevents the `IntersectionObserver` callback from using stale state.
  const activeIdRef = useRef(activeId);
  const orderedIdsRef = useRef(headingIds);

  // Update the refs whenever the state or props change
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    orderedIdsRef.current = headingIds;
  }, [headingIds]);

  useEffect(() => {
    if (!headingIds || headingIds.length === 0) return;

    // Calculate the negative margin for the top of the viewport.
    // This tells the observer to consider an element "intersecting" when its top
    // boundary crosses the line defined by the sticky header's bottom edge.
    // The negative bottom margin ensures that once the next heading enters view,
    // the previous one is instantly marked as inactive.
    const rootMargin = `-${headerHeight}px 0px -70% 0px`;

    const observerOptions = {
      root: null, // The viewport
      rootMargin,
      threshold: 0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      // Find all entries that are currently intersecting
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      if (intersectingEntries.length > 0) {
        // This is the fix for the H2/H3 problem.
        // Sort intersecting entries by their Y position
        const sortedEntries = intersectingEntries.sort(
          (a, b) => a.boundingClientRect.y - b.boundingClientRect.y
        );

        // The "active" one is the *last* one in the list (lowest on the screen).
        const newActiveId = sortedEntries[sortedEntries.length - 1].target.id;

        if (activeIdRef.current !== newActiveId) {
          setActiveId(newActiveId);
        }
        return;
      }
    };

    const observer = new IntersectionObserver(callback, observerOptions);
    headingIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => { observer.disconnect() };  // cleanup
  }, [headingIds, headerHeight]);

  return activeId;
}

/**
 * Extract sections from a markdown string.
 *
 * A section is defined by the paragraph `=== SECTION START ===` and `=== SECTION END ===`.
 * The function splits the markdown string by the start paragraph, filters out empty strings,
 * and then maps over the resulting array to remove the end section separator from each string.
 *
 * @param markdown - The markdown string to extract sections from.
 * @returns An array of section strings.
 */
export function extractSections(markdown: string): string[] {
  const sections = markdown.split('=== [SECTION START] ===').filter(Boolean);
  const filteredSections = sections.map(section => section.replace('=== [SECTION END] ===', ''));
  return filteredSections.map(section => section.replace(/^<p>/, '').replace(/^<\/p>/, '').trim()).filter(Boolean);
}
