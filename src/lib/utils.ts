import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function enhanceTable(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const tables = doc.querySelectorAll('table');

  tables.forEach((table) => {
    table.classList.add(
      'table-auto', 
      'border-collapse', 
      'border', 
      'border-gray-300', 
      'w-full', 
      'text-left',
      'dark:text-white'
    );

    table.querySelectorAll('th, td').forEach((cell) => {
      cell.classList.add('border', 'border-gray-300', 'px-4', 'py-2');
    });
    table.querySelectorAll('td').forEach((cell) => cell.classList.add('dark:text-white/80'));
  });

  return doc.body.innerHTML;
}

export function enhanceList(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  ['ol', 'ul'].forEach(selector => {
    const lists = doc.querySelectorAll(selector);
    lists.forEach(list => {
      list.classList.add('list-inside', 'mb-4', 'ml-6', 'text-gray-700');

      if (list.tagName.toLowerCase() === 'ul') {
        list.classList.add('list-disc');
      } else {
        list.classList.add('list-decimal');
      }
    });
  });

  return doc.body.innerHTML;
}

export function addClassToSVG(svgString: string, className: string): string {
  const doc = new DOMParser().parseFromString(svgString, 'image/svg+xml');
  const svg = doc.querySelector('svg');

  if (!svg) return svgString;

  // Add or merge class names
  const existingClass = svg.getAttribute('class') || '';
  svg.setAttribute('class', `${existingClass} ${className}`.trim());

  // Make sure the SVG uses currentColor so Tailwind text color works
  if (!svg.hasAttribute('fill')) {
    svg.setAttribute('fill', 'currentColor');
  }

  return svg.outerHTML;
}

/**
 * Generates a list of Tailwind utility classes prefixed with common pseudo-states
 * like `hover:`, `focus-visible:`, and `active:` for each class provided.
 *
 * @param className - A space-separated string of Tailwind classes (e.g. `"text-red-500 font-bold"`).
 * @param options - Optional configuration object.
 * @param options.attrs - An array of pseudo-state prefixes (default: ['hover', 'focus-visible', 'active']).
 * @param options.dark - If `true`, wraps each result with `dark:` prefix (default: false).
 *
 * @returns A string of composed Tailwind classes with state prefixes applied.
 *
 * @example
 * ```javascript
 * hovercls("text-red-500", { dark: true });
 * // Returns:
 * // "dark:hover:text-red-500 dark:focus-visible:text-red-500 dark:active:text-red-500"
 * ```
 */export function hovercls(
  className: string,
  { attrs = ['hover', 'focus-visible', 'active'], dark = false } = {}
): string {
  const result = attrs.map((attr) => {
    return className.split(' ').map((cls) => `${attr}:${cls}`).join(' ')
  });
  return (dark ? result.map((cls) => `dark:${cls}`) : result).join(' ');
}
