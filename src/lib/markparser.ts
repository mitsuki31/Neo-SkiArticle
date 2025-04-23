import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { enhanceList, enhanceTable } from './utils';

export function parseMarkdown(markdown: string, beautify: boolean = true): string {
  const rawHtml = marked.parse(markdown);
  // HACK: In case the parser return a promise, but I think it would never
  const sanitizedHtml = DOMPurify.sanitize(typeof rawHtml === 'string' ? rawHtml : '');
  return beautify ? enhanceList(enhanceTable(sanitizedHtml)) : sanitizedHtml;
}

