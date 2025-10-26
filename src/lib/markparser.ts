import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { enhanceList, enhanceTable } from './utils';

export function parseMarkdown(markdown: string, beautify: boolean = true): string {
  const rawHtml = marked.parse(markdown);
  // HACK: In case the parser return a promise, but I think it would never
  const sanitizedHtml = DOMPurify.sanitize(typeof rawHtml === 'string' ? rawHtml : '');
  return beautify ? enhanceList(enhanceTable(sanitizedHtml)) : sanitizedHtml;
}

export async function getMarkdownContent(slug: string): Promise<{
  data: Record<string, string>;
  content: string;
  raw: string;
}> {
  const filePath = `/articles/${slug}.md`;
  const response = await fetch(filePath);

  if (!response.ok) {
    throw new Error(`Failed to fetch markdown file: ${response.statusText}`);
  }

  const raw = await response.text();
  const frontmatterMatch = /^---\n([\s\S]*?)\n---/.exec(raw);
  let frontmatter = {};
  let content = raw;

  if (frontmatterMatch) {
    const yaml = frontmatterMatch[1];
    content = raw.slice(frontmatterMatch[0].length);
    frontmatter = Object.fromEntries(
      yaml.split('\n')
        .filter(Boolean)
        .map(line => {
          const [key, ...rest] = line.split(':');
          return [key.trim(), rest.join(':').trim()];
        })
    );
  }

  const html = marked.parse(content);
  const sanitizedHtml = DOMPurify.sanitize(typeof html === 'string' ? html : '');

  return { data: frontmatter, content: sanitizedHtml, raw };
}

export function extractFirstHeading(html: string): { title: string, content: string } | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  for (let i = 1; i <= 6; i++) {
    const heading = doc.body.querySelector(`h${i}`);
    if (heading && heading.textContent) {
      const title = heading.textContent.trim();
      heading.parentNode?.removeChild(heading);
      const content = doc.body.innerHTML.trim();
      return { title, content };
    }
  }

  return null;
}

