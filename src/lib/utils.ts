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
