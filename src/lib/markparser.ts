import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { type Processor, unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import remarkHeadings from '@vcarl/remark-headings';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import { parse as matterParse } from 'hexo-front-matter';
import { type Heading, remarkSlugFromHeading } from './plugins/remark/remark-slug-from-heading';
import addHeadingIds from './plugins/dom/add-heading-ids';
import { enhanceList, enhanceTable } from './utils';
import articles from '@/utils/articleLoader';
import type { Compatible } from 'vfile';

export type ParsedMarkdown<T> = {
  data?: T;
  content?: string;
  headings?: Heading[];
  raw: string;
};

export const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkSlugFromHeading)
  .use(remarkHeadings)
  .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
  .use(remarkRehype, { clobberPrefix: '' })
  .use(rehypeSanitize)
  .use(rehypeStringify)
;

export function parseMarkdown(markdown: string, beautify: boolean = true): string {
  const rawHtml = marked.parse(markdown);
  // HACK: In case the parser return a promise, but I think it would never
  const sanitizedHtml = DOMPurify.sanitize(typeof rawHtml === 'string' ? rawHtml : '');
  return beautify ? enhanceList(enhanceTable(sanitizedHtml)) : sanitizedHtml;
}

/**
 * Unify a markdown file into a unified processor tree.
 *
 * @param file - Markdown file to unify
 * @param processor- Optional `unified` processor to use, defaults to {@link markdownProcessor}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function unify<T extends Processor<any, any, any, any, any>>(
  file: Compatible,
  processor?: T
) {
  if (!processor) processor = markdownProcessor as T;
  return await processor.process(file);
}

export async function getMarkdownContent<T>(slug: string, rawOnly: true): Promise<Pick<ParsedMarkdown<T>, "raw">>;
export async function getMarkdownContent<T>(slug: string, rawOnly?: false): Promise<Required<ParsedMarkdown<T>>>;
export async function getMarkdownContent<T>(slug: string, rawOnly?: boolean): Promise<ParsedMarkdown<T>> {
  const article = articles[slug];
  if (!article) {
    throw new Error(`No article found with slug ${slug}`);
  }

  const { content: raw } = article;
  if (rawOnly) return { raw };

  // This ensure it always a new instance whenever hot reloading
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSlugFromHeading)
    .use(remarkHeadings)
    .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
    .use(remarkRehype, { clobberPrefix: '' })
    .use(rehypeSanitize)
    .use(rehypeStringify)
  ;
  const file = await unify(raw, processor);
  return {
    data: (matterParse(raw) ?? {}) satisfies T,
    content: addHeadingIds(String(file), (file.data.headings ?? []) as Heading[]),
    headings: (file.data.headings ?? []) as Heading[],
    raw,
  } satisfies ParsedMarkdown<T>;
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

