import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import remarkHeadings from '@vcarl/remark-headings';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import matter, { type FrontMatterResult } from 'front-matter';
import { type Heading, remarkSlugFromHeading } from './plugins/remark/remark-slug-from-heading';
import addHeadingIds from './plugins/dom/add-heading-ids';
import { enhanceList, enhanceTable } from './utils';
import articles from '@/utils/articleLoader';

export type ParsedMarkdown<T> = {
  data?: FrontMatterResult<T>;
  content?: string;
  headings?: Heading[];
  raw: string;
};

export function parseMarkdown(markdown: string, beautify: boolean = true): string {
  const rawHtml = marked.parse(markdown);
  // HACK: In case the parser return a promise, but I think it would never
  const sanitizedHtml = DOMPurify.sanitize(typeof rawHtml === 'string' ? rawHtml : '');
  return beautify ? enhanceList(enhanceTable(sanitizedHtml)) : sanitizedHtml;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getMarkdownContent<T = any>(slug: string, rawOnly: true): Promise<Pick<ParsedMarkdown<T>, "raw">>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getMarkdownContent<T = any>(slug: string, rawOnly?: false): Promise<Required<ParsedMarkdown<T>>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getMarkdownContent<T = any>(slug: string, rawOnly?: boolean): Promise<ParsedMarkdown<T>> {
  const article = articles[slug];
  if (!article) {
    throw new Error(`No article found with slug ${slug}`);
  }

  const { content: raw } = article;
  if (rawOnly) return { raw };

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSlugFromHeading)
    .use(remarkHeadings)
    .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
    .use(remarkRehype, { clobberPrefix: '' })
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(raw)
  ;
  return {
    data: matter<T>(raw),
    content: addHeadingIds(String(file), (file.data.headings ?? []) as Heading[]),
    headings: (file.data.headings ?? []) as Heading[],
    raw,
  };
}

export function extractFirstHeading(html: string): { title: string, content: string } | null {
  const doc = new DOMParser().parseFromString(html, 'text/html');

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

