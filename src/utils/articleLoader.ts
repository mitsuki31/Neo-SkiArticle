// Markdown Articles
const articleModules = import.meta.glob('../articles/*.md', {
  eager: true,    // Import immediately at build time
  query: '?raw',  // Import content as raw text
  import: 'default'
});

export type Articles = {
  [slug: string]: {
    slug: string;
    filename: `${string}.md`;
    content: string;
  }
}

const articles: Articles = {};

for (const path in articleModules) {
  const slug = path.split('/').pop()?.replace('.md', '');
  if (slug) {
    articles[slug] = { slug, filename: `${slug}.md`, content: articleModules[path] as string };
  }
}

export default articles;
