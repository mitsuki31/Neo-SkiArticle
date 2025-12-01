import GithubSlugger from 'github-slugger';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import type { Node as UnistNode } from 'unist';
import type { VFile } from 'vfile';

export type Options = {
  slugify?: (text: string) => string
  recordHeadings?: boolean
}

export type Heading = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
  depth: number
  value: string
  id: string
}

/**
 * Remark plugin to assign slug to headings.
 *
 * The plugin will generate a slug for each heading node
 * and assign it to the node's `data.id`.
 * If `options.recordHeadings` is set to `true`,
 * the plugin will also record the heading metadata
 * to `file.data.headings`.
 *
 * @param options - The options object.
 * @returns A remark plugin function.
 */
export function remarkSlugFromHeading(options?: Options) {
  const slugify = options?.slugify
    ? options.slugify
    : (() => {
        const slugger = new GithubSlugger();
        return (text: string) => slugger.slug(text);
      })();
  const { recordHeadings = true } = options ?? {};

  return (tree: UnistNode, file: VFile) => {
    file.data = file.data || {};
    if (recordHeadings) {
      if (!Array.isArray(file.data.headings)) file.data.headings = [];
    }

    visit(tree, 'heading', (node: Heading) => {
      const text = toString(node);
      const id = slugify(text);

      node.data = node.data || {};
      node.data.id = id;

      if (recordHeadings) {
        (file.data!.headings as Heading[]).push({
          depth: node.depth,
          value: text,
          id: id
        });
      }
    });
  }
}