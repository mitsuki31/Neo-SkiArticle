import DOMPurify from 'dompurify';
import type { Heading } from '../remark/remark-slug-from-heading';

export default function addHeadingIds(html: string, headings: Heading[]) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, 'text/html');
  const document = dom.body;

  // Select all heading elements h1–h6
  const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const knownIds = new Set();

  allHeadings.forEach((el) => {
    const text = el.textContent?.trim();
    const match = headings.find(
      (h) => h.value.trim().toLowerCase() === text?.toLowerCase()
    );
    if (match && match.data?.id) {
      if (!knownIds.has(match.data.id) || !knownIds.has(match.data.id + '-1')) {
        const id = match.data.id.replace(/-1$/, '');
        knownIds.add(id);
        el.id = id;
      }
    }
  });

  return DOMPurify.sanitize(document.innerHTML);
}
