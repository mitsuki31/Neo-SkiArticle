import { useEffect, useState } from 'react';

export function calcReadTime(text: string, wpm: number = 200): [number, number] {
  let [minutes, seconds] = (text.trim().split(/\s+/).length / wpm).toFixed(2).split(/[.,]/).map(Number);
  while (seconds >= 60) {
    minutes += 1;
    seconds -= 60;
  }
  return [minutes, seconds];
}

export function useScrollSpy(ids: string[], offset: number = 100): string | undefined {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: `-${offset}px 0px -80% 0px`, threshold: 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [ids, offset]);

  return activeId;
}

/**
 * Extract sections from a markdown string.
 *
 * A section is defined by the HTML comments `=== [SECTION START] ===` and `=== [SECTION END] ===`.
 * The function splits the markdown string by the start comment, filters out empty strings,
 * and then maps over the resulting array to remove the end comment from each string.
 *
 * @param markdown - The markdown string to extract sections from.
 * @returns An array of section strings.
 */
export function extractSections(markdown: string): string[] {
  const sections = markdown.split('=== [SECTION START] ===').filter(Boolean);
  const filteredSections = sections.map(section => section.replace('=== [SECTION END] ===', ''));
  return filteredSections.map(section => section.replace(/^<p>/, '').replace(/^<\/p>/, '').trim()).filter(Boolean);
}
